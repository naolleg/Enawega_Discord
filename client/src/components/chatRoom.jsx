import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import moment from 'moment'

const ChatRoom = () => {
  const location = useLocation();
  const { username, category } = location.state;
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomUsers, setRoomUsers] = useState([]);
  const PORT = 3000; 
  const socket = io(`http://localhost:${PORT}`);

  useEffect(() => {
    console.log(`Welcome to ${category} room, ${username}!`);
    socket.emit('joinRoom', { username, room: category });
  }, [username, category]);

  socket.on('message', (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  socket.on('roomUsers', (users) => {
    setRoomUsers(users.users);
  });

  const handleSendMessage = () => {
    socket.emit('chatMessage', newMessage);
    setNewMessage('');
    setMessages((prevMessages) => [...prevMessages, { text: newMessage, username }]);
  };

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', { username, room: category });
    navigate('/rooms', { replace: true });
  };

  return (
    <div className="bg-slate-700">
      <div className="h-screen flex-col justify-center items-center bg-black ">
      <header className="flex justify-between items-center py-4 px-6 bg-slate-600">
  <h1 className="text-2xl mb-10 font-bold text-white">{category} Room</h1>
  <button
    className="bg-white hover:bg-red-700 text-red-500 font-bold py-2 px-4 rounded-lg"
    onClick={handleLeaveRoom}
  >
    Leave Room
  </button>
</header>
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex-1 overflow-y-auto p-4">
          <ul className="list-none p-0 m-0">
          <p className="text-lg justify-center text-blue-800">Welcome, {username}!</p>
  {messages.map((message, index) => (
    <li key={index} className="py-2 px-4 w-52 border-gray-600">
      <div className="flex m-2 justify-between bg-gray-800 rounded-lg p-2">
        <div className="flex flex-col">
          <p className="text-sm  text-purple-500">{message.username}</p>
          <p className="text-sm text-white">{message.text}</p>
        </div>
        <p className="text-sm text-gray-500">{moment(message.time).format('h:mm a')}</p>
      </div>
    </li>
  ))}
</ul></div>
          <div className="fixed bottom-0 left-0 right-0 flex flex-row justify-between items-center p-4 m-8 mx-96 bg-gray-800 rounded-lg">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 pl-10 text-sm text-white bg-transparent border-none"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 m-4 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatRoom;