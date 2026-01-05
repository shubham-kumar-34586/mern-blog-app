import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

// ✅ REQUIRED MIDDLEWARES (ORDER MATTERS)
app.use(cors());
app.use(express.json());

// ✅ USE YOUR ROUTER (NOT express.Router)
app.use("/", router);

const PORT = 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT}`);
});
