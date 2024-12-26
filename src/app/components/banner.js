"use client";
import { useEffect, useState } from "react";

export default function Banner({ headings }) {
  const [pageTitle, setPageTitle] = useState(
    "Start your journey to homeownership with Savetown."
  );
  const [pageExcerpt, setPageExcerpt] = useState(
    " Create your free account and start saving towards a home that’s yours to own."
  );

  // Set the page title and excerpt based on headings passed as props
  const setDynamicHeading = () => {
    // Find the item with category "Features"
    const whyHeading = headings?.find(
      (heading) => heading.category === "GetStarted"
    );

    if (whyHeading) {
      setPageTitle(
        whyHeading?.title ||
          "Start your journey to homeownership with Savetown."
      );
      setPageExcerpt(
        whyHeading?.excerpt ||
          "Create your free account and start saving towards a home that’s yours to own."
      );
    }
  };

  useEffect(() => {
    setDynamicHeading();
  }, [headings]);

  return (
    <div className=" w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <div className=" w-full h-[450px] gradient-bg1 rounded-[40px] flex flex-col items-center justify-center p-12">
        <h2 className=" w-full text-2xl md:text-[32px] lg:max-w-[700px] text-center text-white">
          {pageTitle}
        </h2>
        <p className=" text-center mt-3 font-Manrope text-base md:text-lg lg:text-xl text-white md:max-w-[650px]">
          {pageExcerpt}
        </p>

        <div className="  bg-white p-3 mt-8 rounded-[64px] flex  lg:space-x-2 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Your Email Address"
            className=" py-3 px-2 border-0 focus:border-0 w-2/3 md:w-3/4 lg:w-auto rounded-[32px] active:border-0 font-Manrope font-normal text-sm md:text-base text-black"
          />
          <button className="  md:px-0 bg-btnPrimary w-1/3 md:w-1/4 lg:w-auto rounded-[32px] lg:px-6 py-4 flex items-center justify-center text-center text-sm md:text-base font-Manrope text-white font-semibold leading-none">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
