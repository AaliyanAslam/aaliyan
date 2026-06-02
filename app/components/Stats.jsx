import React from "react";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { PiUsersThreeLight } from "react-icons/pi";
import { IoGlobeOutline } from "react-icons/io5";
import { inter, urbanist } from "../fonts";

const stats = [
  {
    id: 1,
    icon: <HiOutlineClipboardDocumentCheck size={42} />,
    number: "2450",
    title: "Project Completed Done",
  },
  {
    id: 2,
    icon: <HiOutlineUserGroup size={42} />,
    number: "1085",
    title: "Satisfied Clients",
  },
  {
    id: 3,
    icon: <PiUsersThreeLight size={42} />,
    number: "07",
    title: "My Team Members",
  },
  {
    id: 4,
    icon: <IoGlobeOutline size={42} />,
    number: "2790",
    title: "World Wide Customer",
  },
];

const Stats = () => {
  return (
    <section
      className={`w-full py-10 md:py-16 px-4 ${inter.className}`}
    >
      {/* Fixed max-width to allow proper responsiveness */}
      <div className="max-w-420 mx-auto border-y border-gray-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center text-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 border-gray-300
                ${index !== stats.length - 1 ? "border-b lg:border-b-0" : ""} 
                ${index % 2 === 0 ? "sm:border-r" : ""}
                ${index !== 3 ? "lg:border-r" : ""}
              `}
            >
              {/* Icon Wrapper (Responsive sizing using child selector) */}
              <div className="text-black mb-4 md:mb-6 *:w-8 *:h-8 sm:*:w-10 sm:*:h-10 md:*:w-[42px] md:*:h-[42px] transition-transform hover:scale-110">
                {item.icon}
              </div>

              {/* Number */}
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${urbanist.className}`}
              >
                {item.number}
              </h2>

              {/* Text */}
              <p className="mt-3 sm:mt-5 text-xs sm:text-sm md:text-base text-gray-600 font-semibold tracking-wide uppercase">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;