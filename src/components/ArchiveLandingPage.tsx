import React from 'react';
import { CandidateProfile } from '../types';
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface ArchiveLandingPageProps {
  candidate: CandidateProfile;
  onExploreArchive: () => void;
}

export const ArchiveLandingPage: React.FC<ArchiveLandingPageProps> = ({
  candidate,
  onExploreArchive
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Civic Status Ribbon */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center space-x-2.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse" />
              Campaign Concluded & Archived
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="text-slate-300 font-medium hidden sm:inline">
              Greater Essex County District School Board
            </span>
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span className="text-xs">Town of LaSalle & Town of Amherstburg</span>
            <button
              onClick={onExploreArchive}
              className="inline-flex items-center text-xs font-semibold text-amber-300 hover:text-amber-200 underline decoration-amber-400/40 hover:decoration-amber-300 transition-colors cursor-pointer"
            >
              Browse Archive
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Announcement Hero */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-3xl w-full">
          {/* Official Concession & Gratitude Card */}
          <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden backdrop-blur-sm">
            {/* Subtle decorative glow */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Profile Avatar / Seal */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8">
              <div className="relative">
                <img
                  src={candidate.photoUrl || '/candidate-headshot.jpg'}
                  alt={candidate.fullName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-amber-400/30 shadow-lg ring-4 ring-slate-800"
                />
                <div className="absolute -bottom-2 -right-2 bg-slate-800 border border-slate-700 rounded-full p-1.5 shadow">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="inline-block text-xs uppercase tracking-widest font-bold text-amber-400 mb-1">
                  Official Statement
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {candidate.fullName}
                </h1>
                <p className="text-sm text-slate-400 mt-0.5">
                  Trustee Candidate (2026) • Town of LaSalle & Town of Amherstburg
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Greater Essex County District School Board
                </p>
              </div>
            </div>

            {/* Primary Requested Statement Box */}
            <div className="relative bg-gradient-to-br from-amber-500/15 via-slate-800/80 to-slate-900/80 border-l-4 border-amber-400 p-6 sm:p-8 rounded-xl sm:rounded-2xl mb-8 shadow-inner">
              <div className="text-amber-400/40 text-4xl font-serif leading-none select-none -mt-2 mb-1">
                “
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-amber-50 leading-relaxed sm:leading-relaxed">
                Thanks for your support, I wish Mary Jane Fields the best as the incoming Trustee for the Greater Essex County District School Board.
              </p>
              <div className="mt-4 flex items-center justify-end text-xs text-amber-300 font-medium">
                — {candidate.fullName}
              </div>
            </div>

            {/* Personal Reflections & Gratitude from Adam */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/80 pt-6">
              <p>
                Our community is stronger when we engage in open dialogue about student success,
                foundational academics, classroom resources, and transparent governance. Serving our students
                and educators remains one of the most vital responsibilities in our public life.
              </p>
              <p>
                I extend my sincere congratulations and best wishes to incoming Trustee{' '}
                <strong className="text-white font-semibold">Mary Jane Fields</strong> as she takes on
                this vital role representing our families at the board table.
              </p>
            </div>

            {/* Key Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                onClick={onExploreArchive}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all hover:shadow-amber-500/20 hover:-translate-y-0.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Archived Campaign & Platform
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <a
                href={`mailto:${candidate.email}`}
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4 mr-2 text-amber-400" />
                Contact: {candidate.email}
              </a>
            </div>

            {/* Preservation Notice Box */}
            <div className="mt-8 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-300 font-semibold block mb-0.5">
                  Campaign Archive Note
                </strong>
                This site has been permanently archived. All original campaign policy pillars,
                constituent FAQ responses, school directory data, and downloadable resources remain
                accessible for historical reference and public record.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dignified Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Adam Peterson. Campaign concluded. Authorized by the Official Agent.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={onExploreArchive}
              className="text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Archived Platform
            </button>
            <span>•</span>
            <a
              href="https://www.publicboard.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-300 inline-flex items-center transition-colors"
            >
              GECDSB Website
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
