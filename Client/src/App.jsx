import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/register' element={<UserRegister/>}/>

    </Routes>
  )
}

export default App
