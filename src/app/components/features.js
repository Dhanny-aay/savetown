"use client";
import woman from "./assets/woman.svg";
import yellowstairs from "./assets/yellowstairs.svg";
import flex from "./assets/flex.svg";
import { useEffect, useState } from "react";
import { handleGetItemsWithParam } from "../userControllers/blogController";

export default function Features() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const params = { type: "Features ", page: "Home" };
    try {
      const data = await handleGetItemsWithParam(params);
      if (data) {
        setItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fallbackFeatures = [
    {
      title: "Enjoy Flexible Savings Plans",
      excerpt: `Life doesn’t always go as planned, and your savings plan shouldn’t
            either. Our flexible withdrawal feature lets you adjust your
            contributions to fit your current financial situation—without the
            stress of penalties.`,
      image: woman.src,
    },
    {
      title: "Set Custom Milestones to Stay Motivated",
      excerpt: `Create your own financial milestones based on your unique
            homeownership plan. Receive timely reminders to help you stay on
            track and celebrate every goal you achieve.`,
      image: yellowstairs.src,
    },
    {
      title: "Enjoy Flexible Savings Plans That Work for You",
      excerpt: `Life doesn’t always go as planned, and your savings plan shouldn’t
            either. Our flexible withdrawal feature lets you adjust your
            contributions to fit your current financial situation—without the
            stress of penalties.`,
      image: flex.src,
    },
  ];

  const featuresToRender = items.length > 0 ? items : fallbackFeatures;

  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <h3 className=" text-center">Our Features</h3>
      <h2 className=" max-w-[900px] text-center mt-3">
        Every tool you need to track and manage your homeownership savings.
      </h2>

      <div className=" mt-16 flex items-center flex-col gap-8 lg:gap-0 lg:flex-row w-full justify-between">
        <div
          style={{
            backgroundImage: `url(${
              featuresToRender[0]?.image || fallbackFeatures[0].image
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[500px]"
        ></div>
        <div className=" w-full lg:w-[48%]">
          <h2 className=" text-2xl leading-[36px]">
            {featuresToRender[0]?.title || fallbackFeatures[0].title}
          </h2>
          <p className=" font-Manrope font-normal text-base text-black mt-3">
            {featuresToRender[0]?.excerpt || fallbackFeatures[0].excerpt}
          </p>

          <button className=" bg-btnPrimary mt-8 lg:mt-16 rounded-[32px] px-6 py-[18px] font-semibold text-lg text-white leading-[1]">
            Get Started
          </button>
        </div>
      </div>
      <div className=" mt-16 flex items-center flex-col-reverse gap-8 lg:gap-0 lg:flex-row w-full justify-between">
        <div className=" w-full lg:w-[48%]">
          <h2 className=" text-2xl leading-[36px]">
            {featuresToRender[1]?.title || fallbackFeatures[1].title}
          </h2>
          <p className=" font-Manrope font-normal text-base text-black mt-3">
            {featuresToRender[1]?.excerpt || fallbackFeatures[1].excerpt}
          </p>

          <button className=" bg-btnPrimary mt-8 lg:mt-16 rounded-[32px] px-6 py-[18px] font-semibold text-lg text-white leading-[1]">
            Get Started
          </button>
        </div>
        <div
          style={{
            backgroundImage: `url(${
              featuresToRender[1]?.image || fallbackFeatures[1].image
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[500px]"
        ></div>
      </div>

      <div className=" mt-16 flex items-center flex-col gap-8 lg:gap-0 lg:flex-row w-full justify-between">
        <div
          style={{
            backgroundImage: `url(${
              featuresToRender[2]?.image || fallbackFeatures[2].image
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[500px]"
        ></div>
        <div className=" w-full lg:w-[48%]">
          <h2 className=" text-2xl leading-[36px]">
            {featuresToRender[2]?.title || fallbackFeatures[2].title}
          </h2>
          <p className=" font-Manrope font-normal text-base text-black mt-3">
            {featuresToRender[2]?.excerpt || fallbackFeatures[2].excerpt}
          </p>

          <button className=" bg-btnPrimary mt-8 md:mt-16 rounded-[32px] px-6 py-[18px] font-semibold text-lg text-white leading-[1]">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
