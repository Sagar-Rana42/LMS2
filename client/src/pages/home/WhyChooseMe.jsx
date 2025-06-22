import React from "react";

function WhyChooseMe() {
  return (
    <div className="h-[70vh] sm:h-[80vh] lg:h-[90vh]  bg-black text-white py-12 px-4 sm:px-6 lg:px-20">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
        Why Choose <span className="text-green-400">CodeSphere</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-[#1f1f1f] to-[#121212] border border-gray-700 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
          >
            <p className="text-gray-300 text-sm mb-4 italic">"{item.quote}"</p>
            <div className="mt-auto">
              <h4 className="font-semibold text-green-400">{item.name}</h4>
              <p className="text-xs text-gray-400">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "CodeSphere transformed my understanding of programming. The hands-on approach made everything click for me.",
    name: "Emily Johnson",
    title: "Full Stack Development",
  },
  {
    quote:
      "The frontend course was super intuitive! The projects helped me build confidence and land my first freelance gig.",
    name: "Michael Smith",
    title: "Frontend Web Development",
  },
  {
    quote:
      "JavaScript always felt overwhelming, but the instructors here simplified it so well. Truly beginner-friendly!",
    name: "Sophia Lee",
    title: "Modern JavaScript Mastery",
  },
  {
    quote:
      "If you're struggling with backend concepts, this academy is the solution. Their real-world projects are invaluable.",
    name: "David Brown",
    title: "Backend Development with Express.js",
  },
  {
    quote:
      "This was the first time algorithms made sense to me. The DSA course here is a gem, especially for interviews.",
    name: "Rachel Green",
    title: "Data Structures & Algorithms",
  },
  {
    quote:
      "From zero to building full-stack apps! The MERN stack journey was well-structured and incredibly engaging.",
    name: "Liam Carter",
    title: "MERN Stack Bootcamp",
  },
  {
    quote:
      "Responsive design was always a struggle—until now. This course helped me master Tailwind and mobile-first layouts.",
    name: "Ava Patel",
    title: "Responsive Web Design",
  },
  {
    quote:
      "Deploying projects scared me. The DevOps crash course here changed that! CI/CD is now a breeze.",
    name: "Noah Williams",
    title: "DevOps for Developers",
  },
];

export default WhyChooseMe;
