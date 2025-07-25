import {configureStore} from "@reduxjs/toolkit"
// import authReducer from "../src/features/authSlice.js"
import authReducer from '../features/authSlice.js'
import rootReducer from "./rootReducer.js"
import { authApi } from "@/features/api/authApi.js"
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { courseProgressAPI } from "@/features/api/courseProgressAPI.js";

export const appStore = configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware,courseApi.middleware ,purchaseApi.middleware,courseProgressAPI.middleware)
});

const initialseApp = async()=>{
    await appStore.dispatch(authApi.endpoints.userProfile.initiate({},{forceRefetch:true}))
}

initialseApp();