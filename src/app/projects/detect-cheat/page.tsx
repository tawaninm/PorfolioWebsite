import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import DetectCheatClient from "./DetectCheatClient";

export const metadata: Metadata = {
  title: "DETEC-CHEAT | Portfolio",
  description: "Educational Game Case Study — สืบ-ล่า-โกง: 2D Chat Visual Novel on Computer Crime Law",
};

export default function DetectCheatPage() {
  const project = projects.find((p) => p.slug === "detect-cheat");

  if (!project) {
    notFound();
  }

  return <DetectCheatClient project={project} />;
}
