/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MoleculeType = 'fullerene' | 'nanotube' | 'graphene' | 'dna';

export interface MoleculeProperty {
  label: string;
  value: string;
  desc: string;
}

export interface MoleculeData {
  id: MoleculeType;
  name: string;
  formula: string;
  category: string;
  description: string;
  properties: MoleculeProperty[];
  history: string;
  application: string;
  colorTheme: string; // Tailwind glow class or theme color
  accentRGB: string;  // RGB for three.js particles
}

export interface AtomNode {
  id: number;
  element: 'C' | 'H' | 'N' | 'O' | 'P';
  x: number;
  y: number;
  z: number;
  info: string;
}

export interface ScaleItem {
  id: string;
  value: number; // in meters (scientific notation value)
  name: string;
  sizeLabel: string;
  description: string;
  contrastColor: string; // Tailwind border/text color
  graphic: 'macro' | 'cell' | 'virus' | 'dna' | 'bucky' | 'atom';
}
