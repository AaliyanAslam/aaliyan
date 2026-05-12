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
      className={`w-full py-10 md:py-16 px-4  ${inter.className}`}
    >
      <div className="max-w-20 md:max-w-420 mx-auto border-y border-gray-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center text-center py-10 md:py-14 px-6 ${
                index !== stats.length - 1
                  ? "lg:border-r border-gray-300"
                  : ""
              }`}
            >
              {/* Icon */}
              <div className="text-black mb-6">{item.icon}</div>

              {/* Number */}
              <h2
                className={`text-4xl md:text-6xl font-black tracking-tight ${urbanist.className}`}
              >
                {item.number}
              </h2>

              {/* Text */}
              <p className="mt-5 text-sm md:text-base text-black">
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