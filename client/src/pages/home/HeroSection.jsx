import React from "react";
import { Code2, HelpCircle, Users2, Hammer } from "lucide-react"; // icons
import { Link } from "react-router";

export default function HeroSection() {
  return (
    // <div className="bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111111] text-white"></div>
    <div className=" text-white w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] lg:mt-40 md:mt-32 mt-20">
      <div className=" flex flex-col justify-center items-center text-center px-4 w-full">

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Build Skills. Join the Future.
        </h1>


        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
          <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
            Master Coding with Hands-on Experience.
          </span>
          <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full"></span>
        </h2>

        <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-8">
          We're not just a platform. We're a community where coders grow through real projects,
          peer collaboration, expert mentorship, virtual meetups, code reviews, and career support.
          Join us to transform your learning journey into a career-defining experience.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:scale-105 transition transform duration-300">
            <Code2 size={20} />
            <span className="text-sm font-medium">Code Review</span>
          </div>

          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:scale-105 transition transform duration-300">
            <HelpCircle size={20} />
            <span className="text-sm font-medium">Doubt Session</span>
          </div>

          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg hover:scale-105 transition transform duration-300">
            <Users2 size={20} />
            <span className="text-sm font-medium">Peer Learning</span>
          </div>

          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg hover:scale-105 transition transform duration-300">
            <Hammer size={20} />
            <span className="text-sm font-medium">Project Building</span>
          </div>

        </div>
        {/* Extra mini features section */}
        {/* "Check All Courses" Button */}
        <div className="mt-20 text-center">
          <Link to="/courses">
            <button className="inline-flex items-center
             px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600
              text-white font-semibold rounded-full shadow-lg hover:scale-105
               transition-transform duration-300">
              Check All Courses
            </button>
          </Link>
        </div>



      </div>
    </div>
  );
}
