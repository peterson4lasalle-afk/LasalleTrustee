import React, { useEffect } from 'react';
import { CandidateProfile, Pillar } from '../types';
import { CAMPAIGN_PILLARS } from '../data/campaignData';
import {
  X,
  Printer,
  CheckCircle2,
  MapPin,
  Mail,
  GraduationCap,
  Users,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface PrintablePlatformModalProps {
  candidate: CandidateProfile;
  pillars?: Pillar[];
  isOpen: boolean;
  onClose: () => void;
}

export const PrintablePlatformModal: React.FC<PrintablePlatformModalProps> = ({
  candidate,
  pillars = CAMPAIGN_PILLARS,
  isOpen,
  onClose,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0 print:bg-white print:static print:overflow-visible"
    >
      
      {/* Print Orientation Override Style Tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              size: landscape;
              margin: 6mm;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `
      }} />

      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:border-none print:w-full print:max-w-none transition-all duration-200 my-auto">
        
        {/* ======================================================== */}
        {/* LANDSCAPE EVENT FLYER                                    */}
        {/* ======================================================== */}
        <div className="p-4 sm:p-6 md:p-7 bg-slate-50 print:p-4 text-slate-900 select-none">
          
          {/* Outer Container with Classic Campaign Card Styling */}
          <div className="bg-white rounded-2xl border-2 border-slate-900 shadow-md overflow-hidden flex flex-col justify-between">
            
            {/* TOP BANNER: Brand & Candidate Identity */}
            <div className="bg-gradient-to-r from-gecdsb-950 via-gecdsb-900 to-gecdsb-800 text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-amber-400">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gecdsb-700/80 text-amber-300 text-[11px] font-bold tracking-wider uppercase border border-amber-400/30 mb-1">
                  <Sparkles className="w-3 h-3" />
                  Greater Essex County District School Board
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white leading-none">
                  {candidate.fullName}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-gecdsb-200 mt-0.5">
                  Candidate for Trustee • {candidate.riding}
                </p>
              </div>

              {/* Slogan & Vote Callout Badge */}
              <div className="text-center md:text-right bg-slate-900/60 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/15">
                <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block">
                  VOTE PETERSON FOR TRUSTEE
                </span>
                <p className="font-serif italic text-white text-xs sm:text-sm font-medium">
                  "{candidate.slogan}"
                </p>
              </div>
            </div>

            {/* MAIN BODY: Candidate Profile Strip (Horizontal, Above Pillars) + 3-Column Pillar Cards */}
            <div className="p-5 sm:p-6 space-y-4 bg-slate-50/60">
              
              {/* HORIZONTAL CANDIDATE PROFILE CARD (Above Pillars) */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
                
                {/* Left: Photo & Candidate Identity */}
                <div className="flex items-center gap-3.5 shrink-0">
                  <div className="relative shrink-0">
                    <img
                      src={candidate.photoUrl || "./candidate-headshot.jpg"}
                      alt={candidate.fullName}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-amber-400 shadow-sm"
                      style={{ objectPosition: 'center 10%' }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = './candidate-headshot.jpg';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1.5 -right-1.5 bg-gecdsb text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-amber-400 shadow-xs">
                      Trustee
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-black text-slate-900 text-base sm:text-lg leading-tight">
                      {candidate.fullName}
                    </h3>
                    <p className="text-[11px] font-bold text-gecdsb-700 uppercase tracking-wide">
                      {candidate.riding}
                    </p>
                    <p className="text-[11px] text-slate-600 italic mt-0.5 max-w-xs leading-tight hidden lg:block">
                      "Focus on classroom success, collaborative leadership, and transparent fiscal stewardship."
                    </p>
                  </div>
                </div>

                {/* Middle: Qualifications & Highlights (2-column horizontal grid) */}
                <div className="flex-1 border-y md:border-y-0 md:border-x border-slate-200 py-2.5 md:py-0 md:px-5 w-full md:w-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>College Professor</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>20 Years Experience</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Educator Family</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Public School Parent</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right: Contact Strip */}
                <div className="shrink-0 bg-gecdsb-50 p-2.5 rounded-lg border border-gecdsb-200 text-[11px] text-gecdsb-950 flex flex-col gap-1 w-full md:w-auto">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Mail className="w-3.5 h-3.5 text-gecdsb shrink-0" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 text-[10px]">
                    <MapPin className="w-3.5 h-3.5 text-gecdsb shrink-0" />
                    <span>{candidate.riding}</span>
                  </div>
                </div>

              </div>

              {/* THE 3 CORE PILLARS IN A 3-COLUMN ROW (Below Candidate Card) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                
                {/* Pillar 1 Card */}
                {pillars[0] && (
                  <div className="bg-white rounded-xl border border-gecdsb-200 p-4 shadow-xs flex flex-col justify-between hover:border-gecdsb transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gecdsb"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-gecdsb-100 text-gecdsb-800 flex items-center justify-center font-bold text-xs shrink-0">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-gecdsb block">Pillar 1</span>
                          <h4 className="font-serif font-bold text-slate-900 text-sm leading-tight">{pillars[0].title}</h4>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 italic leading-snug mb-3 pb-2 border-b border-slate-100">
                        {pillars[0].tagline}
                      </p>
                      <ul className="space-y-2.5 text-xs text-slate-800">
                        {pillars[0].subPillars.map((sub, i) => (
                          <li key={i} className="space-y-0.5">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-gecdsb shrink-0"></span>
                              <span>{sub.title}</span>
                            </div>
                            <p className="text-[10.5px] text-slate-600 leading-tight pl-3">
                              {sub.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Pillar 2 Card */}
                {pillars[1] && (
                  <div className="bg-white rounded-xl border border-emerald-200 p-4 shadow-xs flex flex-col justify-between hover:border-emerald-500 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Pillar 2</span>
                          <h4 className="font-serif font-bold text-slate-900 text-sm leading-tight">{pillars[1].title}</h4>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 italic leading-snug mb-3 pb-2 border-b border-slate-100">
                        {pillars[1].tagline}
                      </p>
                      <ul className="space-y-2.5 text-xs text-slate-800">
                        {pillars[1].subPillars.map((sub, i) => (
                          <li key={i} className="space-y-0.5">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                              <span>{sub.title}</span>
                            </div>
                            <p className="text-[10.5px] text-slate-600 leading-tight pl-3">
                              {sub.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Pillar 3 Card */}
                {pillars[2] && (
                  <div className="bg-white rounded-xl border border-amber-300 p-4 shadow-xs flex flex-col justify-between hover:border-amber-500 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">Pillar 3</span>
                          <h4 className="font-serif font-bold text-slate-900 text-sm leading-tight">{pillars[2].title}</h4>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 italic leading-snug mb-3 pb-2 border-b border-slate-100">
                        {pillars[2].tagline}
                      </p>
                      <ul className="space-y-2.5 text-xs text-slate-800">
                        {pillars[2].subPillars.map((sub, i) => (
                          <li key={i} className="space-y-0.5">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                              <span>{sub.title}</span>
                            </div>
                            <p className="text-[10.5px] text-slate-600 leading-tight pl-3">
                              {sub.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* BOTTOM STRIP: Schools Served & Contact */}
            <div className="bg-slate-950 text-white px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t-2 border-amber-400">
              <div className="text-center sm:text-left">
                <span className="text-slate-300 text-[11px]">
                  Serving Sandwich West, Sandwich Secondary, Sandwich West PS, Malden Central, Western SS, Anderdon & Amherstburg
                </span>
              </div>

              <div className="flex items-center gap-3 font-semibold text-amber-300 text-xs shrink-0">
                <span>Connect: {candidate.email}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Control Bar (Hidden during Print) */}
        <div className="bg-slate-100 border-t border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs print:hidden">
          <div className="text-slate-500 text-[11px] hidden sm:block">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 border border-slate-300 font-mono text-[10px] text-slate-700">ESC</kbd> or click outside anytime to close.
          </div>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 font-semibold cursor-pointer transition-colors shadow-xs"
            >
              Close Preview
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gecdsb hover:bg-gecdsb-700 text-white font-bold cursor-pointer transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
