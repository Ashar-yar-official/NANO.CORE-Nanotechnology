/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MoleculeData, ScaleItem } from './types';

export const MOLECULES: Record<string, MoleculeData> = {
  fullerene: {
    id: 'fullerene',
    name: 'C60 Fullerene (Buckyball)',
    formula: 'C₆₀',
    category: 'Carbon Cage Allotrope',
    description: 'A hollow, cage-like geodesic sphere composed of sixty carbon atoms arranged in 20 hexagons and 12 pentagons. First discovered in 1985, this structure marked the dawn of modern nanotechnology research.',
    properties: [
      { label: 'Tensile Strength', value: '37 GPa', desc: 'Resilient under extreme directional pressure due to symmetric carbon hybridization.' },
      { label: 'Internal Space', value: '0.7 nm', desc: 'Capable of trapping individual atoms or small drug molecules inside its hollow cage.' },
      { label: 'Thermal Stability', value: 'up to 600°C', desc: 'Highly resistant to thermal degradation in vacuum environments.' },
      { label: 'Band Gap', value: '1.7 eV', desc: 'Behaves as a semiconductor and is being researched for solar cell improvements.' }
    ],
    history: 'Discovered in 1985 by Harold Kroto, Robert Curl, and Richard Smalley, who were awarded the 1996 Nobel Prize in Chemistry for establishing its geodesic structure.',
    application: 'Used in targeted drug delivery systems, hydrogen gas storage, photodynamic diagnostics, and highly responsive organic light-emitting diodes (OLEDs).',
    colorTheme: 'from-cyan-400 via-sky-500 to-blue-600',
    accentRGB: '6, 182, 212'
  },
  nanotube: {
    id: 'nanotube',
    name: 'Carbon Nanotube (CNT)',
    formula: '(C₆₀)n',
    category: 'Cylindrical Fullerene',
    description: 'A tube-shaped allotrope of carbon, exhibiting structural configurations with a diameter as small as 1 nanometer. They possess unprecedented tensile strength, high electrical conductivity, and thermal properties.',
    properties: [
      { label: 'Relative Strength', value: '100x Steel', desc: 'Tensile strength exceeds 60 GPa, making it one of the strongest materials known.' },
      { label: 'Current Density', value: '10⁹ A/cm²', desc: 'Can carry an electrical current density 1,000 times greater than copper wire.' },
      { label: 'Aspect Ratio', value: '132,000,000:1', desc: 'Can be synthesized with extremely high length-to-diameter ratios.' },
      { label: 'Thermal Flux', value: '3500 W/mK', desc: 'Outperforms diamond in transmitting thermal energy along its tube axis.' }
    ],
    history: 'First extensively characterized in 1991 by Japanese physicist Sumio Iijima of NEC Corporation, triggering an explosion in carbon material science.',
    application: 'Integrated into aerospace composites, athletic gear, microchip field-effect transistors, energy storage electrodes, and structural cables for high-altitude systems.',
    colorTheme: 'from-emerald-400 via-teal-500 to-green-600',
    accentRGB: '16, 185, 129'
  },
  graphene: {
    id: 'graphene',
    name: 'Graphene Layer',
    formula: 'C',
    category: '2D Monatomic Lattice',
    description: 'A single, ultra-thin atomic sheet of carbon atoms closely packed into a two-dimensional honeycomb crystal lattice. It is the fundamental building block for other carbon dimensionalities.',
    properties: [
      { label: 'Elastic Modulus', value: '1.0 TPa', desc: 'Highly elastic and can be stretched up to 20% of its original length without breaking.' },
      { label: 'Electron Mobility', value: '200,000 cm²/Vs', desc: 'Electrons flow close to the speed of light, behaving as massless Dirac fermions.' },
      { label: 'Light Absorption', value: '2.3%', desc: 'Absorbs barely any light despite being highly conducts electricity, making it nearly transparent.' },
      { label: 'Surface Area', value: '2630 m²/g', desc: 'Superb theoretical surface area per gram, extremely eligible for energy storage.' }
    ],
    history: 'Isolated in 2004 by Andre Geim and Konstantin Novoselov at the University of Manchester using simple adhesive tape, earning them the 2010 Nobel Prize in Physics.',
    application: 'Crucial for transparent conducting electrodes, supercapacitors, water desalination membranes, biosensors, and ultra-high-frequency analog switches.',
    colorTheme: 'from-fuchsia-400 via-pink-500 to-rose-600',
    accentRGB: '217, 70, 239'
  },
  dna: {
    id: 'dna',
    name: 'DNA Nanobot Cargo',
    formula: 'Engineered DNA Origami',
    category: 'Biomolecular Nanostructure',
    description: 'A programmable macromolecule constructed through "DNA origami"—the folding of long genomic strands into specified 3D container shapes to carry molecular payloads safely inside living organisms.',
    properties: [
      { label: 'Biocompatibility', value: '100% Native', desc: 'Completely organic and non-toxic, bypassing typical cellular receptor defense mechanisms.' },
      { label: 'Cargo Payload', value: '2-4 Enzymes', desc: 'Tailored pockets securely envelope therapeutic agents or biochemical reagents.' },
      { label: 'Targeting Precision', value: 'Molecular Lock', desc: 'Opens specifically in response to receptor-ligand matches, like cancer biomarkers.' },
      { label: 'Dynamic Action', value: 'Hinged Shell', desc: 'Physically springs open to deliver compounds locally without systemic toxicity.' }
    ],
    history: 'Pioneered by Paul Rothemund in 2006, transitioning DNA from a genetic data tape into a structural engineering medium for biological computation.',
    application: 'Targeted oncological therapy (destroying cancer cells with zero damage to healthy tissue), real-time biochemical nanolabs, and intracellular smart delivery.',
    colorTheme: 'from-amber-400 via-orange-500 to-yellow-500',
    accentRGB: '245, 158, 11'
  }
};

