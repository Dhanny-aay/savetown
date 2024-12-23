"use client";
import { useEffect, useState } from "react";
import blog1 from "./assets/blog1.svg";
import blog2 from "./assets/blog2.svg";
import blog3 from "./assets/blog3.svg";
import { handleGetItemsWithParam } from "../userControllers/blogController";

export default function Blog({ headings }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const params = { type: "" };
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

  const blogs = [
    {
      image: blog1,
      title: "The Step-by-Step Guide to Owning Your First Home in Nigeria",
      excerpt:
        "From smart savings plans to mortgage applications, here’s how Savetown helps you achieve home ownership, stress-free.",
      date: "September 24th, 2023.",
    },
    {
      image: blog2,
      title: "Why Smart Savings is the Future of Home Ownership in Nigeria",
      excerpt:
        "Discover how structured savings with Savetown can fast-track your journey to home ownership and financial security.",
      date: "September 24th, 2023.",
    },
    {
      image: blog3,
      title: "How to Apply for a Mortgage in Nigeria: A Simple Guide",
      excerpt:
        "Savetown walks you through the mortgage application process, so you can secure funding for your dream home with ease.",
      date: "September 24th, 2023.",
    },
  ];

  const [pageTitle, setPageTitle] = useState("Our Latest Blog");
  const [pageExcerpt, setPageExcerpt] = useState(
    "Get expert tips and insights to guide your homeownership journey."
  );

  // Set the page title and excerpt based on headings passed as props
  const setDynamicHeading = () => {
    // Find the item with category "Features"
    const whyHeading = headings?.find(
      (heading) => heading.category === "LatestBlogs"
    );

    if (whyHeading) {
      setPageTitle(whyHeading?.title || "Our Latest Blog");
      setPageExcerpt(
        whyHeading?.excerpt ||
          " Get expert tips and insights to guide your homeownership journey."
      );
    }
  };

  useEffect(() => {
    setDynamicHeading();
  }, [headings]);

  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <h3>{pageTitle}</h3>
      <h2 className=" mt-3 max-w-[900px] text-center">{pageExcerpt}</h2>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {blogs.map((item, index) => (
          <div key={index} className=" border border-[#F3F0E9] rounded-[24px] ">
            <div
              style={{
                backgroundImage: `url(${item.image.src})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="  w-full h-[400px] lg:h-[290px] bg-[#F5F5F4] rounded-[15px]"
            ></div>

            <div className=" w-full p-6">
              <h2 className=" text-xl md:text-xl font-bold font-Manrope text-[#121212]">
                {item.title}
              </h2>
              <p className=" text-[#676767] mt-3 font-normal text-base font-Manrope">
                {item.excerpt}
              </p>
              <p className=" font-Manrope text-[#676767] text-lg font-medium mt-6">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className=" bg-btnPrimary rounded-[32px] leading-none px-6 py-[18px] text-white font-Manrope font-semibold text-base md:text-lg mt-16">
        View More
      </button>
    </div>
  );
}
