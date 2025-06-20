import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { toast } from "sonner";
import { useParams } from "react-router";
const PurchaseCourseProtectedRoute = ({children})=>{
    const {courseId} = useParams();
    const {data , isLoading , isSuccess , isError , error} = useGetCourseDetailWithStatusQuery(courseId);
    if(isLoading){
        return <p>Loading....</p>
    }
    useEffect(() => {
        if (!data?.purchased) toast.error("please purchase course");
    }, [isAuthenticated]);
    
    return data?.purchased ? children : <Navigate to={`course-details/${courseId}`}/>
}

export default PurchaseCourseProtectedRoute