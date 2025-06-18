import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useGetCourseProgressQuery } from "@/features/api/courseProgressAPI";
import { CheckCircle, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function CourseProgress() {
  const [lectures, setLectures] = useState([]);
  const [current, setCurrent] = useState(0);
  const { courseId } = useParams();
  const { data, isLoading, isError, error, isSuccess, refetch } =
    useGetCourseProgressQuery(courseId);

  console.log("lectures = ", lectures);
  useEffect(() => {
    if (isSuccess) {
      setLectures(data?.lectures);
    }
  }, [courseId]);
  const isComleted = true;
  console.log("progress lecture = ", data);

  const playLecture = (index) => {
    setCurrent(index);
  };
  const nextLecture = () => {
    if (current < lectures.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <div className="flex justify-between mb-4 ">
        <h1 className="text-2xl  font-bold"> {data?.courseTitle}</h1>
        <Button>Completed</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6 ">
        {/* video section  */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-white shadow-md p-4">
          <div></div>
          {/* video  url show hoga  */}
          <video
            key={data?.lectures[current]?.videoUrl}
            src={data?.lectures[current]?.videoUrl}
            controls
            autoPlay
            onEnded={nextLecture}
            style={{ width: "100%", maxHeight: "500px" }}
          />
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {data?.lectures[current]?.lectureTitle || "lecture title"}{" "}
            </h3>
          </div>
          {/* Display current watching lecture title */}
        </div>
        {/* lecture sidebar */}
        <div className="flex-col flex text-lg w-2/5 md:border-t-0 md:border-l md:pl-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {data?.lectures?.map((lecture, index) => (
              <Card
                key={lecture?._id}
                className="mb-3 hover:cursor-pointer transition transform"
              >
                <CardContent
                  className="flex items-center justify-between p-4 "
                  onClick={() => playLecture(index)} // Moved here
                >
                  <div className="flex items-center">
                    {isComleted ? (
                      <CheckCircle size={20} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture?.lectureTitle || "lecture title"}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded bg-green-100 text-green-600"
                  >
                    Completed
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseProgress;
