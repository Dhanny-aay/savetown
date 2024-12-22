"use client";
import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Partners from "./components/partners";
import WhySavetown from "./components/whySavetown";
import Features from "./components/features";
import Works from "./components/works";
import Blog from "./components/blog";
import Testimony from "./components/testimony";
import Faq from "./components/faq";
import Download from "./components/download";
import Banner from "./components/banner";
import Footer from "./components/footer";
import Calculator from "./components/calculator";
import { useEffect, useState } from "react";
import { handleGetItemsWithParam } from "./userControllers/blogController";

export default function Home() {
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageTitle, setPageTitle] = useState("Message from Our CEO");
  const [pageExcerpt, setPageExcerpt] = useState(
    "Our vision and commitment to making homeownership accessible for all."
  );

  const fetchHeadings = async () => {
    const params = {
      type: "PageTitle",
      page: "Home",
    };
    try {
      const data = await handleGetItemsWithParam(params);
      if (data) {
        setHeadings(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadings();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      {/* our vision */}
      <div className="flex flex-col items-start justify-center w-full h-full px-4 py-12 md:py-16 md:px-14">
        <div className="block w-full p-6  bg-bgSecondary rounded-3xl lg:hidden">
          <Calculator />
        </div>

        <h3 className="mt-16 text-black ">Message from Our CEO</h3>
        <h2 className=" capitalize mt-3 max-w-[800px]">
          Our vision and commitment to making homeownership accessible for all.
        </h2>
        <div className=" w-full mt-12 bg-bgSecondary rounded-[32px] h-[450px]"></div>
      </div>
      {/* our partners */}
      <Partners />
      {/* Why Savetown? */}
      <WhySavetown />
      {/* our features */}
      <Features />
      {/* how it works */}
      <Works />
      {/* blog */}
      <Blog />
      {/* testimonial */}
      <Testimony />
      {/* faq */}
      <Faq />
      <Download />
      <Banner />
      <Footer />
    </>
  );
}
