import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const PURCHASE_URL = "http://localhost:4000/api/v1/purchase";

export const purchaseApi = createApi({
    reducerPath:"purchaseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:PURCHASE_URL,
        credentials:'include'
    }),
    endpoints:(builder)=>({
        purchaseCourse:builder.mutation({
            query:(courseId)=>({
                url:"/purchase-course",
                method:"POST",
                body:courseId
            })  
        }),
        getCourseDetailWithStatus:builder.query({
            query:(courseId)=>({
                url:`/purchased-course/${courseId}`,
                method:"GET",
                
            })
        }),
        getAllPurchasedCourse:builder.query({
            query:()=>({
                url:"/all-purchased-course",
                method:"GET"
            })
        })

    })

    
})

export const {
    
    usePurchaseCourseMutation,
    useGetCourseDetailWithStatusQuery,
    useGetAllPurchasedCourseQuery,
    

} = purchaseApi