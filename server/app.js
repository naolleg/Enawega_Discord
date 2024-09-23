import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import * as path from 'path';
import  {HOST, PORT}  from './src/config/secrete.js';
import http from 'http';
import formatMessage from "./src/utils/message.js";
import { Server } from 'socket.io';
import appRouter from './src/route/index.js';
import redis from "redis"
import { createAdapter } from '@socket.io/redis-adapter';
const { createClient } = redis;
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from "./src/utils/user.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/',(req,res,next)=>{
  return res.send('server is working');
});


app.use(cors({ origin: true }));
app.use('/api', appRouter);

(async () => {
  const pubClient = createClient({ url: "redis://localhost:6379" });
  await pubClient.connect();
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));
})();

const botName = "Enawega Bot";
io.on("connection", (socket) => {
  console.log(io.of("/").adapter);
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
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

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
  console.log(`Server listening on ${PORT}`);
});