import blog1 from "./assets/blog1.svg";
import blog2 from "./assets/blog2.svg";
import blog3 from "./assets/blog3.svg";

export default function Blog() {
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

  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <h3>Our Latest Blog</h3>
      <h2 className=" mt-3 max-w-[900px] text-center">
        Get expert tips and insights to guide your homeownership journey.
      </h2>
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
