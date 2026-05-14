import About from "./components/About";
import CaseStudy from "./components/CaseStudy";
import Contact from "./components/Contact";
import ContactStrip from "./components/ContactStrip";
import Experience from "./components/Exprience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Testimonial from "./components/testimonials";

export default function Home() {
  return (
    <>
      <div className="absolute z-100 flex justify-center items-center p-4 border border-gray-200 rounded-lg">
        {/* Screen Size Indicator Box */}
        <div className="px-4 py-2 bg-black text-white rounded-md font-bold text-sm uppercase">
          <span className="block sm:hidden">XS Device</span>
          <span className="hidden sm:block md:hidden">SM Device</span>
          <span className="hidden md:block lg:hidden">MD Device</span>
          <span className="hidden lg:block xl:hidden">LG Device</span>
          <span className="hidden xl:block 2xl:hidden">XL Device</span>
          <span className="hidden 2xl:block">2XL Device</span>
        </div>
      </div>
      <Navbar />
      <Hero />
      <div className="mt-32">
        <ContactStrip />
      </div>
      <About />
      <Experience />
      <CaseStudy />
      <Testimonial />
      <Stats />
      <div className="mt-32">
        <Contact />
      </div>
      <Footer />
    </>
  );
}
