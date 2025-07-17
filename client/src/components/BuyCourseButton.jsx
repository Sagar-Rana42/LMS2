import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { usePurchaseCourseMutation } from "@/features/api/purchaseApi.js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BuyCourseButton = ({ courseId }) => {
  const navigateTo = useNavigate();
  const [purchaseCourse, { data, isLoading, isSuccess, error, isError }] =
    usePurchaseCourseMutation();
  // console.log("data =" , data)

  const purchaseCourseHandler = async () => {
    try {
      console.log("buy course called ");
      const {data  } = await purchaseCourse({courseId}); // Assuming API expects object
      console.log("buy course called after response = ", data);
      // console.log("buy course called after razorpay = = ", data.razorpayKey);

      if(!data){
        toast.error("response not getting of prrchase course")
      }

      const options = {
        key: data.razorpayKey,
        amount: data.order.amount,
        currency: "INR",
        name: "CodeSphere Academy",
        description: "Course Purchase",
        order_id: data.order.id,
        handler: async function (rzpResponse) {
          // Send payment verification request to backend
          const verifyRes = await fetch("/api/v1/purchase/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: rzpResponse.razorpay_order_id,
              razorpay_payment_id: rzpResponse.razorpay_payment_id,
              razorpay_signature: rzpResponse.razorpay_signature,
              courseId,
            }),
          });

          const result = await verifyRes.json();
          console.log("result after verify = ", result)
          if (result.success) {
            toast.success(result.msg || "Payment successful!");
            navigateTo(`/course-progress/${courseId}`);
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Sagar",
          email: "sagar@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
       
      console.error("Error purchasing course:", err);
      toast.error("Something went wrong while purchasing");
    
    }
  };

  /*
  useEffect(() => {
    if (isSuccess) {
      // course purchasse ho chuka hai
      toast.success(data?.msg || "course buy successfully");
      navigateTo(`/course-progress/${courseId}`);
    } else if (isError) {
      toast.error(error?.data?.msg || "failed to buy course");
    }
  }, [isSuccess]);

  */

  return (
    <Button
      disabled={isLoading}
      className="w-full bg-gray-600 rounded hover:bg-gray-800 duration-300 font-bold"
      onClick={purchaseCourseHandler}
    >
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
