import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {createServer} from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import socketHandler from "./socket/socketHandler.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";


dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);



app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);

// Message Routes
app.use("/api/messages", messageRoutes);


app.get("/", (req, res) => {
  res.json({"message": "Welcome to ChatVerse API"});
});

// Socket.io
socketHandler(io);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
});