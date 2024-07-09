import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import AdminLogin from './pages/AdminLogin'
import { useSelector } from 'react-redux'
function App() {
   const {isLoggedIn} =useSelector((state)=>state.auth);
  return (
    <Routes>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/register' element={<UserRegister/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
    

    </Routes>
  )
}

export default App
