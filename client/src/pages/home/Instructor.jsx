import React from "react";

const instructors = [
  {
    id: 1,
    name: "devas de",
    designation: "Senior Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Expert in React, Tailwind, and modern web UI design with 5+ years of experience.",
  },
  {
    id: 2,
    name: "Aditi Sharma",
    designation: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    bio: "Skilled in MERN stack and cloud deployment. Passionate about scalable apps.",
  },
  {
    id: 3,
    name: "Vikram Mehta",
    designation: "Backend Engineer",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    bio: "Specializes in Node.js, MongoDB, and secure APIs with real-time support.",
  },
  {
    id: 4,
    name: "Riya Kapoor",
    designation: "React Specialist",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    bio: "Focused on component architecture, state management and clean code principles.",
  },
];

const InstructorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0a0a] to-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
          Meet Our Expert Instructors
        </h1>
        <p className="text-gray-400 mb-12 text-lg">
          Our instructors are professionals from the industry, committed to delivering real-world knowledge.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-[#111111] rounded-2xl shadow-lg hover:shadow-emerald-500/30 duration-300 border border-gray-800 p-6 flex flex-col items-center text-center group hover:scale-105 transition"
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-24 h-24 rounded-full border-2 border-green-500 mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 duration-300">
                {instructor.name}
              </h2>
              <p className="text-sm text-gray-400">{instructor.designation}</p>
              <p className="text-sm text-gray-300 mt-4">{instructor.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
