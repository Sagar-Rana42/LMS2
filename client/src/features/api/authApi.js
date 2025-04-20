/*

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../authSlice'

const USER_API="http://localhost:5173/api/v1/user/"
// for post use mutation 
// gor get use query

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(inputData)=>({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser:builder.mutation({
            query:(data)=>({
                url:"login",
                method:"POST",
                body:data
            }),
            async onQueryStarted(_ , {queryFulfilled , dispatch}){
                try {
                    const result = await queryFulfilled ; // jo bhi data login karne ke bad , milta hai queryFulfilled me 
                    console.log("result after on query started ", result)
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log("errofrom authAPi , " , error)
                }
            }
           

        })
    })

})


export const  {
    useRegisterUserMutation,
    useLoginUserMutation
} = authApi;


*/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { userLoggedIn, userLoggedOut } from '../authSlice.js';
import { isFulfilled } from '@reduxjs/toolkit';

const USER_API = "http://localhost:4000/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData,
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                   
                    const result = await queryFulfilled;
                    console.log("Login success:", result);
                    
                    // Ensure result.data exists before dispatching
                    if (result.data.user) {
                        dispatch(userLoggedIn({ user: result.data.user }));
                    }
                } catch (error) {
                    console.log("error from authApi " + error )
                }
            },
        }),

        
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation
} = authApi;
