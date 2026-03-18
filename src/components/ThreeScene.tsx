"use client";

import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PETAL_COLORS = ["#FFB7C5", "#FFF0F5", "#FFE4E1"]; // sakura pink, lavender blush, misty rose

const SHAPE_CONFIGS: {
  type: "torus" | "octahedron" | "icosahedron";
  color: string;
}[] = [
  { type: "torus", color: "#C8A8E8" },       // lavender
  { type: "torus", color: "#88D8E8" },        // sky-cyan
  { type: "octahedron", color: "#A8E8D0" },   // mint
  { type: "octahedron", color: "#F0B0D0" },   // sakura-pink
  { type: "icosahedron", color: "#5080F0" },   // electric-blue
  { type: "icosahedron", color: "#F0D040" },   // retro-yellow
];

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
/*  Floating wireframe shapes                                          */
/* ------------------------------------------------------------------ */

interface ShapeData {
  type: string;
  color: string;
  px: number;
  py: number;
  pz: number;
  rx: number;
  ry: number;
  rz: number;
  rSx: number;
  rSy: number;
  rSz: number;
  floatOffset: number;
}

const FloatingShapes = React.memo(function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const shapesData = useMemo<ShapeData[]>(() => {
    return SHAPE_CONFIGS.map((cfg, i) => ({
      type: cfg.type,
      color: cfg.color,
      px: (Math.random() * 8 - 4),
      py: (Math.random() * 5 - 2),
      pz: -(Math.random() * 3 + 2),
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      rSx: Math.random() * 0.005 + 0.003,
      rSy: Math.random() * 0.005 + 0.003,
      rSz: Math.random() * 0.005 + 0.003,
      floatOffset: i * 1.5,
    }));
  }, []);

  const geometries = useMemo(() => {
    return {
      torus: new THREE.TorusGeometry(0.35, 0.12, 8, 20),
      octahedron: new THREE.OctahedronGeometry(0.4),
      icosahedron: new THREE.IcosahedronGeometry(0.4),
    };
  }, []);

  const materials = useMemo(() => {
    return shapesData.map(
      (s) =>
        new THREE.MeshBasicMaterial({
          color: s.color,
          wireframe: true,
          transparent: true,
          opacity: 0.6,
        })
    );
  }, [shapesData]);

  // Cleanup
  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    };
  }, [geometries, materials]);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const d = shapesData[i];
      if (!d) return;
      child.rotation.x += d.rSx;
      child.rotation.y += d.rSy;
      child.rotation.z += d.rSz;
      child.position.y = d.py + Math.sin(t * 0.5 + d.floatOffset) * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {shapesData.map((s, i) => (
        <mesh
          key={i}
          geometry={geometries[s.type as keyof typeof geometries]}
          material={materials[i]}
          position={[s.px, s.py, s.pz]}
          rotation={[s.rx, s.ry, s.rz]}
        />
      ))}
    </group>
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
        <FloatingShapes />
        <MouseParallax />
      </Canvas>
    </div>
  );
};

export default React.memo(ThreeScene);
