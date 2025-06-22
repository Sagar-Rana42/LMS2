import { GraduationCap, Menu, PersonStanding, icons } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  // console.log("user = ",user)

  const role = "instructor";
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
    // refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.msg || "User log out successfully");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div
      className="h-16 backdrop-blur-lg
     	bg-[#001005] text-white   fixed top-0 left-0 right-0 duration-300 z-10"
    >
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <GraduationCap size={"30"} />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl">
              Codesphare
            </h1>
          </Link>
        </div>
        {/* User icons and dark mode icon  */}
        <div className="flex items-center gap-8 text-white">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl} alt="user avatar" />
                  <AvatarFallback>
                    <PersonStanding className="w-6 h-6 text-white" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-900 text-white border border-slate-700 shadow-lg rounded-md">
                <DropdownMenuLabel className="text-white">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link
                      to="my-learning"
                      className="text-white hover:text-amber-400 duration-200"
                    >
                      My learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to="profile"
                      className="text-white hover:text-amber-400 duration-200"
                    >
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white hover:text-red-400 duration-200"
                    onClick={logoutHandler}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin/dashboard"
                        className="w-full h-10 flex items-center justify-center rounded-xl
                                  bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 
                                  text-black font-semibold hover:brightness-110 transition-all duration-300"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2 ">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="rounded  font-bold bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-transparent  text-black hover:bg-amber-600"
              >
                Login
              </Button>
              <Button 
               onClick={()=>navigate("/login")} className="rounded font-bold    hover:bg-amber-400 hover:text-black duration-300">
                Signup
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile device  */}
      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">Codesphare</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="rounded-full hover:bg-gray-500"
              variant="outline"
            >
              <Menu size={30} /> {/* Increased icon size */}
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col backdrop-blur-lg bg-gray-800 text-white">
            <SheetHeader className="flex flex-row items-center justify-between mt-2">
              <SheetTitle>
                <SheetClose asChild>
                  <Link to="/">Codesphare</Link>
                </SheetClose>
              </SheetTitle>
            </SheetHeader>

            <Separator className="mr-2" />

            <nav className="flex flex-col space-y-4 mt-4">
              <SheetClose asChild>
                <Link to="/my-learning">My Learning</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/profile">Edit Profile</Link>
              </SheetClose>
              <SheetClose asChild>
                <p onClick={logoutHandler} className="hover:cursor-pointer">
                  Log out
                </p>
              </SheetClose>
            </nav>

            {user?.role === "instructor" && (
              <SheetFooter className="mt-4">
                <SheetClose asChild>
                  <Link to={"/admin/dashboard"}>
                    <Button
                      type="submit"
                      className="bg-green-400 rounded text-black hover:bg-green-700 hover:text-gray-700 duration-300"
                    >
                      Dashboard
                    </Button>
                  </Link>
                </SheetClose>
              </SheetFooter>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;

// const MobileNavbar = () => {

//   const role = "instructor"
//   return (
//             <Sheet>
//           <SheetTrigger asChild>
//             <Button
//               size="icon"

//               className="rounded-full hover:bg-gray-500"
//               variant="outline"
//             >
//               <Menu />
//             </Button>
//           </SheetTrigger>
//           <SheetContent className="flex flex-col">
//             <SheetHeader className="flex flex-row items-center justify-between mt-2">
//               <SheetTitle> <Link to="/">Codesphare</Link></SheetTitle>

//             </SheetHeader>
//             <Separator className="mr-2" />
//             <nav className="flex flex-col space-y-4">
//               <Link to="/my-learning">My Learning</Link>
//               <Link to="/profile">Edit Profile</Link>
//               {/* <Link to="/logout">Log out</Link> */}
//               <p onClick={logoutHandler} className="hover:cursor-pointer" >Log out</p>
//             </nav>
//             {user?.role === "instructor" && (
//               <SheetFooter>
//                 <SheetClose asChild>
//                   <Button type="submit" className='bg-green-400 rounded text-black hover:bg-green-700 hover:text-gray-700 duration-300'>Dashboard</Button>
//                 </SheetClose>
//               </SheetFooter>
//             )}
//           </SheetContent>
//         </Sheet>
//     );
//   };
