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
      <Footer/>
    </>
  );
}
