"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

type OrbProps = {
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
};

function FloatingOrb({ position, color, speed, size }: OrbProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(elapsed * speed + position[0]) * 0.18;
    meshRef.current.position.x = position[0] + Math.cos(elapsed * speed * 0.7 + position[1]) * 0.12;
    meshRef.current.rotation.x = elapsed * speed * 0.2;
    meshRef.current.rotation.y = elapsed * speed * 0.18;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.82}
        roughness={0.2}
        metalness={0.35}
      />
    </mesh>
  );
}

export default function SkillsScene() {
  return (
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 5.2], fov: 54 }}>
      <ambientLight intensity={0.45} />
      <pointLight position={[0, 0, 4]} intensity={1.5} color="#f59e0b" />
      <pointLight position={[-3, 2, 3]} intensity={0.8} color="#94a3b8" />
      <FloatingOrb position={[-2.6, 0.7, 0]} color="#f59e0b" speed={1} size={0.34} />
      <FloatingOrb position={[-1.2, -0.8, -0.3]} color="#fb923c" speed={1.3} size={0.23} />
      <FloatingOrb position={[0.4, 0.35, 0]} color="#94a3b8" speed={0.85} size={0.3} />
      <FloatingOrb position={[1.55, -0.95, 0.2]} color="#cbd5e1" speed={1.1} size={0.2} />
      <FloatingOrb position={[2.55, 0.92, -0.4]} color="#f59e0b" speed={0.95} size={0.28} />
      <FloatingOrb position={[0.9, 1.3, -0.6]} color="#fdba74" speed={1.25} size={0.16} />
      <FloatingOrb position={[-0.55, 1.05, -0.5]} color="#64748b" speed={1.05} size={0.14} />
      <FloatingOrb position={[-2.05, -1.12, -0.55]} color="#94a3b8" speed={0.9} size={0.15} />
    </Canvas>
  );
}
