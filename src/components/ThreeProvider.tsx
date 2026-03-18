"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

export default function ThreeProvider() {
  return (
    <Suspense fallback={null}>
      <ThreeScene />
    </Suspense>
  );
}
