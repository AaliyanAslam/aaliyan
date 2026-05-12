
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

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section
      className={`w-full py-14 md:py-24 px-4 overflow-hidden ${inter.className}`}
    >
      <div className="max-w-420 md:max-w-420 mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-px bg-black"></div>

          <p className="uppercase tracking-[2px] text-xs font-semibold">
            Client Feedback
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`transition-all duration-700 ${
                current === index
                  ? "opacity-100 relative translate-y-0"
                  : "opacity-0 absolute inset-0 translate-y-10 pointer-events-none"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                {/* Left */}
                <div>
                  {/* Quote */}
                  <h2
                    className={`text-3xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tight ${urbanist.className}`}
                  >
                    “{item.review}”
                  </h2>

                  {/* User */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold">{item.name}</h3>

                    <p className="text-gray-600 mt-2 text-sm md:text-base">
                      {item.role}
                    </p>

                    {/* Wave */}
                    <div className="mt-8">
                      <svg
                        width="140"
                        height="20"
                        viewBox="0 0 140 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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

                {/* Right */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-70 h-70 md:w-95 md:h-95">
                    {/* Shape */}
                    <div className="absolute inset-0 bg-black [clip-path:polygon(35%_0%,65%_0%,65%_35%,100%_35%,100%_65%,65%_65%,65%_100%,35%_100%,35%_65%,0%_65%,0%_35%,35%_35%)] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-14">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition"
            >
              <FaArrowLeft />
            </button>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  current === index
                    ? "bg-black scale-125"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;