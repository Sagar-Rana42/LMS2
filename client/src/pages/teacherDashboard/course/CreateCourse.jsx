import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

function CreateCourse() {
  const [courseTitle , setCourseTitle] = useState();
  const [category , setCategory] = useState();

  const [CreateCourse , {data,isLoading, isSuccess, error,isError}] = useCreateCourseMutation();
  // console.log("error = " ,error?.data)
  
  const navigate = useNavigate()
 

  const createCourseHandler = async()=>{
    // console.log(courseTitle,category)
    await CreateCourse({courseTitle,category});
  }
  const getSelectedValue = async(value)=>{
    setCategory(value)
  }
  // for visualisazing 
  useEffect(()=>{

    if(isSuccess){
      toast.success(data?.msg || "Course created " )
      navigate("/admin/course")
    }
    if(isError){
      toast.error(error?.msg || "failed to create ")
    }

  },[isError,isSuccess,error])
  
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic course details for your new course
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
            placeholder="Your Course Name"
            value={courseTitle}
            className='rounded  border-[#2a2a2a]'
            onChange = {(e)=>setCourseTitle(e.target.value)}
            required = {true}
          />
        </div>
        <div className="flex flex-col gap-2 rounded  border-2 border-[#2a2a2a] ">
          <Label  htmlFor="category">Category</Label>
          <Select  onValueChange={getSelectedValue} className='rounded border-yellow-100 bg-gray-400 z-10'>
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
      <div className="space-x-2 -z-10">
        <Button
        onClick={()=>navigate("/admin/course")}
        
        className='bg-yellow-500 rounded duration-500'>Back</Button>

        <Button disabled={isLoading} onClick={createCourseHandler} className='bg-green-400 rounded duration-500'>
        {
          isLoading ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          </>:"Create"
        }
        </Button>
      </div>
      </div>
    </div>
  );
}

export default CreateCourse;
