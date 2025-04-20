import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/ACCComponent/heroSection/HeroSection.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/home/Home";
import MyLearning from "./pages/studentDashboard/MyLearning";
import Profile from "./pages/studentDashboard/Profile";
// import HeroSection from "./pages/ACCComponent/heroSection/HeroSection.jsx";

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
        path:"login",
        element:<Login/>
      },
      {
        path:"my-learning",
        element:<MyLearning/>
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <RouterProvider router={appRouter}/>

      {/* <Button variant="outline">hiii</Button> */}
    </main>
  );
}

export default App;
