import React from 'react';
import Course from './Course';
import { Skeleton } from '../../components/ui/skeleton';
import { useGetPublishedCourseQuery } from '@/features/api/courseApi';

function Courses() {
  const { data, isLoading, isSuccess, error, isError } = useGetPublishedCourseQuery();
  console.log("data = ", data);

  if (isError) {
    return (
      <div className="text-center text-red-400 py-10">
        <h1 className="text-xl font-semibold">Something went wrong while fetching courses.</h1>
      </div>
    );
  }

  return (
    <div className="h-[70vh] sm:h-[80vh] lg:h-[90vh]">
  <div className="max-w-7xl mx-auto px-6  pb-20">
    <h2 className="font-bold text-4xl text-center mb-10 drop-shadow-sm">
      Our Courses
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => <SkeletonDemo key={index} />)
        : data?.courses?.map((course, index) => (
            <div
              key={index}
              className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <Course course={course} />
            </div>
          ))}
    </div>
  </div>
</div>

  );
}

export default Courses;


// import { Skeleton } from "@/components/ui/skeleton"

const SkeletonDemo = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md p-4">
      <Skeleton className="w-full h-40 rounded-md" />
      <div className="space-y-4 mt-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};
