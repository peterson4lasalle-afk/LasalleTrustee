import React from 'react';
import { CandidateProfile } from '../types';
import { ArrowUp, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  candidate: CandidateProfile;
  onOpenPrintable: () => void;
}

export const Footer: React.FC<FooterProps> = ({ candidate, onOpenPrintable }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center justify-between">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gecdsb text-white flex items-center justify-center font-serif font-bold text-xl border border-gecdsb-700">
                {candidate.preferredName ? candidate.preferredName[0] : 'A'}
              </div>
              <div>
                <span className="font-serif font-bold text-white text-lg block">
                  {candidate.fullName}
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  Peterson for Trustee • {candidate.riding}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Dedicated to student achievement, collaborative school board governance, and transparent fiscal responsibility across all public schools in the {candidate.riding}.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gecdsb-300" />
                <a href={`mailto:${candidate.email}`} className="hover:text-white transition-colors">{candidate.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gecdsb-300" />
                <span>{candidate.location}</span>
              </div>
            </div>
          </div>

          {/* Platform Pillars Links & Actions */}
          <div className="md:col-span-6 space-y-3 md:pl-6">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Platform Framework
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pillars" className="hover:text-white transition-colors block">
                  <strong className="text-slate-200">Pillar 1:</strong> Focus on Student Success (Literacy, STEM & Well-Being)
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-white transition-colors block">
                  <strong className="text-slate-200">Pillar 2:</strong> Collaboration, Not Division (Consensus Governance)
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-white transition-colors block">
                  <strong className="text-slate-200">Pillar 3:</strong> Transparency and Responsibility (Fiscal Care & Town Halls)
                </a>
              </li>
            </ul>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenPrintable}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Download / Print Event Flyer & Platform →</span>
              </button>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Clean Bottom Bar */}
      <div className="bg-slate-900/90 border-t border-slate-800/80 py-4 px-4 sm:px-6 text-center text-[11px] text-slate-400">
        <p className="text-slate-400">
          Greater Essex County District School Board • {candidate.riding}
        </p>
      </div>
    </footer>
  );
};
