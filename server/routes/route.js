import express from "express";

import { signupUser, loginUser } from "../controller/user-controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controller/post-controller.js";
import {
  newComment,
  getComments,
  deleteComment,
} from "../controller/comment-controller.js";

import upload from "../utils/upload.js"; // ✅ ONLY ONCE
import { authenticateToken } from "../controller/jwt-controller.js";

const router = express.Router();

/* AUTH */
router.post("/signup", signupUser);
router.post("/login", loginUser);

/* FILE */
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);

/* POSTS */
router.get("/posts", getAllPosts);
router.get("/post/:id", getPostById);
router.post("/create", authenticateToken, createPost);
router.put("/update", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

/* COMMENTS */
router.get("/comments/:id", getComments);
router.post("/comment", authenticateToken, newComment);
router.delete("/comment/:id", authenticateToken, deleteComment);

export default router;
