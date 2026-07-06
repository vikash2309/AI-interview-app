import { getAuth } from "@clerk/express";

const protect = (
  req,
  res,
  next
) => {
  try {
    const { userId } =
      getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default protect;