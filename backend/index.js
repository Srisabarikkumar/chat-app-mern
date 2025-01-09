import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { app, server } from "./utils/socket.js";
import path from "path";

dotenv.config({});

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// serving both frontend and backend of the application together
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
