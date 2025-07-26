import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_URL = "https://lms2-f0bb.onrender.com/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PURCHASE_URL,
    credentials: "include",
  }),
  tagTypes: ["CourseStatus"], //  define tag type
  endpoints: (builder) => ({
    purchaseCourse: builder.mutation({
      query: ({ courseId }) => ({
        url: "/create-course",
        method: "POST",
        body: { courseId },
      }),
      
    }),

    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/purchased-course/${courseId}`,
        method: "GET",
      }),
      
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
} = purchaseApi;
