import prisma from "../config/prisma.js";

export const createPost = async (data) => {
  return await prisma.post.create({
    data,
    include: {
      author: true,
    },
  });
};

export const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
};

export const updatePost = async (id, data) => {
  return await prisma.post.update({
    where: {
      id,
    },
    data,
    include: {
      author: true,
    },
  });
};

export const deletePost = async (id) => {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
};