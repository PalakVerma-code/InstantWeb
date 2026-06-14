import { ArrowLeft } from 'lucide-react';
import React from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const DashBoardPage = () => {
  const navigate=useNavigate();
  const handleGetAllWebsite=async(id)=>{
    try{
      const res=await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/getAll`,{withCredentials:true});


    }catch(err){
      console.error("Get All Website Error:",err);
    }
  }
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