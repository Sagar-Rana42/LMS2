import React from "react";
import { Link } from "react-router-dom";
import { Linkedin , Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo and About */} 
        <div>
          <h1 className="text-2xl font-bold mb-3">CodeSphere</h1>
          <p className="text-gray-400 text-sm">
            Empowering coders with high-quality, project-based learning.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Explore</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/my-learning">My Learning</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Useful Links</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li onClick={()=>window.location.reload()}><Link to="/admin/dashboard">Instructor Dashboard</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/sagar-rana-999a04256/" className="hover:text-blue-400"><Linkedin  /></a>
            <a href="#" className="hover:text-pink-400"><Instagram /></a>
            <a href="#" className="hover:text-sky-400"><Twitter /></a>
            <a href="https://github.com/Sagar-Rana42/my-Profile" className="hover:text-gray-400"><Github /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} CodeSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
