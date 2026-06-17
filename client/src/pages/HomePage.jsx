import React from 'react'
import Navbar from '../components/Navbar'
import { WandSparkles ,Zap,Download,TabletSmartphone} from 'lucide-react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {motion} from 'motion/react'
const HomePage = () => {
  
  const {userData}=useSelector((state)=>state.user)
  return (
    <>
    <Navbar />
    <section className='relative min-h-screen bg-[#050505] text-white overflow-hidden'>
      {/*glow background*/}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-40 left-40 w-125 h-125 bg-blue-500/20 rounded-full blur-[140px]'>

        </div>
        <div className='absolute -bottom-40 right-40 w-125 h-125 bg-indigo-600/20 rounded-full blur-[140px]'></div>

      </div>
      {/*grid background*/}
      <div className='absolute inset-0 bg-grid-pattern opacity-20' 
      style={{backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 2px, transparent 2px)",
        backgroundSize:"20px 20px"
      }}
      ></div>
      {/*content */}
      <div className='relative z-10 max-w-7xl mx-auto items-center justify-center text-center px-6 pt-32 '>
       {/*badge */}
       <motion.div
       initial={{y:-20,opacity:0}}
       animate={{y:0,opacity:1}}
       transition={{duration:0.5}}
       className='inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 rounded-full mb-8 '>
        <WandSparkles size={16} className='text-yellow-400' />
        <span className='font-medium'>Create Amazing AI Content</span>
       </motion.div>
       {/*heading */
       }
       < motion.h1 
       initial={{y:20,opacity:0}}
       animate={{y:0,opacity:1}}
       transition={{duration:0.5,delay:0.2}}
       className='text-5xl md:text-7xl font-bold leading-tight'>Create Your Own 
        <br/>
        <span className=' bg-linear-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent'>Applications with AI</span>

       </motion.h1>
       {/*description */}
       <motion.p
        initial={{y:20,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.5,delay:0.4}}
        className='text-lg text-zinc-400 max-w-2xl mx-auto mt-6'
       >
        Generate AI content like images, text, code and more with our easy-to-use platform. Build your own AI applications in minutes without any coding knowledge.
       </motion.p>
       {/*cta buttons */}
       <motion.div
        initial={{y:20,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.5,delay:0.6}}
        className='flex flex-col sm:flex-row  justify-center gap-4 mt-10'
       >
        <button 
        
        className='flex items-center justify-center px-6 py-3 bg-linear-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-colors'>
          Get Started
        </button>
        <button className='px-6 py-3 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors'>
          View Demo
        </button>
       </motion.div>
       {/*featured cards */}
       <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-16'>
          <div className='bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-500 transition-colors'>
           <Zap size={32} className='text-blue-400 mb-4' />
           <h3 className='text-xl font-semibold mb-2'>AI Image Generator</h3>
           <p className=' text-sm text-zinc-400'>Create stunning images from text prompts using our powerful AI model.</p>
          </div>
           <div className='bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-500 transition-colors'>
           <TabletSmartphone size={32} className='text-blue-400 mb-4' />
           <h3 className='text-xl font-semibold mb-2'>Responsive Design</h3>
           <p className=' text-sm text-zinc-400'>Build applications that look great on any device with our responsive design capabilities.</p>
          </div>
           <div className='bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-500 transition-colors'>
           <Download size={32} className='text-blue-400 mb-4' />
           <h3 className='text-xl font-semibold mb-2'>Export Code</h3>
           <p className='text-sm text-zinc-400'>Easily export your AI-generated content as code for further customization.</p>
          </div>
       </div>

      </div>
    </section>
    </>
  )
}

export default HomePage