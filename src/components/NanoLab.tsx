/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MOLECULES } from '../data';
import { MoleculeType, AtomNode } from '../types';
import ThreeCanvas from './ThreeCanvas';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, 
  RotateCw, 
  Sparkles, 
  Plus, 
  Minus, 
  Layers, 
  Grid, 
  Info, 
  Atom, 
  Boxes,
  Compass
} from 'lucide-react';

export default function NanoLab() {
  const [activeType, setActiveType] = useState<MoleculeType>('fullerene');
  const [zoomScale, setZoomScale] = useState<number>(1.2); // Default zoom level 1.2 (ranges from 0.5 to 2.5)
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [selectedAtom, setSelectedAtom] = useState<AtomNode | null>(null);
  const [bondThickness, setBondThickness] = useState<'thin' | 'medium' | 'thick'>('medium');
  const [colorCodeAtoms, setColorCodeAtoms] = useState<boolean>(true);

  const activeMolecule = MOLECULES[activeType];

  // Handy helpers to adjust zoom via direct action buttons
  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleAtomSelect = (atom: AtomNode | null) => {
    setSelectedAtom(atom);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* 1. Header Toolbar & Molecule Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 glass-panel">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-accent">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-sm font-mono tracking-[2px] font-semibold text-slate-100 uppercase">
              STRUCTURE SYNTHESIZER
            </h3>
            <p className="text-[10px] text-white/50 tracking-wider">Select physical model representation to synthesize in 3D Space</p>
          </div>
        </div>

        {/* Dynamic Buttons with specific color themes */}
        <div className="grid grid-cols-2 lg:flex items-center gap-2">
          {Object.values(MOLECULES).map((mol) => {
            const isActive = mol.id === activeType;
            return (
              <button
                id={`btn-mol-${mol.id}`}
                key={mol.id}
                onClick={() => {
                  setActiveType(mol.id);
                  setSelectedAtom(null); // Reset select-node
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3.5 rounded-sm text-[11px] font-mono uppercase tracking-widest border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-accent text-black border-accent font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'bg-white/5 border-white/10 text-[#ffffff]/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {mol.id === 'fullerene' && <Atom className="w-4 h-4" />}
                {mol.id === 'nanotube' && <Layers className="w-4 h-4" />}
                {mol.id === 'graphene' && <Grid className="w-4 h-4" />}
                {mol.id === 'dna' && <Dna className="w-4 h-4" />}
                <span>{mol.name.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Primary Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Hand Column: The 3D Render Arena */}
        <div className="col-span-1 lg:col-span-7 flex flex-col space-y-4">
          
          {/* Main 3D Canvas Box */}
          <div className="h-[480px] w-full relative border border-white/10 rounded-sm overflow-hidden bg-black/60">
            <ThreeCanvas
              moleculeType={activeType}
              zoomScale={zoomScale}
              autoRotate={autoRotate}
              selectedAtom={selectedAtom}
              onAtomSelect={handleAtomSelect}
              bondThickness={bondThickness}
              colorCodeAtoms={colorCodeAtoms}
            />

            {/* Quick floating specs in the layout */}
            <div className="absolute top-4 right-4 z-10 hidden sm:flex space-x-2">
              <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-mono border border-white/10 text-slate-300">
                Formula: <strong className="text-accent">{activeMolecule.formula}</strong>
              </span>
              <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-mono border border-white/10 text-slate-300">
                Res: <strong className="text-accent">Quantum Exact</strong>
              </span>
            </div>
          </div>

          {/* Quick Manipulation Controllers under WebGL Canvas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 glass-panel p-4">
            
            {/* Interactive Model Zoom Panel */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label htmlFor="zoom-input-slider" className="text-[11px] font-mono text-white/50 flex items-center gap-1.5 uppercase tracking-wide">
                  <RotateCw className="w-3.5 h-3.5 text-accent" /> Model scale/Zoom
                </label>
                <div className="flex items-center space-x-1 font-mono text-xs text-accent font-bold bg-[#050505] px-2 py-0.5 rounded-sm border border-white/10">
                  <span>{(zoomScale * 100).toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Button Zoom Out */}
                <button
                  id="zoom-out-btn"
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 0.5}
                  className="p-1.5 rounded-sm bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-accent disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors"
                  title="Zoom Out (-25%)"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                {/* Main Slider Input */}
                <input
                  id="zoom-input-slider"
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.05"
                  value={zoomScale}
                  onChange={(e) => setZoomScale(parseFloat(e.target.value))}
                  className="flex-1 accent-accent h-1 bg-white/10 rounded-sm cursor-pointer"
                />

                {/* Button Zoom In */}
                <button
                  id="zoom-in-btn"
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 2.5}
                  className="p-1.5 rounded-sm bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-accent disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors"
                  title="Zoom In (+25%)"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Model Preferences (AutoRotate, Colors, Bond Thickness) */}
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="text-[9px] font-mono text-white/30 uppercase block mb-1">Cylinder Bonds</label>
                <select
                  id="bond-thickness-select"
                  value={bondThickness}
                  onChange={(e) => setBondThickness(e.target.value as any)}
                  className="w-full bg-[#050505] border border-white/10 rounded-sm px-2 py-1 text-xs text-[#ffffff] font-mono focus:border-accent outline-none cursor-pointer"
                >
                  <option value="thin">Thin (0.02nm)</option>
                  <option value="medium">Medium (0.04nm)</option>
                  <option value="thick">Thick (0.07nm)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5 pt-4">
                <label htmlFor="autorotate-check" className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    id="autorotate-check"
                    type="checkbox"
                    checked={autoRotate}
                    onChange={(e) => setAutoRotate(e.target.checked)}
                    className="rounded-sm accent-accent"
                  />
                  <span className="font-mono text-[10px] uppercase select-none text-white/50 tracking-wide">3D Spinner</span>
                </label>

                <label htmlFor="colorcode-check" className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    id="colorcode-check"
                    type="checkbox"
                    checked={colorCodeAtoms}
                    onChange={(e) => setColorCodeAtoms(e.target.checked)}
                    className="rounded-sm accent-accent"
                  />
                  <span className="font-mono text-[10px] uppercase select-none text-white/50 tracking-wide">Atom Keys</span>
                </label>
              </div>
            </div>

          </div>

        </div>

        {/* Right Hand Column: Detailed Molecular Profiles & Specifications */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-between space-y-6 animate-fade-in">
          
          {/* Main Info Box */}
          <div className="p-6 rounded-sm glass-panel h-full flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMolecule.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                
                {/* Title block */}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono uppercase bg-white/5 px-2.5 py-0.5 rounded-sm border border-white/10 text-white/50">
                      {activeMolecule.category}
                    </span>
                    <span className="text-[10px] font-mono text-accent">
                      Formula: {activeMolecule.formula}
                    </span>
                  </div>
                  <h4 className="text-3xl font-serif font-light text-slate-100 tracking-tight mt-3">
                    {activeMolecule.name}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-sans mt-3 font-light">
                    {activeMolecule.description}
                  </p>
                </div>

                {/* Grid properties list */}
                <div>
                  <h5 className="text-[10px] font-mono uppercase text-accent font-semibold tracking-wider mb-3">
                    PHYSICAL PROPERTIES INDEX
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    {activeMolecule.properties.map((prop, idx) => (
                      <div 
                        key={idx} 
                        className="bg-black/20 p-3 rounded-sm border border-white/15 hover:border-accent/40 transition-colors duration-300"
                      >
                        <p className="text-[9px] font-mono text-white/30 uppercase">{prop.label}</p>
                        <p className="text-xs font-mono font-bold text-slate-100 mt-1">{prop.value}</p>
                        <p className="text-[9px] text-[#ffffff]/60 font-sans leading-normal mt-0.5 font-light">{prop.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Targeted Bio or Industrial Applications */}
                <div>
                  <h5 className="text-[10px] font-mono uppercase text-accent font-semibold tracking-wider mb-2">
                    NANOTECH APPLICATIONS
                  </h5>
                  <div className="bg-black/40 p-3 rounded-sm border border-white/10 text-xs text-white/70 leading-relaxed font-light font-sans">
                    <strong>Primary Use Cases:</strong> {activeMolecule.application}
                  </div>
                </div>

                {/* History block */}
                <div>
                  <h5 className="text-[10px] font-mono uppercase text-accent font-semibold tracking-wider mb-1.5">
                    DISCOVERY RECORDS
                  </h5>
                  <div className="flex items-start space-x-2 text-xs text-[#ffffff]/60 font-light font-sans">
                    <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="leading-relaxed italic">{activeMolecule.history}</p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* If colorKey enabled, render brief palette legends */}
            {colorCodeAtoms && (
              <div className="mt-8 pt-4 border-t border-white/10">
                <span className="text-[9px] font-mono text-white/40 uppercase block mb-2">CPK Color Key (Atoms):</span>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e293b] border border-white/20 block" />
                    <span className="text-[9px] font-mono text-white/50">C (Carbon)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f8fafc] border border-white/20 block" />
                    <span className="text-[9px] font-mono text-white/50">H (Hydrogen)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] border block" />
                    <span className="text-[9px] font-mono text-white/50">O (Oxygen)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] border block" />
                    <span className="text-[9px] font-mono text-white/50">N (Nitrogen)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] border block" />
                    <span className="text-[9px] font-mono text-white/50">P (Phosphorus)</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
