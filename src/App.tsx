/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CandidateProfile } from './types';
import { INITIAL_CANDIDATE_PROFILE } from './data/campaignData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PillarsSection } from './components/PillarsSection';
import { WhyRunningSection } from './components/WhyRunningSection';
import { AboutSection } from './components/AboutSection';
import { LocalSchoolsSection } from './components/LocalSchoolsSection';
import { VoterFaqSection } from './components/VoterFaqSection';
import { GetInvolvedSection } from './components/GetInvolvedSection';
import { Footer } from './components/Footer';
import { PrintablePlatformModal } from './components/PrintablePlatformModal';
import { CandidateCustomizerModal } from './components/CandidateCustomizerModal';
import { CompactExecutiveView } from './components/CompactExecutiveView';
import { TabbedFocusView } from './components/TabbedFocusView';
import { LayoutGrid, Layers, AlignJustify } from 'lucide-react';

export type LayoutMode = 'compact' | 'tabbed' | 'extended';

export default function App() {
  const [candidate, setCandidate] = useState<CandidateProfile>(() => {
    try {
      const saved = localStorage.getItem('gecdsb_candidate_profile_v7');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_CANDIDATE_PROFILE;
  });

  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => {
    try {
      const saved = localStorage.getItem('gecdsb_layout_mode_v3') as LayoutMode;
      if (saved && ['compact', 'tabbed', 'extended'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'tabbed'; // Default to Tabbed Screen as preferred by the candidate
  });

  const [activePillarId, setActivePillarId] = useState<string | null>(null);
  const [isPrintableOpen, setIsPrintableOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('gecdsb_candidate_profile_v7', JSON.stringify(candidate));
    } catch {
      // ignore
    }
  }, [candidate]);

  useEffect(() => {
    try {
      localStorage.setItem('gecdsb_layout_mode_v3', layoutMode);
    } catch {
      // ignore
    }
  }, [layoutMode]);

  const handleSelectPillar = (pillarId: string) => {
    setActivePillarId(pillarId);
    const elem = document.getElementById('pillars');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveCandidate = (updated: CandidateProfile) => {
    setCandidate(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Sticky Civic Header */}
      <Navbar
        candidate={candidate}
        layoutMode={layoutMode}
        onChangeLayoutMode={setLayoutMode}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenPrintable={() => setIsPrintableOpen(true)}
      />

      {/* Layout Mode Switcher Banner */}
      <div className="bg-slate-100 border-b border-slate-200 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Page Layout:</span>
            <div className="inline-flex rounded-lg bg-slate-200 p-0.5 border border-slate-300">
              <button
                onClick={() => setLayoutMode('compact')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  layoutMode === 'compact'
                    ? 'bg-white text-gecdsb shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Compact Bento (Short)</span>
              </button>
              <button
                onClick={() => setLayoutMode('tabbed')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  layoutMode === 'tabbed'
                    ? 'bg-white text-gecdsb shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tabbed Screen</span>
              </button>
              <button
                onClick={() => setLayoutMode('extended')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  layoutMode === 'extended'
                    ? 'bg-white text-gecdsb shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <AlignJustify className="w-3.5 h-3.5" />
                <span>Full Long Scroll</span>
              </button>
            </div>
          </div>
          <span className="text-slate-500 hidden sm:inline">
            {layoutMode === 'compact' && '✨ Clean, high-density bento layout (cuts page length by ~75%)'}
            {layoutMode === 'tabbed' && '⚡ 1-screen tabbed view — zero vertical scrolling'}
            {layoutMode === 'extended' && '📜 Full multi-section campaign document'}
          </span>
        </div>
      </div>

      {/* Main Content Area Based on Chosen Layout */}
      <main className="flex-1">
        {layoutMode === 'compact' && (
          <CompactExecutiveView
            candidate={candidate}
            onOpenPrintable={() => setIsPrintableOpen(true)}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />
        )}

        {layoutMode === 'tabbed' && (
          <TabbedFocusView
            candidate={candidate}
            onOpenPrintable={() => setIsPrintableOpen(true)}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />
        )}

        {layoutMode === 'extended' && (
          <>
            {/* Hero Section */}
            <Hero candidate={candidate} onSelectPillar={handleSelectPillar} />

            {/* The 3-Pillar Framework Section */}
            <PillarsSection activePillarId={activePillarId} />

            {/* Why I Am Running Section */}
            <WhyRunningSection candidate={candidate} />

            {/* About Me Section */}
            <AboutSection
              candidate={candidate}
              onOpenCustomizer={() => setIsCustomizerOpen(true)}
            />

            {/* Local Schools Section (LaSalle & Amherstburg) */}
            <LocalSchoolsSection />

            {/* Voter FAQ & Guide Section */}
            <VoterFaqSection />

            {/* Get Involved / Lawn Sign / Volunteer Section */}
            <GetInvolvedSection
              candidate={candidate}
              onOpenPrintable={() => setIsPrintableOpen(true)}
            />
          </>
        )}
      </main>

      {/* Civic Footer */}
      <Footer
        candidate={candidate}
        onOpenPrintable={() => setIsPrintableOpen(true)}
      />

      {/* Printable 1-Pager Platform Modal */}
      <PrintablePlatformModal
        isOpen={isPrintableOpen}
        onClose={() => setIsPrintableOpen(false)}
        candidate={candidate}
      />

      {/* Candidate Profile Live Customizer Modal */}
      <CandidateCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        candidate={candidate}
        onSave={handleSaveCandidate}
      />
    </div>
  );
}
