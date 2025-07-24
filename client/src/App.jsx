import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/home/HeroSection.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/home/Home";
import MyLearning from "./pages/studentDashboard/MyLearning";
import Profile from "./pages/studentDashboard/Profile";
import Sidebar from "./pages/teacherDashboard/Sidebar";
import Dashboard from "./pages/teacherDashboard/Dashboard";
import CourseTable from "./pages/teacherDashboard/course/CourseTable";
import CreateCourse from "./pages/teacherDashboard/course/CreateCourse";
import EditCourse from "./pages/teacherDashboard/course/EditCourse";
import CreateLecture from "./pages/teacherDashboard/lecture/CreateLecture";
import EditLecture from "./pages/teacherDashboard/lecture/EditLecture";
import CourseDetails from "./pages/studentDashboard/CourseDetails";
import CourseProgress from "./pages/studentDashboard/CourseProgress";
import NotFound from "./components/NotFound";
// import HeroSection from "./pages/ACCComponent/heroSection/HeroSection.jsx";
import {AuthenticatedUser, IsLogin ,IsAdmin } from "./components/ProctedRoute"
import PurchaseCourseProtectedRoute from "./components/PurchaseProtectedRoute";
import Courses from "./pages/studentDashboard/Courses";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path:"courses",
        element:<Courses/>
      },
    
      {
        path:"login",
        element:<AuthenticatedUser><Login/></AuthenticatedUser>  
      },
      {
        path:"my-learning",
        element: <IsLogin> <MyLearning/></IsLogin>
      },
      {
        path:"profile",
        element: <IsLogin> <Profile/></IsLogin>
      },
      {
        path:"course-details/:courseId",
        element: <IsLogin> <CourseDetails/> </IsLogin>
      },
      {
        path:"course-progress/:courseId",
        element:<PurchaseCourseProtectedRoute>

          <IsLogin> <CourseProgress/></IsLogin>
         </PurchaseCourseProtectedRoute>
      },
      {
        path:"*",
        element:<NotFound/>
      },


      // admin route start here 
      {
        path:"admin",
        element: <IsAdmin><Sidebar/></IsAdmin> ,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<CreateCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },
          {
            path:"course/:courseId/lecture/:lectureId",
            element:<EditLecture/>
          }
        ]
      }
    ],

    
      
  },
]);

function App() {

  // const [count, setCount] = useState(0);

  return (
    <main>
      <RouterProvider router={appRouter}/>

      {/* <Button variant="outline">hiii</Button> */}
    </main>
  );
}

export default App;
