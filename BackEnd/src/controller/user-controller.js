import { getUserData } from "../services/user-service.js";

export const getUserHandler = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await getUserData(userId);

    return res.status(200).json({
      success: true,
      userData: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};
