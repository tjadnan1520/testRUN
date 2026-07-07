import axiosInstance from "./axios";
import { getApiBaseUrl } from "./baseUrl";

export const loginWithGoogle = () => {
  window.location.href = `${getApiBaseUrl()}/auth/google`;
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