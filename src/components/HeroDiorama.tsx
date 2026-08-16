"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Responsive Camera Adjuster — prevents clipping on narrow screens  */
/* ------------------------------------------------------------------ */

function CameraFrameAdjuster() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    // Base z is 9.5 for aspect >= 1 (landscape / square).
    // On narrow screens (aspect < 1, e.g. 430x699 aspect 0.615), increase Z to fit vinyl & cassette
    const targetZ = aspect < 1 ? Math.max(9.5, 6.2 / aspect) : 9.5;
    camera.position.z = targetZ;
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  Mouse parallax — the whole diorama group leans toward the cursor   */
/* ------------------------------------------------------------------ */

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reduced.current = e.matches;
    };
    mq.addEventListener("change", onChange);

    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    if (!reduced.current) {
      const rx = target.current.y * 0.16;
      const ry = target.current.x * 0.24;
      g.rotation.x += (rx - g.rotation.x) * Math.min(1, delta * 4);
      g.rotation.y += (ry - g.rotation.y) * Math.min(1, delta * 4);
    }
    // Gentle perpetual float (ok under reduced motion)
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
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
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reduced.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useFrame((state, delta) => {
    if (reduced.current) return;
    const g = spin.current;
    if (g) g.rotation.y += delta * 0.5;
  });

  return (
    <group position={[-1.75, 0.35, -0.4]} rotation={[0.55, -0.25, 0.12]}>
      <group ref={spin}>
        {/* Disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.07, 48]} />
          <meshStandardMaterial color="#18182E" roughness={0.35} metalness={0.45} />
        </mesh>
        {/* Groove rings */}
        {[1.08, 0.9, 0.78].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
            <torusGeometry args={[r, 0.012, 8, 64]} />
            <meshStandardMaterial color="#30305A" roughness={0.5} metalness={0.4} />
          </mesh>
        ))}
        {/* Neon label */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.02, 32]} />
          <meshStandardMaterial color="#FF2D78" emissive="#FF2D78" emissiveIntensity={1.2} roughness={0.3} />
        </mesh>
        {/* Label center hole */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.055, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.03, 16]} />
          <meshStandardMaterial color="#18182E" />
        </mesh>
      </group>
      {/* Tonearm hint */}
      <mesh position={[0.5, 0.25, 0.85]} rotation={[0.1, 0.2, 0.35]}>
        <cylinderGeometry args={[0.018, 0.018, 1.0, 8]} />
        <meshStandardMaterial color="#F0D040" emissive="#F0D040" emissiveIntensity={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Boombox — city pop icon                                            */
/* ------------------------------------------------------------------ */

function Boombox() {
  return (
    <group position={[0, -0.05, 0.6]} rotation={[0, 0.1, -0.05]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[2.1, 0.9, 0.55]} />
        <meshStandardMaterial color="#22223A" roughness={0.5} metalness={0.35} />
      </mesh>
      {/* Speakers */}
      {[-0.68, 0.68].map((x) => (
        <group key={x} position={[x, 0.05, 0.3]}>
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 0.06, 32]} />
            <meshStandardMaterial color="#12121F" roughness={0.6} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <torusGeometry args={[0.4, 0.02, 8, 40]} />
            <meshStandardMaterial color="#FF2D78" emissive="#FF2D78" emissiveIntensity={1.0} />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <torusGeometry args={[0.28, 0.015, 8, 40]} />
            <meshStandardMaterial color="#FF6090" emissive="#FF6090" emissiveIntensity={0.7} />
          </mesh>
        </group>
      ))}
      {/* Handle */}
      <mesh position={[0, 0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.028, 8, 40, Math.PI]} />
        <meshStandardMaterial color="#5080F0" emissive="#5080F0" emissiveIntensity={0.6} metalness={0.5} />
      </mesh>
      {/* Tape deck window */}
      <mesh position={[0, -0.1, 0.3]}>
        <boxGeometry args={[0.75, 0.26, 0.06]} />
        <meshStandardMaterial color="#12121F" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Neon strip */}
      <mesh position={[0, 0.28, 0.3]}>
        <boxGeometry args={[1.65, 0.032, 0.02]} />
        <meshStandardMaterial color="#40C8A0" emissive="#40C8A0" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Cassette tape                                                      */
/* ------------------------------------------------------------------ */

function Cassette() {
  return (
    <group position={[1.8, 0.1, 0.1]} rotation={[0.1, -0.45, 0.3]}>
      <mesh>
        <boxGeometry args={[0.8, 0.52, 0.16]} />
        <meshStandardMaterial color="#F0D040" roughness={0.45} metalness={0.2} />
      </mesh>
      {/* Reels */}
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, 0, 0.09]}>
          <torusGeometry args={[0.1, 0.028, 8, 24]} />
          <meshStandardMaterial color="#1A1A2E" roughness={0.4} />
        </mesh>
      ))}
      {/* Label */}
      <mesh position={[0, 0.16, 0.09]}>
        <boxGeometry args={[0.6, 0.11, 0.01]} />
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
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0.2]}>
      <circleGeometry args={[2.6, 48]} />
      <meshBasicMaterial color="#FF2D78" transparent opacity={0.18} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

export default function HeroDiorama() {
  return (
    <div className="relative w-full h-full min-h-[340px] pointer-events-none select-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.9, 9.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <CameraFrameAdjuster />
        <ambientLight intensity={0.65} />
        <pointLight position={[4, 4, 4]} intensity={40} color="#FF2D78" />
        <pointLight position={[-4, 2, 3]} intensity={30} color="#5080F0" />
        <pointLight position={[0, -2, 4]} intensity={20} color="#40C8A0" />

        <ParallaxGroup>
          <VinylRecord />
          <Boombox />
          <Cassette />
          <NeonFloor />
        </ParallaxGroup>
      </Canvas>
    </div>
  );
}

