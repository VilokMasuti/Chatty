import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import connectDB from './db/connectdatabase.js';
import cookieParser from "cookie-parser"; // Import cookie-parser
import cors from 'cors';
import path from 'path';
import { app, server } from "./db/socket.js";
dotenv.config();

// Middleware
app.use(express.json({ limit: '10mb' })); // Increase payload limit
app.use(cookieParser()); // Use cookie-parser middlewar
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }

))


// Register routes with correct base URL
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect to the database and start the server
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
