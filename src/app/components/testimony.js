import avatar from "./assets/avatar.svg";
import prev from "./assets/prev.svg";
import paginate from "./assets/paginate.svg";
import next from "./assets/next.svg";

export default function Testimony() {
  const testimonials = [
    {
      icon: avatar,
      title: "Adeola Adeyemi",
      excerpt:
        "Savetown made my homeownership journey so much easier. I loved how I could set my savings plan and track my progress all in one place. Now, I’m closer to owning my first home than I ever thought possible!",
      location: "Lagos, Nigeria",
    },
    {
      icon: avatar,
      title: "Adeola Adeyemi",
      excerpt:
        "Savetown made my homeownership journey so much easier. I loved how I could set my savings plan and track my progress all in one place. Now, I’m closer to owning my first home than I ever thought possible!",
      location: "Lagos, Nigeria",
    },
    {
      icon: avatar,
      title: "Adeola Adeyemi",
      excerpt:
        "Savetown made my homeownership journey so much easier. I loved how I could set my savings plan and track my progress all in one place. Now, I’m closer to owning my first home than I ever thought possible!",
      location: "Lagos, Nigeria",
    },
  ];
  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <h3>Our Customer’s Reviews</h3>
      <h2 className=" mt-3 max-w-[900px] text-center">
        Hear from our satisfied customers.
      </h2>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {testimonials.map((item, index) => (
          <div key={index} className=" bg-bgSecondary rounded-[20px] p-8">
            <p className=" text-[#000000B2] mt-3 font-normal text-base font-Manrope">
              "{item.excerpt}"
            </p>
            <div className=" flex items-start space-x-[14px] mt-10">
              <img src={item.icon.src} alt="" />
              <span className=" space-y-2">
                <h2 className=" text-xl md:text-2xl font-normal">
                  {item.title}
                </h2>
                <p className=" font-Manrope text-[#00000099] font-normal text-base">
                  {item.location}
                </p>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-16 items-center space-x-8">
        <img src={prev.src} alt="" />
        <img src={paginate.src} alt="" />
        <img src={next.src} alt="" />
      </div>
    </div>
  );
}
