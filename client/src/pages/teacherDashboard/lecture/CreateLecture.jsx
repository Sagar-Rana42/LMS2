import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetAllLecturesQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

function CreateLecture() {
    // const isLoading = false;
    const [lectureTitle , setLectureTitle] = useState();
    const navigate = useNavigate();

    const {courseId} = useParams();
    const [createLecture , {data , isLoading , isSuccess , isError , error}] = useCreateLectureMutation();

    const {data:lectureData , isLoading:lectureIsLoading , isError:lectureIsError , error:lectureError , refetch} = useGetAllLecturesQuery({courseId});
    // console.log("lecture data = " , lectureData)
    const createLectureHandler = async ()=>{
      await createLecture({lectureTitle,courseId})
      
    }
   
    useEffect(()=>{
      if(isSuccess){
        toast.success(data?.msg || "lecture created successfully")
        refetch()
      }
      else if(isError){
        toast.error(error?.data?.message || "failed to create lecture" )
      }
    },[isSuccess,error])

    
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add lecture , add some basic detail for your new lecture
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Lecture Name"
            value={lectureTitle}
            onChange = {(e)=>setLectureTitle(e.target?.value)}
            className='rounded  border-[#2a2a2a]'
            // onChange = {(e)=>setCourseTitle(e.target.value)}
            required = {true}
          />
        </div>
        
      <div className="space-x-2 -z-10">
        <Button
        onClick={()=>navigate(`/admin/course/${courseId}`)}
        
        className='bg-yellow-500 rounded duration-500'>Back to course </Button>

        <Button disabled={isLoading} onClick={createLectureHandler} className='bg-green-400 rounded duration-500'>
        {
          isLoading ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          </>:"Create lecture"
        }
        </Button>
      </div>
      </div>
      <div className='mt-10'>
        {
          lectureIsLoading ? (<p>Loading...</p>) : 
          lectureIsError ? (<p>Failed to load lectures...</p>) : 
          lectureData?.lectures?.length === 0 ? <p>No lecture available for this course </p> :
          (
            lectureData?.lectures?.map((lecture , index)=>(
              <Lecture key={lecture?._id} lecture={lecture} courseId={courseId} index={index}/>
            ))
          
        )

          
        }
       
      </div>
    </div>
  )
}

export default CreateLecture