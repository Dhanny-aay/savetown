"use client";
import apple from "./assets/appleDownload.svg";
import play from "./assets/playDownload.svg";
import Image from "next/image";
import pro from "./assets/prooo.svg";
import { useEffect, useState } from "react";

export default function Download({ headings }) {
  const [pageTitle, setPageTitle] = useState("Download Our App");
  const [pageExcerpt, setPageExcerpt] = useState(
    "Create your own financial milestones based on your unique homeownership plan. Receive timely reminders to help you stay on track and celebrate every goal you achieve."
  );

  // Set the page title and excerpt based on headings passed as props
  const setDynamicHeading = () => {
    // Find the item with category "Features"
    const whyHeading = headings?.find(
      (heading) => heading.category === "DownloadApp"
    );

    if (whyHeading) {
      setPageTitle(whyHeading?.title || "Download Our App");
      setPageExcerpt(
        whyHeading?.excerpt ||
          "Create your own financial milestones based on your unique homeownership plan. Receive timely reminders to help you stay on track and celebrate every goal you achieve."
      );
    }
  };

  useEffect(() => {
    setDynamicHeading();
  }, [headings]);

  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <div className=" flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-between w-full">
        <div className=" w-full lg:w-[48%]">
          <h2 className=" text-[32px]">{pageTitle}</h2>
          <p className=" font-Manrope font-normal text-base text-[#000] mt-3">
            {pageExcerpt}
          </p>
          <div className=" flex mt-8 space-x-3 items-center">
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
        <div className=" w-full lg:w-[48%] gradient-bg h-[500px] rounded-[24px] flex items-center justify-center">
          <img src={pro.src} alt="pro" />
        </div>
      </div>
    </div>
  );
}
