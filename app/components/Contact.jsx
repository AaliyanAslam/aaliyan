"use client";
import React, { useState } from "react";
import { inter, urbanist } from "../fonts";
import { submitContactForm } from "@/app/actions";
import Image from "next/image";

const MAX_WORDS = 200;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("Mobile App");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const interests = [
    "Mobile App",
    "Website Design",
    "Branding",
    "Webflow development",
    "App design",
    "Graphic design",
    "Wordpress",
    "Other",
  ];

  const getWordCount = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const wordCount = getWordCount(message);

  const handleMessageChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/);
    if (value.trim() === "" || words.length <= MAX_WORDS) {
      setMessage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = { name, email, company, interest: selectedInterest, message };
    const result = await submitContactForm(formData);

    setIsSubmitting(false);
    if (result.success) {
      setStatus("success");
      setName(""); setEmail(""); setCompany(""); setMessage("");
    } else {
      setStatus("error");
    }
  };

  return (
    <div
      id="contact"
      className={`bg-white min-h-screen p-4 sm:p-8 font-sans text-gray-900 ${inter.className}`}
    >
      {/* Changed max-w-420 to a standard responsive container */}
      <div className="max-w-7xl mx-auto py-10 md:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight sm:leading-tight">
            <span className="text-gray-400">Say Hi!</span> and tell me about
            <br className="hidden sm:block" />
            <span className="inline-flex items-center justify-center gap-2 md:gap-4 mt-2 sm:mt-4 align-middle">
              <div className="relative w-12 h-6 sm:w-16 sm:h-8 md:w-32 md:h-12 -mt-1 md:-mt-2">
                <Image
                  src="/images/right.webp"
                  alt="Right arrow icon"
                  fill
                  className="animate-pulse object-contain"
                />
              </div>
              <span>your idea</span>
            </span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-gray-600">
            Have a nice project? reach out and let's chat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full relative px-2 sm:px-0">
          {/* Status Messages */}
          {status === "success" && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
              Something went wrong. Please try again.
            </div>
          )}

          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-10 md:mb-12">
            <div className="border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
              <label className="block text-sm sm:text-base font-bold mb-2 sm:mb-4">Name:*</label>
              <input
                type="text"
                required
                placeholder="Hello..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none text-gray-700 placeholder-gray-300 bg-transparent py-2 md:py-3 text-sm sm:text-base"
              />
            </div>

            <div className="border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
              <label className="block text-sm sm:text-base font-bold mb-2 sm:mb-4">Email:*</label>
              <input
                type="email"
                required
                placeholder="Where can I reply?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-gray-700 placeholder-gray-300 bg-transparent py-2 md:py-3 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="border-b border-gray-300 pb-2 mb-10 md:mb-12 focus-within:border-black transition-colors">
            <label className="block text-sm sm:text-base font-bold mb-2 sm:mb-4">
              Company name
            </label>
            <input
              type="text"
              placeholder="Your company or website?"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full outline-none text-gray-700 placeholder-gray-300 bg-transparent py-2 md:py-3 text-sm sm:text-base"
            />
          </div>

          {/* Interests Selection */}
          <div className="mb-10 md:mb-12">
            <label className="block text-sm sm:text-base font-bold mb-4 sm:mb-6">
              What's on your mind?*
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {interests.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedInterest(item)}
                  className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full border transition-all text-xs sm:text-sm md:text-base ${
                    selectedInterest === item
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-white text-gray-800 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Message Area */}
          <div className="border-b border-gray-300 pb-2 mb-8 md:mb-12 focus-within:border-black transition-colors">
            <label className="block text-sm sm:text-base font-bold mb-2 sm:mb-4">Message*</label>
            <textarea
              required
              placeholder="Tell me about your project..."
              value={message}
              onChange={handleMessageChange}
              rows={4}
              className="w-full outline-none text-gray-700 placeholder-gray-300 resize-none bg-transparent py-2 sm:py-3 text-sm sm:text-base"
            />
            <div className="flex justify-end mt-1">
              <span
                className={`text-xs md:text-sm ${wordCount >= MAX_WORDS ? "text-red-500 font-semibold" : "text-gray-400"}`}
              >
                {wordCount}/{MAX_WORDS} words
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center md:justify-end items-center mt-12 md:mt-16">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto bg-black text-white px-10 py-4 rounded-full font-medium transition-all active:scale-95 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Me"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;