import React from "react";
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";
import { HiMiniEnvelope } from "react-icons/hi2";
import { inter } from "../fonts";

const ContactStrip = () => {
  return (
    <div className={`w-full ${inter.className}`}>
      <div className="max-w-420 mx-auto py-3 px-2 md:px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-start">
          <span className="hidden sm:inline text-xs md:text-base">
            ─────────
          </span>
          <div className="flex items-center gap-2 md:gap-6 text-[9px] md:text-[11px] tracking-[1.5px] md:tracking-[2px] uppercase text-black font-medium flex-wrap justify-center">
            <a
              href="#"
              className="text-sm md:text-lg flex items-center gap-1 md:gap-2 hover:text-gray-600 transition"
            >
              <FaFacebookF size={16} className="text-blue-600 md:hidden" />
              <FaFacebookF
                size={21}
                className="hidden md:inline text-blue-600"
              />
              <span>Facebook</span>
            </a>

            <a
              href="#"
              className="text-sm md:text-lg flex items-center gap-1 md:gap-2 hover:text-gray-600 transition"
            >
              <FaYoutube size={16} className="text-red-600 md:hidden" />
              <FaYoutube size={21} className="hidden md:inline text-red-600" />
              <span>Youtube</span>
            </a>

            <a
              href="#"
              className="text-sm md:text-lg flex items-center gap-1 md:gap-2 hover:text-gray-600 transition"
            >
              <FaTwitter size={16} className="text-blue-400 md:hidden" />
              <FaTwitter size={21} className="hidden md:inline text-blue-400" />
              <span>Twitter</span>
            </a>
          </div>
          <span className="hidden sm:inline text-xs md:text-base">
            ─────────
          </span>
        </div>

        {/* Right Side */}
        <a
          href="mailto:aaliyanprivate@gmail.com"
          className="text-sm md:text-lg flex items-center gap-1 md:gap-2 tracking-[1px] md:tracking-[1.5px] text-black font-medium hover:text-gray-600 transition w-full md:w-auto justify-center md:justify-end"
        >
          <HiMiniEnvelope className="text-green-400" size={18} />
          <span className="hidden md:inline">aaliyanprivate@gmail.com</span>
          <span className="md:hidden text-xs">Contact</span>
        </a>
      </div>
    </div>
  );
};

export default ContactStrip;
