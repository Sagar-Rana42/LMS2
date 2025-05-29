import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL = "http://localhost:4000/api/v1/admin";


export const courseApi = createApi({
    
    reducerPath:"courseApi",
    tagTypes:["refetch-creator-course","refetch-lecture"],
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
        }),
        createLecture:builder.mutation({
            query:({lectureTitle,courseId})=>({
                url:`/get-course/${courseId}/create-Lecture`,
                method:"POST",
                body:{lectureTitle}
            })
        }),
        getAllLectures:builder.query({
            query:({courseId})=>({
                url:`/get-course/${courseId}/get-all-lecture`,
                method:"GET"
            }),
            providesTags:["refetch-lecture"]
        }),
        editLecture:builder.mutation({
            query:({courseId ,lectureId ,lectureTitle ,videoInfo ,  isPreviewFree})=>({
                url:`get-course/${courseId}/lecture/${lectureId}`,
                method:"POST",
                body:{lectureTitle ,videoInfo ,  isPreviewFree}
            })
            
        }),
        removeLecture:builder.mutation({
            query:({lectureId})=>({
                url:`/lecture/${lectureId}`,
                method:"DELETE",
            }),
            invalidatesTags:["refetch-lecture"]
        }),
        getLectureById:builder.query({
            query:(lectureId)=>({
                url:`/lecture/${lectureId}`,
                method:"GET"
            })
            
        }),

    })
    
})
export const {
    useCreateCourseMutation,
    useGetAllCoursesQuery ,
    useEditCourseMutation,
    useGetSingleCourseQuery,
    useCreateLectureMutation,
    useGetAllLecturesQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,

} = courseApi;