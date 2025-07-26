import React from "react";
import Course from "./Course";
import { useGetAllPurchasedCourseQuery } from "@/features/api/purchaseApi";

function MyLearning() {
  

  const {data , isLoading , isError , isSuccess , error} = useGetAllPurchasedCourseQuery();
  // const {courseId} = data;
  // console.log("data - " , data)
  // const {allPurchasedCourse} = data;

  return ( 
    
    // <div className="flex flex-col justify-center items-center text-center px-4">

      <div className="w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] text-2xl  ">
        <div className="  relatve max-w-4xl  mx-auto my-10 px-4 md:px-0  ">
          <h1 className="font-semibold text-3xl">MY LEARNING</h1>
          <div className="my-5">
            {isLoading ? (
              <LearningSkelaton />
            ) : data?.allPurchasedCourse?.length === 0 ? (
              <p > Yoy are not enrolled in any cousrse</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3  gap-4">
                {
                  data?.allPurchasedCourse?.map((course , index)=><Course key={index} course={course?.courseId} />)
                  
                }
              </div>
            )}
          </div>
        </div>
      </div>
   
  );
}

export default MyLearning;

const LearningSkelaton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg text-black">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
        ></div>
      ))}
    </div>
  );
};
