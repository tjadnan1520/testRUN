export const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

  if (configuredUrl) {
    return configuredUrl;
  }

  if (import.meta.env.DEV) {
    return "http://localhost:5000/api";
  }

  throw new Error("VITE_API_URL must be configured for production builds.");
};