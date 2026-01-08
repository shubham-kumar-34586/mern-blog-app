import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

/**
 * ✅ RENDER-SAFE CORS CONFIG
 * - Allows Vercel frontend
 * - Handles preflight correctly
 * - NO credentials (JWT via headers, not cookies)
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-blog-app-liart.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ✅ MUST handle OPTIONS explicitly (IMPORTANT FOR RENDER)
app.options("*", cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/", router);

// DB
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);

// PORT (Render uses process.env.PORT)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
