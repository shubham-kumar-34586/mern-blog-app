import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

/* ✅ CORS */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());

/* ✅ HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ✅ DB CONNECT PER REQUEST (SERVERLESS SAFE) */
app.use(async (req, res, next) => {
  try {
    await Connection();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "DB connection failed" });
  }
});

/* ✅ ROUTES */
app.use("/", router);

export default app;
