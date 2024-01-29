import React from 'react'
import './Home.css'
import Provide from './Provide'
import ServicesFeatures from './ServicesFeatures'
import OurDoctor from './OurDoctor'
import BookAppointment from './BookAppointment'
import Conclusion from './Conclusion'
import ScandPrediction from './ScanPrediction'
import OurBlogs from './OurBlogs'
import Navbar from '../Common/Navbar'
import HeroSection from './HeroSection'
import Footer from '../Common/Footer'

export const Home = () => {
  return (
    <div className='home-bg-container'>
      <Navbar/>
      <HeroSection/>
      <Provide/>
      <ServicesFeatures/>
      <OurDoctor/>
      <BookAppointment/>
      <ScandPrediction/>
      <OurBlogs/>
      <Conclusion/>
      <Footer/>
    </div>
  )
}
