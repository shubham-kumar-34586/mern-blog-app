import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

/* ✅ ENSURE UPLOADS FOLDER EXISTS (PRODUCTION SAFE) */
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* ✅ CORS (LOCAL + PRODUCTION) */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.CLIENT_URL
    ],
    credentials: true
  })
);

app.use(express.json());
app.use("/uploads", express.static(uploadDir));

/* ✅ HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ✅ ROUTES */
app.use("/", router);

/* ✅ DB FIRST, THEN SERVER */
const PORT = process.env.PORT || 8000;
Connection();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
