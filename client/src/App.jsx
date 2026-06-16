import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Pricing from './pages/Pricing'
import Login from './components/Login'
import DashBoardPage from './pages/DashBoardPage'
import GeneratePage from './pages/GeneratePage'
import WebsiteEditor from './pages/WebsiteEditor'
import LivesitePage from './pages/LivesitePage'
import {Toaster} from 'react-hot-toast';
const App = () => {
  return (
    <div>
      <Toaster position='top-left'
      reverseOrder={false} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/dashboard' element={<DashBoardPage />} />
          <Route path='/generate' element={<GeneratePage />} />
          <Route path='/editor/:id' element={<WebsiteEditor />} />
          <Route path='/preview/:slug' element={<LivesitePage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      
    </div>
  )
}

export default App
