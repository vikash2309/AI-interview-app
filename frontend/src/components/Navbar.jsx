import { UserButton } from "@clerk/clerk-react";
import { FiMenu } from "react-icons/fi";

function Navbar({ setOpen }) {
  return (
    <nav
      className="
      sticky
      top-0
      z-30
      bg-[#0f1117]/90
      backdrop-blur-xl
      border-b
      border-[#262b36]
    "
    >
      <div
        className="
        h-16
        px-4
        md:px-8
        flex
        items-center
        justify-between
      "
      >
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(true)}
            className="
            md:hidden
            p-2
            rounded-lg
            hover:bg-[#1a1f2d]
            transition
            cursor-pointer
          "
          >
            <FiMenu size={22} />
          </button>

          {/* Logo */}
          <div>
            <h1
              className="
              text-xl
              md:text-2xl
              font-bold
              tracking-tight
            "
            >
              CRACK
              <span className="text-cyan-400">
                ZO
              </span>
            </h1>

            <p
              className="
              hidden
              md:block
              text-[11px]
              text-gray-500
              -mt-1
            "
            >
              Practice • Improve • Succeed
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div
            className="
            hidden
            md:flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            bg-cyan-500/10
            border
            border-cyan-500/20
          "
          >
            <span
              className="
              w-2
              h-2
              rounded-full
              bg-cyan-400
              animate-pulse
            "
            />

            <span
              className="
              text-xs
              font-medium
              text-cyan-300
            "
            >
              AI Ready
            </span>
          </div>

          <UserButton
            afterSignOutUrl="/"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;