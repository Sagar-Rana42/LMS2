import React from 'react'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

function WhyChooseMe() {

  const testimonialData = [
  {
    "quote": "This academy has completely changed the way I learn coding. The courses are structured perfectly and highly practical!",
    "name": "Emily Johnson",
    "title": "Full Stack Development"
  },
  {
    "quote": "I never thought I could learn web development online, but this academy made it easy! The interactive lessons are fantastic.",
    "name": "Michael Smith",
    "title": "Frontend Web Development"
  },
  {
    "quote": "The instructors are amazing! They break down complex programming concepts into easy-to-follow steps. Highly recommend it!",
    "name": "Sophia Lee",
    "title": "Advanced JavaScript"
  },
  {
    "quote": "A great platform for both beginners and experienced developers. The lessons are detailed, and the community is very supportive.",
    "name": "David Brown",
    "title": "Backend Development with Node.js"
  },
  {
    "quote": "Learning data structures and algorithms here has been a game-changer! The hands-on coding challenges really make a difference.",
    "name": "Rachel Green",
    "title": "Data Structures & Algorithms"
  }
  ];

  return (
    <div className='bg-black'>

   
      <div className="h-[40rem] rounded-md flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonialData}
          direction="right"
          speed="fast"
        />
      </div>
     </div>
  )
}

export default WhyChooseMe