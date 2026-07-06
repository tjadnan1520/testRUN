import { Router } from "express";
import { uploadFile } from "../controllers/upload.controller.js";
import upload from "../middleware/upload.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, upload.single("file"), uploadFile);

export default router;