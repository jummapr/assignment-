import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schema/register";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";
import { TriangleAlert } from "lucide-react";
import { cn } from "../../lib/utils";
import UserAvatarImage from "../../assets/user.png";
import { Toaster, toast } from 'sonner'

const SignUpForm = () => {
  const [avatar, setAvatar] = React.useState(null);
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const [registerUser, { isError, data, error, isSuccess, isLoading,message }] =
    useRegisterUserMutation();

    console.log(isError, isSuccess, isLoading, message, data, error)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      setValue("name", "");
      setValue("username", "");
      setValue("email", "");
      setValue("password", "");
      setValue("location", "");
      setAvatar(null);
      setAvatarUrl(null);

      toast.success(`Please check your email ${data.data.email}`)
    }

    if (isError) {
      toast.error(error.data.message)
    }
  }, [isSuccess, isError]);

  const onAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarUrl(file);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("location", data.location);
    formData.append("file", avatarUrl);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    await registerUser(formData);
  };



  // console.log("ISError", isError);
  // console.log("error", error);
  // console.log("isSuccess", isSuccess);
  // console.log("isLoading", isLoading);
  return (
    <div className="flex justify-center flex-col md:flex md:flex-col md:justify-center md:pl-20">
      <h2 className="font-semibold text-3xl pb-9">Sign Up to dribble</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center w-[21rem] lg:w-[27rem] md:w-[27rem] gap-y-5">
          <div className="flex items-center gap-4 w-full">
            <div className="w-full">
              <label
                htmlFor="name "
                className="font-semibold flex gap-1 items-center "
              >
                {errors.name && (
                  <TriangleAlert className="w-4 h-4 text-red-400" />
                )}
                Name
              </label>
              <Input
                className={cn(
                  "border-0 bg-[#f3f3f3] w-full ",
                  errors.name && "bg-red-100 placeholder:text-red-400"
                )}
                id="name"
                {...register("name")}
                placeholder="Name"
              />
              <p className="text-red-600 capitalize text-xs md:text-sm lg:text-sm pt-1">{errors.name?.message}</p>
            </div>
            <div className="w-full">
              <label
                htmlFor="name "
                className="font-semibold flex gap-1 items-center"
              >
                {errors.username && (
                  <TriangleAlert className="w-4 h-4 text-red-400" />
                )}
                Username
              </label>
              <Input
                className={cn(
                  "border-0 bg-[#f3f3f3] w-full ",
                  errors.username && "bg-red-100 placeholder:text-red-400"
                )}
                id="name"
                {...register("username")}
                placeholder="Username"
              />
              <p className="text-red-600 capitalize text-xs md:text-sm lg:text-sm  pt-1">{errors.username?.message}</p>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="name "
              className="font-semibold flex gap-1 items-center"
            >
              {errors.email && (
                <TriangleAlert className="w-4 h-4 text-red-400" />
              )}
              Email
            </label>
            <Input
              className={cn(
                "border-0 bg-[#f3f3f3] w-full ",
                errors.email && "bg-red-100 placeholder:text-red-400"
              )}
              id="name"
              {...register("email")}
              placeholder="example@gmail.com"
            />
            <p className="text-red-600 capitalize text-xs md:text-sm lg:text-sm pt-1">{errors.email?.message}</p>
          </div>
          <div className="w-full">
            <label
              htmlFor="name"
              className="font-semibold flex gap-1 items-center"
            >
              {errors.password && (
                <TriangleAlert className="w-4 h-4 text-red-400" />
              )}
              Password
            </label>
            <Input
              className={cn(
                "border-0 bg-[#f3f3f3] w-full ",
                errors.password && "bg-red-100 placeholder:text-red-400"
              )}
              id="name"
              {...register("password")}
              placeholder="6+ characters"
            />
            <p className="text-red-600 capitalize text-xs md:text-sm lg:text-sm pt-1">{errors.password?.message}</p>
          </div>
          <div className="w-full flex items-center gap-2">
            {avatar ? (
              <Avatar>
                <AvatarImage src={avatar} />
              </Avatar>
            ) : (
              <Avatar>
                <AvatarImage src={UserAvatarImage} />
              </Avatar>
            )}
            <div className="w-full">
              <label htmlFor="name " className="font-semibold">
                Avatar
              </label>
              <Input
                type="file"
                className="border-0 bg-[#f3f3f3] w-full"
                id="name"
                onChange={(e) => onAvatarChange(e)}
                placeholder="Please select your image."
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="name "
              className="font-semibold flex gap-1 items-center"
            >
              {errors.location && (
                <TriangleAlert className="w-4 h-4 text-red-400" />
              )}
              Location
            </label>
            <Input
              type="text"
              className={cn(
                "border-0 bg-[#f3f3f3] w-full ",
                errors.location && "bg-red-100 placeholder:text-red-400"
              )}
              id="name"
              {...register("location")}
              placeholder="Location"
            />
            <p className="text-red-600 capitalize text-xs md:text-sm lg:text-sm pt-1">{errors.location?.message}</p>
          </div>
          <div className="w-full flex justify-start ">
            <Button
              type="submit"
              className="w-44 bg-[#ea4b8b] hover:bg-pink-400"
              disabled={isLoading}
            >
              Create account
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
