import TextEditor from '@/components/TextEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEditCourseMutation ,useGetSingleCourseQuery, usePublishCourseMutation} from '@/features/api/courseApi';
import { toast } from 'sonner';



function CourseTab() {

    // const isPublished = true;
    // const isLoading = false;
    const navigate = useNavigate();
    const {courseId} = useParams();
    // const courseId = param?.courseId;


    const {data:courseData , isLoading:courseIsLoading , isError:courseIsError , error:courseError ,refetch } = useGetSingleCourseQuery(courseId , {refetchOnMountOrArgChange:true});
    const [editCourse,{data,isLoading , isError , error , isSuccess}] = useEditCourseMutation();
    const [publishCourse , {data:publishData , isLoading:publishIsLoading }] = usePublishCourseMutation();

    const [input , setInput] = useState({
        courseTitle:"",
        subTitle:"",
        category:"",
        description:"",
        courseLevel:"",
        coursePrice:"",
        courseThumbnail:""
    });
    const [previewThumbnail , setPreviewThumbnail] = useState("");

    const changeHandler = (e)=>{
        const {name, value} = e.target;
        setInput({...input , [name]:value})
    }
    // const getSelectedValue = (value)=>(
    //     console.log("after selected option ", value)
    // )
    const selectCategory = (value) => {
        setInput((prev) => ({
            ...prev,
            category: value,
        }));
    };
 
    const courseLevel = (level)=>{
        setInput({...input, courseLevel:level})
    }

    // receive file 
    const thumbnail = (e)=>{
        const file = e.target?.files?.[0];
        // console.log("file = ", file)
        if(file){
            setInput({...input , courseThumbnail:file})
        }
        const fileReader = new FileReader();
        fileReader.onloadend = ()=>setPreviewThumbnail(fileReader.result)
        fileReader.readAsDataURL(file);
    }
    
    const courseUpdateHandler = async()=>{
        const formData = new FormData();
        formData.append("courseTitle",input?.courseTitle)
        formData.append("subTitle",input?.subTitle)
        formData.append("category",input?.category)
        formData.append("description",input?.description)
        formData.append("courseLevel",input?.courseLevel)
        formData.append("coursePrice",input?.coursePrice)
        formData.append("courseThumbnail",input?.courseThumbnail)

        await editCourse({formData,courseId})

    }

    const publishHandler = async(action)=>{
        try {
          const res =   await publishCourse({courseId , query:action})

          if(res?.data?.success){
            toast.success(res?.data?.msg);
            refetch()
          }
        } catch (error) {
            toast.error(error?.message || "failed to do action")
        }
    }

    useEffect(()=>{
        if(courseData?.course){
            setInput({
                courseTitle:courseData?.course?.courseTitle,
                subTitle:courseData?.course?.subTitle,
                category:courseData?.course?.category,
                description:courseData?.course?.description,
                courseLevel:courseData?.course?.courseLevel,
                coursePrice:courseData?.course?.coursePrice,
                courseThumbnail:courseData?.course?.courseThumbnail
            })
        }
    },[courseData])

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.msg || "Course updated successfully");
            navigate("/admin/course");
        }
        if (isError) {
            toast.error(error?.msg || "Failed to update");
        }
    }, [isSuccess, isError, data, error, navigate]);

    if(courseIsLoading){
        return <><h1 className='text-4xl font-semibold'>Loading.....</h1></>

    }
  return (
   <Card>
        <CardHeader className="">
            
            <div className='flex  justify-between ' >
                <div>
                            <CardTitle>
                                Basic Course Information
                            </CardTitle>
                            <CardDescription>Make change to your here. click save when you are done   </CardDescription>
                </div>

                <div className='space-x-2 '>

                    <Button onClick={()=>publishHandler(courseData?.course.isPublished?"false" :"true" )} disabled={courseData?.course?.lectures?.length === 0} className='bg-green-400  hover:bg-green-600 duration-300 rounded text-black'>
                        {
                            courseData?.course?.isPublished ? "Unpublish" : "Publish"
                        }
                    </Button>
                    <Button className='rounded bg-red-500 hover:bg-red-700 duration-300 md:mt-2'>
                        Remove Course
                    </Button>
                </div>
                
            </div>
    
        </CardHeader>
        <CardContent>

            <div className='space-y-4 mt-5'>
            <Label>Title</Label>
            <Input
                    type="text"
                    placeholder="Ex.Devops "
                    name="courseTitle"
                    value={input?.courseTitle}
                    onChange={changeHandler}
            />

            
            </div>

            <div className='space-y-4 mt-5'>
            <Label>SubTitle</Label>
            <Input
                    type="text"
                    placeholder="Cloud engineering "
                    name="subTitle"
                    value={input?.subTitle}
                    onChange={changeHandler}
            />

            </div>

            <div className='space-y-4 mt-5'>
            <Label>Description</Label>
            <TextEditor input={input}  setInput={setInput}/>

            </div>
            <div className='flex items-center gap-5 '>
                <div className=''>
                    <Label>Category</Label>
                    <Select  value={input?.category} onValueChange={selectCategory} className='rounded border-yellow-100 bg-gray-400 z-10'>
                                <SelectTrigger className="w-[180px]" id="category">
                                <SelectValue placeholder="Select a category " className='rounded border-yellow-100' />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup className="bg-white text-black">
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem  value="Next JS">Next JS</SelectItem>
                                    <SelectItem  value="Data Science">Data Science</SelectItem>
                                    <SelectItem  value="Frontend Development">Frontend Development</SelectItem>
                                    <SelectItem  value="Fullstack Development">Fullstack Development</SelectItem>
                                    <SelectItem  value="MERN Stack Development">MERN Stack Development</SelectItem>
                                    <SelectItem  value="Javascript">Javascript</SelectItem>
                                    <SelectItem  value="Python">Python</SelectItem>
                                    <SelectItem  value="Docker">Docker</SelectItem>
                                    <SelectItem  value="MongoDB">MongoDB</SelectItem>
                                    <SelectItem  value="HTML">HTML</SelectItem>
                                </SelectGroup>
                                </SelectContent>
                    </Select>

                    
                </div>

                <div>
                    <Label>Course label</Label>
                    <Select value={input?.courseLevel} onValueChange={courseLevel} className='rounded border-yellow-100 bg-gray-400 z-10'>
                        <SelectTrigger className="w-[180px]" id="category">
                        <SelectValue placeholder="Select a course level" className='rounded border-yellow-100' />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup className="bg-white text-black">
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem  value="Begineer">Begineer</SelectItem>
                                <SelectItem  value="Medium">Medium</SelectItem>
                                <SelectItem  value="Advanced">Advanced</SelectItem>
                            
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>

                <div>
                    <Label>Price in (INR)</Label>
                    <input type="number"
                        name="coursePrice"
                        onChange={changeHandler}
                        placeholder='399'
                        className="w-fit"
                        value={input?.coursePrice}
                    />
                </div>
   
            </div>

            <div className='space-y-1 flex flex-col '>
                <Label className='mt-4' >courseThumbnail</Label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={thumbnail}  
                    className="w-fit"
                    
                />
                {
                    previewThumbnail && 
                    <img src={previewThumbnail} className='w-64 my-2 h-64 rounded-sm' alt='course Thumbnail '/>
                    
                }
            </div>
            <div className='space-x-2 mt-3'>
                <Button className='rounded bg-slate-700' onClick={()=>navigate("/admin/course")}>Cancel</Button>
                <Button onClick={courseUpdateHandler} disabled={isLoading} className='rounded bg-slate-700'>
                    {
                      isLoading ? (<> <Loader2 className='mr-2 h-4 w-4 animate-spin'/></>) : ("Save")
                    }
                       
                </Button>
            </div>
            
        </CardContent>

   </Card>
  )
}

export default CourseTab