import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate=useNavigate()
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      <img src={assets.marvelLogo} alt="" className="max-h-11 mt-20" />

      <h1 className="text-5xl md:text-[70px] md:leading-[72px] font-semibold max-w-[700px]">
        Guardians <br /> of the Galaxy
      </h1>

      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi</span>

        <div className="flex items-center gap-1">
          <CalendarIcon className="w-[18px] h-[18px]" /> 2025
        </div>

        <div className="flex items-center gap-1">
          <ClockIcon className="w-[18px] h-[18px]" /> 2 hr 8m
        </div>
      </div>
      <p className='max-w-md text-gray-300'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
     <button 
  onClick={() => navigate('/movies')}
  className="flex items-center gap-1 px-6 py-2 font-medium cursor-pointer 
             bg-red-500 hover:bg-red-600 text-white rounded-full"
>
  Explore Movies
  <ArrowRight className="w-5 h-5"/>
</button>
    </div>
  )
}

export default HeroSection
