"use client";

import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PETAL_COLORS = ["#FFB7C5", "#FFF0F5", "#FFE4E1"]; // sakura pink, lavender blush, misty rose

/* ------------------------------------------------------------------ */
/*  Custom petal shape (adapted from gist bezier-curve approach)       */
/* ------------------------------------------------------------------ */

function createPetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // Bezier petal silhouette inspired by the gist
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.15, 0.15, 0.15, 0.35, 0, 0.5);
  shape.bezierCurveTo(-0.15, 0.35, -0.15, 0.15, 0, 0);

  const geo = new THREE.ShapeGeometry(shape, 8);
  geo.center();
  geo.scale(0.18, 0.18, 1);
  return geo;
}

/* ------------------------------------------------------------------ */
/*  Petal data                                                         */
/* ------------------------------------------------------------------ */

interface PetalData {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  speedY: number;
  speedX: number;
  rSpeedX: number;
  rSpeedZ: number;
  wobbleOffset: number;
  wobbleSpeed: number;
  colorIndex: number;
}

function createPetal(): PetalData {
  return {
    x: (Math.random() - 0.5) * 12,
    y: Math.random() * 12 - 2,
    z: (Math.random() - 0.5) * 6,
    rx: Math.random() * Math.PI * 2,
    ry: Math.random() * Math.PI * 2,
    rz: Math.random() * Math.PI * 2,
    speedY: Math.random() * 0.012 + 0.006,
    speedX: (Math.random() - 0.5) * 0.006,
    rSpeedX: Math.random() * 0.03 + 0.01,
    rSpeedZ: Math.random() * 0.02 + 0.005,
    wobbleOffset: Math.random() * 100,
    wobbleSpeed: Math.random() * 0.5 + 0.3,
    colorIndex: Math.floor(Math.random() * PETAL_COLORS.length),
  };
}

/* ------------------------------------------------------------------ */
/*  Sakura Petals component (InstancedMesh)                            */
/* ------------------------------------------------------------------ */

const MAX_PETALS = 100;

const SakuraPetals = React.memo(function SakuraPetals() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [count, setCount] = useState(MAX_PETALS);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect mobile + reduced-motion
  useEffect(() => {
    setCount(window.innerWidth < 768 ? 30 : MAX_PETALS);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const petalGeo = useMemo(() => createPetalGeometry(), []);
  const petalMaterials = useMemo(
    () =>
      PETAL_COLORS.map(
        (c) =>
          new THREE.MeshBasicMaterial({
            color: c,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.78,
            depthWrite: false,
          })
      ),
    []
  );

  const petalsData = useRef<PetalData[]>(
    Array.from({ length: MAX_PETALS }, () => createPetal())
  );

  // Assign per-instance colour via instanceColor
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Set initial instance colours
    const color = new THREE.Color();
    petalsData.current.forEach((p, i) => {
      color.set(PETAL_COLORS[p.colorIndex]);
      mesh.setColorAt(i, color);
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // Set initial transforms
    petalsData.current.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh || reducedMotion) return;

    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const p = petalsData.current[i];

      // Gravity fall
      p.y -= p.speedY;
      // Wind drift with sine variation (from gist approach)
      p.x += p.speedX + Math.sin(t * p.wobbleSpeed + p.wobbleOffset) * 0.004;
      // Tumble rotation (X and Z, matching gist)
      p.rx += p.rSpeedX;
      p.rz += p.rSpeedZ;

      // Reset when below view
      if (p.y < -6) {
        p.y = 6 + Math.random() * 4;
        p.x = (Math.random() - 0.5) * 12;
        p.z = (Math.random() - 0.5) * 6;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  // Cleanup
  useEffect(() => {
    return () => {
      petalGeo.dispose();
      petalMaterials.forEach((m) => m.dispose());
    };
  }, [petalGeo, petalMaterials]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeo, petalMaterials[0], count]}
      frustumCulled={false}
    />
  );
});

/* ------------------------------------------------------------------ */
/*  Mouse parallax camera                                              */
/* ------------------------------------------------------------------ */

const MouseParallax = React.memo(function MouseParallax() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  useFrame(() => {
    if (reducedMotion) return;
    const tx = mouse.current.x * 0.3;
    const ty = -mouse.current.y * 0.3;
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
});

/* ------------------------------------------------------------------ */
/*  Main scene                                                         */
/* ------------------------------------------------------------------ */

const ThreeScene = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <SakuraPetals />
        <MouseParallax />
      </Canvas>
    </div>
  );
};

export default React.memo(ThreeScene);
