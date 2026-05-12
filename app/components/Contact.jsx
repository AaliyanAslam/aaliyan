"use client";
import React, { useState } from "react";
import { inter , urbanist } from "../fonts";

const Contact = () => {
  const [selectedInterest, setSelectedInterest] = useState("Mobile App");

  const interests = [
    "Mobile App",
    "Website Design",
    "Branding",
    "Webflow development",
    "App design",
    "Graphic design",
    "Wordpress",
  ];

  return (
    <div className={`bg-white min-h-screen p-8 font-sans text-gray-900 ${inter.className}`}>
      <div className="max-w-420 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gray-400">Say Hi!</span> and tell me about
            your idea
          </h1>
          {/* Decorative Arrow (Represented by SVG or text) */}
          <div className="text-4xl mt-4">—————→</div>
          <p className="mt-8 text-lg text-gray-600">
            Have a nice works? reach out and let's chat.
          </p>
        </div>

        {/* Form Section */}
        <form className="max-w-7xl mx-auto relative">
          {/* Decorative Dot Grid (Top Right) */}
          <div className="absolute -right-20 top-10 hidden md:block opacity-20">
            <div className="grid grid-cols-5 gap-2">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-black rounded-full"></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {/* Name Input */}
            <div className="border-b border-gray-300 pb-2">
              <label className="block text-base font-bold mb-4">Name:*</label>
              <input
                type="text"
                placeholder="Hello..."
                className="w-full outline-none text-gray-500 placeholder-gray-300"
              />
            </div>

            {/* Email Input */}
            <div className="border-b border-gray-300 pb-2">
              <label className="block text-base font-bold mb-4">Email.*</label>
              <input
                type="email"
                placeholder="Where can i reply"
                className="w-full outline-none text-gray-500 placeholder-gray-300"
              />
            </div>
          </div>

          {/* Company Input */}
          <div className="border-b border-gray-300 pb-2 mb-12">
            <label className="block text-base font-bold mb-4">Company name</label>
            <input
              type="text"
              placeholder="Your company or website?"
              className="w-full outline-none text-gray-500 placeholder-gray-300"
            />
          </div>

          {/* Interests / Tags */}
          <div className="mb-12">
            <label className="block text-base font-bold mb-6">
              What's in your mind?*
            </label>
            <div className="flex flex-wrap gap-3">
              {interests.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedInterest(item)}
                  className={`px-6 py-2 rounded-full border transition-all text-base ${
                    selectedInterest === item
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-800 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button Section */}
          <div className="flex justify-end items-center gap-4 mt-16 relative">
            {/* Decorative squiggle arrow */}
          

            <button
              type="submit"
              className="bg-black text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Send Me
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
