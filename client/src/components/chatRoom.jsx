import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageList from '../markup/messageList';
import MessageInput from '../markup/messageInput';
import RoomHeader from '../markup/roomHeader';
import useSocket from './SocketHandler';

const ChatRoom = () => {
  const { state: { username, category } } = useLocation();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const { messages, sendMessage, leaveRoom } = useSocket(username, category);

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    navigate('/rooms');
  };

  return (
    <div className="bg-slate-700 h-screen flex flex-col">
      <RoomHeader category={category} handleLeaveRoom={handleLeaveRoom} />
      <main className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
      </main>
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatRoom;
