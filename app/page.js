import About from "./components/About";
import CaseStudy from "./components/CaseStudy";
import ContactStrip from "./components/ContactStrip";
import Experience from "./components/Exprience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

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
    </>
  );
}
