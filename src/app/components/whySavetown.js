"use client";
import pay from "./assets/payicon.svg";
import plan from "./assets/planicon.svg";
import percent from "./assets/percent.svg";
import { handleGetItemsWithParam } from "../userControllers/blogController";
import { useEffect, useState } from "react";

export default function WhySavetown({ headings }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const params = { type: "Why ", page: "Home" };
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

  const [pageTitle, setPageTitle] = useState("Why Savetown?");
  const [pageExcerpt, setPageExcerpt] = useState(
    "Discover the benefits that set us apart from traditional saving methods."
  );

  // Set the page title and excerpt based on headings passed as props
  const setDynamicHeading = () => {
    // Find the item with category "Features"
    const whyHeading = headings?.find(
      (heading) => heading.category === "WhySavetown"
    );

    if (whyHeading) {
      setPageTitle(whyHeading?.title || "Why Savetown?");
      setPageExcerpt(
        whyHeading?.excerpt ||
          " Discover the benefits that set us apart from traditional saving methods."
      );
    }
  };

  useEffect(() => {
    setDynamicHeading();
  }, [headings]);

  const fallbackreasons = [
    {
      image: pay.src,
      title: "Flexible Payment Plans",
      excerpt: "Save at your pace with plans that match your financial goals.",
    },
    {
      image: plan.src,
      title: "Personalized Plans",
      excerpt:
        "We offer tailored savings plans based on your income and target.",
    },
    {
      image: percent.src,
      title: "Interest-Free Savings",
      excerpt:
        "Your savings grow towards homeownership with no hidden charges or interest rates..",
    },
  ];

  const itemsToRender = loading ? fallbackreasons : items;

  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <h3 className=" text-center">{pageTitle}</h3>
      <h2 className=" max-w-[900px] text-center mt-3">{pageExcerpt}</h2>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {itemsToRender.map((item, index) => (
          <div key={index} className=" bg-bgSecondary rounded-[20px] p-8">
            <img
              src={item.image}
              className=" w-16 h-16 md:w-24 md:h-24"
              alt=""
            />
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
