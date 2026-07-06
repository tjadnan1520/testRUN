import prisma from "../config/prisma.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        fileUrl: req.file?.path || null,
        fileType: req.file
          ? req.file.mimetype.startsWith("image/")
            ? "IMAGE"
            : req.file.mimetype === "application/pdf"
            ? "PDF"
            : "DOCUMENT"
          : null,
        authorId: req.user.id,
      },
      include: {
        author: true,
      },
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        author: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: req.body.title ?? post.title,
        content: req.body.content ?? post.content,
        fileUrl: req.file?.path ?? post.fileUrl,
        fileType: req.file
          ? req.file.mimetype.startsWith("image/")
            ? "IMAGE"
            : req.file.mimetype === "application/pdf"
            ? "PDF"
            : "DOCUMENT"
          : post.fileType,
      },
      include: {
        author: true,
      },
    });

    res.status(200).json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};