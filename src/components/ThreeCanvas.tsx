/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MoleculeType, AtomNode } from '../types';

interface ThreeCanvasProps {
  moleculeType: MoleculeType;
  zoomScale: number; // 0.5 to 2.5
  autoRotate: boolean;
  onAtomSelect: (atom: AtomNode | null) => void;
  selectedAtom: AtomNode | null;
  bondThickness: 'thin' | 'medium' | 'thick';
  colorCodeAtoms: boolean;
}

export default function ThreeCanvas({
  moleculeType,
  zoomScale,
  autoRotate,
  onAtomSelect,
  selectedAtom,
  bondThickness,
  colorCodeAtoms
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const ambientParticlesRef = useRef<THREE.Points | null>(null);
  const selectionGlowRef = useRef<THREE.Mesh | null>(null);

  // Interaction states
  const [isDragging, setIsDragging] = useState(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const [atomsList, setAtomsList] = useState<AtomNode[]>([]);

  // Update camera zoom based on zoomScale prop
  useEffect(() => {
    if (cameraRef.current) {
      // Smoothly interpolate or set camera distance
      const distance = 8 * (1 / zoomScale);
      cameraRef.current.position.setLength(distance);
    }
  }, [zoomScale]);

  // Handle selected atom coordinates updating the 3D indicator ring
  useEffect(() => {
    if (selectionGlowRef.current && sceneRef.current) {
      if (selectedAtom) {
        selectionGlowRef.current.position.set(selectedAtom.x, selectedAtom.y, selectedAtom.z);
        selectionGlowRef.current.visible = true;
      } else {
        selectionGlowRef.current.visible = false;
      }
    }
  }, [selectedAtom]);

  // Main Three.js Initialization and build molecule
  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050505, 0.04); // subtle Sophisticated Dark black fog

    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8 * (1 / zoomScale);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    
    // Clear out old element in container
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Add Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 1.8); // precise glowing cyan theme light
    dirLight2.position.set(-5, -5, -3);
    scene.add(dirLight2);

    const glowingPointLight = new THREE.PointLight(0xf43f5e, 2, 20); // pulsing pink pointlight
    glowingPointLight.position.set(0, 0, 4);
    scene.add(glowingPointLight);

    // 3. Create Starfield / Floating Free-Atoms Space
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const starfield = new THREE.Points(particleGeo, particleMat);
    scene.add(starfield);
    ambientParticlesRef.current = starfield;

    // 4. Group for the Molecule
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    moleculeGroupRef.current = moleculeGroup;

    // 5. Selected Atom Highlight Indicator
    const glowGeo = new THREE.RingGeometry(0.25, 0.35, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const selectionGlow = new THREE.Mesh(glowGeo, glowMat);
    selectionGlow.visible = false;
    moleculeGroup.add(selectionGlow);
    selectionGlowRef.current = selectionGlow;

    // 6. Generate Molecular Nodes Mathematically
    const generatedAtoms: AtomNode[] = [];
    const points: THREE.Vector3[] = [];

    // Helper functions for drawing molecular geometry
    const atomRadius = 0.16;
    const thickVal = bondThickness === 'thin' ? 0.025 : bondThickness === 'medium' ? 0.045 : 0.07;
    
    // Carbon standard material
    const atomMaterials = {
      C: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.2, metalness: 0.8 }), // grey-blue carbon
      H: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4, metalness: 0.1 }), // bright white hydrogen
      N: new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3, metalness: 0.5 }), // blue nitrogen
      O: new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3, metalness: 0.5 }), // red oxygen
      P: new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.3, metalness: 0.5 })  // gold phosphorus
    };

    // Shared bond material
    const bondMaterial = new THREE.MeshStandardMaterial({
      color: 0x475569, // sleek gray
      roughness: 0.4,
      metalness: 0.6,
    });

    // Generate Vertices and populate them based on model type
    if (moleculeType === 'fullerene') {
      // 60 atoms distributed on a sphere via Fibonacci distribution (Buckyball proxy)
      const numAtoms = 60;
      const phiAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle
      const sphereRadius = 2.4;

      for (let i = 0; i < numAtoms; i++) {
        const y = 1 - (i / (numAtoms - 1)) * 2; // y goes from 1 to -1
        const r = Math.sqrt(1 - y * y); // radius at y coord
        const theta = phiAngle * i; // golden angle offset
        
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        const pos = new THREE.Vector3(x * sphereRadius, y * sphereRadius, z * sphereRadius);
        points.push(pos);
        generatedAtoms.push({
          id: i,
          element: 'C',
          x: pos.x,
          y: pos.y,
          z: pos.z,
          info: `Carbon #C${i + 1} • Bond Coord: [${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}]`
        });
      }
    } else if (moleculeType === 'nanotube') {
      // Cylindrical carbon tube (rings stacked)
      const rings = 7;
      const atomsPerRing = 10;
      const cylRadius = 1.6;
      const cylHeight = 4.5;

      let atomId = 0;
      for (let r = 0; r < rings; r++) {
        const y = (r / (rings - 1)) * cylHeight - cylHeight / 2;
        // Introduce zag stagger for hexagonal look
        const stagger = (r % 2) * (Math.PI / atomsPerRing);

        for (let a = 0; a < atomsPerRing; a++) {
          const theta = (a / atomsPerRing) * Math.PI * 2 + stagger;
          const x = Math.cos(theta) * cylRadius;
          const z = Math.sin(theta) * cylRadius;

          const pos = new THREE.Vector3(x, y, z);
          points.push(pos);
          generatedAtoms.push({
            id: atomId++,
            element: 'C',
            x: pos.x,
            y: pos.y,
            z: pos.z,
            info: `Carbon #C${atomId} • Ring ${r + 1} Pos: ${a + 1}`
          });
        }
      }
    } else if (moleculeType === 'graphene') {
      // 2D hexagonal monolayer mesh
      const rows = 6;
      const cols = 6;
      const spacingX = 0.9;
      const spacingZ = 0.75;
      let atomId = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Calculate honeycomb offset
          let x = (c - cols / 2) * spacingX * Math.sqrt(3);
          if (r % 2 === 1) {
            x += (spacingX * Math.sqrt(3)) / 2;
          }
          const z = (r - rows / 2) * spacingZ * 1.5;
          const y = 0; // Flat base, animated in render loop!

          const pos = new THREE.Vector3(x, y, z);
          points.push(pos);
          generatedAtoms.push({
            id: atomId++,
            element: 'C',
            x: pos.x,
            y: pos.y,
            z: pos.z,
            info: `Carbon #C${atomId} • Honeycomb Grid Node [Col ${c}, Row ${r}]`
          });
        }
      }
    } else if (moleculeType === 'dna') {
      // Double Helix structure with base-pair rungs
      const steps = 24;
      const dnaRadius = 1.5;
      const dnaHeight = 5.0;
      let atomId = 0;

      for (let s = 0; s < steps; s++) {
        const ratio = s / (steps - 1);
        const y = ratio * dnaHeight - dnaHeight / 2;
        const angle = ratio * Math.PI * 4.5; // 2.25 full twists

        // Strand A Atom
        const xA = Math.cos(angle) * dnaRadius;
        const zA = Math.sin(angle) * dnaRadius;
        const posA = new THREE.Vector3(xA, y, zA);
        points.push(posA);

        // Strand B Atom
        const xB = Math.cos(angle + Math.PI) * dnaRadius;
        const zB = Math.sin(angle + Math.PI) * dnaRadius;
        const posB = new THREE.Vector3(xB, y, zB);
        points.push(posB);

        // Identify base pairs: Adenine (A), Thymine (T), Guanine (G), Cytosine (C), Backbone (P)
        const pairIndex = s % 3;
        const elementA = pairIndex === 0 ? 'O' : pairIndex === 1 ? 'N' : 'C';
        const elementB = pairIndex === 0 ? 'N' : pairIndex === 1 ? 'O' : 'P';

        generatedAtoms.push({
          id: atomId++,
          element: elementA,
          x: posA.x,
          y: posA.y,
          z: posA.z,
          info: `DNA Strand A Node - Nuclide #${s + 1} (${elementA === 'O' ? 'Oxygen-Link' : 'Nitrogen-Base'})`
        });

        generatedAtoms.push({
          id: atomId++,
          element: elementB,
          x: posB.x,
          y: posB.y,
          z: posB.z,
          info: `DNA Strand B Node - Nuclide #${s + 1} (${elementB === 'N' ? 'Nitrogen-Base' : 'Phosphorus-Tail'})`
        });
      }
    }

    setAtomsList(generatedAtoms);

    // 7. Render Atom Spheres in 3D group
    const atomMeshes: THREE.Mesh[] = [];
    generatedAtoms.forEach((atom) => {
      // Choose colored material or default uniform carbon grey-blue based on user props
      const material = colorCodeAtoms 
        ? atomMaterials[atom.element] 
        : new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.1, metalness: 0.9, emissive: 0x0284c7, emissiveIntensity: 0.1 }); // glowing tech blue

      const atomGeo = new THREE.SphereGeometry(atomRadius, 16, 16);
      const atomMesh = new THREE.Mesh(atomGeo, material);
      atomMesh.position.set(atom.x, atom.y, atom.z);
      
      // Store reference of atom ID directly in meshuserData for easy raycasting selector!
      atomMesh.userData = { atomId: atom.id };
      
      moleculeGroup.add(atomMesh);
      atomMeshes.push(atomMesh);
    });

    // 8. Draw Connection Bonds between Atoms
    const placeCylinderBetweenPoints = (pA: THREE.Vector3, pB: THREE.Vector3, radius: number) => {
      const direction = new THREE.Vector3().subVectors(pB, pA);
      const length = direction.length();
      
      const geom = new THREE.CylinderGeometry(radius, radius, length, 6);
      // Reorient cylinder so it points between coords
      geom.translate(0, length / 2, 0);
      geom.rotateX(Math.PI / 2);
      
      const mesh = new THREE.Mesh(geom, bondMaterial);
      mesh.position.copy(pA);
      mesh.lookAt(pB);
      
      moleculeGroup.add(mesh);
    };

    // Calculate bonds dynamically using distance or index relationships
    if (moleculeType === 'fullerene') {
      // Connect atoms within close geodesic threshold (about 0.7 - 1.15 units apart)
      const maxDistance = 1.15;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = points[i].distanceTo(points[j]);
          if (dist < maxDistance) {
            placeCylinderBetweenPoints(points[i], points[j], thickVal);
          }
        }
      }
    } else if (moleculeType === 'nanotube') {
      // Connect atoms inside same rings or adjacent rings
      const arg = 1.6; // distance threshold
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = points[i].distanceTo(points[j]);
          if (dist < arg) {
            placeCylinderBetweenPoints(points[i], points[j], thickVal);
          }
        }
      }
    } else if (moleculeType === 'graphene') {
      // Connect hexagonal neighbors
      const maxGrapheneDist = 1.5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = points[i].distanceTo(points[j]);
          if (dist < maxGrapheneDist) {
            placeCylinderBetweenPoints(points[i], points[j], thickVal);
          }
        }
      }
    } else if (moleculeType === 'dna') {
      // Connect Strand A nodes consecutively (0 -> 2 -> 4...)
      for (let i = 0; i < points.length - 2; i += 2) {
        placeCylinderBetweenPoints(points[i], points[i + 2], thickVal);
      }
      // Connect Strand B nodes consecutively (1 -> 3 -> 5...)
      for (let i = 1; i < points.length - 2; i += 2) {
        placeCylinderBetweenPoints(points[i], points[i + 2], thickVal);
      }
      // Connect DNA base pair horizontal rungs (0-1, 2-3, 4-5...)
      for (let i = 0; i < points.length; i += 2) {
        placeCylinderBetweenPoints(points[i], points[i + 1], thickVal * 1.5); // Thicker rungs for visual delight
      }
    }

    // 9. Interactive Clicking via Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      if (!renderer || !camera) return;
      
      // Calculate normal offset within element bounding box
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(atomMeshes);

      if (intersects.length > 0) {
        // Highlighted atom! Retrieve mapping data
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const id = clickedMesh.userData.atomId;
        const matchingAtom = generatedAtoms.find(a => a.id === id);
        if (matchingAtom) {
          onAtomSelect(matchingAtom);
        }
      } else {
        // Clicked outside, reset
        onAtomSelect(null);
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // 10. Frame Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Ambient dust drift
      if (starfield) {
        starfield.rotation.y = time * 0.015;
        starfield.rotation.x = time * 0.008;
      }

      // Selected ring rotation to look diagnostic
      if (selectionGlow && selectionGlow.visible) {
        selectionGlow.rotation.z = time * 2;
        // Face camera
        selectionGlow.lookAt(camera.position);
      }

      // Dynamic waviness for graphene sheets
      if (moleculeType === 'graphene') {
        const customGroup = moleculeGroupRef.current;
        if (customGroup) {
          // Modify atom nodes slightly over time to show ripple
          let mIndex = 0;
          customGroup.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child !== selectionGlow) {
              const uData = child.userData as { atomId?: number };
              if (uData && typeof uData.atomId === 'number') {
                const baseAtom = generatedAtoms[uData.atomId];
                if (baseAtom) {
                  // wave mathematical offsets
                  const dist = Math.sqrt(baseAtom.x * baseAtom.x + baseAtom.z * baseAtom.z);
                  const ripple = Math.sin(time * 2.0 - dist * 1.2) * 0.22;
                  child.position.y = ripple;
                  
                  // Keep matching object data updated for inspect panels too
                  baseAtom.y = ripple;
                }
              }
            }
          });
        }
      }

      // Point Light hover rotation
      glowingPointLight.position.x = Math.sin(time) * 4;
      glowingPointLight.position.z = Math.cos(time) * 4 + 1;

      // Auto rotation if no dragging active
      if (autoRotate && !isDragging && moleculeGroup) {
        moleculeGroup.rotation.y += 0.005;
        // Subtle floating bobbing effect
        moleculeGroup.position.y = Math.sin(time * 0.8) * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Responsive listener
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup references and listeners
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.domElement.removeEventListener('click', handleCanvasClick);
      }
      cancelAnimationFrame(animId);
      
      // Clean up three.js graphics elements
      particleGeo.dispose();
      particleMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      bondMaterial.dispose();
      
      Object.values(atomMaterials).forEach(mat => mat.dispose());
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [moleculeType, bondThickness, colorCodeAtoms]);

  // Pointer orbital rotation logic
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    previousMousePosition.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !moleculeGroupRef.current) return;

    const deltaMove = {
      x: e.clientX - previousMousePosition.current.x,
      y: e.clientY - previousMousePosition.current.y
    };

    // Orbit coefficients
    moleculeGroupRef.current.rotation.y += deltaMove.x * 0.008;
    moleculeGroupRef.current.rotation.x += deltaMove.y * 0.008;

    previousMousePosition.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950/70 to-slate-900/50 border border-slate-800">
      
      {/* 3D WebGL Element */}
      <div 
        id="three-webgl-stage"
        ref={containerRef} 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full h-full absolute inset-0"
      />

      {/* Floating UI Elements inside 3D Canvas */}
      <div className="absolute top-4 left-4 z-10 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
            Interactive Node Sandbox
          </span>
        </div>
      </div>

      {moleculeType === 'graphene' && (
        <div className="absolute top-4 right-4 z-10 bg-indigo-950/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-indigo-500/20 pointer-events-none">
          <p className="font-mono text-[10px] text-indigo-300">
            ~ Wave Thermal Fluctuation Active ~
          </p>
        </div>
      )}

      {/* Direct Interactive Hint Banner */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-slate-950/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-800/80 pointer-events-none text-center">
        <p className="text-[11px] font-sans text-slate-400">
          <strong className="text-cyan-400">Drag</strong> to Rotate • <strong className="text-cyan-400">Scroll / Control</strong> to Zoom • <strong className="text-cyan-400">Click</strong> Atom to Inspect
        </p>
      </div>

      {/* Atom Nodes list for fallback screen-readers or small inspect tooltip */}
      {selectedAtom && (
        <div className="absolute top-16 left-4 z-20 max-w-[260px] p-3 rounded-lg bg-teal-950/90 border border-teal-500/40 text-teal-100 shadow-xl backdrop-blur-sm animate-fade-in animate-duration-150">
          <div className="flex items-center justify-between pb-1 border-b border-teal-800">
            <span className="text-xs font-mono font-bold text-teal-300 uppercase">Selected Atom</span>
            <span className="bg-teal-900/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-teal-400">
              {selectedAtom.element}
            </span>
          </div>
          <p className="text-[11px] mt-2 font-mono leading-relaxed break-words">{selectedAtom.info}</p>
          {moleculeType === 'graphene' && (
            <p className="text-[10px] mt-1 text-teal-400 font-mono italic">
              Y-Ripple Height: {selectedAtom.y.toFixed(3)} nm
            </p>
          )}
          <button 
            id={`clear-sel-atom-${selectedAtom.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAtomSelect(null);
            }} 
            className="mt-2 text-[10px] text-teal-400 hover:text-teal-200 transition-colors underline block cursor-pointer"
          >
            Clear Target
          </button>
        </div>
      )}
    </div>
  );
}
