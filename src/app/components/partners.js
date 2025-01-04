"use client";
import { useEffect, useState } from "react";
import du from "./assets/du.svg";
import fa from "./assets/fa.svg";
import { handleGetItemsWithParam } from "../userControllers/blogController";

export default function Partners({ headings }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const params = { type: "Partners", page: "Home" };
    try {
      const data = await handleGetItemsWithParam(params);
      if (data) {
        setItems(data.data);
      }
    } catch (error) {
      console.log("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [pageTitle, setPageTitle] = useState("Our Partners");

  // Set the page title and excerpt based on headings passed as props
  const setDynamicHeading = () => {
    // Find the item with category "Features"
    const partnerHeading = headings?.find(
      (heading) => heading.category === "Partners"
    );

    if (partnerHeading) {
      setPageTitle(partnerHeading?.title || "Our Partners");
    }
  };

  useEffect(() => {
    setDynamicHeading();
  }, [headings]);

  const fallbackPartners = [
    {
      title: "Design Union",
      image: du.src,
      excerpt: "Real estate development & Advisory",
    },
    { title: "Future Africa", image: fa.src, excerpt: "Technology partners" },
  ];

  const itemsToRender = loading ? fallbackPartners : items;

  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
      <h2 className=" text-center w-full">{pageTitle}</h2>

      <div className=" w-full flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-between mt-16">
        {itemsToRender.map((item, index) => (
          <div key={index} className=" w-full lg:w-[48%]">
            <div className=" w-full h-[200px] bg-bgSecondary rounded-[15px] flex items-center justify-center">
              <img src={item.image} className=" w-[27%]" alt={item.title} />
            </div>
            <h2 className=" mt-3 text-xl md:text-2xl font-normal">
              {item.title}
            </h2>
            <p className=" text-[#000000B2] mt-3 font-normal text-base font-Manrope">
              {item.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
