"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function MorphingCore() {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const pointerX = state.pointer.x * 0.28;
    const pointerY = state.pointer.y * 0.18;

    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.18;
      groupRef.current.rotation.y += delta * 0.26;
      groupRef.current.rotation.x += (pointerY - groupRef.current.rotation.x) * 0.035;
      groupRef.current.rotation.y += (pointerX - groupRef.current.rotation.y) * 0.04;
    }

    const pulse = 1 + Math.sin(elapsed * 1.6) * 0.06;

    if (meshRef.current) {
      meshRef.current.scale.setScalar(pulse);
    }

    if (shellRef.current) {
      shellRef.current.scale.setScalar(1.08 + Math.sin(elapsed * 1.3) * 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.46, 1]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={1.2}
          transparent
          opacity={0.12}
          roughness={0.15}
          metalness={0.35}
        />
      </mesh>

      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.34, 2]} />
        <meshStandardMaterial
          color="#fcd34d"
          emissive="#f59e0b"
          emissiveIntensity={1.1}
          metalness={0.65}
          roughness={0.18}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 4.2], fov: 48 }}>
      <color attach="background" args={["#0d0d0f"]} />
      <fog attach="fog" args={["#0d0d0f", 3, 9]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 2]} intensity={1.35} color="#fdba74" />
      <pointLight position={[-2, -1, 3]} intensity={2.2} color="#f59e0b" />
      <pointLight position={[2, 1, 1]} intensity={0.85} color="#fde68a" />
      <MorphingCore />
      <Sparkles
        count={64}
        size={1.8}
        speed={0.4}
        opacity={0.55}
        scale={[5, 5, 4]}
        color="#fdba74"
      />
      <Environment preset="city" />
    </Canvas>
  );
}
