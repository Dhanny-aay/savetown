import Link from "next/link";
import Image from "next/image";
import herobg from "./assets/heroImg.svg";
import apple from "./assets/appleDownload.svg";
import play from "./assets/playDownload.svg";
import Calculator from "./calculator";

export default function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url(${herobg.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className=" h-svh md:h-[600px] lg:h-svh relative w-full flex justify-center items-center flex-col"
    >
      <div className=" w-full h-full absolute top-0 left-0 hero-bg z-[1]"></div>

      <div className="w-full h-full mt-12 flex flex-col justify-center items-start px-4 md:px-14 z-20">
        <div className=" w-full flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-center lg:justify-between">
          <div className=" w-full text-center leading-[42px] md:text-left md:max-w-[500px] lg:w-[48%]">
            <h1>Save smarter, Buy Sooner with Savetown</h1>
            <p className=" mt-3 font-Manrope text-[#fff] font-normal text-center md:text-left text-lg md:text-base lg:text-xl 2xl:text-2xl">
              Flexible home savings plans tailored for your journey to
              homeownership, with zero interest on savings and personalized
              support at every step.
            </p>
            <div className=" flex mt-8 space-x-3 items-center justify-center md:justify-normal">
              <Image
                src={apple.src}
                alt="App store"
                width={120}
                height={40}
                className=" cursor-pointer"
                priority
              />
              <Image
                src={play.src}
                alt="App store"
                width={120}
                height={40}
                className=" cursor-pointer"
                priority
              />
            </div>
          </div>
          <div className=" bg-bgSecondary p-6 w-[48%] rounded-3xl hidden lg:block">
            <Calculator />
          </div>
        </div>
      </div>
    </div>
  );
}
