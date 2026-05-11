import React from "react";
import Link from "next/link";
import { inter } from "../fonts";

const Navbar = () => {
  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 px-4 md:px-10 ${inter.className}`}
    >
      <div className="min-w-420 mx-auto max-w-7xl backdrop-blur-md bg-white/10 rounded-full px-8 py-3 border border-white/20 flex items-center justify-between">
        <div className="font-bold text-4xl text-gray-800">Aaliyan</div>
        <div className="flex gap-8">
          <Link
            href="#projects"
            className="text-gray-800 hover:text-gray-300 transition text-sm font-bold md:text-xl"
          >
            Projects
          </Link>
          <Link
            href="#about"
            className="text-gray-800 hover:text-gray-300 transition text-sm font-bold md:text-xl"
          >
            About Me
          </Link>
          <Link
            href="#contact"
            className="text-gray-800 hover:text-gray-300 transition text-sm font-bold md:text-xl"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
