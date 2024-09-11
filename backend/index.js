import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import * as path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "client")));
app.use(cors({ origin: true }));


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

const PORT = 3001 || process.env.PORT;
const HOST = "localhost" || process.env.HOST;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
console.log(`server is running on http://${HOST}:${PORT}`);