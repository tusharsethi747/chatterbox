import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Chat from './pages/Chat';
import Login from './pages/Login';
const App = () => {
  return (

    <Routes>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/' element={<Chat/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>

  )
}

export default App