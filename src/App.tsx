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
      const saved = localStorage.getItem('gecdsb_layout_mode_v4') as LayoutMode;
      if (saved && ['compact', 'tabbed', 'extended'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'compact'; // Bento format as default
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
      localStorage.setItem('gecdsb_layout_mode_v4', layoutMode);
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

      {/* Main Content Area: Default Bento Layout */}
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
