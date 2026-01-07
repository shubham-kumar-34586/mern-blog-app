import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

// ✅ FIXED CORS CONFIG
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ ROUTES
app.use("/", router);

const PORT = 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT ${PORT}`);
});
