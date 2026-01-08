import axios from "axios";
import { SERVICE_URLS } from "../constants/config.js";

const API_URL = "https://blog-backend-fi31.onrender.com";

const getAccessToken = () => localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "content-type": "application/json" }
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return { isSuccess: true, data: response.data };
    }
    return response;
  },
  (error) => {
    return {
      isSuccess: false,
      error: error?.response?.data?.msg || "Server error"
    };
  }
);

const API = {};

// AUTO ROUTES
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body
    });
}

// POSTS
API.getAllPosts = (params) =>
  axiosInstance.get("/posts", { params });

API.getPostById = (id) => axiosInstance.get(`/post/${id}`);
API.deletePost = (id) => axiosInstance.delete(`/delete/${id}`);
API.updatePost = (body) => axiosInstance.put(`/update`, body);

// COMMENTS
API.newComment = (body) => axiosInstance.post("/comment", body);
API.getComments = (postId) => axiosInstance.get(`/comments/${postId}`);
API.deleteComment = (id) => axiosInstance.delete(`/comment/${id}`);

export { API };
