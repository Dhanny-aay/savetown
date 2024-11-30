import du from "./assets/du.svg";
import fa from "./assets/fa.svg";

export default function Partners() {
  const partners = [
    {
      name: "Design Union",
      logo: du,
      about: "Real estate development & Advisory",
    },
    { name: "Future Africa", logo: fa, about: "Technology partners" },
  ];
  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
      <h2 className=" text-center w-full">Our Partners</h2>

      <div className=" w-full flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-between mt-16">
        {partners.map((item, index) => (
          <div key={index} className=" w-full lg:w-[48%]">
            <div className=" w-full h-[200px] bg-bgSecondary rounded-[15px] flex items-center justify-center">
              <img src={item.logo.src} alt="" />
            </div>
            <h2 className=" mt-3 text-xl md:text-2xl font-normal">
              {item.name}
            </h2>
            <p className=" text-[#000000B2] mt-3 font-normal text-base font-Manrope">
              {item.about}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
