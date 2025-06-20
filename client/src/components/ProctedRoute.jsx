import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useEffect } from 'react';

export const IsLogin = ({children}) => {
    const { isAuthenticated } = useSelector(store => store.auth);

    useEffect(() => {
        if (!isAuthenticated) toast.error("please login");
    }, [isAuthenticated]);

    if (!isAuthenticated) return <Navigate to="/login" />;
    return children;
};



export const AuthenticatedUser = ({children})=>{
    const {isAuthenticated } = useSelector(store=>store.auth)
    if(isAuthenticated){
        return <Navigate to={'/'}/>
    }
    return children
}
export const IsAdmin = ({children})=>{
    const {user , isAuthenticated} = useSelector(store=>store.auth)
    if(!isAuthenticated){
        return <Navigate to={"/login"} />
    }
    if(user?.role !== "instructor"){
        return <Navigate to={"/"}/>
    }

    return children;
}


