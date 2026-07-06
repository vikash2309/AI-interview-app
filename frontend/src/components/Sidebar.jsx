import { Link, useLocation } from "react-router-dom";
import { FiHome, FiClock, FiX } from "react-icons/fi";

function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiHome size={18} />,
    },
    {
      name: "History",
      path: "/history",
      icon: <FiClock size={18} />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="
          fixed
          inset-0
          bg-black/60
          backdrop-blur-sm
          z-40
          md:hidden
        "
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
        fixed
        md:static
        top-16
        left-0
        h-[calc(100vh-64px)]
        w-[85vw]
        max-w-72
        overflow-y-auto
        flex
        flex-col
        bg-gradient-to-b
        from-[#171923]
        via-[#1a1f2d]
        to-[#1d2230]
        border-r
        border-[#262b36]
        z-50
        transform
        transition-transform
        duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Mobile Header */}
        <div
          className="
  md:hidden
  flex
  items-center
  justify-between
  px-5
  py-4
  border-b
  border-[#262b36]
"
        >
          <div>
            <p
              className="
      text-xs
      uppercase
      tracking-[0.2em]
      text-gray-500
      font-medium
    "
            >
              Navigation
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="
    flex
    items-center
    justify-center
    h-10
    w-10
    rounded-xl
    hover:bg-[#222734]
    hover:text-white
    transition-all
    duration-200
    cursor-pointer
  "
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4 flex-1">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3.5
                  rounded-2xl
                  transition-all
                  duration-300
                  font-medium
                  ${
                    location.pathname === link.path
                      ? `
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        text-white
                        shadow-lg
                        shadow-cyan-500/20
                      `
                      : `
                        text-gray-300
                        hover:bg-[#222734]
                        hover:text-white
                        hover:translate-x-1
                      `
                  }
                `}
              >
                {link.icon}

                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Card */}
        <div className="px-4 pb-5">
          <div
            className="
            bg-cyan-500/10
            border
            border-cyan-500/20
            rounded-2xl
            p-4
          "
          >
            <p className="text-xs text-cyan-300 uppercase tracking-wide">
              AI Assistant
            </p>

            <h3 className="font-semibold mt-2">Ready For Practice</h3>

            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Create a new interview and improve your skills with AI-powered
              feedback.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
