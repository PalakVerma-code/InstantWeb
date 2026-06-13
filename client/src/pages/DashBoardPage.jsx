import { ArrowLeft } from 'lucide-react';
import React from 'react'
import {useNavigate} from 'react-router-dom'
const DashBoardPage = () => {
  const navigate=useNavigate();
  
  return (
    <div className='min-h-screen  bg-[#050505] text-white'>
     <div className=' sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10 '>
      <div className='max-w-7xl mx-auto px-6 py-4 h-16  flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button onClick={()=>navigate('/')}
            className='flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className='text-2xl font-bold ml-4'>Dashboard</h1>
        </div>
           <button onClick={()=>navigate('/generate')} className='bg-indigo-400 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition text-sm'>
            + New Item
          </button>

      </div>

      </div>
      
     </div>
    
  )
}

export default DashBoardPage