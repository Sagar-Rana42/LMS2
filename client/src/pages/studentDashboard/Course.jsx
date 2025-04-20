import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

import { Badge } from "@/components/ui/badge"
 

function Course() {
  const user = true;
  return (
    <Card className="  overflow-hidden bg-slate-300 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
      <div className="relative">
        <img
          src="https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png"
          alt="Next.js"
          className="w-full h-46 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className='px-5 py-5 '>

        <p className="hover:underline duration-300 font-bold truncate text-black">
          Next.js Full Stack course of next.js
        </p>

        <div className="flex items-center  ">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage 
              className="h-10 w-10 rounded-full m-2"
                src={user?.photoUrl || "https://github.com/shadcn.png"}

                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            
            <p className="font-medium ml-6 text-black">instructor name</p>
           
          </div>
          <Badge className={'bg-blue-600 rounded-full  max-md:ml-4 '}>Begineer</Badge>
          
        </div>

        <div className="font-semibold">
          <span  className="text-black" >
            &#8377; 200 
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default Course;
