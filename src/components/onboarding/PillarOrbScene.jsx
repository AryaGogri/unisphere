import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PILLAR_COLORS = {
  memory: '#f59e0b',
  exchange: '#14b8a6',
  connect: '#8b5cf6',
  opportunities: '#3b82f6',
  explore: '#10b981'
};

function PillarNode({ color, position, isSelected, onClick, pillarName }) {
  const groupRef = useRef();
  const ringRef = useRef();
  const coreRef = useRef();

  const { particlePositions, particleColors } = useMemo(() => {
    const count = 45;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 0.45;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      const c = baseColor.clone().offsetHSL((Math.random() - 0.5) * 0.05, 0, (Math.random() - 0.5) * 0.1);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { particlePositions: pos, particleColors: col };
  }, [color]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * (isSelected ? 0.8 : 0.3);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 1.5) * 0.3;
      ringRef.current.rotation.z = t * 0.5;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.rotation.x = t * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <group
        ref={groupRef}
        position={position}
        onClick={onClick}
        scale={isSelected ? 1.35 : 1}
      >
        {/* Central Geometric Crystal */}
        <mesh ref={coreRef} scale={isSelected ? 0.45 : 0.35}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isSelected ? 1.4 : 0.6}
            wireframe={!isSelected}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting Ring */}
        <mesh ref={ringRef} scale={0.7}>
          <torusGeometry args={[1, 0.02, 16, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isSelected ? 0.8 : 0.35}
          />
        </mesh>

        {/* Clustered Orbiting Micro-Particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isSelected ? 0.05 : 0.035}
            vertexColors
            transparent
            opacity={isSelected ? 0.9 : 0.5}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </Float>
  );
}

export function PillarOrbScene({ selectedPillar, onSelectPillar }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full h-64 sm:h-80 relative cursor-pointer">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 4, 3]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, -2, 2]} intensity={1.2} color="#f59e0b" />
        <pointLight position={[4, -2, 2]} intensity={1.2} color="#14b8a6" />

        <PillarNode
          pillarName="Memory"
          color={PILLAR_COLORS.memory}
          position={[-3, 0.8, 0]}
          isSelected={selectedPillar === 'memory'}
          onClick={() => onSelectPillar('memory')}
        />
        <PillarNode
          pillarName="Exchange"
          color={PILLAR_COLORS.exchange}
          position={[-1.5, -0.8, 0]}
          isSelected={selectedPillar === 'exchange'}
          onClick={() => onSelectPillar('exchange')}
        />
        <PillarNode
          pillarName="Connect"
          color={PILLAR_COLORS.connect}
          position={[0, 1.0, 0]}
          isSelected={selectedPillar === 'connect'}
          onClick={() => onSelectPillar('connect')}
        />
        <PillarNode
          pillarName="Opportunities"
          color={PILLAR_COLORS.opportunities}
          position={[1.5, -0.8, 0]}
          isSelected={selectedPillar === 'opportunities'}
          onClick={() => onSelectPillar('opportunities')}
        />
        <PillarNode
          pillarName="Explore"
          color={PILLAR_COLORS.explore}
          position={[3, 0.8, 0]}
          isSelected={selectedPillar === 'explore'}
          onClick={() => onSelectPillar('explore')}
        />
      </Canvas>
    </div>
  );
}
