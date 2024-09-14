import React, { useState } from 'react';
import ChatRoom from './chatRoom';
import bluenight from '../assets/bluenight.jpeg'
const Joinroom = () => {
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState(['General', 'Tech', 'Gaming', 'Music']); // Add more rooms as needed

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleJoinRoom = () => {

    console.log(`Joining room: ${room}`);
  };

  return (
    
    <div className="h-screen flex flex-col justify-center items-center"style={{ fontFamily: 'Arial, sans-serif',
      backgroundImage: `url(${bluenight})`, // Set the background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <h1 className="text-5xl font-bold p-8 text-white bg-slate-600 m-4 ">Welcome to Enawega! !</h1>
      <p className="text-2xl">Join a room to start chatting!</p>
      <select className='p-2 m-2' value={room} onChange={handleRoomChange}>
        {rooms.map((room) => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
      </select>
  
    </div>
  );
};

export default Joinroom;