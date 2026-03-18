import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import SkillMarquee from "@/components/SkillMarquee";
import About from "@/components/About";

const Works = dynamic(() => import("@/components/Works"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
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
