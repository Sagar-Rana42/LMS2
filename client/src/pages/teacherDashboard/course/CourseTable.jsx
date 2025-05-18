import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllCoursesQuery } from "@/features/api/courseApi";
import React from "react";
import { useNavigate } from "react-router-dom";

function CourseTable() {
  const {data , isLoading , isError,error} = useGetAllCoursesQuery();
  // console.log("data = ",data)


  const navigate = useNavigate();
  return (
    
    <div className=" text-white ">
      <Button variant="outline" className="rounded  font-bold bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-transparent  text-black hover:bg-amber-600
duration-500
"
       onClick={()=>navigate("create")} >
        Create a new course
      </Button>

      <Table className='mt-4'>
        <TableCaption>A list of your recent course.</TableCaption>

        <TableHeader>
          <TableRow className='font-semibold text-yellow-200'>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Method</TableHead> */}
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.courses?.map((course) => (
            <TableRow key={course?._id}>
              <TableCell className="font-medium">{course?.courseTitle}</TableCell>
              <TableCell><Badge className='bg-gray-300 rounded text-black duration-700'>{course?.isPublished ? "publish" : "Draft"}</Badge></TableCell>
              {/* <TableCell>{course?.paymentMethod}</TableCell> */}
              <TableCell className="text-right">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell className="text-right">
              <Button onClick={()=>(navigate(`${course?._id}`))} className='bg-green-300 duration-700 text-black
              rounded '>Edit

              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            
            
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
}

export default CourseTable;
