import React from 'react';
import { CandidateProfile } from '../types';
import { CAMPAIGN_PILLARS } from '../data/campaignData';
import { X, Printer, Shield, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';

interface PrintablePlatformModalProps {
  candidate: CandidateProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintablePlatformModal: React.FC<PrintablePlatformModalProps> = ({
  candidate,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:border-none">
        
        {/* Modal Controls Bar (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Campaign Platform 1-Pager</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 sm:p-10 text-slate-900 space-y-6 print:p-6">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black tracking-widest uppercase text-gecdsb">
                Greater Essex County District School Board
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-950">
                {candidate.fullName}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-slate-700">
                Peterson for Trustee • {candidate.riding}
              </p>
            </div>

            <div className="text-right text-xs text-slate-600 sm:border-l sm:border-slate-200 sm:pl-4">
              <div className="font-bold text-slate-900">Contact {candidate.preferredName}:</div>
              <div>{candidate.email}</div>
              <div>{candidate.location}</div>
            </div>
          </div>

          {/* Slogan Banner */}
          <div className="bg-gecdsb-50 p-3.5 rounded-lg border border-gecdsb-200 text-center font-serif italic text-gecdsb-900 text-sm font-semibold">
            "{candidate.slogan}"
          </div>

          {/* 2-Column: About & Why Running Brief */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide border-b border-slate-200 pb-1">
                About the Candidate
              </h3>
              <p className="text-slate-700">{candidate.bioIntro}</p>
              <ul className="space-y-1 pt-1 text-slate-600">
                <li>• Former Lecturer at Algonquin College & St. Clair College</li>
                <li>• MBA Graduate with Multi-Level Management Experience</li>
                <li>• Raised by a teacher & married to an educator</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide border-b border-slate-200 pb-1">
                Why I Am Running
              </h3>
              <p className="text-slate-700">
                To move past polarizing board distractions and ensure every tax dollar directly supports classroom literacy, STEM, and student mental health in LaSalle and Amherstburg.
              </p>
              <ul className="space-y-1 pt-1 text-slate-600">
                <li>• Ensuring rural & suburban busing reliability</li>
                <li>• Strong vocational & French Immersion pathways</li>
                <li>• Holding regular community ward town halls</li>
              </ul>
            </div>
          </div>

          {/* The 3-Pillar Framework Section */}
          <div className="space-y-3">
            <h3 className="text-base font-serif font-bold text-slate-950 uppercase tracking-wide border-b border-slate-900 pb-1">
              The 3-Pillar Platform Framework
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CAMPAIGN_PILLARS.map((pillar) => (
                <div key={pillar.id} className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-2 text-xs">
                  <div className="font-bold text-slate-900 text-sm">
                    Pillar {pillar.number}: {pillar.title}
                  </div>
                  <p className="text-slate-600 italic text-[11px] leading-snug">
                    {pillar.tagline}
                  </p>
                  <ul className="space-y-1 pt-1 border-t border-slate-100 text-slate-700 text-[11px]">
                    {pillar.subPillars.map((sub, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-gecdsb shrink-0 mt-0.5" />
                        <span><strong>{sub.title}:</strong> {sub.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer of the Flyer */}
          <div className="pt-4 border-t-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
            <div>
              <strong>Peterson for Trustee</strong> • Greater Essex County District School Board
            </div>
            <div className="text-[11px] text-slate-500">
              {candidate.riding}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
