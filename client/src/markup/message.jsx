// /src/components/Message.jsx
import React, { useState } from 'react';

const Message = ({ message, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => setShowOptions(true);
  const handleMouseLeave = () => setShowOptions(false);

  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent default context menu
    setShowOptions(true);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleRightClick}
      className="relative bg-gray-800 text-white p-4 my-2 rounded-md shadow-md"
    >
      <p>
        <strong>{message.username}:</strong> {message.text}
      </p>
      <small className="text-gray-400 text-xs">
        {new Date(message.time).toLocaleTimeString()}
      </small>

      {/* Options for Edit/Delete */}
      {showOptions && (
        <div className="absolute top-0 right-0 bg-gray-700 text-sm p-2 rounded-md shadow-lg">
          <button
            onClick={() => onEdit(message)}
            className="block text-blue-400 hover:underline mb-1"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(message.id)}
            className="block text-red-400 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;
