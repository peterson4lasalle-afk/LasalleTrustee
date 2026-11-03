import React, { useState } from 'react';
import { 
  Download, 
  Shirt, 
  Check, 
  Copy, 
  Sparkles, 
  Layers, 
  Printer, 
  Palette,
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';

export type TshirtStyle = 'chest' | 'pocket' | 'varsity';
export type GarmentColorId = 'deep-teal' | 'navy' | 'black' | 'heather-grey' | 'white';

interface GarmentColorOption {
  id: GarmentColorId;
  name: string;
  hex: string;
  isDark: boolean;
  borderClass?: string;
}

const GARMENT_COLORS: GarmentColorOption[] = [
  { id: 'deep-teal', name: 'GECDSB Deep Teal (Signature)', hex: '#00262b', isDark: true },
  { id: 'navy', name: 'Classic Navy', hex: '#0f172a', isDark: true },
  { id: 'black', name: 'Pitch Black', hex: '#18181b', isDark: true },
  { id: 'heather-grey', name: 'Heather Grey', hex: '#cbd5e1', isDark: false },
  { id: 'white', name: 'Crisp White', hex: '#ffffff', isDark: false, borderClass: 'border-slate-300' }
];

export const TshirtStudio: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<TshirtStyle>('chest');
  const [selectedColor, setSelectedColor] = useState<GarmentColorOption>(GARMENT_COLORS[0]);
  const [placement, setPlacement] = useState<'center' | 'pocket'>('center');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Automatically adapt logo colorway (dark vs light) based on garment tone
  const isDarkGarment = selectedColor.isDark;
  const colorway = isDarkGarment ? 'dark' : 'light';

  // Current active file paths
  const svgFilename = `vote-peterson-${selectedStyle}-${colorway}.svg`;
  const pngFilename = `vote-peterson-${selectedStyle}-${colorway}.png`;
  const svgUrl = `/tshirt/${svgFilename}`;
  const pngUrl = `/tshirt/${pngFilename}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl space-y-6">
      {/* Header Notification Banner */}
      <div className="bg-gradient-to-r from-gecdsb-950 via-gecdsb-900 to-gecdsb-800 text-white rounded-2xl p-4 sm:p-5 border-2 border-amber-400/40 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Shirt className="w-3.5 h-3.5" />
              <span>Official Campaign Merchandise & Apparel Suite</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Vote Peterson for Trustee • Campaign T-Shirt Studio
            </h2>
            <p className="text-xs sm:text-sm text-gecdsb-100 leading-relaxed max-w-2xl">
              Production-ready vector SVGs and 300 DPI transparent PNGs designed for screen printing, direct-to-garment (DTG), vinyl transfers, and polo embroidery.
            </p>
          </div>

          {/* Quick Download Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full md:w-auto shrink-0">
            <a
              href={svgUrl}
              download={svgFilename}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gecdsb-800 hover:bg-gecdsb-700 text-amber-300 font-bold text-xs border border-amber-400/40 shadow-xs transition-colors"
              title="Download infinitely scalable vector SVG for print shops"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Vector SVG</span>
            </a>
            <a
              href={pngUrl}
              download={pngFilename}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-xs transition-colors"
              title="Download 300 DPI transparent PNG (3000px width)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download 300 DPI PNG</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Mockup Stage / Right Style & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================================================================ */}
        {/* LEFT COLUMN: INTERACTIVE T-SHIRT MOCKUP STAGE                    */}
        {/* ================================================================ */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-300 shadow-lg overflow-hidden flex flex-col">
          {/* Top Stage Bar */}
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Live Garment Simulation
              </span>
            </div>
            <span className="text-[11px] font-medium text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
              {selectedColor.name}
            </span>
          </div>

          {/* T-Shirt Canvas Area */}
          <div className="p-6 sm:p-10 bg-slate-100 flex-1 flex items-center justify-center relative min-h-[440px] select-none">
            
            {/* Realistic T-Shirt SVG Graphic */}
            <div className="relative w-full max-w-[380px] drop-shadow-2xl transition-all duration-300">
              <svg 
                viewBox="0 0 500 500" 
                className="w-full h-auto transition-colors duration-300"
                style={{ fill: selectedColor.hex }}
              >
                {/* T-Shirt Silhouette */}
                <path 
                  d="M 160,35 
                     C 190,75 310,75 340,35 
                     L 440,85 
                     C 470,105 480,135 450,185 
                     L 400,165 
                     L 400,460 
                     C 400,475 390,480 375,480 
                     L 125,480 
                     C 110,480 100,475 100,460 
                     L 100,165 
                     L 50,185 
                     C 20,135 30,105 60,85 
                     Z" 
                  stroke={selectedColor.isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)'} 
                  strokeWidth="2"
                />

                {/* Collar Ribbing */}
                <path 
                  d="M 160,35 C 190,75 310,75 340,35 C 315,62 185,62 160,35 Z" 
                  fill={selectedColor.isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)'} 
                />

                {/* Left Sleeve Seam */}
                <path 
                  d="M 100,165 C 115,125 130,70 160,35" 
                  stroke={selectedColor.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'} 
                  strokeWidth="2" 
                  fill="none" 
                />

                {/* Right Sleeve Seam */}
                <path 
                  d="M 400,165 C 385,125 370,70 340,35" 
                  stroke={selectedColor.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'} 
                  strokeWidth="2" 
                  fill="none" 
                />

                {/* Subtle Fabric Folds / Shading */}
                <path 
                  d="M 105,210 C 130,230 140,280 130,340" 
                  stroke={selectedColor.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} 
                  strokeWidth="6" 
                  fill="none" 
                />
                <path 
                  d="M 395,210 C 370,230 360,280 370,340" 
                  stroke={selectedColor.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} 
                  strokeWidth="6" 
                  fill="none" 
                />
              </svg>

              {/* Placed Logo Layer */}
              {placement === 'center' ? (
                /* Full Chest Center Placement */
                <div className="absolute top-[29%] left-[20%] right-[20%] flex items-center justify-center pointer-events-none transition-all duration-200">
                  <img
                    src={svgUrl}
                    alt="T-Shirt Center Logo"
                    className={`w-full object-contain ${
                      selectedStyle === 'pocket' ? 'max-w-[130px]' : 'max-w-[240px]'
                    } drop-shadow-md`}
                  />
                </div>
              ) : (
                /* Left Chest (Pocket Area) Placement */
                <div className="absolute top-[27%] left-[58%] w-[25%] flex items-center justify-center pointer-events-none transition-all duration-200">
                  <img
                    src={svgUrl}
                    alt="T-Shirt Left Pocket Logo"
                    className="w-full object-contain drop-shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Garment Color Swatches & Placement Toggle */}
          <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            {/* Color Palette Buttons */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-gecdsb" />
                <span>Garment Color:</span>
              </label>
              <div className="flex items-center gap-2">
                {GARMENT_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                      c.borderClass || ''
                    } ${
                      selectedColor.id === c.id 
                        ? 'scale-115 ring-2 ring-amber-400 ring-offset-2' 
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={c.name}
                  >
                    {selectedColor.id === c.id && (
                      <Check className={`w-3.5 h-3.5 ${c.isDark ? 'text-amber-400' : 'text-slate-900'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Placement Switcher */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Print Placement:
              </label>
              <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => setPlacement('center')}
                  className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    placement === 'center'
                      ? 'bg-gecdsb text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Full Chest (Center)
                </button>
                <button
                  onClick={() => setPlacement('pocket')}
                  className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    placement === 'pocket'
                      ? 'bg-gecdsb text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Left Chest (Pocket)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* RIGHT COLUMN: LOGO STYLES, ASSET DOWNLOADS & PRINT SPECS         */}
        {/* ================================================================ */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* 1. Design Variation Cards */}
          <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-gecdsb" />
                <span>Select Logo Style</span>
              </h3>
              <span className="text-[11px] font-bold text-gecdsb uppercase tracking-wider">
                3 Official Variants
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Variant 1: Full Chest Banner */}
              <button
                onClick={() => {
                  setSelectedStyle('chest');
                  setPlacement('center');
                }}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  selectedStyle === 'chest'
                    ? 'border-amber-400 bg-amber-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${selectedStyle === 'chest' ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                  <Shirt className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Classic Campaign Chest Banner
                    </span>
                    {selectedStyle === 'chest' && (
                      <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-200/60 px-1.5 py-0.2 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    ★ VOTE ★ PETERSON with gold stars divider &amp; FOR GECDSB TRUSTEE (Streamlined, bold high-impact chest print).
                  </p>
                </div>
              </button>

              {/* Variant 2: Pocket Roundel Badge */}
              <button
                onClick={() => {
                  setSelectedStyle('pocket');
                  setPlacement('pocket');
                }}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  selectedStyle === 'pocket'
                    ? 'border-amber-400 bg-amber-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${selectedStyle === 'pocket' ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Circular Pocket Roundel Badge
                    </span>
                    {selectedStyle === 'pocket' && (
                      <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-200/60 px-1.5 py-0.2 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Circular 3.5" seal with arched typography: “VOTE ADAM PETERSON”, star core, and GECDSB Trustee ring.
                  </p>
                </div>
              </button>

              {/* Variant 3: Athletic Varsity Stack */}
              <button
                onClick={() => {
                  setSelectedStyle('varsity');
                  setPlacement('center');
                }}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  selectedStyle === 'varsity'
                    ? 'border-amber-400 bg-amber-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${selectedStyle === 'varsity' ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Modern "Students First" Varsity Stack
                    </span>
                    {selectedStyle === 'varsity' && (
                      <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-200/60 px-1.5 py-0.2 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    High-energy collegiate stack with “LET’S PUT STUDENTS FIRST”, bold VOTE PETERSON, and district bar.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Download File Cards */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Printer className="w-4 h-4" />
                <span>Print-Ready Assets</span>
              </span>
              <span className="text-[11px] text-slate-400">
                {isDarkGarment ? 'Dark Garment Edition' : 'Light Garment Edition'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Vector SVG Download */}
              <a
                href={svgUrl}
                download={svgFilename}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400/50 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      Scalable Vector SVG
                    </span>
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    For Screen Printers, Vinyl Plotters &amp; Embroidery.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 mt-3 block">
                  ✓ 100% Vector • Infinite DPI
                </span>
              </a>

              {/* 300 DPI Transparent PNG Download */}
              <a
                href={pngUrl}
                download={pngFilename}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400/50 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      300 DPI Transparent PNG
                    </span>
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    For Printful, CustomInk, Vistaprint &amp; DTG.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 mt-3 block">
                  ✓ 3000px Ultra HD • Alpha Channel
                </span>
              </a>
            </div>

            {/* Direct convenience links to alternative garment colorways */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Looking for the alternate colorway?</span>
              <div className="flex items-center gap-2">
                <a
                  href={`/tshirt/vote-peterson-${selectedStyle}-dark.svg`}
                  download={`vote-peterson-${selectedStyle}-dark.svg`}
                  className="text-amber-300 hover:underline font-bold"
                >
                  Dark SVG
                </a>
                <span>•</span>
                <a
                  href={`/tshirt/vote-peterson-${selectedStyle}-light.svg`}
                  download={`vote-peterson-${selectedStyle}-light.svg`}
                  className="text-amber-300 hover:underline font-bold"
                >
                  Light SVG
                </a>
              </div>
            </div>
          </div>

          {/* 3. Screen Printing Production Specs & Brand Color Codes */}
          <div className="bg-white rounded-2xl border border-slate-300 p-4 sm:p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Commercial Screen-Print Specifications</span>
            </h4>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Full Chest Print Width:</span>
                <span className="font-bold text-slate-800">11.0" – 11.5" (Adult S–3XL)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Pocket Print Size:</span>
                <span className="font-bold text-slate-800">3.5" – 3.75" Diameter</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Placement Height:</span>
                <span className="font-bold text-slate-800">2.5" – 3.0" below front collar</span>
              </div>
            </div>

            {/* Quick Copy Brand Colors */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Brand Colors for Ink / Thread Matching:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'GECDSB Teal', hex: '#005961', pms: 'PMS 321 C' },
                  { name: 'Deep Petrol Teal', hex: '#00262B', pms: 'PMS 316 C' },
                  { name: 'Amber Gold', hex: '#F59E0B', pms: 'PMS 137 C' },
                  { name: 'Crisp White', hex: '#FFFFFF', pms: 'Opaque White' }
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => handleCopy(c.hex)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-mono text-slate-700 transition-colors cursor-pointer"
                    title={`Click to copy hex ${c.hex}`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-slate-500">({c.hex})</span>
                    {copiedHex === c.hex ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
