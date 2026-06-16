import React from 'react'
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
const LivesitePage = () => {
    const [html, setHtml] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const slug=window.location.pathname.split('/preview/')[1]; //get the slug from the URL
    
    

    useEffect(()=>{
        const handleGetWebsite=async()=>{
            try{
                setLoading(true);
                const res=await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/preview/${slug}`,{withCredentials:true});
                
                setHtml(res.data.latestCode);
                
                

            }catch(err){
                setError('Failed to load the website');
                console.log(err.response?.data?.message || err.message);
            }finally{
                setLoading(false);
        }
        }
        handleGetWebsite();
    },[])

      

    if(loading){
        return <div className='h-screen flex items-center justify-center text-zinc-700 animate-pulse'>Loading...</div>
    }
    if(error){
        return <div className='h-screen flex items-center justify-center text-red-400 bg-red-100'>{error}</div>
    }
  return (
    <iframe
    title='Live Site Preview'
     srcDoc={html} className='w-screen h-screen border-none' 
     sandbox='allow-scripts  allow-forms'
     />
  )
}

export default LivesitePage