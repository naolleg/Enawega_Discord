import React from 'react';

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage }) => {
  // Handle key press to send message on 'Enter'
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      handleSendMessage();
    }
  };

  return (
    <footer className="bg-gray-900 p-4 flex items-center">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress} // Trigger send on 'Enter'
        className="w-3/4 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
      />
      <button
        className="ml-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={handleSendMessage}
      >send
        <i className="fas fa-paper-plane"></i> 
      </button>
    </footer>
  );
};

export default MessageInput;
