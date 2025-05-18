import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL = "http://localhost:4000/api/v1/admin";


export const courseApi = createApi({
    
    reducerPath:"courseApi",
    tagTypes:["refetch-creator-course"],
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_URL,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        createCourse:builder.mutation({
            query:({courseTitle,category})=>({
                url:"/course/create",
                method:"POST",
                body:{courseTitle,category}

            }),
            invalidatesTags:["refetch-creator-course" ] 
                
        }),
        getAllCourses:builder.query({
            query:()=>({
                url:"/course",
                method:"GET",
            }),
            invalidatesTags:["refetch-creator-course"  ]

            
        }),
        editCourse:builder.mutation({
            query:({formData, courseId})=>({
              url:`/edit-course/${courseId}`,
              method:"PUT",
              body:formData,

            }),
            invalidatesTags:["refetch-creator-course"  ]
        }),
        getSingleCourse:builder.query({
            query:(courseId)=>({
                url:`/get-course/${courseId}`,
                method:"GET"
            }),
            invalidatesTags:["refetch-creator-course"  ]
        })
    })
    
})
export const {
    useCreateCourseMutation,
    useGetAllCoursesQuery ,
    useEditCourseMutation,
    useGetSingleCourseQuery

} = courseApi;