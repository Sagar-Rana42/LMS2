import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

// function Sidebar() {
//   return (
//     <div className='flex  sticky top-0 '>

  
//       <div className=' bg-[#101010]  p-5 sticky top-0 h-screen hidden lg:block
//         w-[250px] sm:w-[300px] space-y-8 border-gray-300
//         text-white '>
//           <div className=' space-y-4 mt-20'>
//             <Link to="dashboard" className='flex items-center gap-2'>
//                 <ChartNoAxesColumn size={22}/>
//                 <h1>Dashboard</h1>
//             </Link>
//             <Link to="course"  className='flex items-center gap-2 '>
//                 <SquareLibrary size={22}/>
//                 <h1>Courses</h1>
//             </Link>
              
            
//           </div>
        
//       </div>

//       <div className='flex-1 md:p-24 p-2  '>
//             <Outlet/>
//       </div>
//     </div>
//   )
// }

// function Sidebar() {
//   return (
//     <div className="min-h-screen flex bg-[#080808]  text-white">
//       {/* Sidebar (visible on all devices) */}
//       <div
//         className="flex flex-col w-[250px] sm:w-[280px] bg-[#101010] p-5
//                    sticky top-0 h-screen border-r border-gray-700 space-y-8"
//       >
//         <div className="mt-20 space-y-4">
//           <Link
//             to="dashboard"
//             className="flex items-center gap-2 text-white hover:text-green-400 transition"
//           >
//             <ChartNoAxesColumn size={28} />
//             <span className="text-lg font-medium">Dashboard</span>
//           </Link>
//           <Link
//             to="course"
//             className="flex items-center gap-2 text-white hover:text-green-400 transition"
//           >
//             <SquareLibrary size={28} />
//             <span className="text-lg font-medium">Courses</span>
//           </Link>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 overflow-y-auto md:p-24 p-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// }


const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0  h-screen">
        <div className="space-y-4 ">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
    <div className="flex-1 p-10 ">
        <Outlet/>
      </div>
    </div>
  );
};

export default Sidebar;
