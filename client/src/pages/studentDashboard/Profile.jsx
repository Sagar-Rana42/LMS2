import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import React from "react";
import Course from "./Course";
import {
  useUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/features/api/authApi";
// import { data } from "react-router";

function Profile() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const { data: userData, isLoading ,refetch } = useUserProfileQuery();
  console.log("data = - ", userData)

  const [
    updateUserProfile,
    {
      data: updatedData,
      isLoading: upDatedIsLoading,
      isError: upDatedIsError,
      error: upDatedError,
    },
  ] = useUpdateUserProfileMutation();
  // console.log("data of updated ", updatedData);


  const photoHandler = (e) => {
    // console.log("target = ", e.target.files)
    const file = e.target.files[0];
    // console.log("file path = ", file);
    if (file) {
      setPhotoUrl(file);
    }
  };
  const user = userData && userData.user
  // mutation me square bracket lagate hai
  // query me curly bracket lagate ahi

  // console.log("data of my profile ", userData);

  const updateProfileHandler = async()=>{
    const formData = new FormData()
    formData.append("username",name)
    formData.append("photoUrl",photoUrl)
    // console.log(name, photo)
    await updateUserProfile(formData)
  }
  useEffect(()=>{
    refetch();
  },[])

  useEffect(() => {
    if (updatedData) {
      refetch()
      toast.success(updatedData?.msg || "Profile updated successfully");
    } else if (upDatedIsError) {
      console.log("error ", upDatedError);
      toast.error(upDatedError?.data?.msg || "Failed to update profile");
    }
  }, [updatedData, upDatedIsError]);
  
 
  
  return (
    <div className="my-24 max-w-4xl mx-auto px-4">
      <h1 className="font-bold text-2xl text-left max-sm:text-center">
        Profile
      </h1>

      <div className="flex flex-col items-start max-sm:items-center gap-5 my-5">
        <div className="flex flex-col  max-sm:items-center ">
          <Avatar className="h-24 w-30 md:32 md:h-32 ">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>profile</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="mb-2 ">
            <h2 className="font-semibold text-xl text-slate-300 ">
              Name:
              <span className="font-normal">{user?.username || "user name" }</span>
            </h2>
          </div>
          <div className="mb-2   ">
            <h2 className="font-semibold text-xl text-slate-300 ">
              email:
              <span className="font-normal">
                {user?.email || "xxx@gmail.com"}
              </span>
            </h2>
          </div>
          <div className="mb-2  ">
            <h2 className="font-semibold text-xl text-slate-300 ">
              Role:
              <span className="font-normal">{user?.role.toUpperCase()}</span>
            </h2>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gray-800  rounded-xl">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id={name}
                      value={name}
                      className="col-span-3"
                      placeholder="Name"
                      onChange= {(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Profile Photo
                    </Label>
                    <Input
                      type="file"
                      id="username"
                      className="col-span-3"
                      accept="image/*"
                      onChange={photoHandler}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    onClick={updateProfileHandler}
                  >
                    {upDatedIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please
                        wait
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-medium text-lg">Course you are enroll in </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4 my-5 ">
          {user && user?.enrolledCourses.length === 0 ? (
            <h2>you haven't enrolld in any course </h2>
          ) : (
            user && user?.enrolledCourses.map((course, index) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
