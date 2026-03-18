"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

const SHAPE_COLORS = [
  "#B4B5FA", // lavender
  "#00F0FF", // sky-cyan
  "#A0FFD9", // mint
  "#FFB7C5", // sakura-pink
  "#0055FF", // electric-blue
  "#FFF200"  // retro-yellow
];

const SakuraPetals = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [count, setCount] = useState(100);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setCount(window.innerWidth < 768 ? 30 : 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const petals = useMemo(() => {
    return new Array(100).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        Math.random() * 10,
        (Math.random() - 0.5) * 6
      ),
      rotation: new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      speed: Math.random() * 0.01 + 0.005,
      rSpeed: new THREE.Vector3(
        Math.random() * 0.05,
        Math.random() * 0.05,
        Math.random() * 0.05
      ),
      driftOff: Math.random() * 100,
    }));
  }, []);

  // Initialize positions on first render to avoid jumping
  useEffect(() => {
    if (!meshRef.current) return;
    petals.forEach((petal, i) => {
      dummy.position.copy(petal.position);
      dummy.rotation.set(petal.rotation.x, petal.rotation.y, petal.rotation.z);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [petals, dummy]);

  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return;

    petals.forEach((petal, i) => {
      if (i >= count) return;
      
      petal.position.y -= petal.speed;
      petal.position.x += Math.sin(state.clock.elapsedTime + petal.driftOff) * 0.005;
      
      petal.rotation.x += petal.rSpeed.x;
      petal.rotation.y += petal.rSpeed.y;
      petal.rotation.z += petal.rSpeed.z;

      if (petal.position.y < -5) {
        petal.position.y = 5 + Math.random() * 5;
        petal.position.x = (Math.random() - 0.5) * 10;
      }

      dummy.position.copy(petal.position);
      dummy.rotation.set(petal.rotation.x, petal.rotation.y, petal.rotation.z);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.04, 0.04]} />
      <meshBasicMaterial 
        color="#FFB7C5" 
        side={THREE.DoubleSide} 
        transparent 
        opacity={0.7} 
      />
    </instancedMesh>
  );
};

const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const shapesData = useMemo(() => {
    const data = [];
    const geometries = ['torus', 'torus', 'octahedron', 'octahedron', 'icosahedron', 'icosahedron'];
    
    for (let i = 0; i < 6; i++) {
      data.push({
        type: geometries[i],
        color: SHAPE_COLORS[i % SHAPE_COLORS.length],
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4 - 2
        ),
        rotation: new THREE.Vector3(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        rSpeed: new THREE.Vector3(
          (Math.random() * 0.005) + 0.003,
          (Math.random() * 0.005) + 0.003,
          (Math.random() * 0.005) + 0.003
        ),
        floatOff: Math.random() * 100,
        floatSpeed: Math.random() * 0.5 + 0.5,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!groupRef.current || shouldReduceMotion) return;
    
    groupRef.current.children.forEach((child, i) => {
      const data = shapesData[i];
      child.rotation.x += data.rSpeed.x;
      child.rotation.y += data.rSpeed.y;
      child.rotation.z += data.rSpeed.z;
      
      child.position.y = data.position.y + Math.sin(state.clock.elapsedTime * data.floatSpeed + data.floatOff) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {shapesData.map((data, i) => (
        <mesh 
          key={i} 
          position={data.position} 
          rotation={[data.rotation.x, data.rotation.y, data.rotation.z]}
        >
          {data.type === 'torus' && <torusGeometry args={[0.3, 0.1, 8, 16]} />}
          {data.type === 'octahedron' && <octahedronGeometry args={[0.4]} />}
          {data.type === 'icosahedron' && <icosahedronGeometry args={[0.4]} />}
          <meshBasicMaterial color={data.color} wireframe />
        </mesh>
      ))}
    </group>
  );
};

const MouseParallax = () => {
  const { camera, pointer } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));
  const shouldReduceMotion = useReducedMotion();

  useFrame(() => {
    if (shouldReduceMotion) return;
    
    targetPosition.current.x = (pointer.x * 2) * 0.3;
    targetPosition.current.y = (pointer.y * 2) * 0.3;

    camera.position.x += (targetPosition.current.x - camera.position.x) * 0.05;
    camera.position.y += (targetPosition.current.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const ThreeScene = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <SakuraPetals />
        <FloatingShapes />
        <MouseParallax />
      </Canvas>
    </div>
  );
};

export default React.memo(ThreeScene);
