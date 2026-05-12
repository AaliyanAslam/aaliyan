import React from "react";
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";
import { HiMiniEnvelope } from "react-icons/hi2";
import { inter } from "../fonts";


const ContactStrip = () => {
  return (
    <div className={`w-full ${inter.className}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          ─────────
          <div className="flex items-center gap-6 text-[11px] tracking-[2px] uppercase text-black font-medium">
            <a
              href="#"
              className="text-xl flex items-center gap-2 hover:text-gray-600 transition"
            >
              <FaFacebookF size={21} className="text-blue-600" />
              <span>Facebook</span>
            </a>

            <a
              href="#"
              className="text-xl flex items-center gap-2 hover:text-gray-600 transition"
            >
              <FaYoutube size={21} className="text-red-600" />
              <span>Youtube</span>
            </a>

            <a
              href="#"
              className="text-xl flex items-center gap-2 hover:text-gray-600 transition"
            >
              <FaTwitter size={21} className="text-blue-400" />
              <span>Twitter</span>
            </a>
          </div>
          ─────────
        </div>

        {/* Right Side */}
        <a
          href="mailto:info.madhu786@gmail.com"
          className="text-xl flex items-center gap-2  tracking-[1.5px]  text-black font-medium hover:text-gray-600 transition"
        >
          <HiMiniEnvelope className="text-green-400" size={22} />
          <span>aaliyanprivate@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default ContactStrip;