export const SCALE_ITEMS: ScaleItem[] = [
  {
    id: 'tennis',
    value: 6.8e-2,
    name: 'Tennis Ball',
    sizeLabel: '6.8 cm (68,000,000 nm)',
    description: 'An everyday macroscopic object. Visible to the naked human eye. Unbelievably gigantic compared to any nanostructure.',
    contrastColor: 'border-yellow-500/50 text-yellow-400',
    graphic: 'macro'
  },
  {
    id: 'rbc',
    value: 7e-6,
    name: 'Red Blood Cell',
    sizeLabel: '7 µm (7,000 nm)',
    description: 'A vital cell that delivers oxygen throughout the human body. Visible only through high-powered optical microscopes.',
    contrastColor: 'border-rose-500/50 text-rose-400',
    graphic: 'cell'
  },
  {
    id: 'virus',
    value: 1e-7,
    name: 'Influenza Virus',
    sizeLabel: '100 nm',
    description: 'An airborne pathogen. Sitting right at the boundary of the sub-microscopic and macroscopic limits of biological entities.',
    contrastColor: 'border-indigo-400/50 text-indigo-300',
    graphic: 'virus'
  },
  {
    id: 'nanobot',
    value: 2.5e-9,
    name: 'DNA Nanobot Cage',
    sizeLabel: '2.5 nm',
    description: 'An engineered biological cargo container. Small enough to traverse blood capillaries and interact with individual cellular walls.',
    contrastColor: 'border-amber-400/50 text-amber-400',
    graphic: 'dna'
  },
  {
    id: 'cnt',
    value: 1.2e-9,
    name: 'Carbon Nanotube Diameter',
    sizeLabel: '1.2 nm',
    description: 'A single carbon nanotube thickness. Represents the true working playground of nanoscale chemical synthesis.',
    contrastColor: 'border-emerald-400/50 text-emerald-400',
    graphic: 'bucky'
  },
  {
    id: 'atom',
    value: 1.5e-10,
    name: 'Carbon Atom Radius',
    sizeLabel: '0.15 nm (150 pm)',
    description: 'The elemental building block of organic life and all synthetic carbon lattices. Inhabits the quantum mechanics threshold.',
    contrastColor: 'border-cyan-400/50 text-cyan-400',
    graphic: 'atom'
  }
];
