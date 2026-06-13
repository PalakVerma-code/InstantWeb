import React from 'react'
import axios from 'axios'
import {motion} from 'motion/react'
import {useDispatch} from 'react-redux'
import {X,WandSparkles} from 'lucide-react'
import {signInWithPopup} from 'firebase/auth'
import {auth,provider} from '/firebase.js'
import {setUserData} from '../redux/userSlice.js'
const Login = ({open,onClose}) => {
    const dispatch=useDispatch();
    const handleGoodleAuth=async()=>{
       try{
        {/* Sign in with Google using a popup */}
        const result=await signInWithPopup(auth,provider);
        
        const {data}=await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/google`,{
            name:result.user.displayName,
            email:result.user.email,
            avatar:result.user.photoURL
         },{withCredentials:true
        });

        dispatch(setUserData(data));
       }catch(error){
        console.error("Google Sign-In Error:",error);
    }
}
  return (
    <div>
     {open && (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            onClick={onClose}
            
        className='fixed inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center z-100 px-4'
        >
            <motion.div
                initial={{scale:0.8,opacity:0,y:60}}
                animate={{scale:1,opacity:1}}
                exit={{scale:0.8,opacity:0,y:60}}
                transition={{duration:0.3,ease:"easeInOut"}}
                
             className='relative w-full max-w-md p-px rounded-3xl bg-linear-to-br from-blue-500/50 via-blue-500/30  to-transparent'>
               <div className='relative rounded-3xl bg-black/50 border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.5)] overflow-hidden'>
               {/*glow background */}
                 <div
                 className='absolute -top-32 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-[140px]'/>
                    <div
                 className='absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-[140px]'/>

                 <button className='absolute top-5 right-5 z-20 text-zinc-400 cursor-pointer hover:text-white transition-colors' onClick={onClose}>
                    <X size={20} />
                 </button>
                 <div className='relative px-8 pt-14 pb-10  text-center'>
                    <div className='inline-flex items-center justify-center mb-8 gap-2 px-4 py-2 border border-white/10 bg-white/5 rounded-full backdrop-blur'>
                    <WandSparkles size={16} className='text-yellow-400' />
                        <span className='text-sm text-white'>Create Amazing AI Content</span>
                    </div>
                    <h2 className='text-3xl font-semiboldleading-tight mb-3 space-x-2 text-white'>
                        Welcome to {" "}
                        <span className='bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent'>InstantWeb</span>

                    </h2>
                    <motion.button
                    onClick={handleGoodleAuth}
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    className='relative group w-full h-13 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden'>
                         <div className='relative  flex items-center justify-center gap-3'>
                            <img className='h-10 w-10' src="https://static.vecteezy.com/system/resources/thumbnails/042/165/816/small_2x/google-logo-transparent-free-png.png" alt="" />
                        Continue with Google
                         </div>
                    </motion.button>
                    <div className='flex items-center gap-4 my-10'>
                          <div className='h-px flex-1 bg-white/20'/>
                          <span className='text-xs tracking-tight text-zinc-400'>Secure Login</span>
                          <div className='h-px flex-1 bg-white/20'/>
                    </div>
                    <p className='text-xs text-zinc-400'>
                        By continuing, you agree to our <span className='underline cursor-pointer hover:text-white'>Terms of Service  </span><span className='underline cursor-pointer hover:text-white'>Privacy Policy</span>.
                    </p>
                 </div>
                 
               </div>
            </motion.div>

        </motion.div>
     )}
    </div>
  )
}

export default Login