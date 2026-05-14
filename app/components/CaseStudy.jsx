import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { inter, urbanist } from "../fonts";
import Image from "next/image";

const CaseStudy = () => {
  const caseStudies = [
    {
      id: 1,
      category: "Web Design",
      title: "Modern Portfolio Website for Creative Agency",
      image: "/images/primesupps.webp",
    },
    {
      id: 2,
      category: "Development",
      title: "E-commerce Platform with Clean UI Experience",
      image: "/images/edc.webp",
    },
    {
      id: 3,
      category: "Dashboard",
      title: "Admin Dashboard for Analytics & Management",
      image: "/images/tmgweb.webp",
    },
  ];

  return (
    <section id="projects"
      className={`w-full ${inter.className} py-12 md:py-20 px-3 md:px-4 overflow-hidden`}
    >
      <div className="max-w-420 mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          {/* Top Dot */}
          <div className="flex justify-center mb-5">
          <Image className="animate-spin" src="/images/grooms.webp" alt="Dot" width={85} height={85} />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase">
            Case Study
          </h2>

          {/* Description */}
          <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-gray-600 leading-7 mt-3 md:mt-5">
            A collection of modern web experiences, responsive interfaces, and
            scalable applications designed with performance and user experience
            in mind.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-6 md:space-y-10">
          {caseStudies.map((item, index) => (
            <div
              key={item.id}
              className={`flex py-12 flex-col ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } gap-4 md:gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="overflow-hidden  border border-gray-300 bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-50 sm:h-70 md:h-105 object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 w-full">
                {/* Badge */}
                <button className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full uppercase text-[10px] md:text-xs tracking-[1.5px] md:tracking-[2px] mb-4 md:mb-8">
                  {item.category}
                </button>

                {/* Title */}
                <h3 className={`text-xl sm:text-2xl md:text-5xl font-black leading-tight mb-6 md:mb-10 ${urbanist.className}`}>
                  {item.title}
                </h3>

                {/* Button */}
                <button className="group flex items-center gap-2 md:gap-4 text-sm md:text-lg font-medium border-b border-black pb-2 md:pb-3 hover:gap-4 md:hover:gap-6 transition-all duration-300">
                  See Details
                  <FaArrowRight className="group-hover:-rotate-45 transition duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
