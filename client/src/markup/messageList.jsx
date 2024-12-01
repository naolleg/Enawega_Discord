import React from 'react';
import moment from 'moment';

const MessageList = ({ messages, username }) => {
  console.log('Current Username:', username); // Debug log for the username passed
  return (<div className='m-32'>
    <div className="flex flex-col space-y-1">
      {messages.map((message, index) => {
        console.log('Message Username:', message.username); // Debug log for the message username
        // Check if the message is from Enawega Bot
        const isBot = message.username === 'Enawega Bot';

        return (
          <div
            key={index}
            className={`p-3 my-1 rounded-lg max-w-[40%] ${
              isBot
                ? ' text-gray-300 mx-auto text-center' // Bot's message styled differently
                : message.username === username
                ? 'bg-blue-600 text-white ml-auto rounded-l-lg' // Current user's message on the right with blue
                : 'bg-gray-800 text-white mr-auto rounded-r-lg' // Other user's message on the left with gray
            }`}
          >
            <p>
              <strong className="text-purple-400">{message.username}:</strong> {message.text}
            </p>
            <small className="text-gray-400">{moment(message.time).format('h:mm a')}</small>
          </div>
        );
      })}
    </div></div>
  );
};

export default MessageList;
