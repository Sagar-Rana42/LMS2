import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Lecture({ lecture, courseId, index }) {
  const navigate = useNavigate();

  const goToUpdateLecture = () => {
    navigate(`${lecture?._id}`, { state: { lecture } }); // Pass via state properly
  };

  return (
    <div className="flex items-center justify-between bg-slate-800 px-5 py-3 rounded-lg my-4 shadow-sm hover:shadow-md transition duration-300">
      <div>
        <h1 className="text-white font-semibold text-lg">
          Lecture {index + 1}: <span className="text-blue-300">{lecture?.lectureTitle}</span>
        </h1>
      </div>

      <Edit
        size={22}
        className="cursor-pointer text-gray-400 hover:text-blue-400 transition duration-200"
        onClick={goToUpdateLecture}
      />
    </div>
  );
}

export default Lecture;
