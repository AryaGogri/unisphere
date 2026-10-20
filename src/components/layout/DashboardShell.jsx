import React from 'react';
import { GlassSidebar } from './GlassSidebar';
import { MobileNav } from './MobileNav';
import { CustomCursor } from '../common/CustomCursor';
import { Navbar } from '../common/Navbar';
import { ClusterParticlesBackground } from '../common/ClusterParticlesBackground';

export function DashboardShell({ children }) {
  return (
    <div className="relative min-h-screen bg-[#060813] text-slate-100 flex flex-col md:flex-row overflow-x-hidden">
      {/* Dynamic Ambient Background Layers & Clustered Floating Particles */}
      <div className="ambient-bg">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        <div className="ambient-blob-3" />
      </div>
      <ClusterParticlesBackground opacity={0.45} />

      <CustomCursor />
      
      {/* Desktop Glass Sidebar */}
      <GlassSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        <Navbar />
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto relative z-10">
          {children}
        </main>
      </div>

      {/* Mobile Floating Bottom Nav */}
      <MobileNav />
    </div>
  );
}

