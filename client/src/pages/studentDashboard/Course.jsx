import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import React from "react";

function Course({ course }) {
  return (
    <Link to={`/course-details/${course?._id}`}>
      <Card className="bg-[#111111] border border-[#222] rounded-xl shadow-md hover:shadow-xl hover:border-blue-500 transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={course?.courseThumbnail}
            alt={course?.courseTitle}
            className="w-full h-48 object-cover"
          />
        </div>

        <CardContent className="px-5 py-4 text-white">
          <h3 className="text-xl font-semibold truncate mb-2 hover:text-blue-400 transition-colors duration-300">
            {course?.courseTitle}
          </h3>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src={course?.creator?.photoUrl || "User"}
                  alt={course?.creator?.username}
                  className="w-9 h-9 rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="ml-3 text-sm text-gray-300">{course?.creator?.username}</span>
            </div>

            <Badge className="bg-blue-600 text-white text-xs rounded-full px-3 py-1">
              {course?.courseLevel}
            </Badge>
          </div>

          <div className="text-right text-green-400 font-bold text-lg">
            ₹ {course?.coursePrice}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Course;
