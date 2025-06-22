import React from 'react'
import HeroSection from './HeroSection'
import Courses from '../studentDashboard/Courses'
import WhyChooseMe from './WhyChooseMe'
import InstructorPage from './Instructor'

function Home() {
  return (
    <div>
      <HeroSection />
      <div className="border-b border-gray-700 my-16 w-11/12 mx-auto"></div>
      <Courses />
      <div className="border-b border-gray-700 my-16 w-11/12 mx-auto"></div>
      <WhyChooseMe />
      <div className="border-b border-gray-700 my-16 w-11/12 mx-auto"></div>
      <InstructorPage />
   </div>

  )
}

export default Home