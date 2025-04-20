import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

import React from "react";

function Profile() {
  const user = false;
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
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="mb-2 ">
            <h2 className="font-semibold text-xl text-slate-300 ">
              Name:
              <span className="font-normal">Sagar rana</span>
            </h2>
          </div>
          <div className="mb-2   ">
            <h2 className="font-semibold text-xl text-slate-300 ">
              email:
              <span className="font-normal">Sagarrana@gmail.com</span>
            </h2>
          </div>
          <div className="mb-2  ">
            <h2 className="font-semibold text-xl text-slate-300 ">
              Role:
              <span className="font-normal">Instructor</span>
            </h2>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-gray-800  rounded-xl'>Edit Profile</Button>
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
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                      placeholder="Name"
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
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
