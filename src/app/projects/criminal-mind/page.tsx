import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import CriminalMindClient from "./CriminalMindClient";

export const metadata: Metadata = {
  title: "Criminal Minds | Portfolio",
  description: "Narrative Investigation Game Case Study — ห้วงลึกภายในจิตใจ: Ethical Police Forensics Visual Novel",
};

export default function CriminalMindPage() {
  const project = projects.find((p) => p.slug === "criminal-mind");

  if (!project) {
    notFound();
  }

  return <CriminalMindClient project={project} />;
}
