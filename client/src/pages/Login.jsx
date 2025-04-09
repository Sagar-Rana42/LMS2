import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Login() {

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [signupInput, setSignupInput] = useState({
    email: "",
    username: "",
    password: "",
    phone:"",
  });

  /*
  const changeInput = (e, type = "signup") => {
    console.log("calling signup  ", e.target.name);
    const { name, value } = e.target;
    if (type === "login") {
      setLoginInput({ ...loginInput, [name]: value });
      console.log(`login filed = ${loginInput.password}`);
      
    } else {
      setSignupInput({ ...signupInput, [name]: value });
    }
  };
  */


 const handleInputLogin = (e)=>{
    // console.log(`calling Login  ,4${e.target.name}  = ${e.target.value}`);
    const {name , value} = e.target
    setLoginInput({ ...loginInput , [name]:value})
 }

 const handleInputSignup = (e)=>{
    // console.log(`calling signup  , ${e.target.name} : ${e.target.value}`);
    const {name , value} = e.target
    setSignupInput({ ...signupInput , [name]:value})
 }

 const [registerUser , {data : registerData , isError:registerIsError , isLoading:registerIsLoading ,  isSuccess:registerIsSuccess}] = useRegisterUserMutation()
 console.log("register user from login page , after calling reguster user , " ,registerData)
 const [loginUser , {data: loginData , isError:loginIsError , isLoading:loginIsLoading , isSuccess:loginIsSuccess}] = useLoginUserMutation()
 console.log("login user from login page , after calling login user , " ,loginData)
  const handleRegistration = async (type)=>{
    const inputdata = type === "login" ? loginInput : signupInput
    // console.log(`registration data of ${type} ` , data);
    const action = type === "signup" ? registerUser : loginUser
    
    await action(inputdata)
    
  }

  

  return (
    <div className=" w-full flex  justify-center mt-40">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login your account here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="Email">Email</Label>
                <Input
                  id="Email"
                  placeholder="Your Email"
                  className="rounded"
                  required={true}
                  name="email"
                  // onChange={(e) => changeInput(e, "login")}
                  onChange =  {handleInputLogin}
                  value={loginInput.email}

                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter password"
                  className="rounded"
                  name="password"
                  // onChange={(e) => changeInput(e, "login")}
                  onChange =  {handleInputLogin}
                  required={true}
                  value={loginInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={()=>(handleRegistration("login"))} >
              {
                loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  </>
                ):"Login"
              }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="Signup">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>Create account here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name"> Username</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your username"
                  required={true}
                  className="rounded"
                  name="username"
                  onChange={handleInputSignup}
                  value={signupInput.username}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email"> Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  required={true}
                  className="rounded"
                  name="email"
                  onChange={handleInputSignup}
                  value={signupInput.email}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="pass">Password</Label>
                <Input
                  id="pass"
                  type="password"
                  placeholder="password"
                  required={true}
                  className="rounded"
                  name="password"
                  onChange =  {handleInputSignup}
                  value={signupInput.password}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">phone</Label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="phone number"
                  required={true}
                  className="rounded"
                  name="phone"
                  onChange =  {handleInputSignup}
                  value={signupInput.phone}
                />
              </div>
            </CardContent>
            <CardFooter>

            <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {
                  registerIsLoading ? (
                    <>
                    <Loader2  />please wait
                    </>
                  ):"sign up"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
