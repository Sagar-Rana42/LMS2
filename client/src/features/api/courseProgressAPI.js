// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const progress_URL = "https://lms2-f0bb.onrender.com/api/v1/course"
export const courseProgressAPI = createApi({
  reducerPath: 'courseProgress', // Optional: custom reducer path
  baseQuery: fetchBaseQuery({ 
    baseUrl:progress_URL,
    credentials:"include"
 }),
  endpoints: (builder) => ({

    getCourseProgress: builder.query({
      query: (courseId)=>({
        url:`/coursein-progress/${courseId}`,
        method:"GET"
      })
    }),
  }),
});

// Export auto-generated hooks
export const { useGetCourseProgressQuery } = courseProgressAPI;
