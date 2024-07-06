import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import UserLogin from './pages/LoginPages/UserLogin'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/login' element={<UserLogin/>}/>
    </Routes>
  )
}

export default App
