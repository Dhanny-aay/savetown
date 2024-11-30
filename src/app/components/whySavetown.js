import pay from "./assets/payicon.svg";
import plan from "./assets/planicon.svg";
import percent from "./assets/percent.svg";

export default function WhySavetown() {
  const reasons = [
    {
      icon: pay,
      title: "Flexible Payment Plans",
      excerpt: "Save at your pace with plans that match your financial goals.",
    },
    {
      icon: plan,
      title: "Personalized Plans",
      excerpt:
        "We offer tailored savings plans based on your income and target.",
    },
    {
      icon: percent,
      title: "Interest-Free Savings",
      excerpt:
        "Your savings grow towards homeownership with no hidden charges or interest rates..",
    },
  ];
  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <h3 className=" text-center">Why Savetown?</h3>
      <h2 className=" max-w-[900px] text-center mt-3">
        Discover the benefits that set us apart from traditional saving methods.
      </h2>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {reasons.map((item, index) => (
          <div key={index} className=" bg-bgSecondary rounded-[20px] p-8">
            <img src={item.icon.src} alt="" />
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
