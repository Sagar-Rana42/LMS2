import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { usePurchaseCourseMutation } from "@/features/api/purchaseApi.js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BuyCourseButton = ({ courseId }) => {

  const navigateTo = useNavigate();
  const [purchaseCourse, { data, isLoading, isSuccess, error,isError  }] = usePurchaseCourseMutation();
  // console.log("data =" , data)

  const purchaseCourseHandler = async () => {
    try {
      await purchaseCourse({ courseId }); // Assuming API expects object
    } catch (err) {
      console.error("Error purchasing course:", err);
    }
  };

  useEffect(()=>{
    if(isSuccess){
      
      // course purchasse ho chuka hai 
      toast.success(data?.msg || "course buy successfully")
      navigateTo(`/course-progress/${courseId}`)

    }
    else if(isError){
      toast.error(error?.data?.msg || "failed to buy course")
    }
  },[isSuccess])



  return (
    <Button disabled={isLoading} className="w-full bg-gray-600 rounded hover:bg-gray-800 duration-300 font-bold" onClick={purchaseCourseHandler}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
        </>
      ) : (
        "Purchase course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
