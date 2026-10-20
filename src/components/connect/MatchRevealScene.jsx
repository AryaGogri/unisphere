import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'motion/react';
import { Heart, Sparkles, MessageSquare } from 'lucide-react';

function BurstCore() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.03;
      meshRef.current.rotation.z += 0.02;
    }
  });

  return (
    <Float speed={4} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <MeshDistortMaterial
          color="#ec4899"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

export function MatchRevealScene({ candidate, onClose, onStartChat }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative w-full max-w-md glass-panel p-8 text-center border border-pink-500/30 shadow-[0_0_80px_rgba(236,72,153,0.3)] overflow-hidden"
      >
        <div className="h-48 w-full absolute top-0 left-0 pointer-events-none opacity-60">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={1} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#f43f5e" />
            <BurstCore />
          </Canvas>
        </div>

        <div className="relative z-10 flex flex-col items-center pt-8">
          <div className="w-20 h-20 rounded-full border-2 border-pink-400 p-1 mb-4 shadow-[0_0_25px_rgba(236,72,153,0.5)]">
            <img
              src={candidate?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={candidate?.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-2 border border-pink-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>It's a Mutual Connection!</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Matched with {candidate?.name}!</h2>
          <p className="text-xs text-slate-300 mb-6">
            {candidate?.compatibility}% Compatibility • Both active in {candidate?.course}
          </p>

          <div className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-slate-300 mb-6 text-left">
            <span className="font-semibold text-pink-300">Why you matched:</span>
            <ul className="mt-1 space-y-1 list-disc list-inside text-slate-300">
              {candidate?.reasons?.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="glass-button w-full text-xs text-slate-300 py-2.5"
            >
              Keep Swiping
            </button>
            <button
              onClick={() => {
                onClose();
                if (onStartChat) onStartChat(candidate);
              }}
              className="glass-button glass-button-primary w-full text-xs py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 border-pink-400/30 flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Say Hello</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
