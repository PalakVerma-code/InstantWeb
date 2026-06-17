import { ArrowLeft, RocketIcon,Check,Share, Copy } from 'lucide-react';
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
const DashBoardPage = () => {
  const navigate = useNavigate();
  const {userData}=useSelector((state)=>state.user)
  const [loading, setLoading] = useState(false);
  const [websites, setWebsites] = useState(null);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(()=>{
    let isMounted = true; // Flag to track if the component is still mounted
     const handleGetAllWebsite = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/getAll`, { withCredentials: true });
      if(isMounted){
      setWebsites(res.data);}
     
    } catch (err) {
      
      toast.error('Failed to fetch websites. Please try again later.');
      setError('Failed to fetch websites');
    } finally {
      setLoading(false);
    }
  }
  handleGetAllWebsite();
  return () => {
        isMounted = false; // Page leave karte hi stop stream
    };
  },[])


    const handleDeploy=async(id)=>{
         try{
        
          const response=await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/website/deploy/${id}`,{},{withCredentials:true});
         
          window.open(`${response.data.url}`,'_blank'); {/*open the deployed website in a new tab */}
          setWebsites((prevWebsites)=>prevWebsites.map((w)=>w._id===id ? {...w,deployed:true,deploymentUrl:response.data.url}:w)); {/*update the deployed status in the UI */}
            toast.success('Website deployed successfully!');
        
         }catch(err){
       
          console.error(err.response?.data?.message || err.message);
          toast.error('Failed to deploy website.');

         }
  }
  const handleCopyLink=async(site)=>{
    await navigator.clipboard.writeText(site.deploymentUrl);
    setCopiedId(site._id);
    setTimeout(()=>{
      setCopiedId(null);
    },2000)
    toast.success('Link copied to clipboard!');
  }

  return (
    <div className='min-h-screen  bg-[#050505] text-white'>
      <div className=' sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10 '>
        <div className='max-w-7xl mx-auto px-6 py-4 h-16  flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button onClick={() => navigate('/')}
              className='flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className='text-2xl font-bold ml-4'>Dashboard</h1>
          </div>
          <button onClick={() => navigate('/generate')} className='bg-indigo-400 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition text-sm'>
            + New Item
          </button>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-6 py-8'>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          
           className='mb-10'>
             <p className='text-sm text-zinc-400 mb-1'>Welcome to your Dashboard</p>
             <h1 className='text-3xl font-bold'>{userData?.name}</h1>
            </motion.div> 
            {loading && <div className='text-center text-zinc-400'>Loading...</div>}
            {error && <div className='mt-24 text-center text-red-400'>{error}</div>}
            {websites?.length===0&& <div className='mt-24 text-center text-zinc-400'>
              you have not created any website yet. Click on "New Item" to generate your first website.
            </div>}
            {websites?.length>0 && 
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
                {websites.map((w,i)=>{
                   const copied=copiedId===w._id
                   return <motion.div
                   key={w._id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i*0.1 }}
                   whileHover={{ y: -5 }}
                    onClick={()=>navigate(`/editor/${w._id}`)}
                    className='bg-white/5  rounded-2xl overflow-hidden  border border-white/10 hover:bg-white/10 transition flex flex-col '>
                     <div className='relative h-40 bg-black cursor-pointer'>
                      <iframe srcDoc={w.latestCode} className='absolute inset-0 w-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white ' />
                      <div className='absolute inset-0 bg-black/50 '/>
                     </div>
                     <div className='p-5 flex flex-col gap-4 flex-1'>
                       <h3 className='text-base font-semibold line-clamp-2'>{w.title}</h3>
                       <p>Last updated {""}
                        {new Date(w.updatedAt).toLocaleDateString('en-US',{
                          month:'short',
                          day:'numeric',
                          year:'numeric',
                        })}
                       </p>
                       {!w.deployed ? (
                        <button 

                        onClick={()=>{ handleDeploy(w._id)}}
                        className='mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-linear-to-r from-indigo-400 to-purple-400 text-white hover:opacity-90 transition'>
                          <RocketIcon size={16} className='animate-pulse' />
                          Deploy
                        </button>
                       ):(
                        <motion.button
                        onClick={(e)=>{
                          e.stopPropagation();
                         handleCopyLink(w)
                           {/*prevent navigating to editor when clicking the copy button */}
                        }}
                        whileTap={{ scale: 0.95 }}

                        className={`mt-auto  flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${copied ? 'bg-green-700 text-white' : 'bg-white/5 text-zinc-200 hover:bg-white/10'}`}>

                          {copied ?<><Check size={16} /> Link copied</>  : <><Copy size={16} />Copy link</>}
                          
                        </motion.button>
                       )}
                     </div>
                   </motion.div>
                })}

              </div>
              }
      </div>

    </div>

  )
}

export default DashBoardPage