/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import NanoLab from './components/NanoLab';
import ScaleSlider from './components/ScaleSlider';
import { motion } from 'motion/react';
import { 
  Atom, 
  ChevronDown, 
  Lightbulb, 
  Cpu, 
  Heart, 
  Coins, 
  Sparkles, 
  Activity, 
  Zap,
  RotateCcw,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export default function App() {
  // Nano-Facts generator interactive component state
  const [activeFactIndex, setActiveFactIndex] = useState(0);

  const nanoFacts = [
    {
      title: 'How small is a Nanometer?',
      fact: 'A nanometer is one-billionth of a meter. To put this in perspective, a sheet of newspaper is about 100,000 nanometers thick, and a single human hair is roughly 80,000 to 100,000 nanometers wide!',
      icon: <Activity className="w-5 h-5 text-accent" />
    },
    {
      title: 'Why do properties change at the Nanoscale?',
      fact: 'At the nanoscale, classical physics gives way to quantum mechanics. Materials can experience massive changes in color, electrical conductivity, strength, and chemical reactivity compared to their bulk counterparts. For example, bulk gold is yellow, but gold nanoparticles can appear red or purple!',
      icon: <Zap className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Can carbon nanotubes carry electricity?',
      fact: 'Yes! Carbon nanotubes can act as metals or semiconductors depending on how they are folded or "rolled." They are capable of carrying electric current densities 1,000 times greater than copper wire without burning out.',
      icon: <Cpu className="w-5 h-5 text-fuchsia-400" />
    },
    {
      title: 'The Miracle of Graphene Transparency',
      fact: 'Even though graphene conducts electricity better than copper and is 200 times stronger than structural steel, it is so incredibly thin that it absorbs a mere 2.3% of light, making it effectively transparent to the human eye.',
      icon: <Bookmark className="w-5 h-5 text-amber-400" />
    }
  ];

  // Helper smooth scroll to element ID
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-accent/30 selection:text-accent relative overflow-x-hidden">
      
      {/* Immersive Subtle Starfield/Atmosphere Background with Sophisticated Dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a2323] via-[#050505] to-[#010101] pointer-events-none z-0" />
      
      {/* Depth Grid overlay background to create 3D blueprint aesthetic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="depth-grid absolute top-10 left-1/2 -translate-x-1/2 w-[200%] h-[120%] opacity-20" />
      </div>

      {/* Decorative vertical indicator dots on the right margin (as specified in Sophisticated Dark HTML) */}
      <div className="fixed top-1/2 right-6 md:right-10 transform -translate-y-1/2 flex flex-col gap-6 items-center z-40">
        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_#00F0FF]" />
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span className="w-1 h-1 bg-white/20 rounded-full" />
      </div>

      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="p-1.5 bg-white/5 border border-white/10 rounded-sm text-accent shadow-sm">
              <Atom className="w-5 h-5 animate-spin-slow" />
            </span>
            <div>
              <h1 className="text-xl font-serif font-semibold tracking-[4px] text-slate-100 uppercase">
                NANO<span className="text-accent font-serif">.</span>CORE
              </h1>
              <span className="text-[9px] font-mono tracking-widest text-[#00F0FF]/60 block uppercase">
                Interactive Dynamics
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] uppercase tracking-widest text-white/40">
            <button id="nav-lab-link" onClick={() => scrollToSection('molecular-lab')} className="hover:text-accent transition-colors cursor-pointer text-white">
              Structures
            </button>
            <button id="nav-scale-link" onClick={() => scrollToSection('scale-magnifier')} className="hover:text-accent transition-colors cursor-pointer">
              Dynamics
            </button>
            <button id="nav-frontiers-link" onClick={() => scrollToSection('future-frontiers')} className="hover:text-[#00F0FF] transition-colors cursor-pointer">
              Frontiers
            </button>
            <button id="nav-faq-link" onClick={() => scrollToSection('sci-faq')} className="hover:text-[#00F0FF] transition-colors cursor-pointer">
              Archive
            </button>
          </nav>

          {/* Action Button */}
          <div>
            <button 
              id="cta-synthesizer-btn"
              onClick={() => scrollToSection('molecular-lab')} 
              className="py-1.5 px-4 rounded-sm text-[10px] uppercase font-mono tracking-widest border border-white/20 text-white bg-white/5 hover:bg-accent hover:text-black hover:border-accent transition-all select-none cursor-pointer duration-300"
            >
              Configure Lab
            </button>
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_6px_#00F0FF]" />
              <span className="font-mono text-[9px] tracking-widest text-slate-300 uppercase">
                Vector Precision WebGL Sandbox
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tight leading-[1.05] text-slate-100">
              The Architecture <br />
              of <span className="font-serif italic font-normal text-accent select-text">Invisibility</span>
            </h2>

            <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl font-sans font-light">
              Exploring carbon-60 allotropes and biological compounds through high-fidelity molecular dynamics. Every vertex represents a gateway to the next structural industrial revolution.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button 
                id="hero-cta-lab"
                onClick={() => scrollToSection('molecular-lab')}
                className="w-full sm:w-auto px-6 py-3 bg-accent text-black hover:bg-white hover:text-black hover:scale-[1.02] rounded-sm text-[10px] font-bold font-mono tracking-widest uppercase transition-all cursor-pointer duration-300"
              >
                Synthesize 3D Models
              </button>
              <button 
                id="hero-cta-scale"
                onClick={() => scrollToSection('scale-magnifier')}
                className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 rounded-sm text-[10px] font-bold font-mono tracking-widest uppercase hover:bg-white/10 hover:text-accent hover:border-accent/40 transition-all cursor-pointer text-slate-300 duration-300"
              >
                Magnitude Scales
              </button>
            </div>
          </div>

          {/* Majestic Hero Display Decor Element */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative">
            {/* Visual Vector Grid Frame */}
            <div className="w-80 h-80 rounded-full bg-white/[0.02] border-2 border-dashed border-white/10 flex items-center justify-center animate-spin-slow relative">
              <div className="w-56 h-56 rounded-full border border-accent/20 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border border-dashed border-accent/40 flex items-center justify-center">
                  <Atom className="w-16 h-16 text-accent animate-pulse" />
                </div>
              </div>
              <span className="absolute left-[36px] top-[36px] w-2 h-2 rounded bg-accent block shadow-[0_0_8px_#00F0FF]" />
              <span className="absolute right-[36px] bottom-[36px] w-1.5 h-1.5 rounded bg-white/40 block" />
            </div>
          </div>

        </div>

        <div className="pt-16 flex justify-center">
          <button 
            id="scroll-down-btn"
            onClick={() => scrollToSection('molecular-lab')}
            className="p-2 rounded-full border border-white/10 text-white/50 hover:text-accent hover:border-accent/50 transition-all animate-bounce cursor-pointer"
            title="Scroll down to the Lab"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. The Interactive Molecular Research Lab */}
      <section id="molecular-lab" className="py-20 px-6 bg-[#040c0c]/40 border-t border-white/10 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section title */}
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
              STRUCTURES // STAGE 01
            </span>
            <h2 className="text-4xl font-serif mt-2 font-normal text-slate-100 tracking-tight">
              Molecular Design Matrix
            </h2>
            <p className="text-sm text-white/50 mt-2 leading-relaxed font-light font-sans">
              Interact directly with three-dimensional molecular structures. Utilize zoom sliders or scroll events to adjust spatial scale coefficients, rotate geometries arbitrarily, and trigger structural CPK analysis.
            </p>
          </div>

          {/* The Live Research Lab Workspace */}
          <NanoLab />

        </div>
      </section>

      {/* 4. Scale Magnitude Explainer */}
      <section id="scale-magnifier" className="py-20 px-6 border-t border-white/10 z-10 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section title */}
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
              DIMENSIONS // STAGE 02
            </span>
            <h2 className="text-4xl font-serif mt-2 font-normal text-slate-100 tracking-tight">
              The Magnitude Scanner
            </h2>
            <p className="text-sm text-white/50 mt-2 leading-relaxed font-light font-sans">
              Investigate physical dimension ranges from common macro matter down to cell boundaries, pathogenic viruses, synthesized nanotubes, and the quantum limit of carbon atoms.
            </p>
          </div>

          {/* The Scale Magnitude Component */}
          <ScaleSlider />

        </div>
      </section>

      {/* 5. Future Frontiers Column Grid */}
      <section id="future-frontiers" className="py-20 px-6 border-t border-white/10 z-10 relative bg-[#040c0c]/20">
        <div className="max-w-7xl mx-auto space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
              FRONTIERS // STAGE 03
            </span>
            <h2 className="text-4xl font-serif font-light text-slate-100 tracking-tight">
              Micro-Material Blueprints
            </h2>
            <p className="text-sm text-white/50 leading-relaxed font-sans font-light">
              Pioneering mechanical properties that emerge in the void of the nanoscale, forming building blocks for next-generation systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="glass-panel p-6 hover:border-accent/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif font-medium text-slate-100">
                  Molecular Gates
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                  Replacing standard silicon architecture with carbon nanomembranes to eliminate heat bottlenecks and sustain transistor densities below 2nm limits.
                </p>
              </div>
              <span className="text-[10px] font-mono mt-5 text-accent uppercase tracking-wider block">Yield: +1400% Peak</span>
            </div>

            {/* Card 2 */}
            <div className="glass-panel p-6 hover:border-accent/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif font-medium text-slate-100">
                  Targeted Transport
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                  Directing biological payloads within targeted molecular envelopes, carrying bio-enzymes to specific cell receptors without disrupting healthy tissue.
                </p>
              </div>
              <span className="text-[10px] font-mono mt-5 text-accent uppercase tracking-wider block">Bio-Impedance: ~0%</span>
            </div>

            {/* Card 3 */}
            <div className="glass-panel p-6 hover:border-accent/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif font-medium text-slate-100">
                  Resistive Nullity
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                  Doped atomic lattices showing flawless state transmission at extreme thermal envelopes. Will completely transform power transportation lines.
                </p>
              </div>
              <span className="text-[10px] font-mono mt-5 text-accent uppercase tracking-wider block">No Grid Losses</span>
            </div>

            {/* Card 4 */}
            <div className="glass-panel p-6 hover:border-accent/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif font-medium text-slate-100">
                  Tensile Composites
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                  Introducing aligned multi-walled atomic nanotubes into aviation alloy frameworks, ensuring robust durability limits under fractions of natural weight.
                </p>
              </div>
              <span className="text-[10px] font-mono mt-5 text-accent uppercase tracking-wider block">Weight Modulator: -85%</span>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Engaging Q&A/Factboard Section */}
      <section id="sci-faq" className="py-20 px-6 border-t border-white/10 z-10 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="col-span-1 lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase bg-white/5 border border-white/10 text-accent px-3 py-1 inline-block">
              ARCHIVE // FAQ
            </span>
            <h3 className="text-4xl font-serif font-normal text-slate-100 tracking-tight leading-none">
              Deciphering <br />
              Nano-Phenomena
            </h3>
            <p className="text-sm text-white/50 leading-relaxed font-sans font-light">
              Under extreme macroscopic scaling, classical physical pathways yield to quantum probability states. Explore these foundational concepts inside the archive tabs.
            </p>
            <div className="pt-4 flex items-center space-x-2 text-[11px] text-white/30 font-mono">
              <Lightbulb className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>Select record to request mathematical overview.</span>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 space-y-3">
            {nanoFacts.map((fact, index) => {
              const isActive = index === activeFactIndex;
              return (
                <div 
                  key={index}
                  onClick={() => setActiveFactIndex(index)}
                  className={`p-5 cursor-pointer glass-panel transition-all duration-300 ${
                    isActive 
                      ? 'border-accent/60 shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                      : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {fact.icon}
                      <h4 className={`text-sm font-sans font-medium transition-colors ${isActive ? 'text-accent' : 'text-white/70'}`}>
                        {fact.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest text-right">
                      {isActive ? 'Opened' : 'Examine'}
                    </span>
                  </div>

                  {isActive && (
                    <p className="text-xs text-white/70 leading-relaxed mt-4 pt-4 border-t border-white/10 font-sans font-light animate-fade-in">
                      {fact.fact}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-white/10 bg-black py-12 px-6 text-center text-slate-500 text-xs font-mono relative z-10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <Atom className="w-4 h-4 text-accent animate-spin-slow" />
            <span className="text-slate-300 font-bold uppercase tracking-widest text-[11px]">NANO.CORE 3D</span>
          </div>
          <p className="text-[10px] text-white/30 leading-relaxed max-w-lg mx-auto">
            Rendered vectors calculated dynamically under WebGL specifications. Full modularized CPK molecular parameters.<br />
            © 2026 Nanotech Materials Lab. Pioneering structural dynamics interfaces.
          </p>
        </div>
      </footer>

    </div>
  );
}

