import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use("/uploads", express.static(uploadDir));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* 🔥 DB CONNECT PER REQUEST (VERCEL SAFE) */
app.use(async (req, res, next) => {
  try {
    await Connection();
    next();
  } catch (err) {
    res.status(500).json({ msg: "DB connection failed" });
  }
});

app.use("/", router);

export default app;
