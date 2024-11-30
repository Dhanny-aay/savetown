import create from "./assets/create.svg";
import choose from "./assets/choose.svg";
import homeownership from "./assets/homeownership.svg";

export default function Works() {
  const works = [
    {
      icon: create,
      title: "Create Your Account",
      excerpt: "Save at your pace with plans that match your financial goals.",
    },
    {
      icon: choose,
      title: "Choose Your Plan",
      excerpt: "Select a savings plan that fits your budget and timeline.",
    },
    {
      icon: homeownership,
      title: "Achieve Homeownership",
      excerpt:
        "Once your savings goal is reached, unlock the path to your new home.",
    },
  ];

  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <h3>How It Works</h3>
      <h2 className=" mt-3 max-w-[900px] text-center">
        Step-by-step guide to help you achieve your dream home.
      </h2>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {works.map((item, index) => (
          <div key={index} className=" bg-bgSecondary rounded-[20px] p-8">
            <img src={item.icon.src} className=" w-full" alt="" />
            <h2 className=" mt-8 text-xl md:text-2xl font-normal">
              {item.title}
            </h2>
            <p className=" text-[#000000B2] mt-3 font-normal text-base font-Manrope">
              {item.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
