import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Pricing from './pages/Pricing'
import Login from './components/Login'
import DashBoardPage from './pages/DashBoardPage'
const App = () => {
  return (
    <div>
      
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/dashboard' element={<DashBoardPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      
    </div>
  )
}

export default App
