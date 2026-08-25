import React from 'react';
import { CandidateProfile } from '../types';
import { Compass, Sparkles, Building2, Quote, ArrowRight, ShieldCheck, Heart, Users2, Landmark } from 'lucide-react';

interface WhyRunningProps {
  candidate: CandidateProfile;
}

export const WhyRunningSection: React.FC<WhyRunningProps> = ({ candidate }) => {
  return (
    <section id="why-running" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Mission & Motivation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Why I Am Running for School Board Trustee
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Public education is the cornerstone of our community. Our students and families in LaSalle and Amherstburg deserve steady leadership that focuses on what matters most.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Personal Statement & Quote */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-gecdsb-950 to-gecdsb-900 text-white p-7 sm:p-8 shadow-xl border border-gecdsb-800 overflow-hidden">
              {/* Background watermark */}
              <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-gecdsb-700/20 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Candidate's Vision
                </div>

                <h3 className="text-2xl font-serif font-bold text-white leading-snug">
                  "Our classrooms should never be a political battleground. They should be launching pads for our children's futures."
                </h3>

                <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed pt-2 border-t border-gecdsb-800/60">
                  <p>
                    I am stepping forward to run for GECDSB Trustee because I believe our school board is at its best when trustees govern with humility, respect, and single-minded dedication to student achievement.
                  </p>
                  <p>
                    Whether it's ensuring our rural routes in Amherstburg have dependable busing, or managing high-growth classroom spaces in LaSalle, our communities require a representative who listens, collaborates, and delivers.
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-base font-serif">
                    {candidate.preferredName ? candidate.preferredName[0] : 'A'}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{candidate.fullName}</div>
                    <div className="text-xs text-gecdsb-200">Peterson for Trustee • {candidate.riding}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Community Stats Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Landmark className="w-4 h-4 text-gecdsb" />
                The Role of the Trustee
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trustees are the public voice in educational governance. We set strategic direction, monitor the GECDSB multi-million dollar annual budget, ensure equitable resource allocation, and advocate tirelessly for our LaSalle and Amherstburg school communities.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Core Why-I-Am-Running Cards */}
          <div className="lg:col-span-7 space-y-4">
            {candidate.whyRunningHighlights.map((highlight, index) => {
              const icons = [
                <Building2 key={1} className="w-5 h-5 text-gecdsb" />,
                <Users2 key={2} className="w-5 h-5 text-emerald-600" />,
                <ShieldCheck key={3} className="w-5 h-5 text-amber-600" />,
                <Heart key={4} className="w-5 h-5 text-rose-600" />
              ];

              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200 hover:border-gecdsb-300 transition-all shadow-xs"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs shrink-0">
                      {icons[index % icons.length]}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="text-lg font-bold text-slate-900">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Call to Action Bar */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-gecdsb-50 border border-gecdsb-200">
              <div>
                <h5 className="text-sm font-bold text-gecdsb-950">
                  Ready to support a positive, student-centered campaign?
                </h5>
                <p className="text-xs text-gecdsb-800">
                  Join our volunteer team, request a sign, or share your input for our local schools.
                </p>
              </div>
              <a
                href="#get-involved"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gecdsb hover:bg-gecdsb-700 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <span>Get Involved</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
