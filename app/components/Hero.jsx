"use client";
import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { inter, novaOval, urbanist } from "../fonts";
import { SiGooglegemini } from "react-icons/si";
import { FaCheck } from "react-icons/fa6";
import { RiGeminiLine } from "react-icons/ri";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const services = [
    "Website Development",
    "App Development",
    "Full Stack Development",
    "Landing Page Development",
    "Backend Development",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="select-none relative">
      <div className="relative lg:min-h-220 lg:max-w-420 mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 px-4 md:px-10 py-10 md:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center animate-pulse"
          style={{
            backgroundImage: "url('/images/bg1.webp')",
          }}
        ></div>
        <div className="relative flex-1 text-center md:text-left space-y-2">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="text-3xl">👋</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold">
            <span className={`${urbanist.className} font-extralight`}>
              Hello!
            </span>{" "}
            <span className={`${urbanist.className} font-extrabold`}>
              I'm Aaliyan
            </span>
          </h1>

          <div className={`${inter.className}`}>
            <div
              className={`flex items-center gap-2 justify-center md:justify-start mb-8 ${novaOval.className}`}
            >
              <p className="text-[0.8rem] lg:text-[0.9rem] text-gray-900 flex">
                <span className="hidden mr-6 lg:block">─────────</span> FullStack
                Developer
              </p>
              <span className="text-xl">
                <SiGooglegemini
                  size={32}
                  className="h-6 lg:h-12 text-yellow-500 animate-spin hover:animate-none"
                />
              </span>
            </div>

            <p className="text-gray-700 text-sm md:text-base max-w-lg mb-1 -mt-6">
              I'm a{" "}
              <span className="font-semibold text-gray-900">
                Full Stack Web Developer & MERN Stack Developer
              </span>
              . I build modern, responsive & high-converting websites and web
              apps with React, Next.js, Node.js & Firebase.
            </p>

            <div className={`space-y-2 mb-2 mt-3 `}>
              <div className="flex items-center gap-3">
                <FaCheck className="text-gray-800 text-[0.7rem]" />
                <span className="text-gray-900 text-[0.8rem]">
                  Product must be authentic
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-gray-800 text-[0.7rem]" />
                <span className="text-gray-900 text-[0.8rem]">
                  Solve pain points elegantly
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-gray-800 text-[0.7rem]" />
                <span className="text-gray-900 text-[0.8rem]">
                  User testing, feedback, and validation
                </span>
              </div>
            </div>

            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <button
                onClick={() => {
                  window.location.hash = "#contact";
                }}
                className="bg-black active:scale-95 transition-all text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-800"
              >
                Let's Talk
              </button>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "My_CV.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-2 text-black border-b-2 border-black/70 font-semibold hover:text-gray-600"
              >
                Download CV{" "}
                <span>
                  <FaArrowDown />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col items-center md:items-end justify-end gap-4">
          <div className="relative">
            <img
              src="/images/aaliyan.webp"
              alt="Hero"
              className="w-80 h-80 md:w-138 md:h-120 lg:w-184 lg:h-130 xl:w-160 xl:h-180 object-cover rounded-lg lg:rounded-none"
            />
            <img
              src="/images/strip.webp"
              alt="Strip decoration"
              className="hidden lg:block absolute bottom-80 right-10 lg:right-0 h-16 md:h-30 lg:h-30 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="select-none absolute -bottom-2 left-0 right-0 hidden md:block w-full">
        <div
          className={`max-w-420 mx-auto relative  overflow-hidden bg-linear-to-r from-gray-800 to-gray-900 ${inter.className} font-semibold`}
        >
          <img
            src="/images/caros.webp"
            alt="Carousel"
            className="w-full h-16 object-cover opacity-60"
          />

          {/* Masking Layer added here for smooth edges */}
          <div
            className="absolute inset-0 flex items-center overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div className="flex animate-marquee gap-8 whitespace-nowrap">
              {[...services, ...services].map((service, index) => (
                <div key={index} className="shrink-0">
                  <p className="text-white flex justify-center items-center gap-2 font-semibold text-sm md:text-lg px-4">
                    <RiGeminiLine className="animate-pulse" /> {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Hero;
