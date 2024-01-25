import { Route, Routes } from 'react-router-dom'
import './App.css'
import Join from './pages/Join'
import Home from './pages/Home'
import io from 'socket.io-client';
const socket = io.connect('https://chat-app-server-2-ekv0.onrender.com'); // Replace with your server URL



function App() {

  return (
    <>
    <Routes>
      <Route path={'/'} element={<Join socket={socket}/>}/>
      <Route path={'/main'} element={<Home socket={socket}/>}/>
    </Routes>
    </>
  )
}

export default App
