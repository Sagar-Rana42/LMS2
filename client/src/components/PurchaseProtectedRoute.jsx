import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { toast } from "sonner";
import { useParams, Navigate } from "react-router-dom"; // ← Fix: 'Navigate' is from 'react-router-dom'
import { useEffect } from "react";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCourseDetailWithStatusQuery(courseId);

  useEffect(() => {
    if (isError && !data?.purchased) {
        toast.error("Please purchase the course to access this content.");
    }
   }, [isError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data?.purchased) {
    return <Navigate to={`/course-details/${courseId}`} replace />;
  }

  return children;
};

export default PurchaseCourseProtectedRoute;
