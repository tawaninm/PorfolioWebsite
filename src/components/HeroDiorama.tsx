"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Mouse parallax — the whole diorama group leans toward the cursor   */
/* ------------------------------------------------------------------ */

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const rx = target.current.y * 0.22;
    const ry = target.current.x * 0.3;
    g.rotation.x += (rx - g.rotation.x) * Math.min(1, delta * 4);
    g.rotation.y += (ry - g.rotation.y) * Math.min(1, delta * 4);
    // Gentle perpetual float + spin
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
  });

  return <group ref={ref}>{children}</group>;
}

/* ------------------------------------------------------------------ */
/*  Vinyl record — spins forever                                       */
/* ------------------------------------------------------------------ */

function VinylRecord() {
  const spin = useRef<THREE.Group>(null);
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((state, delta) => {
    if (reduced.current) return;
    const g = spin.current;
    if (g) g.rotation.y += delta * 0.5;
  });

  return (
    <group position={[-2.3, 0.4, 0]} rotation={[0.5, -0.3, 0]}>
      <group ref={spin}>
        {/* Disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.07, 48]} />
          <meshStandardMaterial color="#15152A" roughness={0.35} metalness={0.45} />
        </mesh>
        {/* Groove rings */}
        {[1.25, 1.05, 0.9].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <torusGeometry args={[r, 0.012, 8, 64]} />
            <meshStandardMaterial color="#2A2A4A" roughness={0.5} metalness={0.4} />
          </mesh>
        ))}
        {/* Neon label */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.02, 32]} />
          <meshStandardMaterial
            color="#FF2D78"
            emissive="#FF2D78"
            emissiveIntensity={0.9}
            roughness={0.3}
          />
        </mesh>
        {/* Label center hole */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
          <meshStandardMaterial color="#15152A" />
        </mesh>
      </group>
      {/* Tonearm hint */}
      <mesh position={[0.6, 0.25, 0.9]} rotation={[0, 0.2, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 1.1, 8]} />
        <meshStandardMaterial color="#F0D040" emissive="#F0D040" emissiveIntensity={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Boombox — city pop icon                                            */
/* ------------------------------------------------------------------ */

function Boombox() {
  return (
    <group position={[0, -0.15, 0.4]} rotation={[0, 0.15, -0.06]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[2.3, 0.95, 0.55]} />
        <meshStandardMaterial color="#1C1C2E" roughness={0.5} metalness={0.35} />
      </mesh>
      {/* Speakers */}
      {[-0.75, 0.75].map((x) => (
        <group key={x} position={[x, 0.05, 0.3]}>
          <mesh>
            <cylinderGeometry args={[0.42, 0.42, 0.06, 32]} />
            <meshStandardMaterial color="#10101C" roughness={0.6} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <torusGeometry args={[0.42, 0.02, 8, 40]} />
            <meshStandardMaterial color="#FF2D78" emissive="#FF2D78" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <torusGeometry args={[0.3, 0.015, 8, 40]} />
            <meshStandardMaterial color="#FF6090" emissive="#FF6090" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
      {/* Handle */}
      <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.03, 8, 40, Math.PI]} />
        <meshStandardMaterial color="#5080F0" emissive="#5080F0" emissiveIntensity={0.5} metalness={0.5} />
      </mesh>
      {/* Tape deck window */}
      <mesh position={[0, -0.1, 0.3]}>
        <boxGeometry args={[0.8, 0.28, 0.06]} />
        <meshStandardMaterial color="#10101C" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Neon strip */}
      <mesh position={[0, 0.3, 0.3]}>
        <boxGeometry args={[1.8, 0.035, 0.02]} />
        <meshStandardMaterial color="#40C8A0" emissive="#40C8A0" emissiveIntensity={1.1} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Cassette tape                                                      */
/* ------------------------------------------------------------------ */

function Cassette() {
  return (
    <group position={[2.4, 0.1, -0.4]} rotation={[0.1, -0.5, 0.35]}>
      <mesh>
        <boxGeometry args={[0.85, 0.55, 0.16]} />
        <meshStandardMaterial color="#F0D040" roughness={0.45} metalness={0.2} />
      </mesh>
      {/* Reels */}
      {[-0.2, 0.2].map((x) => (
        <mesh key={x} position={[x, 0, 0.09]}>
          <torusGeometry args={[0.11, 0.03, 8, 24]} />
          <meshStandardMaterial color="#1A1A2E" roughness={0.4} />
        </mesh>
      ))}
      {/* Label */}
      <mesh position={[0, 0.17, 0.09]}>
        <boxGeometry args={[0.65, 0.12, 0.01]} />
        <meshStandardMaterial color="#FFE8F0" roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Neon floor glow                                                    */
/* ------------------------------------------------------------------ */

function NeonFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
      <circleGeometry args={[3.2, 48]} />
      <meshBasicMaterial color="#FF2D78" transparent opacity={0.16} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

export default function HeroDiorama() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[320px] pointer-events-none select-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.4, 6.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={30} color="#FF2D78" />
        <pointLight position={[-4, 2, 3]} intensity={22} color="#5080F0" />
        <pointLight position={[0, -2, 4]} intensity={14} color="#40C8A0" />

        <ParallaxGroup>
          <VinylRecord />
          <Boombox />
          <Cassette />
          <NeonFloor />
        </ParallaxGroup>

        <EffectComposer>
          <Bloom intensity={reduced ? 0.3 : 0.9} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur radius={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
