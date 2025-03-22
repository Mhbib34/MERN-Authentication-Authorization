import {
  welcomeEmailTemplate,
  otpEmailTemplate,
} from "../config/email-template.js";
import transporter from "../config/nodemailer.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  userEmailVerification,
  userResetPassword,
  userResetPasswordOtp,
  verifyOtpUser,
} from "../services/auth-services.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser(name, email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Welcome ${name}!`,
      html: welcomeEmailTemplate(email, name),
    };
    await transporter.sendMail(mailOption);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "User login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json(logoutUser());
  } catch (error) {
    next(error);
  }
};

export const sendVerifyOtp = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { otp, user } = await verifyOtpUser(userId);
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Account Verify OTP!`,
      html: otpEmailTemplate(user.name, otp, "verify your email"),
    };
    await transporter.sendMail(mailOption);

    res.status(200).json({
      success: true,
      message: "Verification OTP sent on email",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;
    const { user } = await userEmailVerification(userId, otp);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
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

export const isAuthenticated = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const sendResetPasswordOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { user, otp } = await userResetPasswordOtp(email);
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Account Verify OTP!`,
      html: otpEmailTemplate(user.name, otp, "change your password"),
    };
    await transporter.sendMail(mailOption);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export const resetUserPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const { user } = await userResetPassword(email, otp, newPassword);

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
