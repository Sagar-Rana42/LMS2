
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';
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
                    console.log("error from authApi " + error.message )
                }
            },
        }),
        userProfile:builder.query({
            query:()=>({
                url:"profile",
                method:"GET"
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
                    console.log("error from query pofile  authApi " + error.message )
                }
            },
        }),
        updateUserProfile:builder.mutation({
            query:(formData)=>({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })

            
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:"/logout",
                method:"GET",

            }),
            async onQueryStarted(args , {queryFulfilled , dispatch}){
                try {
                    // const result  = await queryFulfilled;
                    await dispatch(userLoggedOut());
                } catch (error) {
                    console.log("failed to logout from api ", error.message)
                }
            }
        })

        
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useUserProfileQuery,
    useUpdateUserProfileMutation,
    useLogoutUserMutation
} = authApi;
