import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Joinroom from './components/joinroom';
import Login from './components/login';
import ChatRoom from './components/chatRoom';
import Signup from './components/signup';

function App() {

  return (
  
      <BrowserRouter>
      <Routes>
      <Route path="/rooms" element={<Joinroom />} />
      <Route path="/chatroom" element={<ChatRoom />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
      </BrowserRouter>

  )
}

export default App
