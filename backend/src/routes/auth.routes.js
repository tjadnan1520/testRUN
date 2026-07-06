import { Router } from "express";
import {
  googleAuth,
  googleCallback,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/google", googleAuth);

router.get("/google/callback", googleCallback);

router.get("/me", authMiddleware, getCurrentUser);

router.post("/logout", logout);

export default router;