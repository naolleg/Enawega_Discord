import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Joinroom from './components/joinroom';


function App() {

  return (
  
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Joinroom />} />
      </Routes>
      </BrowserRouter>

  )
}

export default App
