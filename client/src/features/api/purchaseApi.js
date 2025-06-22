import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_URL = "http://localhost:4000/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PURCHASE_URL,
    credentials: "include",
  }),
  tagTypes: ["CourseStatus"], //  define tag type
  endpoints: (builder) => ({
    purchaseCourse: builder.mutation({
      query: (courseId) => ({
        url: "/purchase-course",
        method: "POST",
        body: courseId,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CourseStatus", id: arg.courseId }, // invalidate the matching tag
      ],
    }),

    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/purchased-course/${courseId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "CourseStatus", id: arg }, // provides tag with courseId as ID
      ],
    }),

    getAllPurchasedCourse: builder.query({
      query: () => ({
        url: "/all-purchased-course",
        method: "GET",
      }),
      // optionally: providesTags: ['AllCourses']
    }),
  }),
});

export const {
    
    usePurchaseCourseMutation,
    useGetCourseDetailWithStatusQuery,
    useGetAllPurchasedCourseQuery,
    

} = purchaseApi