import NavDash from "../components/navDash";
import grid from "./assets/grid.svg";
import blog1 from "./assets/blog1.svg";
import blog2 from "./assets/blog2.svg";
import blog3 from "./assets/blog3.svg";
import Banner from "../components/banner";
import Footer from "../components/footer";

export default function Page() {
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

  return (
    <>
      <NavDash />
      <div className=" w-full hero-gradient h-[350px] relative flex flex-col items-center justify-center z-10 px-4 md:px-14">
        <img
          src={grid.src}
          className=" w-full absolute top-0 left-0 z-[1]"
          alt=""
        />
        <div className=" flex-col flex justify-center items-center z-10">
          <h1 className=" text-black">Our Blogs</h1>
          <p className=" font-Manrope text-base md:text-xl font-normal text-black mt-3 max-w-[800px] text-center">
            Explore expert tips, guides, and insights to help you navigate your
            journey to homeownership with ease.
          </p>
        </div>
      </div>
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8 -12">
          {blogs.map((item, index) => (
            <div
              key={index}
              className=" border border-[#F3F0E9] rounded-[24px] "
            >
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
      </div>
      <Banner />
      <Footer />
    </>
  );
}
