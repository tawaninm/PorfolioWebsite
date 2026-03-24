import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import SynchroDetailClient from "./SynchroDetailClient";

export const metadata: Metadata = {
  title: "Synchro | Portfolio",
  description: "Physical Computing + Interactive Product Case Study",
};

export default function SynchroPage() {
  const project = projects.find((p) => p.slug === "synchro");
  
  if (!project) {
    notFound();
  }

  return <SynchroDetailClient project={project} />;
}
