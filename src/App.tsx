/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CandidateProfile, SiteContentData, EditorTabId } from './types';
import {
  INITIAL_CANDIDATE_PROFILE,
  CAMPAIGN_PILLARS,
  LOCAL_SCHOOLS,
  VOTER_FAQS
} from './data/campaignData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PillarsSection } from './components/PillarsSection';
import { WhyRunningSection } from './components/WhyRunningSection';
import { AboutSection } from './components/AboutSection';
import { LocalSchoolsSection } from './components/LocalSchoolsSection';
import { VoterFaqSection } from './components/VoterFaqSection';
import { GetInvolvedSection } from './components/GetInvolvedSection';
import { Footer } from './components/Footer';
import { PrintablePlatformModal, FlyerFormat } from './components/PrintablePlatformModal';
import { SiteContentEditorModal } from './components/SiteContentEditorModal';
import { CompactExecutiveView } from './components/CompactExecutiveView';
import { TabbedFocusView } from './components/TabbedFocusView';
import { ArchiveLandingPage } from './components/ArchiveLandingPage';

export type LayoutMode = 'compact' | 'tabbed' | 'extended';

export default function App() {
  const [viewingArchivedPlatform, setViewingArchivedPlatform] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#archive';
    }
    return false;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setViewingArchivedPlatform(window.location.hash === '#archive');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const [siteContent, setSiteContent] = useState<SiteContentData>(() => {
    try {
      const saved = localStorage.getItem('gecdsb_site_content_v21');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.candidate && parsed.pillars) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }

    return {
      candidate: INITIAL_CANDIDATE_PROFILE,
      pillars: CAMPAIGN_PILLARS,
      schools: LOCAL_SCHOOLS,
      faqs: VOTER_FAQS,
    };
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
  const [printableFormat, setPrintableFormat] = useState<FlyerFormat>('postcard');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorInitialTab, setEditorInitialTab] = useState<EditorTabId>('candidate');

  const handleOpenPrintable = (format: FlyerFormat = 'postcard') => {
    setPrintableFormat(format);
    setIsPrintableOpen(true);
  };

  useEffect(() => {
    try {
      localStorage.setItem('gecdsb_site_content_v21', JSON.stringify(siteContent));
      localStorage.setItem('gecdsb_candidate_profile_v21', JSON.stringify(siteContent.candidate));
    } catch {
      // ignore
    }
  }, [siteContent]);

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

  const handleOpenEditor = (tab: EditorTabId = 'candidate') => {
    setEditorInitialTab(tab);
    setIsEditorOpen(true);
  };

  const handleSaveContent = (updated: SiteContentData) => {
    setSiteContent(updated);
  };

  if (!viewingArchivedPlatform) {
    return (
      <ArchiveLandingPage
        candidate={siteContent.candidate}
        onExploreArchive={() => {
          window.location.hash = '#archive';
          setViewingArchivedPlatform(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Archive Header Banner */}
      <div className="bg-amber-400 text-slate-950 font-medium px-4 py-2.5 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-3 shadow-sm border-b border-amber-500 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold uppercase tracking-wider bg-slate-950 text-amber-300 text-[10px] px-2 py-0.5 rounded">
            Archived Campaign
          </span>
          <span className="font-semibold text-slate-900">
            Viewing archived 2026 campaign materials for Adam Peterson (GECDSB Trustee).
          </span>
        </div>
        <button
          onClick={() => {
            window.location.hash = '';
            setViewingArchivedPlatform(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center font-bold text-slate-950 hover:text-slate-800 underline transition-colors cursor-pointer"
        >
          ← Return to Thank You & Concession Statement
        </button>
      </div>

      {/* Sticky Civic Header */}
      <Navbar
        candidate={siteContent.candidate}
        layoutMode={layoutMode}
        onChangeLayoutMode={setLayoutMode}
        onOpenCustomizer={() => handleOpenEditor('candidate')}
        onOpenPrintable={handleOpenPrintable}
      />

      {/* Main Content Area: Default Bento Layout */}
      <main className="flex-1">
        {layoutMode === 'compact' && (
          <CompactExecutiveView
            candidate={siteContent.candidate}
            pillars={siteContent.pillars}
            schools={siteContent.schools}
            faqs={siteContent.faqs}
            onOpenPrintable={handleOpenPrintable}
            onOpenCustomizer={(tab) => handleOpenEditor(tab || 'candidate')}
          />
        )}

        {layoutMode === 'tabbed' && (
          <TabbedFocusView
            candidate={siteContent.candidate}
            pillars={siteContent.pillars}
            schools={siteContent.schools}
            faqs={siteContent.faqs}
            onOpenPrintable={() => setIsPrintableOpen(true)}
            onOpenCustomizer={(tab) => handleOpenEditor(tab || 'candidate')}
          />
        )}

        {layoutMode === 'extended' && (
          <>
            {/* Hero Section */}
            <Hero candidate={siteContent.candidate} onSelectPillar={handleSelectPillar} />

            {/* The 3-Pillar Framework Section */}
            <PillarsSection pillars={siteContent.pillars} activePillarId={activePillarId} />

            {/* Why I Am Running Section */}
            <WhyRunningSection candidate={siteContent.candidate} />

            {/* About Me Section */}
            <AboutSection
              candidate={siteContent.candidate}
              onOpenCustomizer={() => handleOpenEditor('candidate')}
            />

            {/* Local Schools Section (LaSalle & Amherstburg) */}
            <LocalSchoolsSection schools={siteContent.schools} />

            {/* Voter FAQ & Guide Section */}
            <VoterFaqSection faqs={siteContent.faqs} />

            {/* Get Involved / Lawn Sign / Volunteer Section */}
            <GetInvolvedSection
              candidate={siteContent.candidate}
              onOpenPrintable={() => setIsPrintableOpen(true)}
            />
          </>
        )}
      </main>

      {/* Civic Footer */}
      <Footer
        candidate={siteContent.candidate}
        onOpenPrintable={() => setIsPrintableOpen(true)}
      />

      {/* Printable 1-Pager Platform Modal */}
      <PrintablePlatformModal
        isOpen={isPrintableOpen}
        onClose={() => setIsPrintableOpen(false)}
        candidate={siteContent.candidate}
        pillars={siteContent.pillars}
        initialFormat={printableFormat}
      />

      {/* Global Live Site Text & Content Editor Modal */}
      <SiteContentEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        initialTab={editorInitialTab}
        content={siteContent}
        onSave={handleSaveContent}
      />
    </div>
  );
}
