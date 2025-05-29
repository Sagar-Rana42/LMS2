import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function LectureTab() {
    
    const [lectureTitle , setLectureTitle]= useState("");
    const [uploadVideoInfo , setUploadVideoInfo] = useState(null);
    const [isPreviewFree , setIsPreviewFree] = useState(false)
    const [mediaProgress , setMediaProgress] = useState(false)
    const [uploadProgress  , setUploadProgress] = useState();
    const [btnDisable , setBtnDisable] = useState(true)

    const {lectureId , courseId} = useParams()
    // const {lecture} = useLocation();
    const navigateTo = useNavigate();
    // console.log("lecture get from parameter" , lecture);
    const MEDIA_URL = "http://localhost:4000/api/v1/media"

    const [editLecture , {data , isLoading , isError , error, isSuccess}] = useEditLectureMutation();
    const [removeLecture ,{data:removeLectureData ,isSuccess:removeSuccesss, error:removeError ,isLoading:removeIsLoading, isError:RemoveIsError}] = useRemoveLectureMutation();
    const {data:lectureData , isError:lectureDataIsError , error:lectureDataError} = useGetLectureByIdQuery(lectureId)
    const lecture  = lectureData?.lecture;
    console.log("lecture data = " , lectureData);

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`${MEDIA_URL}/upload-video`, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    },
                });

                if (res?.data?.success) {
                    console.log("res = " , res);
                    setUploadVideoInfo({
                        videoUrl: res.data.data.url,
                        publicId: res.data.data.public_id,
                    });
                    setBtnDisable(false);
                    toast.success(res.data.message || "video uploaded successfully");
                } 
            } catch (error) {
                console.log(error);
                toast.error("video upload failed");
            } finally {
                setMediaProgress(false);
            }
        }
   };
    const handleEditLecture = async ()=>{
    // alert("yes it is working")
        await editLecture({lectureId,courseId,lectureTitle,isPreviewFree,videoInfo:uploadVideoInfo})
    };
    const removeLectureHandler = async()=>{
        await removeLecture({lectureId});
    }

    useEffect(()=>{
        if(lectureData){
            setLectureTitle(lecture?.lectureTitle)
            
        }
    },[])
    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.msg||"lecture edit successfully")
        }
        if (isError){
            console.log("error = " , error)
            toast.error(error?.message)
        }
    },[isSuccess, isError])
    useEffect(()=>{
        if(removeSuccesss){
            toast.success(removeLectureData?.msg || "lecture removed successfully")
            navigateTo(`/admin/course/${courseId}/lecture`)
        }
        if(isError){
            toast.error(removeError?.message || "failed to remove course")
        }
    },[removeSuccesss,removeError])
   
  return (

    <Card className=''>
        <CardHeader className='flex justify-between gap-4'>
            <div>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription>Make changes and saved them</CardDescription>
            </div>
            <div className='flex items-center '>

                <Button disabled={removeIsLoading} onClick={removeLectureHandler} className='bg-red-800 rounded hover:bg-red-400  duration-300'>
                    {
                        removeIsLoading? (<> 
                        <Loader2 className='w-4 h-2 animate-spin mr-2'></Loader2>
                        </>):"Remove lecture"
                    }
                </Button>
            </div>

        </CardHeader>
        <CardContent>
            <div>
                <Label>  lectureTitle </Label>
                <Input
                 type="text"
                 placeholder="ex. Introduction to Java Script"
                 className='rounded'
                 value={lectureTitle}
                 onChange ={(e)=>setLectureTitle(e.target.value)}
                />
            </div>
            <div className='my-5'>
                <Label> Video <span className='text-red-400'>*</span> </Label>
                <Input
                 type="file"
                 accept="video/*"
                 onChange={fileChangeHandler}
                 placeholder="ex. Introduction to Java Script"
                 className='rounded'
                 required={true}
                />
            </div>
            
            <div className=' flex items-center space-x-2 my-5 '> 
                <Switch checked={isPreviewFree} onCheckedChange={setIsPreviewFree} id="airplane-mode" />
                <Label htmlFor="airplane-mode">Is this video free</Label>
            </div>
            {mediaProgress && (
                <div className="my-4">
                    <Progress value={uploadProgress} />
                    <p>{uploadProgress}% uploaded</p>
                </div>
            )}
            <div>
                <Button onClick={handleEditLecture} disabled={!uploadVideoInfo || isLoading} className='bg-gray-800 rounded hover:text-orange-400 duration-300' >
                    
                    {
                        uploadVideoInfo ? ("Update Lecture") :"select video then Uploads"
                    }
                </Button>
            </div>

        </CardContent>
    </Card>
  )
}

export default LectureTab