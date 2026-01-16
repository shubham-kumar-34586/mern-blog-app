import express from "express";
import upload from "../utils/upload.js";
import { signupUser, loginUser } from "../controller/user-controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from "../controller/post-controller.js";

import {
  newComment,
  getComments,
  deleteComment
} from "../controller/comment-controller.js";

import upload from "../utils/upload.js";
import { authenticateToken } from "../controller/jwt-controller.js";

const router = express.Router();

/* ===== AUTH ===== */
router.post("/signup", signupUser);
router.post("/login", loginUser);

/* ===== FILE ===== */
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);

/* ===== POSTS ===== */
/* 🔓 PUBLIC */
router.get("/posts", getAllPosts);
router.get("/post/:id", getPostById);

/* 🔒 PROTECTED */
router.post("/create", authenticateToken, createPost);
router.put("/update", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

/* ===== COMMENTS ===== */
/* 🔓 READ PUBLIC */
router.get("/comments/:id", getComments);

/* 🔒 WRITE PROTECTED */
router.post("/comment", authenticateToken, newComment);
router.delete("/comment/:id", authenticateToken, deleteComment);

export default router;
