import React from 'react'
import { Navbar } from './Navbar'
import ServiceCard from './ServiceCard'
import { HeroSection } from './HeroSection'
import ProvideCard from './ProvideCard'
import ScanPredictionCard from './ScanPredictionCard'
import Blog from './Blog'
import { Footer } from "./Footer";

export const Home = () => {
  return (
    <>
      <div>
        <div className="h-fit-content  dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center font-sans overflow-clip">
          <HeroSection />
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <ServiceCard />
          <ProvideCard />
          <ScanPredictionCard />
          <Blog />
           <Footer />
          <div className="h-4"></div>
        </div>
      </div>
    </>
  )
}
