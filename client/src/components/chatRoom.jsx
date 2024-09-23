import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ChatRoom = () => {
  const location = useLocation();
  const { username, category } = location.state;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log(`Welcome to ${category} room, ${username}!`);
  }, [username, category]);

  const handleSendMessage = () => {
    // Add logic to send the message to the server or database
    console.log(`Sending message: ${newMessage}`);
    setNewMessage('');
  };

  return (
    <div className="bg-slate-700">
    <div className="h-screen flex-col justify-center items-center bg-black w-64">
      <header className=" justify-between items-center py-4 px-6 bg-slate-600">
        <h1 className="text-2xl mb-10 font-bold text-white">{category} Room</h1>
        <p className="text-lg text-white">Welcome, {username}!</p>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="list-none p-0 m-0">
            {messages.map((message, index) => (
              <li key={index} className="py-2 px-4 border-b border-gray-600">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-white">{message}</p>
                  <p className="text-xs text-gray-400">{/* timestamp */}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex flex-row justify-between items-center p-4 m-8 mx-96  bg-gray-800 rounded-lg">
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type a message..."
    className="w-full p-2 pl-10 text-sm text-white bg-transparent border-none"
  />
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
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