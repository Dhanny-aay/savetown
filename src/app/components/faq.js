"use client";
import { useEffect, useState } from "react";
import down from "./assets/caretDown.svg";
import { handleGetItemsWithParam } from "../userControllers/blogController";

export default function Faq({ headings }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const params = { type: "FAQ ", page: "Home" };
    try {
      const data = await handleGetItemsWithParam(params);
      if (data) {
        setItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const faqs = [
    {
      question: "What is Savetown?",
      answer:
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit curae fusce ex euismod imperdiet sit mus. Vehicula senectus finibus sodales conubia; dictum quis non rutrum gravida. Pulvinar mus tempor venenatis natoque pretium tempus. Mattis nascetur id sem fames a libero ipsum finibus. Magnis luctus montes arcu molestie quisque; ultricies egestas viverra.",
    },
    {
      question: "How does the Savetown model work?",
      answer:
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit curae fusce ex euismod imperdiet sit mus. Vehicula senectus finibus sodales conubia; dictum quis non rutrum gravida. Pulvinar mus tempor venenatis natoque pretium tempus. Mattis nascetur id sem fames a libero ipsum finibus. Magnis luctus montes arcu molestie quisque; ultricies egestas viverra.",
    },
    {
      question: "Who is eligible to participate in Savetown?",
      answer:
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit curae fusce ex euismod imperdiet sit mus. Vehicula senectus finibus sodales conubia; dictum quis non rutrum gravida. Pulvinar mus tempor venenatis natoque pretium tempus. Mattis nascetur id sem fames a libero ipsum finibus. Magnis luctus montes arcu molestie quisque; ultricies egestas viverra.",
    },
    {
      question: "Who are the key partners and collaborators of Savetown?",
      answer:
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit curae fusce ex euismod imperdiet sit mus. Vehicula senectus finibus sodales conubia; dictum quis non rutrum gravida. Pulvinar mus tempor venenatis natoque pretium tempus. Mattis nascetur id sem fames a libero ipsum finibus. Magnis luctus montes arcu molestie quisque; ultricies egestas viverra.",
    },
    {
      question: "Is Savetown a Real Estate Investment Trust (REIT)?",
      answer:
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit curae fusce ex euismod imperdiet sit mus. Vehicula senectus finibus sodales conubia; dictum quis non rutrum gravida. Pulvinar mus tempor venenatis natoque pretium tempus. Mattis nascetur id sem fames a libero ipsum finibus. Magnis luctus montes arcu molestie quisque; ultricies egestas viverra.",
    },
  ];

  const [pageTitle, setPageTitle] = useState("Our FAQs");
  const [pageExcerpt, setPageExcerpt] = useState("Frequently Asked Questions");

  // Set the page title and excerpt based on headings passed as props
  const setDynamicHeading = () => {
    // Find the item with category "Features"
    const whyHeading = headings?.find(
      (heading) => heading.category === "OurFAQs"
    );

    if (whyHeading) {
      setPageTitle(whyHeading?.title || "Our FAQs");
      setPageExcerpt(whyHeading?.excerpt || "Frequently Asked Questions");
    }
  };

  useEffect(() => {
    setDynamicHeading();
  }, [headings]);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropDown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <h3>{pageTitle}</h3>
      <h2 className=" mt-3 max-w-[900px] text-center">{pageExcerpt}</h2>
      <div className="mt-16 w-full">
        {items.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleDropDown(index)}
            className={`border-y py-6 w-full faq border-[#F3F0E933]${
              openIndex === index ? " active" : ""
            }`}
          >
            <div className="flex flex-row w-full justify-between items-center">
              <p className="font-Manrope text-[#000000] text-base md:text-lg font-normal w-full">
                {faq.title}
              </p>
              <img
                src={down.src}
                className={`${
                  openIndex === index ? "transform rotate-180" : ""
                } transition-transform duration-300`}
                alt=""
              />
            </div>
            <div
              className={`w-full answer${openIndex === index ? " open" : ""}`}
            >
              <p className="font-Manrope w-full text-[#282D2D] font-normal text-sm md:text-base mt-5 transition-all duration-500">
                {faq.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className=" bg-btnPrimary rounded-[32px] px-6 py-[18px] text-white font-Manrope font-semibold text-base md:text-lg mt-16 leading-none">
        View More
      </button>
    </div>
  );
}
