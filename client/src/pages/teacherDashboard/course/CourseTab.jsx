import TextEditor from '@/components/TextEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



function CourseTab() {
    const isPublished = true;
    const isLoading = false;
    const navigate = useNavigate();

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

    const courseUpdateHandler = ()=>{
        console.log("all data = " , input)
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

                <div className='space-x-2'>
                    <Button variant='outline'>
                        {
                            isPublished ? "Unpublish" : "Publish"
                        }
                    </Button>
                    <Button>
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
                    <Select  onValueChange={selectCategory} className='rounded border-yellow-100 bg-gray-400 z-10'>
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
                    <Select  onValueChange={courseLevel} className='rounded border-yellow-100 bg-gray-400 z-10'>
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