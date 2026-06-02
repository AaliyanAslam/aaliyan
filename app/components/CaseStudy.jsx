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
    <section
      id="projects"
      className={`w-full ${inter.className} py-12 md:py-20 px-3 md:px-4 overflow-hidden`}
    >
      <div className="max-w-420 mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 relative">
          {/* Top Dot - Hidden on small screens to prevent overflow, absolutely positioned */}
          <div className="hidden md:block absolute -top-10 left-10 lg:left-20">
            <Image
              src="/images/dots.webp"
              alt="Decorative Dots"
              width={53}
              height={53}
            />
          </div>

          <div className="flex justify-center mb-4 md:mb-5">
            <Image
              className="animate-spin w-16 h-16 md:w-[85px] md:h-[85px]"
              src="/images/grooms.webp"
              alt="Spinning Decoration"
              width={85}
              height={85}
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase flex items-center justify-center gap-2 sm:gap-3">
            <span>Case Study</span>
          </h2>

          {/* Description */}
          <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-gray-600 leading-6 md:leading-7 mt-3 md:mt-5 px-2">
            A collection of modern web experiences, responsive
            interfaces, and scalable applications designed with
            performance and user experience in mind.
          </p>
        </div>
        {/* Case Studies */}
        <div className="space-y-8 md:space-y-12">
          {caseStudies.map((item, index) => (
            <div
              key={item.id}
              className={`flex py-6 sm:py-8 md:py-12 flex-col ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } gap-6 md:gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="overflow-hidden border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 sm:h-72 md:h-96 lg:h-[420px] object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 w-full flex flex-col items-start text-left">
                {/* Badge */}
                <button className="bg-black text-white px-4 md:px-6 py-1.5 md:py-3 rounded-full uppercase text-[10px] md:text-xs tracking-[1.5px] md:tracking-[2px] mb-4 md:mb-6">
                  {item.category}
                </button>

                {/* Title */}
                <h3
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight sm:leading-snug mb-5 md:mb-8 ${urbanist.className}`}
                >
                  {item.title}
                </h3>

                {/* Button */}
                <button className="group flex items-center gap-2 md:gap-3 text-sm sm:text-base md:text-lg font-semibold border-b-2 border-black pb-1 md:pb-2 hover:gap-4 md:hover:gap-6 transition-all duration-300">
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
