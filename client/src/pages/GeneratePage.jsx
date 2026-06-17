import React from 'react'
import { ArrowLeft,MoveUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUserData } from '../redux/userSlice';
const PHASES=[
    "Analyzing your prompt",
    "Generating website structure",
    "Designing the layout",
    "writing code",
    "Adding content and images",
    "Finalizing your website"
]
const GeneratePage = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [prompt,setPrompt]=useState('');
    const [loading,setLoading]=useState(false);
    const [progress,setProgress]=useState(0);
    const [phaseIndex,setPhaseIndex]=useState(0);
    const [error,setError]=useState('');
    const {userData}=useSelector((state)=>state.user);
    const handleGenerateWebsite=async()=>{
        try{
                setLoading(true);
                const res=await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/website/generate`,{prompt},{withCredentials:true});
                setPrompt('');
                setProgress(100);
               dispatch(setUserData({...userData,credits:res.data.remainingCredits}));
               navigate(`/editor/${res.data.websiteId}`);
                
        }catch(err){
               
               setError(err.message || 'Failed to generate website');
               toast.error('Failed to generate website');
        }finally{
                setLoading(false);
        }
    }
   useEffect(()=>{
   if(!loading){
       setPhaseIndex(0);
       setProgress(0);
       return;
   }
    let value=0;  {/*Represents the current progress value*/}
    let phase=0;   {/*Represents the current phase index*/}
    const interval=setInterval(()=>{
        const increment=value<20 ? Math.random()*1.5:value<50 ? Math.random()*1.2 : Math.random()*0.6;{ /*Adjust increment based on progress*/}
        value+=increment;
        if(value>=93){
            value=93;
           
        }
        phase=Math.floor((value/100)*PHASES.length); {/*Determine phase based on progress*/}
        setProgress(value);
        setPhaseIndex(phase);
     },1200)
     return()=>clearInterval(interval);
    }
    ,[loading])

  return (
    <div className='relative min-h-screen  bg-[#050505] text-white overflow-hidden
    
    '>
        {/*light-effect*/}
        <div className='pointer-events-none absolute inset-0'>
            {/*bead*/}
            <div className='absolute top-0 left-1/2 w-100 h-100 -translate-x-1/2 bg-linear-to-b from-white/20 via-white/10 to-transparent   blur-3xl opacity-40 animate-pulse' />

             {/*center*/}
             <div className='absolute top-0 left-1/2 transform -translate-x-1/2  w-64 h-64  from-white/20 bg-white/10 rounded-full  blur-[100px] opacity-70 ' />

        </div>
        {/*header*/}
        <div className=' sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10 '>
            <div className='max-w-7xl mx-auto px-6 py-4 h-16  flex items-center '>
                <div className='flex items-center gap-4'>
                   <button onClick={() => navigate(-1)}
                    className='flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <h1 className='text-lg font-semibold'>InstantWeb</h1>
                </div>
            </div>
        </div>
        <div className='max-w-6xl mx-auto px-6 py-16 relative z-10'>
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center mb-16'
           ><h1 className='text-4xl md:text-5xl font-bold mb-5 leading-tight'
           >Design at the 
           <span className='block bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent'> Speed of AI</span>
          
           </h1>
            <p className='max-w-2xl mx-auto text-zinc-400'>
              Transform your ideas into stunning websites with the power of AI
            </p>
           </motion.div>
           <div className='mb-10'>
            <div className='relative'>
              <textarea 
                placeholder='Describe your website...' 
                className='w-full h-40 bg-white/5 rounded-lg p-4 text-sm focus:outline-none resize-none leading-relaxed focus:ring-2 focus:ring-white/20' 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button 
                onClick={handleGenerateWebsite}
                disabled={loading|| !prompt.trim()}
                className={`absolute bottom-4 right-4
                    ${loading || !prompt.trim() ? 'cursor-not-allowed opacity-50' : 'hover:bg-white hover:text-black'}
                 hover:text-black hover:bg-white text-gray-300 py-3 px-3 rounded-full transition text-sm`}
              >
                <MoveUp size={16} />
              </button>
            </div>
            {error &&(
                <p className='mt-2 text-red-500 text-sm'>{error}</p>
            )}
            {loading &&(
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                 className='max-w-xl mx-auto mt-12'>
                    <div className='flex justify-between mb-2 text-xs text-zinc-400'>
                        <span> {PHASES[phaseIndex]}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className='w-full h-3 bg-white/10 rounded-full overflow-hidden'>
                    <motion.div 
                        className='w-full h-full bg-linear-to-r from-white to-zinc-300 '
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                    />

                    </div>
                    <div className='text-xs text-center text-zinc-400 mt-2'>
                        This may take a few minutes...<span className='text-white font-medium'> {Math.round((100 - progress) / 2)} seconds remaining</span>
                    </div>
                </motion.div>
            )}
           </div>
        </div>
    </div>
  )
}

export default GeneratePage