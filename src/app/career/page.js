import pin from "./assets/map-pin.svg";
import clock from "./assets/clock.svg";
import grid from "./assets/grid.svg";
import NavDash from "../components/navDash";
import arrowright from "./assets/arrow-up-right.svg";
import Banner from "../components/banner";
import Footer from "../components/footer";

export default function page() {
  const jobs = [
    {
      title: "Product Designer",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Engineering Manager",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Customer Success Manager",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Account Executive",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "SEO Marketing Manager",
      location: "Remote",
      type: "Full-time",
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
        <div className="z-10 flex flex-col items-center justify-center ">
          <h1 className="text-black ">Career</h1>
          <p className=" font-Manrope text-base md:text-xl font-normal text-black mt-3 max-w-[800px] text-center">
            Join our passionate team at Savetown and help shape the future of
            homeownership. Discover opportunities to make a difference and grow
            with us.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center w-full h-full px-4 py-12 md:py-16 md:px-14">
        <div className="grid w-full grid-cols-1 gap-6 ">
          {jobs.map((item, index) => (
            <div
              key={index}
              className=" border border-[#EAEBF0] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between w-full ">
                <h2 className=" text-[#000] font-Manrope text-lg font-bold">
                  {item.title}
                </h2>
                <button className="flex items-center space-x-2 ">
                  <p className="text-base font-bold  text-btnPrimary font-Manrope">
                    View job
                  </p>
                  <img src={arrowright.src} alt="" />
                </button>
              </div>
              <div className="flex items-center mt-4 space-x-6 ">
                <span className="flex items-center space-x-2 ">
                  <img src={pin.src} alt="" />
                  <p className=" text-[#00000080] font-Manrope font-medium text-base">
                    {item.location}
                  </p>
                </span>
                <span className="flex items-center space-x-2 ">
                  <img src={clock.src} alt="" />
                  <p className=" text-[#00000080] font-Manrope font-medium text-base">
                    {item.type}
                  </p>
                </span>
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
