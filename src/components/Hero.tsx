import React from 'react';
import { CandidateProfile } from '../types';
import { ShieldCheck, GraduationCap, Users, ArrowRight, MapPin, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface HeroProps {
  candidate: CandidateProfile;
  onSelectPillar: (pillarId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ candidate, onSelectPillar }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gecdsb-950 text-white pt-12 pb-20 lg:pt-18 lg:pb-28">
      {/* Background Subtle Geometric Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#42a4ad_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Soft Ambient Civic Glow */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-gecdsb-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Civic Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gecdsb-900/90 border border-gecdsb-600/70 text-gecdsb-100 text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Greater Essex County District School Board • {candidate.riding}</span>
            </div>

            {/* Campaign Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm uppercase tracking-widest text-amber-400 font-bold">
                  Peterson for Trustee
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
                {candidate.fullName}
              </h1>
              <p className="text-xl sm:text-2xl text-gecdsb-100 font-medium leading-snug">
                {candidate.slogan}
              </p>
            </div>

            {/* Narrative Summary */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
              Every child across the Town of LaSalle and the Town of Amherstburg deserves access to safe, high-performing classrooms with modern literacy, STEM, and well-being supports. I am running to restore steady collaboration, fiscal responsibility, and student-centered focus to the GECDSB trustee table.
            </p>

            {/* Quick Commitments Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Evidence-based literacy & STEM resources</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Safe, positive & inclusive school environments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Collaborative, consensus-based governance</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Strict fiscal stewardship & open town halls</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#pillars"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all shadow-md shadow-amber-500/20 hover:translate-y-[-1px]"
              >
                <span>Explore the 3 Pillars</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#why-running"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gecdsb-900/90 hover:bg-gecdsb-800 text-white font-semibold text-base border border-gecdsb-700 transition-all"
              >
                <span>Why I Am Running</span>
              </a>

              <a
                href="#get-involved"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-lg text-gecdsb-200 hover:text-white font-medium text-sm transition-colors underline-offset-4 hover:underline"
              >
                <span>Connect with Adam →</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3 Pillars Highlight Card Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gecdsb-900/95 border border-gecdsb-800 p-6 sm:p-7 shadow-2xl backdrop-blur-sm space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-gecdsb-800/80 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Official Campaign Platform
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white">
                    The 3-Pillar Framework
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-gecdsb-800 border border-gecdsb-700 text-gecdsb-200">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* 3 Pillar Interactive Snippets */}
              <div className="space-y-3.5">
                {/* Pillar 1 */}
                <button
                  onClick={() => onSelectPillar('pillar-1')}
                  className="w-full text-left p-3.5 rounded-xl bg-gecdsb-950/80 hover:bg-gecdsb-800/80 border border-gecdsb-800 hover:border-gecdsb-400 transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gecdsb/40 text-gecdsb-200 border border-gecdsb-400/40 group-hover:bg-gecdsb group-hover:text-white transition-colors">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gecdsb-300 uppercase tracking-wide">Pillar 1</span>
                        <span className="text-[11px] text-gecdsb-200/80 group-hover:text-white font-medium">Read details →</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-gecdsb-100">
                        Focus on Student Success
                      </h4>
                      <p className="text-xs text-gecdsb-200/80 line-clamp-2 mt-0.5">
                        Centering all board decisions on academic achievement, well-being, and measurable outcomes.
                      </p>
                    </div>
                  </div>
                </button>

                {/* Pillar 2 */}
                <button
                  onClick={() => onSelectPillar('pillar-2')}
                  className="w-full text-left p-3.5 rounded-xl bg-gecdsb-950/80 hover:bg-emerald-950/60 border border-gecdsb-800 hover:border-emerald-500/80 transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Pillar 2</span>
                        <span className="text-[11px] text-slate-400 group-hover:text-emerald-300 font-medium">Read details →</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-emerald-200">
                        Collaboration, Not Division
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                        Restoring stability, constructive dialogue, and partnership to board governance.
                      </p>
                    </div>
                  </div>
                </button>

                {/* Pillar 3 */}
                <button
                  onClick={() => onSelectPillar('pillar-3')}
                  className="w-full text-left p-3.5 rounded-xl bg-gecdsb-950/80 hover:bg-amber-950/60 border border-gecdsb-800 hover:border-amber-500/80 transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-600/30 text-amber-300 border border-amber-500/40 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Pillar 3</span>
                        <span className="text-[11px] text-slate-400 group-hover:text-amber-300 font-medium">Read details →</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-amber-200">
                        Transparency and Responsibility
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                        Ensuring clear communication, public accountability, and fiscal stewardship.
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Endorsement / Candidate Promise Callout */}
              <div className="pt-2 border-t border-gecdsb-800/80 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  Independent, Non-Partisan Candidate
                </span>
                <span className="font-semibold text-gecdsb-200">LaSalle • Amherstburg</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
