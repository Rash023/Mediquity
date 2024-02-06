import React from 'react'
import './Home.css'
import Provide from './Provide'
import ServicesFeatures from './ServicesFeatures'
import OurDoctor from './OurDoctor'
import BookAppointment from './BookAppointment'
import Conclusion from './Conclusion'
import ScandPrediction from './ScanPrediction'
import OurBlogs from './OurBlogs'
// import Navbar from '../Common/Navbar'

import Footer from '../Common/Footer'
import { Navbar } from './Navbar'
import ServiceCard from './ServiceCard'
import { HeroSection } from './HeroSection'
import ProvideCard from './ProvideCard'
import ScanPredictionCard from './ScanPredictionCard'
import { GeminiEffect } from './GeminiEffect'
import Blog from './Blog'




export const Home = () => {
  return (
    // <div className='home-bg-container'>
    //   <Navbar/>
    //   <HeroSection/>
    //   <Provide/>
    //   <ServicesFeatures/>
    //   <OurDoctor/>
    //   <BookAppointment/>
    //   <ScandPrediction/>
    //   <OurBlogs/>
    //   <Conclusion/>
    //   <Footer/>
    // </div>
    <>
      <Navbar className='' />
      <div>
        <div className="h-fit-content  dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center font-sans">

          <HeroSection />
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <ServiceCard />
          <ProvideCard/>
          <GeminiEffect/>
          <ScanPredictionCard/>
          <Blog />

        </div>
      </div>
    </>
  )
}
