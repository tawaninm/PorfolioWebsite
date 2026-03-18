"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import ThreeScene with SSR disabled
const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

export default function ThreeProvider() {
  return (
    <Suspense fallback={null}>
      <ThreeScene />
    </Suspense>
  );
}
