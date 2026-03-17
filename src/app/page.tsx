import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillMarquee from "@/components/SkillMarquee";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SkillMarquee />
      </main>
    </>
  );
}
