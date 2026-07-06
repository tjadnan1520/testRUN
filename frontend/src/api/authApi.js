import axiosInstance from "./axios";

export const loginWithGoogle = () => {
  window.location.href = `${
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  }/auth/google`;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");

  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");

  localStorage.removeItem("token");

  return data;
};