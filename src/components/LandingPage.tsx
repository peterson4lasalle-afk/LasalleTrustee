import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

const CANDIDATE_NAME = 'Adam Peterson';
const CANDIDATE_EMAIL = 'peterson4lasalle@gmail.com';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Civic Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center space-x-2.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
              Official Statement
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="text-slate-300 font-medium hidden sm:inline">
              Greater Essex County District School Board
            </span>
          </div>
          <div className="text-slate-400">
            <span className="text-xs">Town of LaSalle & Town of Amherstburg</span>
          </div>
        </div>
      </header>

      {/* Main Announcement Hero */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-3xl w-full">
          {/* Official Statement Card */}
          <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden backdrop-blur-sm">
            {/* Subtle decorative glow */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Official Header */}
            <div className="mb-8">
              <div className="inline-block text-xs uppercase tracking-widest font-bold text-amber-400 mb-1">
                Official Statement
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {CANDIDATE_NAME}
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Trustee Candidate (2026) • Town of LaSalle & Town of Amherstburg
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Greater Essex County District School Board
              </p>
            </div>

            {/* Primary Statement Box */}
            <div className="relative bg-gradient-to-br from-amber-500/15 via-slate-800/80 to-slate-900/80 border-l-4 border-amber-400 p-6 sm:p-8 rounded-xl sm:rounded-2xl mb-8 shadow-inner">
              <div className="text-amber-400/40 text-4xl font-serif leading-none select-none -mt-2 mb-1">
                “
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-amber-50 leading-relaxed sm:leading-relaxed">
                Thanks for your support, I wish Mary Jane Fields the best as the incoming Trustee for the Greater Essex County District School Board.
              </p>
              <div className="mt-4 flex items-center justify-end text-xs text-amber-300 font-medium">
                — {CANDIDATE_NAME}
              </div>
            </div>

            {/* Closing Reflections & Congratulations */}
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

            {/* Contact Link */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-start">
              <a
                href={`mailto:${CANDIDATE_EMAIL}`}
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4 mr-2 text-amber-400" />
                Contact: {CANDIDATE_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Dignified Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {CANDIDATE_NAME}. Campaign concluded. Authorized by the Official Agent.
          </p>
          <div className="flex items-center space-x-4">
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
