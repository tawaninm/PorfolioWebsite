import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillMarquee from "@/components/SkillMarquee";
import About from "@/components/About";
import Works from "@/components/Works";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SkillMarquee />
        <About />
        <Works />
      </main>
    </>
  );
}
