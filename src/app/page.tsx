import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillMarquee from "@/components/SkillMarquee";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SkillMarquee />
        <About />
        <Works />
        <Contact />
      </main>
    </>
  );
}
