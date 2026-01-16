import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

/* ✅ ensure uploads folder */
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* ✅ cors */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use("/uploads", express.static(uploadDir));

/* ✅ health check */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ✅ routes */
app.use("/", router);

/* ✅ db connect (NO listen) */
Connection();

/* 🔥 EXPORT APP (Vercel requirement) */
export default app;
