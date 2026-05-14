"use client";
import React, { useEffect, useState } from "react";
import { inter, urbanist } from "../fonts";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    review:
      "I just wanted to share a quick note and let you know that you guys do a really good job building modern and scalable web experiences.",
    name: "Rohan Singh",
    role: "Project Manager, Airflow Tech Inc",
    image: "/images/client1.webp",
  },
  {
    id: 2,
    review:
      "Working with Aaliyan was smooth and professional. The website performance and UI quality exceeded our expectations.",
    name: "David Miller",
    role: "Founder, Nexora Studio",
    image: "/images/client2.webp",
  },
  {
    id: 3,
    review:
      "Excellent communication, fast delivery, and very modern frontend development skills. Highly recommended for web projects.",
    name: "Sarah Khan",
    role: "Marketing Lead, Vision Agency",
    image: "/images/client3.webp",
  },
];

const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className={`w-full py-16 md:py-24 px-6 md:px-10 overflow-hidden ${inter.className}`}>
      <div className="max-w-420 mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12 md:mb-16 justify-center md:justify-start">
          <div className="w-10 h-px bg-black"></div>
          <p className="uppercase tracking-[2px] text-[10px] md:text-xs font-bold">
            Client Feedback
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-137.5 md:min-h-112.5 lg:min-h-100">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                current === index
                  ? "opacity-100 translate-y-0 z-10"
                  : "opacity-0 translate-y-10 pointer-events-none z-0"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text Content */}
                <div className="text-center lg:text-left order-2 lg:order-1">
                  <h2
                    className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight ${urbanist.className}`}
                  >
                    “{item.review}”
                  </h2>

                  <div className="mt-8 md:mt-12">
                    <h3 className="text-xl md:text-2xl font-bold">{item.name}</h3>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">
                      {item.role}
                    </p>

                    {/* Wave Graphic */}
                    <div className="mt-6 flex justify-center lg:justify-start">
                      <svg width="120" height="16" viewBox="0 0 140 20" fill="none">
                        <path
                          d="M0 10C10 0 20 20 30 10C40 0 50 20 60 10C70 0 80 20 90 10C100 0 110 20 120 10C130 0 140 10 140 10"
                          stroke="black"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Image Shape */}
                <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
                    <div className="absolute inset-0 bg-gray-100 [clip-path:polygon(35%_0%,65%_0%,65%_35%,100%_35%,100%_65%,65%_65%,65%_100%,35%_100%,35%_65%,0%_65%,0%_35%,35%_35%)]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100 pt-10">
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90"
            >
              <FaArrowLeft size={14} />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all active:scale-90"
            >
              <FaArrowRight size={14} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`transition-all duration-300 ${
                  current === index ? "w-8 h-2 bg-black" : "w-2 h-2 bg-gray-300"
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;