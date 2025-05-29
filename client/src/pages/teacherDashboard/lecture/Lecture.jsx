import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Lecture({ lecture, courseId, index }) {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture?._id}`,{lecture});
  };
  return (
    <div className="flex items-center justify-between  bg-slate-500 px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-800">lecture - {index+1}:{lecture?.lectureTitle}</h1>
      <Edit
        size={24}
        className="cursor-pointer text-gray-600 hover:text-blue-600"
        onClick={goToUpdateLecture}
      />
    </div>
  );
}

export default Lecture;
