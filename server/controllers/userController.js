export const getCurrentUser = async (
  req,
  res
) => {
        
  try {
    const userId =
      req.userId;

    res.json({
      success: true,
      data: {
        clerkId: userId,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};