import React, { useState } from 'react';
import { LOCAL_SCHOOLS } from '../data/campaignData';
import { School, MapPin, Sparkles, Filter, Bus, BookCheck, ShieldAlert, Cpu } from 'lucide-react';

export const LocalSchoolsSection: React.FC = () => {
  const [filterMunicipality, setFilterMunicipality] = useState<'All' | 'LaSalle' | 'Amherstburg'>('All');
  const [filterType, setFilterType] = useState<'All' | 'Elementary' | 'Secondary'>('All');

  const filteredSchools = LOCAL_SCHOOLS.filter((school) => {
    const matchesMun = filterMunicipality === 'All' || school.municipality === filterMunicipality;
    const matchesType = filterType === 'All' || school.type === filterType;
    return matchesMun && matchesType;
  });

  return (
    <section id="schools" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <School className="w-3.5 h-3.5 text-emerald-700" />
            <span>Town of LaSalle and the Town of Amherstburg</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Championing Our Local Schools
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Representing English Public school communities across both the Town of LaSalle and the Town of Amherstburg.
          </p>
        </div>

        {/* Local Priorities Quick Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gecdsb-100 text-gecdsb-900 shrink-0">
              <Bus className="w-4 h-4 text-gecdsb" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Rural & Suburban Busing</h4>
              <p className="text-[11px] text-slate-600">Reliable routes, timely bus alerts, and safe transit.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Skilled Trades & Tech</h4>
              <p className="text-[11px] text-slate-600">State-of-the-art SHSM and STEM pathways.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <BookCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">French Immersion</h4>
              <p className="text-[11px] text-slate-600">Strong continuity from early years to secondary.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gecdsb-100 text-gecdsb-900 shrink-0">
              <ShieldAlert className="w-4 h-4 text-gecdsb" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">School Safety & Climate</h4>
              <p className="text-[11px] text-slate-600">Inclusive, safe, and positive learning spaces.</p>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-gecdsb" />
            <span>Filter by Municipality:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'LaSalle', 'Amherstburg'] as const).map((mun) => (
              <button
                key={mun}
                onClick={() => setFilterMunicipality(mun)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterMunicipality === mun
                    ? 'bg-gecdsb text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {mun === 'All' ? 'All Municipalities' : mun}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {(['All', 'Secondary', 'Elementary'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  filterType === type
                    ? 'bg-slate-800 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {type === 'All' ? 'All Grades' : `${type} Schools`}
              </button>
            ))}
          </div>
        </div>

        {/* Schools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-gecdsb-400 p-6 shadow-xs hover:shadow-md transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      school.municipality === 'LaSalle'
                        ? 'bg-gecdsb-100 text-gecdsb-900 border border-gecdsb-200'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {school.municipality}
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium">
                      {school.grades}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-gecdsb transition-colors">
                    {school.name}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                  {school.type}
                </span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-4">
                <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{school.address}</span>
              </div>

              {/* Special Features Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {school.specialFeatures.map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Community Commitment Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-gecdsb-950 via-gecdsb-900 to-gecdsb-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-gecdsb-800">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Ward Advocacy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold">
              Have a specific question about your child's school?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              I am actively meeting with parents, school councils, and community groups across LaSalle and Amherstburg. Share your school priorities directly with me.
            </p>
          </div>

          <a
            href="#get-involved"
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-md"
          >
            Submit School Question or Concern
          </a>
        </div>

      </div>
    </section>
  );
};
