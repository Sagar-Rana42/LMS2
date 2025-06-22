import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link to="/" className="bg-amber-500 text-black px-6 py-2 rounded hover:bg-amber-600 transition">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
