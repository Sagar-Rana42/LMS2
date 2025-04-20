
import React from "react";
import { Boxes } from "../../../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import {MovingButton} from './MovingButton'
import Courses from "@/pages/studentDashboard/Courses";

export default function HeroSection() {
  function goto(){
    prompt("hii")
  }
  return (
<>

      <div
        className=" top-[3.9rem] h-[42.3rem] max-sm:h-[41.4rem] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div
          className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
          Upgrade Yourself
        </h1>
        
        {/* <form action="">
          <label htmlFor="search">Search</label>
          <input type="text" 
          id="search"
          className=" bg-white flex-grow border-none h-8 max-w-xl focus-visible:ring-0 px-6 py-3 text-white rounded-full shadow-lg overflow-hidden mb-6 mt-6"
          
          />
        </form> */}

        
        <p className="text-center mt-2 text-neutral-300 relative z-20 ">
        <MovingButton onClick={goto}>
          Explore Course
        </MovingButton>
        </p>
      </div>
      
    </>
  );
}
