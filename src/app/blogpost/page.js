import Navbar from "../components/navbar";
import herobg from "./assets/blog1.svg";
import ArrowLeft from "./assets/ArrowLeft.svg";
import Blog from "../components/blog";
import Banner from "../components/banner";
import Footer from "../components/footer";

export default function page() {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${herobg.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className=" h-[800px] lg:h-svh relative w-full flex justify-center items-center flex-col"
      >
        <div className=" w-full h-full absolute top-0 left-0 hero-bg"></div>
        <div className=" w-full h-[50%] absolute bottom-0 left-0 hero-bottom px-4 md:px-14">
          <p className=" text-lg font-medium font-Manrope text-foreground  ">
            September 24th, 2023.
          </p>
          <h1 className=" max-w-[800px] text-black mt-3">
            The Step-by-Step Guide to Owning Your First Home in Nigerias
          </h1>
          <div className=" flex flex-col lg:flex-row gap-8 lg:gap-0 items-start lg:items-center justify-between w-full">
            <p className=" font-Manrope font-normal text-lg text-black max-w-[800px] mt-3">
              From smart savings plans to mortgage applications, here’s how
              Savetown helps you achieve home ownership, stress-free
            </p>
            <button className=" bg-white border border-[#EAEBF0] flex items-center rounded-[30px] py-3 px-6 space-x-3 font-Manrope font-medium text-base text-black">
              <img src={ArrowLeft.src} className=" w-4 h-3" alt="" />
              <p>Back</p>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14 font-Manrope text-base md:text-lg text-black font-normal">
        Introducing Ilupeju Gardens, where urban living meets green innovation
        in the heart of Lagos mainland. Nestled within the industrial layout of
        Ilupeju, this housing estate offers a vibrant community experience. At
        the heart of Ilupeju Gardens lies its centerpiece, one of the largest
        private green parks in any gated community in Nigeria. Fifty Neem
        (Dogonyaro) trees adorn the landscape, not only adding beauty but also
        reducing the greenhouse effect, improving air quality, and providing
        residents with fresh oxygen.
        <br />
        <br />
        The estate comprises three distinct types of mid-rise apartment
        buildings, each designed to meet diverse housing needs. Luxury awaits in
        the 4-Bedroom Maisonettes of Ilupeju Gardens, spanning multiple floors
        and offering unparalleled space and elegance. The 5th floor is graced by
        exclusive 1-Bedroom Penthouses, providing breathtaking views and
        privacy, all easily accessible via elevators for utmost convenience. For
        those seeking cozy yet stylish living spaces, Ilupeju Gardens offers 1
        and 2 Bedroom Apartments. Perfect for individuals or small families,
        these units provide comfort and sophistication in every detail.
        Expansive 3 Bedroom apartments await in Ilupeju Gardens, designed with
        growing families in mind. These homes offer ample room for relaxation,
        entertainment, and creating lasting memories.
        <br />
        <br />
        Every unit at Ilupeju Gardens comes with designated parking and staff
        quarters within the estate. The construction is of unparalleled quality,
        boasting square walls, level floors, and meticulously designed
        staircases. Residents of Ilupeju Gardens enjoy more than just quality
        living spaces. They benefit from a secure environment, green spaces, and
        a sense of community, all within close proximity to the thriving hub of
        Lagos mainland.
      </div>
      <Blog />
      <Banner />
      <Footer />
    </>
  );
}
