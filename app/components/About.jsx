import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { inter, urbanist } from "../fonts";

const About = () => {
  return (
    <section
      className={`w-full py-20 px-4 md:px-10 overflow-hidden ${inter.className}`}
    >
      <div className="max-w-420 mx-auto">
        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-0.5 bg-black"></div>

              <span className="uppercase text-[11px] tracking-[2px] font-bold">
                About Me ?
              </span>
            </div>

            <h2
              className={` text-4xl md:text-6xl font-black leading-none uppercase ${urbanist.className}`}
            >
              Creative <br />
              Web Developer
            </h2>
          </div>

          {/* Right */}
          <div className="max-w-xl">
            <p className="text-gray-700 leading-8 text-base md:text-lg">
              I’m a passionate Full Stack Web Developer focused on creating
              modern, responsive, and user-friendly digital experiences. I love
              building clean interfaces, scalable applications, and smooth user
              experiences using modern web technologies.
            </p>

            <button className="mt-8 bg-black text-white px-8 py-4 rounded-full text-sm uppercase tracking-[2px] flex items-center gap-3 active:scale-95 transition duration-300">
              Read More
              <FaArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border border-black p-10 bg-black text-white min-h-70 flex flex-col justify-between hover:-translate-y-2 transition duration-300">
            <div>
              <span className="text-sm uppercase tracking-[2px]">
                Experience
              </span>

              <h3 className="text-5xl font-black mt-6">2+</h3>
            </div>

            <p className="text-sm text-gray-300 leading-7">
              Years of learning and building modern web applications.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-black p-10 min-h-70 flex flex-col justify-between hover:-translate-y-2 transition duration-300">
            <div>
              <span className="text-sm uppercase tracking-[2px]">Projects</span>

              <h3 className="text-5xl font-black mt-6">20+</h3>
            </div>

            <p className="text-sm text-gray-700 leading-7">
              Successfully completed responsive and modern projects.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-black p-10 min-h-70 flex flex-col justify-between hover:-translate-y-2 transition duration-300">
            <div>
              <span className="text-sm uppercase tracking-[2px]">
                Technologies
              </span>

              <h3 className="text-3xl font-black mt-6 leading-snug">
                React <br />
                Next.js <br />
                Node.js
              </h3>
            </div>

            <p className="text-sm text-gray-700 leading-7">
              Modern tools & technologies for scalable development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
