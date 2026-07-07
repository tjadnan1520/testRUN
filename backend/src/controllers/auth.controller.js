import passport from "passport";
import { generateToken } from "../utils/generateToken.js";

const getFrontendUrl = () => {
  const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL;

  if (!frontendUrl) {
    throw new Error("FRONTEND_URL or CLIENT_URL must be configured.");
  }

  return frontendUrl.replace(/\/+$/, "");
};

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

export const googleCallback = [
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${getFrontendUrl()}/login?error=google_oauth_failed`,
  }),

  async (req, res) => {
    try {
      const token = generateToken(req.user.id);

      res.redirect(`${getFrontendUrl()}/auth/success?token=${token}`);
    } catch (error) {
      return res.redirect(
        `${getFrontendUrl()}/login?error=google_oauth_failed`
      );
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