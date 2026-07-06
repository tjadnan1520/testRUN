import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  createPost
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("file"),
  updatePost
);

router.delete(
  "/:id",
  authMiddleware,
  deletePost
);

export default router;