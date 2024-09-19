import React, { useState } from 'react';
import logo from '../assets/Enawega.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const userData = { username, email, phoneNumber, password, avatar };
    // Call API to create new user
    console.log(userData);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-[#23272E] to-[#101975] flex justify-center items-center">
      <img src={logo} alt="Enawega Logo" className="weight-84 mr-60 mb-4 hieght-84" /> 
      <div className="container w-96 bg-[#5b6888]  p-8 shadow-2xl">
          <h1 className="text-3xl font-bold mb-4 text-white">Sign Up</h1>
          <form className="px-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#B9BBBE] text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#B9BBBE] leading-tight focus:outline-none focus:shadow-outline bg-[#2F3136]"
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#B9BBBE] text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#B9BBBE] leading-tight focus:outline-none focus:shadow-outline bg-[#2F3136]"
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="abebemola@example.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#B9BBBE] text-sm font-bold mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#B9BBBE] leading-tight focus:outline-none focus:shadow-outline bg-[#2F3136]"
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="+234 812 345 6789"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#B9BBBE] text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#B9BBBE] leading-tight focus:outline-none focus:shadow-outline bg-[#2F3136]"
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#B9BBBE] text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#B9BBBE] leading-tight focus:outline-none focus:shadow-outline bg-[#2F3136]"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="********"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#B9BBBE] text-sm font-bold mb-2" htmlFor="avatar">
                Choose Avatar
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#B9BBBE] leading-tight focus:outline-none focus:shadow-outline bg-[#2F3136]"
                id="avatar"
                type="file"
                value={avatar}
                onChange={(event) => setAvatar(event.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-gradient-to-r from-[#5865F2] to-[#3A45B3] hover:bg-gradient-to-r from-[#4752C4] to-[#3A45B3] text-white font-bold py-2 px-4 rounded mb-4"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-2 text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
  
  );
};

export default Signup;