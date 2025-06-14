import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React, { useEffect } from 'react'
import BuyCourseButton from '@/components/BuyCourseButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi'
import ReactPlayer from 'react-player'

function CourseDetails() {

  const {courseId} = useParams();
  const navigateTo = useNavigate();

  const {data , isLoading , isSuccess , isError , error} = useGetCourseDetailWithStatusQuery(courseId);
  if(isLoading) return <h1>Loading...</h1>
  if(isError) return <h1>Failed to load data , please try again</h1>
  const {course , purchased} = data;

  console.log("data withdetails = " , data)

  function handleContinueCourse(){
    if(purchased){
      navigateTo(`/course-progress/${courseId}`)
    }
   
  }

  return (
    <div className='mt-20 space-y-4 ' >
      <div className='bg-[#2D2F31] text-white '>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2 '>
          <h1 className='font-bold text-2xl md:text-3xl '>{course?.courseTitle}</h1>
          <p className='text-base md:text-lg'>{course?.subTitle}</p>
          <p>Created By <span className='text-red-400 underline italic'>{course?.creator?.username}</span></p>
          <div className='flex items-center gap-2 text-sm '>
            <BadgeInfo size={16}/>
            <p>Last updated {course?.updatedAt.split("T")[0]}</p>
          </div>
          <p>students enrolled: {course?.enrolledStudents.length || 0}</p>
        </div>
      </div>

      
      <div className='max-w-7xl mx-auto my-5 px-4 md:px-4 flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-1/2 space-y-5'>
          <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
          <p className='text-sm'>{course?.description}</p>
          <Card className=''>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course?.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {
                course?.lectures?.map((lecture,index)=>(
                  <div key={index} className='flex items-center gap-3 text-sm'>
                    <span>
                      {
                        true ? (<><PlayCircle size={14}/></>) :<Lock size={14}/> 
                      }
                    </span>
                    <p>{lecture?.lectureTitle}</p>
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
              <ReactPlayer
               width="100%"
               height="100%" 
               url={course?.lectures[0]?.videoUrl}
               controls = {true}
              />
            </div>
            <h1>Lecture title</h1>
            <Separator className='my-2'/>
            <h1 className='text-lg md:text-xl font-semibold'>Course price</h1>
            
          </CardContent>

          <CardFooter className='flex justify-center p-4'>
            {
              purchased ? (<Button onClick={handleContinueCourse} className='bg-gray-600 rounded w-full hover:bg-gray-800 duration-300 hover:text-gray-300 '>continue course</Button>) :
              <BuyCourseButton courseId = {courseId}/>
             
            }
            
          </CardFooter>
         </Card>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails