import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'
import BuyCourseButton from '@/components/BuyCourseButton'

function CourseDetails() {
  const purchased = false;
  return (
    <div className='mt-20 space-y-4 ' >
      <div className='bg-[#2D2F31] text-white '>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2 '>
          <h1 className='font-bold text-2xl md:text-3xl '>Course Title</h1>
          <p className='text-base md:text-lg'>course subTitle</p>
          <p>Created By <span className='text-red-400 underline italic'>rana ji</span></p>
          <div className='flex items-center gap-2 text-sm '>
            <BadgeInfo size={16}/>
            <p>Last updated 11-11-2024</p>
          </div>
          <p>students enrolled: 10</p>
        </div>
      </div>

      
      <div className='max-w-7xl mx-auto my-5 px-4 md:px-4 flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-1/2 space-y-5'>
          <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, voluptatum!
          Possimus dolores quas dicta expedita rem tempore perspiciatis sit dolor?
          Sit aliquid at, quae laudantium ipsam aperiam tempora ipsum esse?
          Deleniti odio provident, laborum esse ea nam laboriosam eaque sit.
          Voluptatum, corporis nulla corrupti commodi delectus incidunt quo quia quos!</p>
          <Card className=''>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                4 lectures
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {
                [1,2].map((_,index)=>(
                  <div key={index} className='flex items-center gap-3 text-sm'>
                    <span>
                      {
                        true ? (<><PlayCircle size={14}/></>) :<Lock size={14}/> 
                      }
                    </span>
                    <p>Lecture Title</p>
                  </div>
                ))
              }
            </CardContent>
          </Card>
        </div>   

        <div className='w-full lg:w-1/3 '>
         <Card>
          <CardContent className='p-4 flex flex-col '>
            <div className='w-full aspect-video mb-4'>
              video ayega
            </div>
            <h1>Lecture title</h1>
            <Separator className='my-2'/>
            <h1 className='text-lg md:text-xl font-semibold'>Course price</h1>
            
          </CardContent>

          <CardFooter className='flex justify-center p-4'>
            {
              purchased ? (<Button className='bg-gray-600 rounded w-full hover:bg-gray-800 duration-300 hover:text-gray-300 '>continue course</Button>) :
              <BuyCourseButton/>
             
            }
            
          </CardFooter>
         </Card>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails