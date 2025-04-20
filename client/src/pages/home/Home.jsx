import React from 'react'
import HeroSection from '../ACCComponent/heroSection/HeroSection'
import Courses from '../studentDashboard/Courses'
import WhyChooseMe from './WhyChooseMe'
import Instructor from './Instructor'

function Home() {
  return (
    <div>
        <HeroSection/>
        <Courses/>
        <WhyChooseMe/>
        <Instructor/>
        {/* <HeroSection/>
        <HeroSection/>
        <HeroSection/>
        <HeroSection/> */}
        
    </div>
  )
}

export default Home