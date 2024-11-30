import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import moment from 'moment';

const ChatRoom = () => {
  const { state: { username, category } } = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8888');
    setSocket(newSocket);

    newSocket.emit('joinRoom', { username, room: category });

    newSocket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('messages', (history) => {
      setMessages(history);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [username, category]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit('chatMessage', newMessage);
      setNewMessage('');
    }
  };

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom');
    navigate('/rooms');
  };

  return (
    <div className="bg-slate-700 h-screen">
      <header className="flex justify-between items-center py-4 px-6 bg-slate-600">
        <h1 className="text-2xl font-bold text-white">{category} Room</h1>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleLeaveRoom}
        >
          Leave Room
        </button>
      </header>
      <main className="p-4">
        <div>
          {messages.map((message, index) => (
            <div key={index} className="bg-gray-800 text-white p-4 my-2 rounded">
              <p>
                <strong>{message.username}:</strong> {message.text}
              </p>
              <small className="text-gray-400">{moment(message.time).format('h:mm a')}</small>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-900">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-3/4 p-2"
            placeholder="Type a message"
          />
          <button className="bg-blue-500 text-white p-2 ml-2" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatRoom;
