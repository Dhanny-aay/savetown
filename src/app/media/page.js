import grid from "./assets/grid.svg";
import NavDash from "../components/navDash";
import blog1 from "./assets/blog1.svg";
import Banner from "../components/banner";
import Footer from "../components/footer";
import left from "./assets/caretleft.svg";
import right from "./assets/caretright.svg";

export default function Page() {
  const vids = [
    {
      image: blog1,
      title: "The Step-by-Step Guide to Owning Your First Home in Nigeria",
    },
    {
      image: blog1,
      title: "The Step-by-Step Guide to Owning Your First Home in Nigeria",
    },
    {
      image: blog1,
      title: "The Step-by-Step Guide to Owning Your First Home in Nigeria",
    },
  ];
  const gallery = [
    {
      image: blog1,
      title: "The Step-by-Step Guide to Owning Your First Home in Nigeria",
    },
    {
      image: blog1,
      title: "The Step-by-Step Guide to Owning Your First Home in Nigeria",
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
          <h1 className=" text-black">Media</h1>
          <p className=" font-Manrope text-base md:text-xl font-normal text-black mt-3 max-w-[800px] text-center">
            Explore our journey through videos and images, showcasing key
            moments, special events, and the faces behind Savetown's mission to
            make homeownership a reality.
          </p>
        </div>
      </div>
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <h2 className=" text-[32px] font-normal">Our Videos</h2>
        <p className=" font-Manrope font-normal text-base md:text-lg text-black mt-3">
          Catch up on the latest events, interviews, and behind-the-scenes
          moments from Savetown.
        </p>

        <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {vids.map((item, index) => (
            <div key={index}>
              <div className=" h-[290px] bg-[#F5F5F4] rounded-[15px] w-full"></div>
              <h2 className=" mt-6 font-Manrope font-semibold text-base md:text-xl">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <h2 className=" text-[32px] font-normal">Our Gallery</h2>
        <p className=" font-Manrope font-normal text-base md:text-lg text-black mt-3">
          Explore our gallery featuring highlights from key events and memorable
          moments.
        </p>

        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {gallery.map((item, index) => (
            <div key={index}>
              <div className=" h-[290px] bg-[#F5F5F4] rounded-[15px] w-full"></div>
              <h2 className=" mt-6 font-Manrope font-semibold text-xl">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
        <div className=" w-full mt-8 py-4 flex items-center justify-between">
          <button className="border-[#EAEBF0] border rounded-[32px] flex items-center space-x-2 font-Manrope font-semibold text-sm text-black px-6 py-4">
            <img src={left.src} alt="" />
            <p>Previous</p>
          </button>
          <p className="font-Manrope font-medium text-sm text-[#00000080]">
            Page 1 of 2
          </p>
          <button className="border-[#EAEBF0] border rounded-[32px] flex items-center space-x-2 font-Manrope font-semibold text-sm text-black px-6 py-4">
            <p>Next</p>
            <img src={right.src} alt="" />
          </button>
        </div>
      </div>
      <Banner />
      <Footer />
    </>
  );
}
