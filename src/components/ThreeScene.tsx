"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Sakura Petals — InstancedMesh                                     */
/* ------------------------------------------------------------------ */

interface PetalData {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotZ: number;
  speedY: number;
  driftPhase: number;
  driftAmp: number;
  rotSpeedX: number;
  rotSpeedZ: number;
}

function initPetal(startHigh: boolean): PetalData {
  return {
    x: (Math.random() - 0.5) * 10,
    y: startHigh ? Math.random() * 5 + 5 : Math.random() * 15 - 5,
    z: (Math.random() - 0.5) * 6,
    rotX: Math.random() * Math.PI * 2,
    rotZ: Math.random() * Math.PI * 2,
    speedY: Math.random() * 0.01 + 0.005,
    driftPhase: Math.random() * Math.PI * 2,
    driftAmp: Math.random() * 0.3 + 0.1,
    rotSpeedX: Math.random() * 0.02 + 0.01,
    rotSpeedZ: Math.random() * 0.015 + 0.005,
  };
}

const PETAL_COLORS = [0xffb7c5, 0xfff0f5];
const dummy = new THREE.Object3D();

function SakuraPetals({ count, animate }: { count: number; animate: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const petals = useRef<PetalData[]>([]);
  const timeRef = useRef(0);

  const [geo, mat] = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.04, 0.04);
    const m = new THREE.MeshBasicMaterial({
      color: PETAL_COLORS[0],
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    return [g, m];
  }, []);

  // Initialize petals
  useEffect(() => {
    petals.current = Array.from({ length: count }, () => initPetal(false));

    // Set initial instance colors
    if (meshRef.current) {
      const color = new THREE.Color();
      for (let i = 0; i < count; i++) {
        color.set(PETAL_COLORS[i % 2]);
        meshRef.current.setColorAt(i, color);
      }
      if (meshRef.current.instanceColor)
        meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (animate) timeRef.current += delta;

    for (let i = 0; i < count; i++) {
      const p = petals.current[i];
      if (!p) continue;

      if (animate) {
        p.y -= p.speedY;
        p.rotX += p.rotSpeedX;
        p.rotZ += p.rotSpeedZ;

        // Sine wave horizontal drift
        const drift =
          Math.sin(timeRef.current * 0.5 + p.driftPhase) * p.driftAmp * 0.01;
        p.x += drift;

        // Reset when fallen below view
        if (p.y < -5) {
          p.y = Math.random() * 5 + 5;
          p.x = (Math.random() - 0.5) * 10;
          p.z = (Math.random() - 0.5) * 6;
        }
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, 0, p.rotZ);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geo, mat, count]} frustumCulled={false} />
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Wireframe Shapes                                         */
/* ------------------------------------------------------------------ */

const SHAPE_CONFIGS = [
  { type: "torus", color: 0xc8a8e8, pos: [-3, 2, -2], rotSpeed: [0.003, 0.005, 0] },
  { type: "torus", color: 0x88d8e8, pos: [3, -1, -3], rotSpeed: [0.004, 0.003, 0] },
  { type: "octahedron", color: 0xa8e8d0, pos: [-2, -2, -1], rotSpeed: [0.005, 0.008, 0] },
  { type: "octahedron", color: 0xf0b0d0, pos: [2, 3, -2], rotSpeed: [0.006, 0.004, 0] },
  { type: "icosahedron", color: 0x5080f0, pos: [4, 0, -4], rotSpeed: [0.004, 0.006, 0] },
  { type: "icosahedron", color: 0xf0d040, pos: [-4, 1, -3], rotSpeed: [0.007, 0.003, 0] },
] as const;

function WireframeShape({
  type,
  color,
  pos,
  rotSpeed,
  animate,
}: {
  type: string;
  color: number;
  pos: readonly [number, number, number];
  rotSpeed: readonly [number, number, number];
  animate: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = pos[1];
  const timeRef = useRef(Math.random() * Math.PI * 2);

  const geometry = useMemo(() => {
    switch (type) {
      case "torus":
        return new THREE.TorusGeometry(0.4, 0.15, 8, 16);
      case "octahedron":
        return new THREE.OctahedronGeometry(0.35);
      case "icosahedron":
        return new THREE.IcosahedronGeometry(0.35);
      default:
        return new THREE.OctahedronGeometry(0.35);
    }
  }, [type]);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
    [color],
  );

  useFrame((_, delta) => {
    if (!meshRef.current || !animate) return;
    timeRef.current += delta;
    meshRef.current.rotation.x += rotSpeed[0];
    meshRef.current.rotation.y += rotSpeed[1];
    meshRef.current.position.y = baseY + Math.sin(timeRef.current * 0.5) * 0.3;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[pos[0], pos[1], pos[2]]}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Mouse Parallax Camera Controller                                  */
/* ------------------------------------------------------------------ */

function CameraRig({ animate }: { animate: boolean }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [animate]);

  useFrame(() => {
    if (!animate) return;
    const targetX = mouse.current.x * 0.3;
    const targetY = -mouse.current.y * 0.3;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Scene Root                                                        */
/* ------------------------------------------------------------------ */

function Scene({ petalCount, animate }: { petalCount: number; animate: boolean }) {
  return (
    <>
      <CameraRig animate={animate} />
      <SakuraPetals count={petalCount} animate={animate} />
      {SHAPE_CONFIGS.map((cfg, i) => (
        <WireframeShape
          key={i}
          type={cfg.type}
          color={cfg.color}
          pos={cfg.pos}
          rotSpeed={cfg.rotSpeed}
          animate={animate}
        />
      ))}
    </>
  );
}

const MemoScene = React.memo(Scene);

/* ------------------------------------------------------------------ */
/*  Exported ThreeScene Component                                     */
/* ------------------------------------------------------------------ */

function ThreeScene() {
  const [petalCount, setPetalCount] = useState(100);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    const updateCount = () => setPetalCount(window.innerWidth < 768 ? 30 : 100);
    updateCount();
    window.addEventListener("resize", updateCount);

    return () => {
      mq.removeEventListener("change", handler);
      window.removeEventListener("resize", updateCount);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <Canvas
        camera={{ fov: 60, position: [0, 0, 5] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <MemoScene petalCount={petalCount} animate={!reducedMotion} />
      </Canvas>
    </div>
  );
}

export default React.memo(ThreeScene);
