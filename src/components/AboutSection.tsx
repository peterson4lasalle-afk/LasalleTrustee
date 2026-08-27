import React from 'react';
import { CandidateProfile } from '../types';
import { UserCheck, CheckCircle2, Award, HeartHandshake, Shield, Sparkles, MapPin, Mail, Phone } from 'lucide-react';

interface AboutSectionProps {
  candidate: CandidateProfile;
  onOpenCustomizer: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ candidate, onOpenCustomizer }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gecdsb-100 border border-gecdsb-200 text-gecdsb-900 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-gecdsb" />
            <span>Meet the Candidate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            About {candidate.fullName}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A dedicated community member, parent, and pragmatic advocate committed to exceptional public education for LaSalle and Amherstburg.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Candidate Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              
              {/* Profile Card Header with Portrait Avatar */}
              <div className="p-7 sm:p-8 bg-gradient-to-br from-gecdsb-950 via-gecdsb-900 to-gecdsb-950 text-white text-center relative">
                <div className="relative inline-block mx-auto mb-4">
                  <img
                    src={candidate.photoUrl || "./candidate-headshot.jpg"}
                    alt={candidate.fullName}
                    className="w-32 h-40 sm:w-36 sm:h-44 rounded-2xl object-cover object-center border-4 border-amber-400 shadow-xl mx-auto bg-gecdsb-950"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = './candidate-headshot.jpg';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-slate-900" title="Active Campaigner" />
                </div>

                <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                  {candidate.fullName}
                </h3>
                <p className="text-sm text-amber-300 font-bold mt-0.5">
                  Peterson for Trustee
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gecdsb-800 border border-gecdsb-700 text-xs text-amber-300 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{candidate.riding}</span>
                </div>
              </div>

              {/* Quick Contact & Info */}
              <div className="p-6 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="w-4 h-4 text-gecdsb shrink-0" />
                  <a href={`mailto:${candidate.email}`} className="hover:text-gecdsb hover:underline">
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <MapPin className="w-4 h-4 text-gecdsb shrink-0" />
                  <span>{candidate.location}</span>
                </div>
              </div>

            </div>

            {/* Core Values Badge Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Guiding Values
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-gecdsb shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-slate-900">Integrity & Accountability:</strong>
                    <p className="text-slate-600">Every decision guided by public trust, ethical conduct, and financial stewardship.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-slate-900">Constructive Dialogue:</strong>
                    <p className="text-slate-600">Listening to parents, respecting educators, and finding common ground across the board.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-slate-900">Student-First Focus:</strong>
                    <p className="text-slate-600">Prioritizing foundational literacy, STEM, and mental well-being in every classroom.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Bio Narrative & Why Running Highlights */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bio Paragraphs */}
            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p className="font-semibold text-slate-900 leading-snug">
                {candidate.bioIntro}
              </p>
              {candidate.extendedBio.map((paragraph, idx) => (
                <p key={idx} className="text-slate-600 text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Why I am running for Trustee with the GECDSB */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Why I am running for Trustee with the Greater Essex County District School Board:
              </h3>
              <div className="grid grid-cols-1 gap-3.5">
                {candidate.whyRunningHighlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <strong className="text-slate-900 font-bold block mb-0.5">{item.title}:</strong>
                      <span className="text-slate-600 leading-relaxed">{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing Statement Callout */}
            <div className="p-6 rounded-2xl bg-gecdsb text-white shadow-md space-y-3">
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed">
                Our schools need leadership that balances deep personal dedication with practical, real-world experience.
              </p>
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed pt-1">
                Vote for strong schools, accountable leadership, and a brighter future for our children.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
