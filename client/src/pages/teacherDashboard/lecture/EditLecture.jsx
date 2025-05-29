import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import LectureTab from './LectureTab';
function EditLecture() {
    const {courseId, lectureId } = useParams();
    // console.log("course id = " , courseId , lectureId)

  return (
    <div>
        <div className='flex items-center justify-between mb-5 '>
            <div className='flex items-center gap-2'>
                <Link to={`/admin/course/${courseId}/lecture/`}>
                    <Button size='icon' variant='outline' className='rounded-full'>
                        <ArrowLeft size={16}/>
                    </Button>
                </Link>
                <h1 className='font-semibold text-xl'>Update lecture</h1>
            </div>
        
        </div>
        <LectureTab/>
     </div>
  )
}

export default EditLecture