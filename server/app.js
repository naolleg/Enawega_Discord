import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { HOST, PORT } from './src/config/secrete.js';
import http from 'http';
import formatMessage from "./src/utils/message.js";
import { Server } from 'socket.io';
import appRouter from './src/route/index.js';
import { userJoin, getCurrentUser  , userLeave, getRoomUsers } from "./src/utils/user.js";
import Redis from "ioredis";
import { log } from 'util';

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res, next) => {
  return res.send('server is working fine');
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));
app.use('/api', appRouter);

const botName = "Enawega Bot";
io.on("connection", (socket) => {
  //console.log("Client connected");

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
              
    socket.join(user.room);
           
    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));
             
    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    // Retrieve messages from Redis
    
   redisClient.lrange(`chat_messages:${user.room}`, 0, -1, (err, messages) => {
    if (err) {
      console.error(err);
    } else {
      const parsedMessages = messages.map((message) => JSON.parse(message));
      socket.emit("messages", parsedMessages);
    }
  });
});
  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
  
    // Store message in Redis
    redisClient.lpush(`chat_messages:${user.room}`, JSON.stringify(formatMessage(user.username, msg)));
  
    // Retrieve messages from Redis
    redisClient.lrange(`chat_messages:${user.room}`, 0, -1, (err, messages) => {
      if (err) {
        console.error(err);
      } else {
        const parsedMessages = messages.map((message) => JSON.parse(message));
        socket.emit("messages", parsedMessages);
      }
    });
  
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});