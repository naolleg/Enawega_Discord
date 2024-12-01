import React from 'react';

const RoomHeader = ({ category, handleLeaveRoom }) => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-slate-600">
      <h1 className="text-2xl font-bold text-white">{category} Room</h1>
      <button
        className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleLeaveRoom}
      >
        Leave Room
      </button>
    </header>
  );
};

export default RoomHeader;
