"use client";
import create from "./assets/create.svg";
import choose from "./assets/choose.svg";
import homeownership from "./assets/homeownership.svg";
import { useEffect, useState } from "react";
import { handleGetItemsWithParam } from "../userControllers/blogController";

export default function Works({ headings }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const params = { type: "HowItWorks", page: "Home" };
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

  const fallbackworks = [
    {
      image: create.src,
      title: "Create Your Account",
      excerpt: "Save at your pace with plans that match your financial goals.",
    },
    {
      image: choose.src,
      title: "Choose Your Plan",
      excerpt: "Select a savings plan that fits your budget and timeline.",
    },
    {
      image: homeownership.src,
      title: "Achieve Homeownership",
      excerpt:
        "Once your savings goal is reached, unlock the path to your new home.",
    },
  ];

  const itemsToRender = loading ? fallbackworks : items;

  const [pageTitle, setPageTitle] = useState("How It Works");
  const [pageExcerpt, setPageExcerpt] = useState(
    "Step-by-step guide to help you achieve your dream home."
  );

  // Set the page title and excerpt based on headings passed as props
  const setDynamicHeading = () => {
    // Find the item with category "Features"
    const whyHeading = headings?.find(
      (heading) => heading.category === "Howitworks"
    );

    if (whyHeading) {
      setPageTitle(whyHeading?.title || "How It Works");
      setPageExcerpt(
        whyHeading?.excerpt ||
          " Step-by-step guide to help you achieve your dream home."
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
        {itemsToRender.map((item, index) => (
          <div key={index} className=" bg-bgSecondary rounded-[20px] p-8">
            <img src={item.image} className=" w-full" alt="" />
            <h2 className=" mt-8 text-xl md:text-2xl font-normal">
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
