import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

/**
 * ✅ CORS CONFIG (LOCAL + VERCEL)
 * Allows requests from:
 * - localhost (development)
 * - your Vercel frontend (production)
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-blog-app-liart.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/", router);

// server port (Render provides PORT)
const PORT = process.env.PORT || 8000;

// database connection
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
