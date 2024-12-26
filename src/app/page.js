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
  const [loadingHeading, setLoadingHeading] = useState(true);

  const [pageTitle, setPageTitle] = useState("Message from Our CEO");
  const [pageExcerpt, setPageExcerpt] = useState(
    "Our vision and commitment to making homeownership accessible for all."
  );
  const [pageLink, setPageLink] = useState(
    "https://www.youtube.com/embed/pnUhZw0LTLE?si=6i_jfP6pMFiCdrw7"
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
      setLoadingHeading(false);
    }
  };

  useEffect(() => {
    fetchHeadings();
  }, []);

  // Set the page title and excerpt based on headings passed as props
  const setDynamicHeading = () => {
    // Find the item with category "Features"
    const messaheHeading = headings.find(
      (heading) => heading.category === "CEOMessage"
    );

    if (messaheHeading) {
      setPageTitle(messaheHeading.title || "Message from Our CEO");
      setPageLink(
        messaheHeading.link ||
          "https://www.youtube.com/embed/pnUhZw0LTLE?si=6i_jfP6pMFiCdrw7"
      );
      setPageExcerpt(
        messaheHeading.excerpt ||
          "Our vision and commitment to making homeownership accessible for all."
      );
    }
  };

  useEffect(() => {
    setDynamicHeading();
  }, [headings, loadingHeading]);

  return (
    <>
      <Navbar />
      <Hero />
      {/* our vision */}
      <div className="flex flex-col items-start justify-center w-full h-full px-4 py-12 md:py-16 md:px-14">
        <div className="block w-full p-6  bg-bgSecondary rounded-3xl lg:hidden">
          <Calculator />
        </div>

        <h3 className="mt-16 text-black ">{pageTitle}</h3>
        <h2 className=" capitalize mt-3 max-w-[800px]">{pageExcerpt}</h2>
        <div className=" w-full mt-12 bg-bgSecondary rounded-[32px] h-[450px]">
          <iframe
            width="100%"
            height="450px"
            src={pageLink}
            title="Message from Our CEO"
            className=" rounded-[32px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
      {/* our partners */}
      <Partners headings={headings} />
      {/* Why Savetown? */}
      <WhySavetown headings={headings} />
      {/* our features */}
      <Features headings={headings} />
      {/* how it works */}
      <Works headings={headings} />
      {/* blog */}
      <Blog headings={headings} />
      {/* testimonial */}
      <Testimony headings={headings} />
      {/* faq */}
      <Faq headings={headings} />
      <Download headings={headings} />
      <Banner headings={headings} />
      <Footer />
    </>
  );
}
