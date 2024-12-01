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
    // Initialize socket connection
    const socketConnection = io('http://localhost:8888');
    setSocket(socketConnection);

    // Join the room with the specified username and category
    socketConnection.emit('joinRoom', { username, room: category });

    // Listen for new messages and update the message list
    socketConnection.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Load message history upon joining the room
    socketConnection.on('messages', (messageHistory) => {
      setMessages(messageHistory);
    });

    // Cleanup on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, [username, category]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      // Emit the new message to the server
      socket.emit('chatMessage', newMessage);
      setNewMessage('');
    }
  };

  const handleLeaveRoom = () => {
    // Notify the server when leaving the room
    if (socket) {
      socket.emit('leaveRoom');
    }
    // Navigate back to the room selection page
    navigate('/rooms');
  };

  return (
    <div className="bg-slate-700 h-screen flex flex-col">
      {/* Chat Room Header */}
      <header className="flex justify-between items-center py-4 px-6 bg-slate-600">
        <h1 className="text-2xl font-bold text-white">{category} Room</h1>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleLeaveRoom}
        >
          Leave Room
        </button>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4">
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
      </main>

      {/* Message Input */}
      <footer className="bg-gray-900 p-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 rounded-l"
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatRoom;
