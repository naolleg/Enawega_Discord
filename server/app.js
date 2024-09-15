import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import * as path from 'path';
import  {HOST, PORT}  from './src/config/secrete.js';
import http from 'http';
import formatMessage from "./src/utils/message.js";
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/',(req,res,next)=>{
  return res.send('server is working');
});


app.use(cors({ origin: true }));
import  {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} from "./src/utils/user.js";


io.on('connection', (socket) => {
    console.log("new connection");
    socket.emit('message','welcome to chat')

    socket.broadcast.emit('message','user joined');
  socket.on('disconnect',()=> {
    io.emit('message','a user has left chat');
  });

  socket.on('ChatMessage',msg => {
    io.emit('chat')
  })
});


app.listen(PORT, () => console.log(`server running on http://${HOST}:${PORT}`));
