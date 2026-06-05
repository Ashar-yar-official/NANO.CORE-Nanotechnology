/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SCALE_ITEMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftRight, Eye, Sparkles, AlertCircle } from 'lucide-react';

export default function ScaleSlider() {
  const [currentIndex, setCurrentIndex] = useState(3); // Default at DNA Nanobot
  const activeScale = SCALE_ITEMS[currentIndex];

  // Simple math helper to show comparative scale factors
  const getComparativeScale = () => {
    if (currentIndex === 5) return "Exact Atom Radius Limit";
    // Compare current with the Carbon Atom (index 5)
    _compare_ratio(currentIndex);
    const ratioVal = activeScale.value / SCALE_ITEMS[5].value;
    if (ratioVal > 1_000_000) {
      return `~ ${(ratioVal / 1_000_000).toFixed(0)} Million times wider than a Carbon Atom!`;
    } else if (ratioVal > 1_000) {
      return `~ ${(ratioVal / 1_000).toFixed(0)} Thousand times wider than a Carbon Atom.`;
    } else {
      return `~ ${ratioVal.toFixed(1)}x greater than a single Carbon Atom.`;
    }
  };

  function _compare_ratio(idx: number) {
    // arbitrary side calculations
    return idx;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch justify-between glass-panel p-6 lg:p-8">
      
      {/* Selector and Multi-step Map */}
      <div className="flex-1 flex flex-col justify-between space-y-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-accent bg-white/5 border border-white/10 px-3 py-1 rounded-sm uppercase">
            Comparative Dimensions
          </span>
          <h3 className="text-3xl font-serif mt-3 font-light text-slate-100 tracking-tight">
            Nanoscale Magnitude Explorer
          </h3>
          <p className="text-xs text-white/50 mt-2 font-sans font-light leading-relaxed">
            Nanotechnology operates at the scale of 1 to 100 nanometers. Swipe the controller below to see how standard macro objects shrink down to biological cells, viruses, synthetic nanotubes, and elemental atoms.
          </p>
        </div>

        {/* The Linear Range Controller */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#ffffff]/40 uppercase tracking-widest">
            <span>Macro World</span>
            <span className="text-accent font-bold">10⁻⁹ m (1 Nanometer) Range</span>
            <span>Quantum World</span>
          </div>

          <div className="relative">
            {/* Background Track line */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] bg-white/10 rounded-sm" />
            
            {/* Active filled line progress */}
            <div 
              className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-accent rounded-sm transition-all duration-300 pointer-events-none shadow-[0_0_8px_#00F0FF]"
              style={{ width: `${(currentIndex / (SCALE_ITEMS.length - 1)) * 100}%` }}
            />

            {/* Hidden interactive inputs overlay */}
            <input 
              id="dimension-step-slider"
              type="range"
              min="0"
              max={SCALE_ITEMS.length - 1}
              value={currentIndex}
              onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
              className="relative w-full h-8 opacity-0 cursor-pointer z-10"
            />

            {/* Custom Interactive Anchor Dots */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-1">
              {SCALE_ITEMS.map((item, idx) => {
                const isActive = idx === currentIndex;
                const isPassed = idx < currentIndex;
                return (
                  <button
                    id={`scale-dot-${item.id}`}
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                      isActive 
                        ? 'bg-[#00F0FF] border-white scale-125 shadow-[0_0_12px_rgba(0,240,255,0.8)]' 
                        : isPassed 
                          ? 'bg-[#005566] border-[#00c8dd]' 
                          : 'bg-[#0a0a0a] border-white/20'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Quick Step Buttons for accessibility */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
            {SCALE_ITEMS.map((item, idx) => (
              <button
                id={`scale-btn-${item.id}`}
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`py-2 px-2 rounded-sm text-[9px] font-mono uppercase tracking-wider border transition-all truncate text-center cursor-pointer ${
                  idx === currentIndex
                    ? 'bg-accent text-black border-accent font-bold shadow-[0_0_8px_rgba(0,240,255,0.25)]'
                    : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-accent/40'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Human comparison indicator card */}
        <div className="bg-black/20 p-4 rounded-sm border border-white/10 flex items-start space-x-3">
          <div className="p-2 rounded-sm bg-white/5 border border-white/10 text-accent shrink-0">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-white/40">Scale Relativity comparison</h4>
            <p className="text-xs font-mono text-accent mt-1">{getComparativeScale()}</p>
          </div>
        </div>
      </div>

      {/* Side Active Display Frame (High Contrast Dark Slate Card) */}
      <div className="w-full lg:w-[380px] bg-black/40 border border-white/10 rounded-sm p-6 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeScale.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5 h-full flex flex-col justify-between"
          >
            {/* Visual Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[9px] uppercase font-mono tracking-wider border px-2 py-0.5 rounded-sm bg-white/5 ${activeScale.contrastColor === 'text-cyan-400' ? 'text-accent border-accent/30' : 'text-white/60 border-white/20'}`}>
                  {activeScale.sizeLabel}
                </span>
                <h4 className="text-2xl font-serif font-light text-slate-100 mt-2.5">
                  {activeScale.name}
                </h4>
              </div>
              <div className="w-8 h-8 rounded-sm flex items-center justify-center bg-white/5 border border-white/10 text-slate-400">
                <Eye className="w-4 h-4 text-accent" />
              </div>
            </div>

            {/* Geometric representation indicator */}
            <div className="h-28 w-full bg-[#050505]/40 rounded-sm flex items-center justify-center border border-white/10 relative overflow-hidden">
              
              {/* Custom responsive graphics depending on scale */}
              {activeScale.graphic === 'macro' && (
                <div className="relative flex items-center justify-center w-full h-full">
                  <span className="w-16 h-16 rounded-full bg-accent/5 border border-dashed border-accent animate-spin-slow" />
                  <span className="absolute text-[10px] font-mono tracking-widest uppercase text-accent">Macro Orbit</span>
                </div>
              )}

              {activeScale.graphic === 'cell' && (
                <div className="relative flex items-center justify-center w-full h-full">
                  <div className="w-16 h-12 rounded-full bg-rose-500/10 border border-rose-500/40 relative flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-rose-500/30 animate-pulse" />
                    <span className="absolute right-3 top-2 w-2 h-2 rounded bg-rose-400/50" />
                  </div>
                  <span className="absolute bottom-2 text-[9px] font-mono uppercase tracking-widest text-rose-400">Biological Cell</span>
                </div>
              )}

              {activeScale.graphic === 'virus' && (
                <div className="relative flex items-center justify-center w-full h-full">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 border-2 border-indigo-400 relative">
                    {/* virus spikes */}
                    <span className="absolute -top-1.5 left-5 w-1 h-2 bg-indigo-400 rounded-full" />
                    <span className="absolute -bottom-1.5 left-5 w-1 h-2 bg-indigo-400 rounded-full" />
                    <span className="absolute left-10 top-5 w-2 h-1 bg-indigo-400 rounded-full" />
                    <span className="absolute -left-1.5 top-5 w-2 h-1 bg-indigo-400 rounded-full" />
                  </div>
                  <span className="absolute bottom-2 text-[9px] font-mono uppercase tracking-widest text-indigo-300">Virus Envelope</span>
                </div>
              )}

              {activeScale.graphic === 'dna' && (
                <div className="relative flex items-center justify-center w-full h-full space-x-1.5">
                  <span className="w-1 h-14 bg-amber-400/30 rounded-full animate-pulse" />
                  <span className="w-1 h-10 bg-amber-400/50 rounded-full" />
                  <span className="w-1 h-16 bg-amber-400 rounded-full animate-bounce" />
                  <span className="w-1 h-8 bg-amber-400/40 rounded-full" />
                  <span className="w-1 h-12 bg-amber-400/60 rounded-full" />
                  <span className="absolute bottom-2 text-[9px] font-mono uppercase tracking-widest text-amber-400">Helix Fold Lines</span>
                </div>
              )}

              {activeScale.graphic === 'bucky' && (
                <div className="relative flex items-center justify-center w-full h-full">
                  <div className="w-14 h-14 rounded-full border border-dashed border-accent/30 animate-spin-slow flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-accent/60 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                  </div>
                  <span className="absolute bottom-1 text-[9px] font-mono uppercase tracking-widest text-accent">Carbon Shell</span>
                </div>
              )}

              {activeScale.graphic === 'atom' && (
                <div className="relative flex items-center justify-center w-full h-full">
                  {/* Proton nucleus */}
                  <div className="flex space-x-0.5 relative z-10">
                    <span className="w-2 h-2 rounded-full bg-accent shadow-md shadow-accent" />
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                  </div>
                  {/* Electron orbital paths */}
                  <div className="absolute w-16 h-6 border border-accent/40 rounded-full rotate-45 animate-pulse" />
                  <div className="absolute w-16 h-6 border border-accent/40 rounded-full -rotate-45" />
                  <span className="absolute bottom-2 text-[9px] font-mono uppercase tracking-widest text-accent">Atomic Nucleus</span>
                </div>
              )}
            </div>

            {/* Description Text */}
            <p className="text-xs text-[#ffffff]/70 font-sans font-light leading-relaxed">
              {activeScale.description}
            </p>

            {/* Relative Metric Power Info */}
            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono">
              <span className="text-white/40 flex items-center uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 mr-1 text-accent" /> Metric Power:
              </span>
              <span className="text-[#ffffff] font-bold">{activeScale.value.toExponential(1)} m</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
