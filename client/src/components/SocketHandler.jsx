import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (username, category) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socketConnection = io('http://localhost:8888');
    setSocket(socketConnection);

    socketConnection.emit('joinRoom', { username, room: category });

    socketConnection.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketConnection.on('messages', (messageHistory) => {
      setMessages(messageHistory);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [username, category]);

  const sendMessage = (message) => {
    if (socket && message.trim()) {
      socket.emit('chatMessage', message);
    }
  };

  const leaveRoom = () => {
    if (socket) {
      socket.emit('leaveRoom');
    }
  };

  return {
    socket,
    messages,
    sendMessage,
    leaveRoom,
  };
};

export default useSocket;
