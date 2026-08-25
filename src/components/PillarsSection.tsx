import React, { useState } from 'react';
import { CAMPAIGN_PILLARS } from '../data/campaignData';
import { Pillar } from '../types';
import { 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  HeartHandshake, 
  Scale, 
  Layers
} from 'lucide-react';

interface PillarsSectionProps {
  activePillarId?: string | null;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ activePillarId }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(activePillarId || 'pillar-1');

  // If parent changed activePillarId, sync
  React.useEffect(() => {
    if (activePillarId) {
      setSelectedPillarId(activePillarId);
      const el = document.getElementById('pillars');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activePillarId]);

  const selectedPillar = CAMPAIGN_PILLARS.find((p) => p.id === selectedPillarId) || CAMPAIGN_PILLARS[0];

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  return (
    <section id="pillars" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gecdsb-100 border border-gecdsb-200 text-gecdsb-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gecdsb" />
            <span>The Platform Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            A Clear, 3-Pillar Vision for GECDSB
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Constructed to move our school board beyond distractions and deliver practical, measurable results for students, families, and staff in LaSalle and Amherstburg.
          </p>
        </div>

        {/* 3 Pillar Tab Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {CAMPAIGN_PILLARS.map((pillar) => {
            const isSelected = selectedPillar.id === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`relative text-left p-5 sm:p-6 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? `bg-white shadow-lg border-gecdsb ring-2 ring-gecdsb/20`
                    : `bg-white/70 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs`
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`p-3 rounded-xl ${
                      isSelected
                        ? `${pillar.colorClass.accentBg} text-white shadow-md`
                        : `bg-slate-100 text-slate-700`
                    }`}
                  >
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${pillar.colorClass.badgeBg}`}>
                    Pillar {pillar.number}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {pillar.tagline}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? pillar.colorClass.badgeText : 'text-slate-500'}>
                    {pillar.badge}
                  </span>
                  <span className={`inline-flex items-center gap-1 ${isSelected ? 'text-gecdsb font-bold' : 'text-slate-400'}`}>
                    {isSelected ? 'Viewing details' : 'Click to view'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Breakdown Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header Banner for Selected Pillar */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-gecdsb-950 via-gecdsb-900 to-gecdsb-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-xs font-black uppercase px-2 py-0.5 rounded">
                  Pillar {selectedPillar.number}
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-gecdsb-200">
                  {selectedPillar.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {selectedPillar.title}
              </h3>
              <p className="text-base sm:text-lg text-gecdsb-100 font-medium leading-relaxed italic">
                "{selectedPillar.tagline}"
              </p>
            </div>

            <div className="shrink-0 p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-xs max-w-xs text-xs text-slate-200 space-y-1.5 hidden lg:block">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Trustee Commitment
              </div>
              <p>
                Actionable policy oversight designed for direct student and classroom impact across LaSalle & Amherstburg.
              </p>
            </div>
          </div>

          {/* Sub-Pillars Grid */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {selectedPillar.subPillars.map((sub, idx) => (
                <div
                  key={idx}
                  className="flex flex-col h-full bg-slate-50/80 rounded-xl border border-slate-200 p-5 sm:p-6 hover:border-gecdsb-300 transition-colors shadow-xs"
                >
                  {/* Sub Pillar Title */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-gecdsb text-white text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 leading-snug">
                        {sub.title}
                      </h4>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      {sub.description}
                    </p>
                  </div>

                  {/* Concrete Initiatives (Optional) */}
                  {sub.keyInitiatives && sub.keyInitiatives.length > 0 && (
                    <div className="space-y-2.5 mb-2 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Key Board Action Items:
                      </span>
                      <ul className="space-y-2">
                        {sub.keyInitiatives.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Summary Banner for Selected Pillar */}
            <div className="p-4 sm:p-5 rounded-xl bg-gecdsb-50 border border-gecdsb-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gecdsb text-white shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gecdsb-950">
                    Why this matters for LaSalle & Amherstburg:
                  </h5>
                  <p className="text-xs text-gecdsb-800">
                    Ensures our schools receive their fair share of regional investments, staffing, and specialized learning opportunities.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="#get-involved"
                  className="px-4 py-2 text-xs font-bold text-white bg-gecdsb hover:bg-gecdsb-700 rounded-lg transition-colors shadow-xs"
                >
                  Support This Platform
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 3 Pillar Summary Quick Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2 text-gecdsb font-bold text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>Pillar 1: Student Success</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Targeting literacy & STEM early interventions, prioritizing mental well-being, and guaranteeing program equity across North Star, Sandwich Secondary, and all elementary feeders.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2 text-emerald-700 font-bold text-sm">
              <HeartHandshake className="w-4 h-4" />
              <span>Pillar 2: Collaboration</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Moving past divisive board friction by focusing on common-sense governance, strong parent council partnerships, and respectful support for frontline educators.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2 text-amber-700 font-bold text-sm">
              <Scale className="w-4 h-4" />
              <span>Pillar 3: Transparency</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Line-by-line fiscal oversight, proactive multi-year town halls across LaSalle and Amherstburg, and open reporting of voting records and strategic metrics.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
