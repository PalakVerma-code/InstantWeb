import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'motion/react'
import {HandCoins} from 'lucide-react'
import Login from './Login'
const Navbar = () => {
  const navigate=useNavigate();
  const [openLog,setOpenLog]=useState(false);
  let userData=false;
  return (
    <>
   <motion.div 
   initial={{y:-40,opacity:0}}
   animate={{y:0,opacity:1}}
   transition={{duration:0.5}}
   className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/6'>
   <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
     {/* Logo */}
       <div className='flex items-center gap-2 cursor-pointer bg-white/5 p-2 px-4 rounded-2xl border border-zinc-600 '>
          <img src="favicon.svg" alt="Logo" className='h-8 w-auto' />
          <span className='font-semibold text-lg bg-linear-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent'> InstantWeb</span>
       </div>
     {/* right side */}
     <div className='flex items-center gap-5'>
        <button onClick={() => navigate('/pricing')} className='hidden md:block text-sm text-zinc-400 hover:text-white transition-colors'>Pricing</button>
         {/*credits */}
         {userData && (
          <div className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border-white/10 text-sm cursor-pointer hover:bg-white/10 transition-colors'>
              <HandCoins size={20} className='text-yellow-400' />
              <span className='text-white font-semibold ml-2'>100</span>
             <span className='text-zinc-200'>Credits</span>
             <span className='text-green-400'>+</span>
            </div>

         )}
         {/* profile  or login button */}
         {userData ?(
         <div className='relative'>
          <button className='flex items-center'>
             <img src="https://ui-avatars.com/api/?name=palak+verma" alt="Profile" className='h-8 w-8 rounded-full cursor-pointer border-white/10 object-cover hover:scale-105 transition-transform' />
          </button>
           
         </div>
         ):(
          
            <button onClick={() => setOpenLog(true)} className='px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm hover:from-blue-600 hover:to-blue-700 transition-colors'>Login</button>
          

         )}
     </div>

       </div>

   </motion.div>
   {openLog && (
    <Login open={openLog} onClose={() => setOpenLog(false)} />
   )}

    </>
  )
}

export default Navbar
