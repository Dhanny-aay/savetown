import NavDash from "../components/navDash";
import grid from "./assets/grid.svg";
import target from "./assets/target.svg";
import piggy from "./assets/piggy.svg";
import expert from "./assets/expert.svg";
import group from "./assets/group.svg";
import safe from "./assets/safe.svg";
import partner from "./assets/partner.svg";
import Partners from "../components/partners";
import Banner from "../components/banner";
import Footer from "../components/footer";
import ceo from "./assets/ceo.svg";
import teamImg from "./assets/team.svg";

export default function Home() {
  const stats = [
    {
      title: "Users",
      numbers: "500+",
      excerpt:
        "Over 500 satisfied clients trust our expertise and exceptional services.",
    },
    {
      title: "Projects",
      numbers: "200+",
      excerpt:
        "We've successfully completed over 200 projects, delivering outstanding results every time.",
    },
    {
      title: "Happy Clients",
      numbers: "100%",
      excerpt:
        "Our focus on client satisfaction ensures a 100% happiness rate with our services.",
    },
    {
      title: "Commitment ",
      numbers: "110%",
      excerpt:
        "With our unwavering dedication, we give 110% commitment to every project we undertake.",
    },
    {
      title: "Followers",
      numbers: "200k +",
      excerpt:
        "Join our community of 200 thousand loyal followers and be part of something extraordinary.",
    },
    {
      title: "Partners",
      numbers: "30+",
      excerpt:
        "Each member is a driving force, contributing unique skills, expertise, and passion to our journey.",
    },
  ];

  const works = [
    {
      icon: piggy,
      title: "Smart Savings",
      excerpt:
        "We protect your home fund through dollar-denominated savings accounts and create automated plans tailored to your income and goals. Our real-time dashboard lets you track progress while earning interest, and our analytics optimize your saving strategy to achieve homeownership faster.",
    },
    {
      icon: expert,
      title: "Financial Expertise",
      excerpt:
        "We've partnered with leading mortgage providers like Stanbic, Access, and AXA to offer you the best financing options. Our experienced consultants provide personalized mortgage advisory services, while our custom calculators and tools help you make informed decisions throughout your journey.",
    },
    {
      icon: group,
      title: "Community-Driven Approach",
      excerpt:
        "Our collective housing purchase schemes leverage group buying power for better deals, while our vibrant community shares experiences and insights. We offer referral rewards, educational resources, and regular expert-led events to help you and your network succeed in homeownership.",
    },
    {
      icon: safe,
      title: "Security First",
      excerpt:
        "We protect your savings with bank-grade security protocols and full NDPR compliance. Through regular audits, secure KYC verification, and partnerships with trusted financial institutions, we ensure your investments and data remain safe.",
    },
    {
      icon: partner,
      title: "Developer Partnerships",
      excerpt:
        "We work directly with reputable developers to offer quality housing options with exclusive pre-launch access and negotiated discounts. From studios to penthouses, we showcase a wide range of properties that match every preference and budget.",
    },
  ];
  const team = [
    { image: teamImg, name: "Chinonso Okafor", title: "Founder & CEO" },
    { image: teamImg, name: "Chinonso Okafor", title: "Founder & CEO" },
    { image: teamImg, name: "Chinonso Okafor", title: "Founder & CEO" },
    { image: teamImg, name: "Chinonso Okafor", title: "Founder & CEO" },
    { image: teamImg, name: "Chinonso Okafor", title: "Founder & CEO" },
    { image: teamImg, name: "Chinonso Okafor", title: "Founder & CEO" },
    { image: teamImg, name: "Chinonso Okafor", title: "Founder & CEO" },
    { image: teamImg, name: "Chinonso Okafor", title: "Founder & CEO" },
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
          <h1 className=" text-black">About us</h1>
          <p className=" font-Manrope text-base md:text-xl font-normal text-black mt-3 lg:max-w-[800px] text-center">
            Streamlining home ownership with smart savings and mortgage options
            securely save or apply for a mortgage to own your dream home, with
            flexible plans up to 15 years.
          </p>
        </div>
      </div>
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <div className=" w-full  bg-bgSecondary rounded-[32px] h-[450px]"></div>
        <div className="mt-12">
          <h2>Our Story</h2>
          <p className=" mt-6 font-Manrope text-base font-normal text-black">
            At Savetown, we're transforming the path to homeownership in Nigeria
            through innovation, technology, and community. Born from the
            collective experience of watching countless Nigerians struggle with
            the complexities of home acquisition, we emerged as a pioneering
            solution to bridge the gap between aspiration and achievement in
            homeownership. While the traditional path to owning a home in
            Nigeria has been fraught with challenges like currency fluctuations,
            limited mortgage options, and lack of structured savings programs,
            we believe that homeownership shouldn't be a privilege reserved for
            a few, but an achievable goal for every hardworking Nigerian. Today,
            we're proud to be leading the charge in democratizing access to
            homeownership through our digital platform that combines innovative
            savings solutions, mortgage advisory services, and community
            support, helping thousands of Nigerians protect their savings from
            currency fluctuations while building their path to property
            ownership.
          </p>
        </div>
        <div className="mt-12">
          <h2>Our Stats</h2>
          <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {stats.map((item, index) => (
              <div key={index} className=" bg-bgSecondary rounded-[20px] p-6">
                <h2 className=" text-xl font-normal pb-6 border-b border-white">
                  {item.title}
                </h2>
                <h1 className="mt-3 text-black">{item.numbers}</h1>
                <p className=" text-[#000000] mt-3 font-normal text-base font-Manrope">
                  {item.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* mission */}
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <div className=" flex items-center flex-col gap-8 lg:gap-0 lg:flex-row w-full justify-between">
          <div
            style={{
              backgroundImage: `url(${target.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[300px] md:h-[500px]"
          ></div>
          <div className=" w-full lg:w-[48%]">
            <h2 className=" text-[32px] leading-[36px]">Our Mission</h2>
            <p className=" font-Manrope font-normal text-base text-black mt-3">
              To empower Nigerians with the financial tools, knowledge, and
              resources needed to achieve their homeownership dreams through
              structured savings plans and accessible mortgage options. We're
              committed to making the journey to homeownership transparent,
              secure, and achievable for every Nigerian, regardless of their
              starting point.
            </p>
          </div>
        </div>
      </div>

      {/* sets us apart */}
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <h2>What Sets Us Apart</h2>
        <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {works.slice(0, 4).map((item, index) => (
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
        <div className=" w-full grid grid-cols-1 gap-8 mt-8">
          <div className=" bg-bgSecondary rounded-[20px] p-8">
            <img src={works[4].icon.src} alt="" />
            <h2 className=" mt-8 text-xl md:text-2xl font-normal">
              {works[4].title}
            </h2>
            <p className=" text-[#000000B2] mt-3 font-normal text-base font-Manrope">
              {works[4].excerpt}
            </p>
          </div>
        </div>
      </div>

      <Partners />

      {/* meet our team */}
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <h2 className=" text-center w-full">Meet Our Team</h2>
        <div className=" flex items-center flex-col gap-8 lg:gap-0 lg:flex-row w-full justify-between mt-16">
          <div
            style={{
              backgroundImage: `url(${ceo.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[300px] md:h-[600px] lg:h-[500px]"
          ></div>
          <div className=" w-full lg:w-[48%]">
            <h2 className=" text-2xl md:text-[32px] leading-[36px]">
              Anthony Aihie
            </h2>
            <p className=" text-[#9900CC] mt-1 font-Manrope font-normal text-lg">
              CEO & Founder
            </p>
            <p className=" font-Manrope font-normal text-base text-black mt-6">
              Tony founded Design Union Ltd. in 2000, starting out as a solo
              architect, under God’s guidance, led the firm’s transformation
              from architectural consulting to a vertically integrated company
              which has acquired remarkable local capacity to conceive, deliver
              and operate large real estate projects of international quality.
              The company has divisions responsible for design and engineering,
              construction, real estate development and hospitality/facility
              management. Again, divinely inspired, Tony co-founded Savetown
              Inc., a tech-driven housing financing company, in 2022 in
              collaboration with the Venture Capital firm, Future Africa Inc.
            </p>
          </div>
        </div>

        <div className=" mt-16 grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
          {team.map((item, index) => (
            <div key={index} className=" w-full">
              <div
                style={{
                  backgroundImage: `url(${item.image.src})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" w-full  h-[300px] md:h-[500px] lg:h-[300px] bg-[#B3834D] rounded-3xl"
              ></div>
              <h2 className=" font-Yeseva font-normal text-xl text-[#101828] mt-6">
                {item.name}
              </h2>
              <p className=" text-[#9900CC] font-Manrope font-normal text-lg mt-1">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Banner />

      <Footer />
    </>
  );
}
