"use client";
import { useState } from "react";
import down from "./assets/caretDown.svg";

export default function Housing() {
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

  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropDown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {faqs.map((faq, index) => (
        <div
          key={index}
          onClick={() => toggleDropDown(index)}
          className={`border-y py-6 w-full faq border-[#F3F0E933]${
            openIndex === index ? " active" : ""
          }`}
        >
          <div className="flex flex-row w-full justify-between items-center">
            <p className="font-Manrope text-[#000000] text-base md:text-lg font-normal">
              {faq.question}
            </p>
            <img
              src={down.src}
              className={`${
                openIndex === index ? "transform rotate-180" : ""
              } transition-transform duration-300`}
              alt=""
            />
          </div>
          <div className={`answer${openIndex === index ? " open" : ""}`}>
            <p className="font-Manrope text-[#282D2D] font-normal text-sm md:text-base mt-5 transition-all duration-500">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
