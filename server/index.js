import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

// ✅ CORS – Vercel + Localhost
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

app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ✅ HEALTH CHECK (MUST BE BEFORE ROUTER) */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ✅ API ROUTES */
app.use("/", router);

/* ✅ PORT (Render compatible) */
const PORT = process.env.PORT || 8000;

/* ✅ DB CONNECTION */
Connection();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
