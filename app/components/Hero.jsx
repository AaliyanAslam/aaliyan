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
    <>
      <div
        className="min-h-220 min-w-420 mx-auto bg-cover bg-center flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 px-4 md:px-10 py-4 md:py-0"
        style={{
          backgroundImage: "url('/images/bg.png')",
        }}
      >
        <div className="flex-1 text-center md:text-left space-y-4">
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
              <p className="text-2xl text-gray-600">
                ───────── FullStack Developer
              </p>
              <span className="text-xl">
                <SiGooglegemini
                  size={32}
                  className="text-yellow-500 animate-spin hover:animate-none"
                />
              </span>
            </div>

            <p className="text-gray-700 text-sm md:text-base max-w-lg mb-12">
              I'm a{" "}
              <span className="font-semibold text-gray-900">
                Full Stack Web Developer & MERN Stack Developer
              </span>
              . I build modern, responsive & high-converting websites and web
              apps with React, Next.js, Node.js & Firebase.
            </p>

            <div className={`space-y-2 mb-8 `}>
              <div className="flex items-center gap-3">
                <FaCheck className="text-gray-800 text-xl" />
                <span className="text-gray-900">Product must be authentic</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-gray-800 text-xl" />
                <span className="text-gray-900">
                  Solve pain points elegantly
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-gray-800 text-xl" />
                <span className="text-gray-900">
                  User testing, feedback, and validation
                </span>
              </div>
            </div>

            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <button className="bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-800">
                Let's Talk
              </button>
              <button className="flex items-center gap-2 text-black border-b-2 border-black/70 font-semibold hover:text-gray-600">
                Download CV{" "}
                <span>
                  <FaArrowDown />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center md:items-end justify-end gap-4">
          <div className="relative">
            <img
              src="/images/my.png"
              alt="Hero"
              className="w-md h-100 md:w-148 md:h-160 lg:w-184 lg:h-190 object-cover rounded-lg lg:rounded-none"
            />
            <img
              src="/images/strip.png"
              alt="Strip decoration"
              className="hidden md:block absolute bottom-80 right-10 h-16 md:h-30 lg:h-34 object-contain"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-0 right-0 hidden md:block w-full">
        <div
          className={`relative overflow-hidden bg-linear-to-r from-gray-800 to-gray-900  ${inter.className} font-semibold`}
        >
          <img
            src="/images/carosimg.png"
            alt="Carousel"
            className="w-full h-16 object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center  overflow-hidden">
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
    </>
  );
};

export default Hero;
