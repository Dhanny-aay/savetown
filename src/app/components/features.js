import woman from "./assets/woman.svg";
import yellowstairs from "./assets/yellowstairs.svg";
import flex from "./assets/flex.svg";

export default function Features() {
  return (
    <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-center px-4 md:px-14">
      <h3 className=" text-center">Our Features</h3>
      <h2 className=" max-w-[900px] text-center mt-3">
        Every tool you need to track and manage your homeownership savings.
      </h2>

      <div className=" mt-16 flex items-center flex-col gap-8 lg:gap-0 lg:flex-row w-full justify-between">
        <div
          style={{
            backgroundImage: `url(${woman.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[500px]"
        ></div>
        <div className=" w-full lg:w-[48%]">
          <h2 className=" text-2xl leading-[36px]">
            Enjoy Flexible Savings Plans{" "}
            <span className=" md:block">That Work for You</span>
          </h2>
          <p className=" font-Manrope font-normal text-base text-black mt-3">
            Life doesn’t always go as planned, and your savings plan shouldn’t
            either. Our flexible withdrawal feature lets you adjust your
            contributions to fit your current financial situation—without the
            stress of penalties.
          </p>

          <button className=" bg-btnPrimary mt-8 lg:mt-16 rounded-[32px] px-6 py-[18px] font-semibold text-lg text-white leading-[1]">
            Get Started
          </button>
        </div>
      </div>
      <div className=" mt-16 flex items-center flex-col-reverse gap-8 lg:gap-0 lg:flex-row w-full justify-between">
        <div className=" w-full lg:w-[48%]">
          <h2 className=" text-2xl leading-[36px]">
            Set Custom Milestones{" "}
            <span className=" md:block">to Stay Motivated</span>
          </h2>
          <p className=" font-Manrope font-normal text-base text-black mt-3">
            Create your own financial milestones based on your unique
            homeownership plan. Receive timely reminders to help you stay on
            track and celebrate every goal you achieve.
          </p>

          <button className=" bg-btnPrimary mt-8 lg:mt-16 rounded-[32px] px-6 py-[18px] font-semibold text-lg text-white leading-[1]">
            Get Started
          </button>
        </div>
        <div
          style={{
            backgroundImage: `url(${yellowstairs.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[500px]"
        ></div>
      </div>

      <div className=" mt-16 flex items-center flex-col gap-8 lg:gap-0 lg:flex-row w-full justify-between">
        <div
          style={{
            backgroundImage: `url(${flex.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[500px]"
        ></div>
        <div className=" w-full lg:w-[48%]">
          <h2 className=" text-2xl leading-[36px]">
            Enjoy Flexible Savings Plans{" "}
            <span className=" md:block">That Work for You</span>
          </h2>
          <p className=" font-Manrope font-normal text-base text-black mt-3">
            Life doesn’t always go as planned, and your savings plan shouldn’t
            either. Our flexible withdrawal feature lets you adjust your
            contributions to fit your current financial situation—without the
            stress of penalties.
          </p>

          <button className=" bg-btnPrimary mt-8 md:mt-16 rounded-[32px] px-6 py-[18px] font-semibold text-lg text-white leading-[1]">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
