import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = io(); // Initialize the socket.io client

    // Listen for new messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Disconnect from the socket.io server
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    // Send the new message to the server
    socket.emit('chatMessage', newMessage);
    setNewMessage('');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Chat Room</h1>
      <ul className="list-none mb-4">
        {messages.map((message, index) => (
          <li key={index} className="py-2">
            <span className="text-gray-600">{message.username}:</span> {message.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="w-full p-2 pl-10 text-sm text-gray-700"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;