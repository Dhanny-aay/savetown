"use client";
import { useState } from "react";
import LandingPage from "./landing-page/landing-page";
import AboutUs from "./about-us/about-us";
import Partners from "./partners";
import Testimonials from "./testimonials";
import Faq from "./faq";
import Blog from "./blog";
import Media from "./medias";
import Careers from "./careers";
import { useRouter } from "next/navigation";

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("Landing Page");

  // Define your navigation items
  const navItems = [
    { name: "Landing Page", id: "Landing-page" },
    { name: "About Us", id: "about-us" },
    { name: "Partner's", id: "partners" },
    { name: "Testimonial", id: "testimonial" },
    { name: "FAQ's", id: "faqs" },
    { name: "Blog", id: "blog" },
    { name: "Media's", id: "medias" },
    { name: "Career", id: "careers" },
  ];

  const router = useRouter;

  return (
    <div className="flex flex-col h-full w-full ">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-4 font-Manrope">
        <div className="flex items-center space-x-2">
          <button onClick={()=>router.back()}  className="text-[#ED1450] hover:underline text-base font-normal">
            &lt; Back
          </button>
          <h3 className="text-xl md:text-2xl font-bold text-black">
            Content Management
          </h3>
        </div>
      </div>

      <div className="p-3 space-y-6 font-Manrope">
        {/* Header Navigation */}
        <div className="flex space-x-6 border-b overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`pb-2 text-sm md:text-base font-semibold ${
                activeTab === item.name
                  ? "border-b-4 border-[#ED1450] text-[#ED1450]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Dynamic Second Header */}
        <div className="py-2">
          <h3 className="text-xl md:text-xl font-bold text-black">
            {activeTab}
          </h3>
        </div>

        <div>
          {activeTab === "Landing Page" ? (
            <LandingPage />
          ) : activeTab === "About Us" ? (
            <AboutUs />
          ) : activeTab === "Partner's" ? (
            <Partners />
          ) : activeTab === "Testimonial" ? (
            <Testimonials />
          ) : activeTab === "FAQ's" ? (
            <Faq />
          ) : activeTab === "Blog" ? (
            <Blog />
          ) : activeTab === "Media's" ? (
            <Media />
          ) : activeTab === "Career" ? (
            <Careers />
          ) : null}
        </div>
      </div>
    </div>
  );
}
