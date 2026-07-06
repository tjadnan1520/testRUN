import axiosInstance from "./axios";

export const getAllPosts = async () => {
  const { data } = await axiosInstance.get("/posts");

  return data;
};

export const getPostById = async (id) => {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export const createPost = async (formData) => {
  const { data } = await axiosInstance.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updatePost = async (id, formData) => {
  const { data } = await axiosInstance.put(`/posts/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deletePost = async (id) => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);

  return data;
};