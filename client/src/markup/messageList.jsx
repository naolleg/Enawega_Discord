// /src/components/MessageList.jsx
import React from 'react';
import Message from './message';

const MessageList = ({ messages, onEdit, onDelete }) => {
  return (
    <div id="messages" className="space-y-2">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          message={msg}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MessageList;
