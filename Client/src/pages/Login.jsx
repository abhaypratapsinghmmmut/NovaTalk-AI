import React from 'react'
import {FcGoogle} from 'react-icons/fc'
// import {HiOutlineMicrophone , HiOutlineSparkles , HiOutlineCodeBracket , HiOutlineBolt} from 'react-icons/hi'
import {
  HiOutlineMicrophone,
  HiOutlineSparkles,
  HiOutlineCodeBracket,
  HiBolt,
} from 'react-icons/hi2'


const Login = () => {

    const FEATURES = [
                    {
                        icon: <HiOutlineMicrophone />,
                        title: "Voice AI",
                        desc: "Natural real-time voice conversations.",
                    },

                    {
                        icon: <HiOutlineSparkles />,
                        title: "Smart Navigation",
                        desc: "Navigate pages using voice commands.",
                    },

                    {
                        icon: <HiOutlineCodeBracket />,
                        title: "Easy Embed",
                        desc: "Add assistant using one script tag.",
                    },

                    {
                        icon: <HiBolt />,
                        title: "Fast Responses",
                        desc: "Optimized Gemini AI responses.",
                    },
                    ];

  return (
    <div className='h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50 overflow-hidden flex items-center'>
        <div className='max-w-7xl mx-auto px-6 py-16 lg:py-24'>

            <div className='grid lg:grid-cols-2 gap-16 items-center'>

            {/* left */}
            <div>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-100 text-purple-600 text-sm font-medium'>
                    AI Voice Assistant Platform
                </div>

                <h1 className='mt-8 text-5xl lg:text-7xl font-black leading-tight text-[#081028]'>
                    Build AI Assistants

                    <span className='block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500'>
                        For Any Website
                    </span>
                </h1>

                <p className='mt-8 text-lg text-[#475569] leading-8 max-w-2xl'>
                    Create customizable AI voice assistants that talk,
                    guide users, and integrate into any website instantly.
                </p>

                <button className='mt-10 h-16 px-8 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-lg font-semibold flex items-center gap-4 shadow-[0_20px_80px_rgba(139,92,246,0.25)] hover:scale-[1.02] transition cursor-pointer'>
                <FcGoogle className='text-3xl bg-white rounded-full' />
                    Continue with Google
                </button>

                <p className='mt-4 text-sm text-[#64748b]'>
                    Free plan includes 200 AI responses
                </p>
            </div>

            {/* right */}
            <div className='grid sm:grid-cols-2 gap-6'>
                {FEATURES.map((feature, index) => (
                    <div
                    key={index}
                    className='p-6 rounded-3xl bg-white/70 backdrop-blur border border-white shadow-lg hover:-translate-y-1 transition'
                    >
                    <div className='w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white flex items-center justify-center text-2xl'>
                        {feature.icon}
                    </div>

                    <h3 className='mt-6 text-xl font-bold text-[#081028]'>
                        {feature.title}
                    </h3>

                    <p className='mt-3 text-[#475569] leading-7'>
                        {feature.desc}
                    </p>
                    </div>
                ))}
            </div>

            </div>

        </div>
    </div>
  )
}

export default Login