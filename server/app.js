import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { HOST, PORT } from './src/config/secrete.js';
import http from 'http';
import formatMessage from './src/utils/message.js';
import { Server } from 'socket.io';
import appRouter from './src/route/index.js';
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from './src/utils/user.js';
import Redis from 'ioredis';

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000), // Retry logic
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use('/api', appRouter);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => res.send('Server is working fine.'));

const botName = 'Enawega Bot';

io.on('connection', (socket) => {
  socket.on('joinRoom', async ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Welcome to Enawega Chat!'));
    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(botName, `${user.username} has joined the chat`));

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    try {
      const messages = await redisClient.lrange(`chat_messages:${user.room}`, 0, -1);
      const parsedMessages = messages.map((msg) => JSON.parse(msg));
      socket.emit('messages', parsedMessages);
    } catch (err) {
      console.error('Error retrieving messages:', err);
    }
  });

  socket.on('chatMessage', async (msg) => {
    const user = getCurrentUser(socket.id);

    if (user) {
      const message = formatMessage(user.username, msg);

      try {
        await redisClient.lpush(`chat_messages:${user.room}`, JSON.stringify(message));
        io.to(user.room).emit('message', message);
      } catch (err) {
        console.error('Error storing message:', err);
      }
    }
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
