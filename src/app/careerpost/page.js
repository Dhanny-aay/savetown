import pin from "./assets/map-pin.svg";
import clock from "./assets/clock.svg";
import grid from "./assets/grid.svg";
import ArrowLeft from "./assets/ArrowLeft.svg";
import NavDash from "../components/navDash";
import Banner from "../components/banner";
import Footer from "../components/footer";

export default function Page() {
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
          <h1 className=" text-black mt-6 ">Product Designer</h1>
          <div className=" flex items-center space-x-8 mt-3">
            <span className=" flex items-center space-x-2">
              <img src={pin.src} alt="" />
              <p className=" text-[#00000080] font-Manrope font-medium text-base">
                Remote
              </p>
            </span>
            <span className=" flex items-center space-x-2">
              <img src={clock.src} alt="" />
              <p className=" text-[#00000080] font-Manrope font-medium text-base">
                Full-time
              </p>
            </span>
          </div>

          <div className=" mt-6 space-x-3 flex items-center">
            <button className=" leading-none bg-white border border-[#EAEBF0] flex items-center rounded-[30px] py-3 px-6 space-x-3 font-Manrope font-medium md:text-base text-sm text-black">
              <img src={ArrowLeft.src} alt="" />
              <p>Back</p>
            </button>
            <button className=" leading-none bg-btnPrimary rounded-[30px] py-3 px-6 font-Manrope font-medium md:text-base text-sm text-white">
              <p>Apply Now</p>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <div>
          <h2 className=" font-Manrope font-bold text-2xl text-black">
            Job Description
          </h2>
          <p className=" text-[#00000080] font-Manrope font-normal text-base mt-3">
            As a Senior Accountant, you will play a key role in managing the
            company's financial transactions, ensuring compliance with
            accounting standards and contributing to the financial success of
            the organization. The ideal candidate will have a strong background
            in accounting principles, exceptional analytical skills,
            collaborative skills and the ability to lead and mentor junior
            accounting staff.
          </p>

          <h3 className=" font-Manrope font-bold text-2xl text-black mt-6">
            Job Information
          </h3>
          <ul className=" mt-3 flex items-center space-x-3 text-[#00000080] font-Manrope font-normal text-base">
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Salary: $80k-$100k
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              City: Lagos
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Country: Nigeria
            </li>
          </ul>

          <h3 className=" font-Manrope font-bold text-2xl text-black mt-6">
            Specific Responsibilities
          </h3>
          <h4 className=" mt-6 text-[#00000080] font-Manrope font-semibold text-base">
            Management Reporting
          </h4>
          <ul>
            <li>
              Ensure that consolidated management reports are submitted in a
              timely manner.
            </li>
          </ul>

          <h4 className=" mt-6 text-[#00000080] font-Manrope font-semibold text-base">
            Financial Reporting and Analysis
          </h4>
          <ul>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Prepare and analyze monthly, quarterly, and annual financial
              statements.
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Provide insights into financial performance, including variance
              analysis and trend identification.
            </li>
          </ul>

          <h4 className=" mt-6 text-[#00000080] font-Manrope font-semibold text-base">
            Budgeting and Forecasting
          </h4>
          <ul>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Gather information and input for budgeting purposes in a timely
              and efficient manner.
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Analyze historical financial data and trends to develop accurate
              and realistic budget projections.
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Ensure that budgets are comprehensive, covering all relevant
              income and expense categories.
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Develop and maintain financial forecasting models to project
              future financial performance.
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Regularly update forecasts to reflect changes in business
              conditions, market dynamics, and internal factors.
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Prepare reports on future revenue and expenditure expectations as
              required.
            </li>
          </ul>

          {/* ... Rest of the job description sections */}

          <h4 className=" mt-6 text-[#00000080] font-Manrope font-semibold text-base">
            Requirements
          </h4>
          <ul>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Bachelor's Degree in a business-related field
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              Accounting qualification is a must
            </li>
            <li className="text-[#00000080] font-Manrope font-normal text-base">
              MBA is an added advantage
            </li>
            {/* ... Rest of the requirements */}
          </ul>
        </div>

        <button className=" bg-btnPrimary mt-6 rounded-[30px] py-3 px-6 font-Manrope font-medium text-base text-white">
          <p>Apply Now</p>
        </button>
      </div>

      <Banner />

      <Footer />
    </>
  );
}
