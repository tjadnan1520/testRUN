import passport from "passport";
import { generateToken } from "../utils/generateToken.js";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = [
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),

  async (req, res) => {
    try {
      const token = generateToken(req.user.id);

      res.redirect(
        `${process.env.CLIENT_URL}/auth/success?token=${token}`
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Authentication failed.",
      });
    }
  },
];

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};