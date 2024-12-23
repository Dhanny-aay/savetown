"use client";
import avatar from "./assets/avatar.svg";
import prev from "./assets/prev.svg";
import paginate from "./assets/paginate.svg";
import next from "./assets/next.svg";
import { useEffect, useRef, useState } from "react";
import { handleGetItemsWithParam } from "../userControllers/blogController";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Testimony({ headings }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null); // Reference for Swiper instance
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide

  const goToNextSlide = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const goToPrevSlide = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const fetchItems = async () => {
    const params = { type: "Testimonials ", page: "Home" };
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

  const fallbackTestimonials = [
    {
      image: avatar.src,
      title: "Adeola Adeyemi",
      description:
        "Savetown made my homeownership journey so much easier. I loved how I could set my savings plan and track my progress all in one place. Now, I’m closer to owning my first home than I ever thought possible!",
      excerpt: "Lagos, Nigeria",
    },
    {
      image: avatar.src,
      title: "Adeola Adeyemi",
      description:
        "Savetown made my homeownership journey so much easier. I loved how I could set my savings plan and track my progress all in one place. Now, I’m closer to owning my first home than I ever thought possible!",
      excerpt: "Lagos, Nigeria",
    },
    {
      image: avatar.src,
      title: "Adeola Adeyemi",
      description:
        "Savetown made my homeownership journey so much easier. I loved how I could set my savings plan and track my progress all in one place. Now, I’m closer to owning my first home than I ever thought possible!",
      excerpt: "Lagos, Nigeria",
    },
  ];

  const itemsToRender = loading ? fallbackTestimonials : items;

  const [pageTitle, setPageTitle] = useState("Our Customer’s Reviews gggghhgg");
  const [pageExcerpt, setPageExcerpt] = useState(
    "Hear from our satisfied customers."
  );

  // Set the page title and excerpt based on headings passed as props
  const setDynamicHeading = () => {
    // Find the item with category "Features"
    const whyHeading = headings?.find(
      (heading) => heading.category === "OurReviews"
    );

    if (whyHeading) {
      setPageTitle(whyHeading?.title || "Our Customer’s Reviews ghgghghg");
      setPageExcerpt(
        whyHeading?.excerpt || "Hear from our satisfied customers."
      );
    }
  };

  useEffect(() => {
    setDynamicHeading();
  }, [headings]);

  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center  px-4 md:px-14">
      <h3>{pageTitle}</h3>
      <h2 className=" mt-3 max-w-[900px] text-center">{pageExcerpt}</h2>
      <Swiper
        pagination={{
          clickable: true,
          el: ".testi-pagination",
        }}
        modules={[Pagination]}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        }}
        onInit={(swiper) => {
          swiperRef.current = swiper; // Store the Swiper instance
          setActiveIndex(swiper.activeIndex); // Set initial index
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on change
        className="mt-12 w-full"
      >
        {itemsToRender.map((item, index) => (
          <SwiperSlide key={index} className=" w-full">
            <div className=" bg-bgSecondary rounded-[20px] p-8">
              <p className=" text-[#000000B2] mt-3 font-normal text-base font-Manrope">
                {item.description}
              </p>
              <div className=" flex items-start space-x-[14px] mt-10">
                <img
                  src={item.image}
                  className=" w-12 h-12 rounded-full"
                  alt=""
                />
                <span className=" space-y-2">
                  <h2 className=" text-xl md:text-2xl font-normal">
                    {item.title}
                  </h2>
                  <p className=" font-Manrope text-[#00000099] font-normal text-base">
                    {item.excerpt}
                  </p>
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex mt-16 items-center space-x-8">
        <img
          onClick={goToPrevSlide}
          src={prev.src}
          className=" cursor-pointer"
          alt=""
        />
        <div className="testi-pagination flex justify-center w-full items-center space-x-1"></div>
        <img
          onClick={goToNextSlide}
          src={next.src}
          className=" cursor-pointer"
          alt=""
        />
      </div>
    </div>
  );
}
