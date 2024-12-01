import React from 'react';
import moment from 'moment';

const MessageList = ({ messages }) => {
  return (
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
  );
};

export default MessageList;
