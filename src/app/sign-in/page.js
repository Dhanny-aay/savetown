"use client";
import bgImg from "./assets/bgimage.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import Link from "next/link";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { handleLoginUser } from "../userControllers/authController";
import load from "./assets/load.gif";
import eye from "./assets/eye.svg";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateFields = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, validation passed
  };

  const onSuccess = (response) => {
    setLoading(false);

    if (response && response.access_token) {
      // If successful, navigate to the dashboard
      router.push("/dashboard");
    } else {
      // If invalid credentials, show an error
      console.log("Invalid credentials, please try again.");
    }
  };

  const onError = (error) => {
    setLoading(false);

    enqueueSnackbar(error.message || "Log in failed", {
      variant: "error",
    });
  };

  const handleSignin = (e) => {
    if (validateFields()) {
      e.preventDefault();
      setLoading(true);
      const userData = { email, password };
      handleLoginUser(userData, onSuccess, onError);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="  w-full h-svh flex justify-center items-center bg-[#f1f1f1] text-[#000]">
      <div className="w-full max-w-[1280px] lg:max-h-[650px] bg-[rgb(255,255,255)] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">
        <div
          style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="  bg-bgSecondary w-[50%] h-full relative lg:flex flex-col hidden justify-center"
        ></div>
        <div className=" w-full lg:w-[50%] h-full flex flex-col justify-center items-center px-4 md:px-12">
          <div className=" bg-white max-w-[570px] sign-shadow md:p-8 w-full rounded-2xl">
            <Link href="/">
              <img src={ArrowRight.src} className="" alt="" />
            </Link>
            <h2 className=" text-h5 md:text-h3 font-Yeseva mt-5">
              Welcome Back!
            </h2>
            <p className=" text-body12Regular md:text-body14Regular mt-1  text-[#737373]">
              Sign in to your account
            </p>

            <div className=" mt-6">
              <div className=" flex flex-col w-full">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={` mt-2 bg-white rounded-[32px] border ${
                    errors.email ? "border-[#DC3545]" : "border-[#D5D7DA]"
                  } w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className=" flex flex-col w-full mt-3">
                <label htmlFor="password" className=" relative">
                  Password
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={` mt-2 bg-white rounded-[32px] border ${
                      errors.password ? "border-[#DC3545]" : "border-[#D5D7DA]"
                    } w-full py-3 px-6 font-medium font-Manrope text-xs 2xl:text-lg placeholder:text-[#000000B2]`}
                    placeholder="Enter passsword"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-5 inset-y-0 flex items-center justify-center text-gray-500 right-4 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 3a7 7 0 015.83 10.9l1.48 1.48a1 1 0 01-1.42 1.42l-1.48-1.48A7 7 0 113 10a7 7 0 017-7zm0 2a5 5 0 00-4.58 7.18l1.5-1.5A3 3 0 0110 7a3 3 0 013 3c0 .39-.09.76-.24 1.1l1.5 1.5A5 5 0 0010 5zm0 2a1 1 0 100 2 1 1 0 000-2z" />
                      </svg>
                    ) : (
                      <img
                        src={eye.src}
                        alt="Show password"
                        width={16}
                        height={15}
                        priority
                      />
                    )}
                  </button>
                </label>
                {errors.password && (
                  <span className="text-[#DC3545] text-xs font-Manrope mt-2">
                    {errors.password}
                  </span>
                )}
              </div>
              <button
                onClick={handleSignin}
                disabled={loading}
                className=" bg-btnPrimary py-3 w-full rounded-[50px] mt-5 font-semibold font-Manrope text-white text-xs 2xl:text-lg flex justify-center items-center"
              >
                {loading ? (
                  <img src={load.src} className=" w-5" alt="" />
                ) : (
                  "Sign in"
                )}
              </button>
              <div className="text-center mt-3 w-full">
                <Link
                  href="/forgot-password"
                  className=" text-body14Bold text-[#8133F1] font-Manrope "
                >
                  Forgot Password?
                </Link>
                <span className=" text-body14Regular font-Manrope block text-[#595959] mt-4">
                  Don’t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className=" text-[#8133F1] text-body14Bold"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
