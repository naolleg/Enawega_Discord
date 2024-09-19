import React from 'react';

function ChatRoom() {
  return (
    <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <header className="flex justify-between mb-4">
        <h1 className="text-lg font-bold">
          <i className="fas fa-smile mr-2" />
          ChatCord
        </h1>
        <a id="leave-btn" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Leave Room
        </a>
      </header>
      <main className="flex">
        <div className="w-1/3 bg-gray-100 p-4">
          <h3 className="text-sm font-bold mb-2">
            <i className="fas fa-comments mr-2" />
            Room Name:
          </h3>
          <h2 id="room-name" className="text-lg font-bold mb-4"></h2>
          <h3 className="text-sm font-bold mb-2">
            <i className="fas fa-users mr-2" />
            Users
          </h3>
          <ul id="users" className="list-none mb-4"></ul>
        </div>
        <div className="w-2/3 p-4"></div>
      </main>
      <div className="mt-4">
        <form id="chat-form" className="flex">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autocomplete="off"
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <i className="fas fa-paper-plane mr-2" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;