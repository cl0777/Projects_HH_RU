const DEFAULT_API_BASE_URL = "http://localhost:3030/api/v1";

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

export const getApiUrl = (path = ""): string => {
  if (!path) {
    return API_BASE_URL;
  }
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
};
