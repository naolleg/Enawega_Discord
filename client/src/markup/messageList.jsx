import React from 'react';
import moment from 'moment';

const MessageList = ({ messages, username }) => {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="space-y-4">
        {messages.map((message, index) => {
          // Check if the message is from Enawega Bot
          const isBot = message.username === 'Enawega Bot';
          const isCurrentUser = message.username === username;

          return (
            <div key={index} className={`flex items-start ${isCurrentUser ? 'justify-end' : 'justify-start'} space-x-4`}>
              {/* Avatar */}
              <div className={` w-10 h-10 rounded-full ${isBot ? 'bg-gray-400' : isCurrentUser ? 'bg-blue-600' : 'bg-gray-600'}`}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(message.username)}&background=random&color=fff`}
                  alt={message.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Message Bubble */}
              <div className={`flex-1 p-2 rounded-lg ${isBot ? 'bg-gray-300 text-black' : isCurrentUser ? 'bg-blue-600 text-white ml-10' : 'bg-gray-800 text-white mr-2'}`}>
                <div className="flex justify-between items-center">
                  {/* Username */}
                  <strong className="text-sm font-medium text-purple-400">{message.username}</strong>

                  {/* Timestamp */}
                  <small className="text-xs text-gray-400">{moment(message.time).fromNow()}</small>
                </div>
                <p className="mt-1 text-lg">{message.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;
