"use client";
import React, { useState } from "react";
import { inter, urbanist } from "../fonts";
import { submitContactForm } from "@/app/actions"; // Action import karein

const MAX_WORDS = 200;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("Mobile App");
  const [message, setMessage] = useState("");

  // Feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const interests = [
    "Mobile App",
    "Website Design",
    "Branding",
    "Webflow development",
    "App design",
    "Graphic design",
    "Wordpress",
    "Other"
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

    const formData = {
      name,
      email,
      company,
      interest: selectedInterest,
      message,
    };

    const result = await submitContactForm(formData);

    setIsSubmitting(false);
    if (result.success) {
      setStatus("success");
      // Form clear kar dein
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } else {
      setStatus("error");
    }
  };

  return (
    <div id="contact"
      className={`bg-white min-h-screen p-8 font-sans text-gray-900 ${inter.className}`}
    >
      <div className="max-w-420 mx-auto">
        <div className="text-center mb-16 relative">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gray-400">Say Hi!</span> and tell me about
            your idea
          </h1>
          <div className="text-4xl mt-4">—————→</div>
          <p className="mt-8 text-lg text-gray-600">
            Have a nice works? reach out and let's chat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto relative">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div className="border-b border-gray-300 pb-2">
              <label className="block text-base font-bold mb-4">Name:*</label>
              <input
                type="text"
                required
                placeholder="Hello..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none text-gray-500 placeholder-gray-300"
              />
            </div>

            <div className="border-b border-gray-300 pb-2">
              <label className="block text-base font-bold mb-4">Email.*</label>
              <input
                type="email"
                required
                placeholder="Where can i reply"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-gray-500 placeholder-gray-300"
              />
            </div>
          </div>

          <div className="border-b border-gray-300 pb-2 mb-12">
            <label className="block text-base font-bold mb-4">
              Company name
            </label>
            <input
              type="text"
              placeholder="Your company or website?"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full outline-none text-gray-500 placeholder-gray-300"
            />
          </div>

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

          <div className="border-b border-gray-300 pb-2 mb-12">
            <label className="block text-base font-bold mb-4">Message*</label>
            <textarea
              required
              placeholder="Tell me about your project..."
              value={message}
              onChange={handleMessageChange}
              rows={5}
              className="w-full outline-none text-gray-500 placeholder-gray-300 resize-none"
            />
            <div className="flex justify-end mt-1">
              <span
                className={`text-sm ${wordCount >= MAX_WORDS ? "text-red-500 font-semibold" : "text-gray-400"}`}
              >
                {wordCount}/{MAX_WORDS} words
              </span>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 mt-16 relative">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-black text-white px-10 py-4 rounded-full font-medium transition-colors ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800"
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
