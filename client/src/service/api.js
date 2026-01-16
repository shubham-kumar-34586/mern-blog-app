import axios from "axios";
import { SERVICE_URLS } from "../constants/config.js";

// ✅ PRODUCTION BACKEND URL
const API_URL = "https://mern-blog-app-server-three.vercel.app";

const getAccessToken = () => localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 JWT attach
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ uniform response handling
axiosInstance.interceptors.response.use(
  (response) => ({
    isSuccess: true,
    data: response.data,
  }),
  (error) => ({
    isSuccess: false,
    error:
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      "Server error",
  })
);

const API = {};

// AUTO ROUTES
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
    });
}

// POSTS
API.getAllPosts = (params) =>
  axiosInstance.get("/posts", { params });

API.getPostById = (id) =>
  axiosInstance.get(`/post/${id}`);

API.updatePost = (body) =>
  axiosInstance.put("/update", body);

API.deletePost = (id) =>
  axiosInstance.delete(`/delete/${id}`);

// COMMENTS
API.newComment = (body) =>
  axiosInstance.post("/comment", body);

API.getComments = (postId) =>
  axiosInstance.get(`/comments/${postId}`);

API.deleteComment = (id) =>
  axiosInstance.delete(`/comment/${id}`);

export { API };
