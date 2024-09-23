import React, { useState, useEffect } from 'react';
import bluenight from '../assets/bluenight.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = [
  { id: 1, name: 'Fashion' },
  { id: 2, name: 'Education' },
  { id: 3, name: 'Music' },
  { id: 4, name: 'Gaming' },
  { id: 5, name: 'Tech' },
  { id: 6, name: 'Art' },
  { id: 7, name: 'Sports' },
  { id: 8, name: 'Travel' },
  { id: 9, name: 'Food' },
  { id: 10, name: 'Business' },
  // Add more categories as needed
];

const Joinroom = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleJoinRoom = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:7777/api/profile/getProfile/${userId}`);
      const userData = response.data;
      setUsername(userData.username);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCategory && username) {
      navigate('/chatroom', {
        state: {
          username,
          category: selectedCategory.name,
        },
      });
    }
  }, [selectedCategory, username, navigate]);

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundImage: `url(${bluenight})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(0.5) contrast(1.2)', 
      }}
    >
      <h1 className="text-5xl font-bold p-8 text-white bg-slate-600 m-4">
        Welcome to Enawega!
      </h1>
      <p className="text-2xl">Join a room to start chatting!</p>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="p-4">
            <div
              className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${
                selectedCategory === category ? 'border-green-500 border-4' : ''
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </div>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleJoinRoom}
          >
            Join
          </button>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p> 2023 Enawega. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Joinroom;