"use client";
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
import { useEffect, useState } from "react";
import { handleGetItemsWithParam } from "../userControllers/blogController";

export default function Home() {
  const [headings, setHeadings] = useState([]);
  const [loadingHeading, setLoadingHeading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState([]);
  const [loadingApart, setLoadingApart] = useState(true);
  const [aparts, setAparts] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [teams, setTeams] = useState([]);

  const [ceoTitle, setCEOTitle] = useState("Anthony Aihie");
  const [ceoExcerpt, setCEOexcerpt] = useState("CEO & Founder");
  const [ceoDescription, setCEODescription] = useState(
    "Tony founded Design Union Ltd. in 2000, starting out as a solo architect, under God’s guidance, led the firm’s transformation from architectural consulting to a vertically integrated company which has acquired remarkable local capacity to conceive, deliver and operate large real estate projects of international quality. The company has divisions responsible for design and engineering, construction, real estate development and hospitality/facility management. Again, divinely inspired, Tony co-founded Savetown Inc., a tech-driven housing financing company, in 2022 in collaboration with the Venture Capital firm, Future Africa Inc."
  );
  const [ceoImage, setCEOImage] = useState(ceo.src);

  // Set the page title and excerpt based on headings passed as props
  const setCEOeading = () => {
    // Find the item with category "Features"
    const CEOInfo = teams.find((teams) => teams.title === "Anthony Aihie");

    if (CEOInfo) {
      setCEOTitle(CEOInfo.title || "Anthony Aihie");
      setCEODescription(
        CEOInfo.description ||
          "Tony founded Design Union Ltd. in 2000, starting out as a solo architect, under God’s guidance, led the firm’s transformation from architectural consulting to a vertically integrated company which has acquired remarkable local capacity to conceive, deliver and operate large real estate projects of international quality. The company has divisions responsible for design and engineering, construction, real estate development and hospitality/facility management. Again, divinely inspired, Tony co-founded Savetown Inc., a tech-driven housing financing company, in 2022 in collaboration with the Venture Capital firm, Future Africa Inc."
      );
      setCEOexcerpt(CEOInfo.excerpt || "CEO & Founder");
      setCEOImage(CEOInfo.image || ceo.src);
    }
  };

  const [pageTitle, setPageTitle] = useState("About us");
  const [pageExcerpt, setPageExcerpt] = useState(
    " Streamlining home ownership with smart savings and mortgage options securely save or apply for a mortgage to own your dream home, with flexible plans up to 15 years."
  );
  const [pageLink, setPageLink] = useState(
    "https://www.youtube.com/embed/pnUhZw0LTLE?si=6i_jfP6pMFiCdrw7"
  );
  const [storyTitle, setStoryTitle] = useState("Our Story");
  const [storyExcerpt, setStoryExcerpt] = useState(
    "At Savetown, we're transforming the path to homeownership in Nigeria through innovation, technology, and community. Born from the collective experience of watching countless Nigerians struggle with the complexities of home acquisition, we emerged as a pioneering solution to bridge the gap between aspiration and achievement in homeownership. While the traditional path to owning a home in Nigeria has been fraught with challenges like currency fluctuations, limited mortgage options, and lack of structured savings programs, we believe that homeownership shouldn't be a privilege reserved for a few, but an achievable goal for every hardworking Nigerian. Today, we're proud to be leading the charge in democratizing access to homeownership through our digital platform that combines innovative savings solutions, mortgage advisory services, and community support, helping thousands of Nigerians protect their savings from currency fluctuations while building their path to property ownership."
  );
  const [missionTitle, setMissionTitle] = useState("Our Mission");
  const [missionImage, setMissionImage] = useState(target.src);
  const [missionExcerpt, setMissionExcerpt] = useState(
    "To empower Nigerians with the financial tools, knowledge, and resources needed to achieve their homeownership dreams through structured savings plans and accessible mortgage options. We're committed to making the journey to homeownership transparent, secure, and achievable for every Nigerian, regardless of their starting point."
  );
  const [statsTitle, setStatsTitle] = useState("Our Stats");
  const [whatSetsUsApartTitle, setWhatSetsUsApartTitle] =
    useState("What Sets Us Apart");
  const [teamTitle, setTeamTitle] = useState("Meet Our Team");

  const fetchHeadings = async () => {
    const params = {
      type: "PageTitle",
      page: "About",
    };
    try {
      const data = await handleGetItemsWithParam(params);
      if (data) {
        setHeadings(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoadingHeading(false);
    }
  };
  const fetchStats = async () => {
    const params = {
      type: "Stats",
      page: "About",
    };
    try {
      const data = await handleGetItemsWithParam(params);
      if (data) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };
  const fetchApart = async () => {
    const params = {
      type: "WhatSetsUsApart",
      page: "About",
    };
    try {
      const data = await handleGetItemsWithParam(params);
      if (data) {
        setAparts(data.data);
      }
    } catch (error) {
      console.error("Error fetching aparts:", error);
    } finally {
      setLoadingApart(false);
    }
  };
  const fetchTeam = async () => {
    const params = {
      type: "Team",
      page: "About",
    };
    try {
      const data = await handleGetItemsWithParam(params);
      if (data) {
        setTeams(data.data);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoadingTeam(false);
    }
  };

  useEffect(() => {
    fetchHeadings();
    fetchStats();
    fetchApart();
    fetchTeam();
  }, []);

  // Utility function to set title, link, and excerpt based on category
  const setHeadingData = (category, defaults, setters) => {
    const heading = headings.find((heading) => heading.category === category);

    if (heading) {
      const { title, link, excerpt, image } = heading;
      setters.setTitle(title || defaults.title);
      setters.setLink(link || defaults.link);
      setters.setExcerpt(excerpt || defaults.excerpt);
      setters.setImage(image || defaults.image);
    }
  };

  // Function to update multiple headings
  const setDynamicHeadings = () => {
    // About Us defaults
    setHeadingData(
      "AboutUsFirst",
      {
        title: "About us",
        link: "https://www.youtube.com/embed/pnUhZw0LTLE?si=6i_jfP6pMFiCdrw7",
        excerpt:
          "Streamlining home ownership with smart savings and mortgage options securely save or apply for a mortgage to own your dream home, with flexible plans up to 15 years.",
      },
      {
        setTitle: setPageTitle,
        setLink: setPageLink,
        setImage: () => {}, // No link setter needed for story
        setExcerpt: setPageExcerpt,
      }
    );

    // Story defaults
    setHeadingData(
      "Story",
      {
        title: "Our Story",
        link: "",
        excerpt:
          "At Savetown, we're transforming the path to homeownership in Nigeria through innovation, technology, and community. Born from the collective experience of watching countless Nigerians struggle with the complexities of home acquisition, we emerged as a pioneering solution to bridge the gap between aspiration and achievement in homeownership. While the traditional path to owning a home in Nigeria has been fraught with challenges like currency fluctuations, limited mortgage options, and lack of structured savings programs, we believe that homeownership shouldn't be a privilege reserved for a few, but an achievable goal for every hardworking Nigerian. Today, we're proud to be leading the charge in democratizing access to homeownership through our digital platform that combines innovative savings solutions, mortgage advisory services, and community support, helping thousands of Nigerians protect their savings from currency fluctuations while building their path to property ownership.",
      },
      {
        setTitle: setStoryTitle,
        setLink: () => {}, // No link setter needed for story
        setImage: () => {}, // No link setter needed for story
        setExcerpt: setStoryExcerpt,
      }
    );

    // Mission defaults
    setHeadingData(
      "Mission",
      {
        title: "Our Mission",
        image: target.src,
        excerpt:
          "To empower Nigerians with the financial tools, knowledge, and resources needed to achieve their homeownership dreams through structured savings plans and accessible mortgage options. We're committed to making the journey to homeownership transparent, secure, and achievable for every Nigerian, regardless of their starting point.",
      },
      {
        setTitle: setMissionTitle,
        setImage: setMissionImage,
        setLink: () => {}, // No link setter needed for story
        setExcerpt: setStoryExcerpt,
      }
    );

    // Stats defaults
    setHeadingData(
      "Stats",
      {
        title: "Our Stats",
      },
      {
        setTitle: setStatsTitle,
        setImage: () => {},
        setLink: () => {}, // No link setter needed for story
        setExcerpt: () => {},
      }
    );

    // WhatSetsUsApart defaults
    setHeadingData(
      "WhatSetsUsApart",
      {
        title: "What Sets Us Apart",
      },
      {
        setTitle: setWhatSetsUsApartTitle,
        setImage: () => {},
        setLink: () => {}, // No link setter needed for story
        setExcerpt: () => {},
      }
    );
    // Team defaults
    setHeadingData(
      "Team",
      {
        title: "Meet Our Team",
      },
      {
        setTitle: setTeamTitle,
        setImage: () => {},
        setLink: () => {}, // No link setter needed for story
        setExcerpt: () => {},
      }
    );
  };

  useEffect(() => {
    setDynamicHeadings();
    setCEOeading();
  }, [headings, loadingHeading, loadingTeam, teams]);

  const fallbackStats = [
    {
      title: "Users",
      excerpt: "500+",
      description:
        "Over 500 satisfied clients trust our expertise and exceptional services.",
    },
    {
      title: "Projects",
      excerpt: "200+",
      description:
        "We've successfully completed over 200 projects, delivering outstanding results every time.",
    },
    {
      title: "Happy Clients",
      excerpt: "100%",
      description:
        "Our focus on client satisfaction ensures a 100% happiness rate with our services.",
    },
    {
      title: "Commitment ",
      excerpt: "110%",
      description:
        "With our unwavering dedication, we give 110% commitment to every project we undertake.",
    },
    {
      title: "Followers",
      excerpt: "200k +",
      description:
        "Join our community of 200 thousand loyal followers and be part of something extraordinary.",
    },
    {
      title: "Partners",
      excerpt: "30+",
      description:
        "Each member is a driving force, contributing unique skills, expertise, and passion to our journey.",
    },
  ];

  const fallbackApart = [
    {
      image: piggy.src,
      title: "Smart Savings",
      excerpt:
        "We protect your home fund through dollar-denominated savings accounts and create automated plans tailored to your income and goals. Our real-time dashboard lets you track progress while earning interest, and our analytics optimize your saving strategy to achieve homeownership faster.",
    },
    {
      image: expert.src,
      title: "Financial Expertise",
      excerpt:
        "We've partnered with leading mortgage providers like Stanbic, Access, and AXA to offer you the best financing options. Our experienced consultants provide personalized mortgage advisory services, while our custom calculators and tools help you make informed decisions throughout your journey.",
    },
    {
      image: group.src,
      title: "Community-Driven Approach",
      excerpt:
        "Our collective housing purchase schemes leverage group buying power for better deals, while our vibrant community shares experiences and insights. We offer referral rewards, educational resources, and regular expert-led events to help you and your network succeed in homeownership.",
    },
    {
      image: safe.src,
      title: "Security First",
      excerpt:
        "We protect your savings with bank-grade security protocols and full NDPR compliance. Through regular audits, secure KYC verification, and partnerships with trusted financial institutions, we ensure your investments and data remain safe.",
    },
    {
      image: partner.src,
      title: "Developer Partnerships",
      excerpt:
        "We work directly with reputable developers to offer quality housing options with exclusive pre-launch access and negotiated discounts. From studios to penthouses, we showcase a wide range of properties that match every preference and budget.",
    },
  ];

  const fallbackTeam = [
    { image: teamImg.src, title: "Chinonso Okafor", excerpt: "Founder & CEO" },
    { image: teamImg.src, title: "Chinonso Okafor", excerpt: "Founder & CEO" },
    { image: teamImg.src, title: "Chinonso Okafor", excerpt: "Founder & CEO" },
    { image: teamImg.src, title: "Chinonso Okafor", excerpt: "Founder & CEO" },
    { image: teamImg.src, title: "Chinonso Okafor", excerpt: "Founder & CEO" },
    { image: teamImg.src, title: "Chinonso Okafor", excerpt: "Founder & CEO" },
    { image: teamImg.src, title: "Chinonso Okafor", excerpt: "Founder & CEO" },
    { image: teamImg.src, title: "Chinonso Okafor", excerpt: "Founder & CEO" },
  ];

  const statsToRender = loadingStats ? fallbackStats : stats;
  const apartToRender = loadingApart ? fallbackApart : aparts;
  const teamToRender = loadingTeam ? fallbackTeam : teams;
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
          <h1 className=" text-black">{pageTitle}</h1>
          <p className=" font-Manrope text-base md:text-xl font-normal text-black mt-3 lg:max-w-[800px] text-center">
            {pageExcerpt}
          </p>
        </div>
      </div>
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <div className=" w-full mt-12 bg-bgSecondary rounded-[32px] h-[450px]">
          <iframe
            width="100%"
            height="450px"
            src={pageLink}
            title="Message from Our CEO"
            className=" rounded-[32px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <div className="mt-12">
          <h2>{storyTitle}</h2>
          <p className=" mt-6 font-Manrope text-base font-normal text-black">
            {storyExcerpt}
          </p>
        </div>
        <div className="mt-12">
          <h2>{statsTitle}</h2>
          <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {statsToRender.map((item, index) => (
              <div key={index} className=" bg-bgSecondary rounded-[20px] p-6">
                <h2 className=" text-xl font-normal pb-6 border-b border-white">
                  {item.title}
                </h2>
                <h1 className="mt-3 text-black">{item.excerpt}</h1>
                <p className=" text-[#000000] mt-3 font-normal text-base font-Manrope">
                  {item.description}
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
              backgroundImage: `url(${missionImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[300px] md:h-[500px]"
          ></div>
          <div className=" w-full lg:w-[48%]">
            <h2 className=" text-[32px] leading-[36px]">{missionTitle}</h2>
            <p className=" font-Manrope font-normal text-base text-black mt-3">
              {missionExcerpt}
            </p>
          </div>
        </div>
      </div>

      {/* sets us apart */}
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <h2>{whatSetsUsApartTitle}</h2>
        <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {apartToRender.slice(0, 4).map((item, index) => (
            <div key={index} className=" bg-bgSecondary rounded-[20px] p-8">
              <img src={item.image} className="  h-[128px]" alt="" />
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
            <img src={apartToRender[4].image} className="  h-[128px]" alt="" />
            <h2 className=" mt-8 text-xl md:text-2xl font-normal">
              {apartToRender[4].title}
            </h2>
            <p className=" text-[#000000B2] mt-3 font-normal text-base font-Manrope">
              {apartToRender[4].excerpt}
            </p>
          </div>
        </div>
      </div>

      <Partners />

      {/* meet our team */}
      <div className="w-full h-full py-12 md:py-16 flex flex-col justify-center items-start px-4 md:px-14">
        <h2 className=" text-center w-full">{teamTitle}</h2>
        <div className=" flex items-center flex-col gap-8 lg:gap-0 lg:flex-row w-full justify-between mt-16">
          <div
            style={{
              backgroundImage: `url(${ceoImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" bg-[#B3834D] w-full lg:w-[48%] rounded-[15px] h-[300px] md:h-[600px] lg:h-[500px]"
          ></div>
          <div className=" w-full lg:w-[48%]">
            <h2 className=" text-2xl md:text-[32px] leading-[36px]">
              {ceoTitle}
            </h2>
            <p className=" text-[#9900CC] mt-1 font-Manrope font-normal text-lg">
              {ceoExcerpt}
            </p>
            <p className=" font-Manrope font-normal text-base text-black mt-6">
              {ceoDescription}
            </p>
          </div>
        </div>

        <div className=" mt-16 grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
          {teamToRender
            .filter((item) => item.id !== 38)
            .map((item, index) => (
              <div key={index} className=" w-full">
                <div
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className=" w-full  h-[300px] md:h-[500px] lg:h-[300px] bg-[#B3834D] rounded-3xl"
                ></div>
                <h2 className=" font-Yeseva font-normal text-xl text-[#101828] mt-6">
                  {item.title}
                </h2>
                <p className=" text-[#9900CC] font-Manrope font-normal text-lg mt-1">
                  {item.excerpt}
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
