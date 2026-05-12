import React from "react";
import { inter } from "../fonts";

const ExperienceCard = ({
  number,
  title,
  company,
  location,
  duration,
  isActive,
}) => {
  return (
    <div
      className={`group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 mb-5 border transition-all duration-300 ${
        isActive
          ? "bg-[#111111] border-[#111111] text-white"
          : "bg-white border-gray-300 text-black hover:bg-black hover:border-black hover:text-white hover:-translate-y-1"
      }`}
    >
      {/* Left */}
      <div className="flex items-start md:items-center gap-5">
        {/* Number */}
        <div
          className={`min-w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
            isActive
              ? "bg-white/10 text-white"
              : "bg-black text-white group-hover:scale-105"
          } transition`}
        >
          {number}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg md:text-2xl font-black uppercase leading-tight">
            {title}
          </h3>

          <p
            className={`mt-2 text-sm md:text-base transition ${
              isActive
                ? "text-gray-400"
                : "text-gray-600 group-hover:text-gray-300"
            }`}
          >
            {company} • {location}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="mt-5 md:mt-0 flex items-center gap-5">
        <div
          className={`hidden md:block h-10 w-px transition ${
            isActive ? "bg-gray-700" : "bg-gray-300 group-hover:bg-gray-600"
          }`}
        />

        <p className="text-xs md:text-sm font-bold tracking-[2px] uppercase">
          Duration — <span className="opacity-70">{duration}</span>
        </p>
      </div>
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      id: "01",
      title: "Frontend Development Learning Journey",
      company: "Self Learning",
      location: "Pakistan",
      duration: "1 Year",
      isActive: true,
    },
    {
      id: "02",
      title: "Frontend Developer Intern",
      company: "Dealswipe.in",
      location: "India",
      duration: "6 Months",
      isActive: false,
    },
    {
      id: "03",
      title: "Full Stack Web Developer",
      company: "Afterrender",
      location: "On-Site - Pakistan",
      duration: "1 Year",
      isActive: false,
    },
    {
      id: "04",
      title: "Freelance Client Projects",
      company: "Independent Work",
      location: "Remote",
      duration: "3 Months",
      isActive: false,
    },
  ];

  return (
    <section className={`w-full  py-20 px-4 md:px-8 ${inter.className}`}>
      <div className="max-w-420 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Small Badge */}
          <div className="flex flex-col items-center gap-3 mb-5">
            <div className="w-7 h-7 rounded-full border border-black flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            </div>

            <span className="uppercase tracking-[4px] text-xs font-semibold text-gray-600">
              Career Journey
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
            My Experience
          </h2>

          {/* Description */}
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-7 mt-6">
            Passionate Full Stack Web Developer with experience in frontend &
            backend technologies, internships, remote collaboration, and
            freelance client projects focused on building modern, scalable, and
            responsive web applications.
          </p>
        </div>

        {/* Experience List */}
       <div className="bg-green-200">
         <div className="mt-10">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              number={exp.id}
              title={exp.title}
              company={exp.company}
              location={exp.location}
              duration={exp.duration}
              isActive={exp.isActive}
            />
          ))}
        </div>
       </div>
      </div>
    </section>
  );
};

export default Experience;
