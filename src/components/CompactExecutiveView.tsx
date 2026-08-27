import React, { useState } from 'react';
import { CandidateProfile, Pillar, SchoolInfo, FaqItem, EditorTabId } from '../types';
import { CAMPAIGN_PILLARS, LOCAL_SCHOOLS, VOTER_FAQS } from '../data/campaignData';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  HeartHandshake,
  FileText,
  HelpCircle,
  School,
  ChevronRight,
  Sparkles,
  Mail,
  Award,
  BookOpen,
  Briefcase,
  ExternalLink,
  Edit3
} from 'lucide-react';

interface CompactExecutiveViewProps {
  candidate: CandidateProfile;
  pillars?: Pillar[];
  schools?: SchoolInfo[];
  faqs?: FaqItem[];
  onOpenPrintable: () => void;
  onOpenCustomizer: (initialTab?: EditorTabId) => void;
}

export const CompactExecutiveView: React.FC<CompactExecutiveViewProps> = ({
  candidate,
  pillars = CAMPAIGN_PILLARS,
  schools = LOCAL_SCHOOLS,
  faqs = VOTER_FAQS,
  onOpenPrintable,
  onOpenCustomizer,
}) => {
  const [selectedPillarIndex, setSelectedPillarIndex] = useState(0);
  const [selectedMun, setSelectedMun] = useState<'All' | 'LaSalle' | 'Amherstburg'>('All');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const activePillar = pillars[selectedPillarIndex] || pillars[0];

  const filteredSchools = selectedMun === 'All'
    ? schools
    : schools.filter((s) => s.municipality === selectedMun);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. TOP HERO BENTO: Candidate Profile & About Me (Full Width) */}
      <div id="about" className="scroll-mt-24 rounded-2xl bg-gradient-to-br from-gecdsb-950 via-gecdsb-900 to-gecdsb-950 text-white p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-5 border border-gecdsb-800">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-1">
            <img
              src={candidate.photoUrl || "./candidate-headshot.jpg"}
              alt={candidate.fullName}
              className="w-28 h-36 sm:w-32 sm:h-40 rounded-2xl object-cover object-center border-2 border-amber-400 shadow-md shrink-0 bg-gecdsb-950"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = './candidate-headshot.jpg';
              }}
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
                {candidate.fullName}
              </h1>
              <p className="text-base sm:text-lg text-amber-300 font-medium italic">
                "{candidate.slogan}"
              </p>
            </div>
          </div>

          {/* Candidate Narrative (About Me Core) */}
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-gecdsb-800/80 pt-4">
            <p className="font-semibold text-white text-sm sm:text-base leading-snug">
              {candidate.bioIntro}
            </p>
            {candidate.extendedBio.map((paragraph, i) => (
              <p key={i} className="text-gecdsb-100">
                {paragraph}
              </p>
            ))}

            {/* Why I am running highlights */}
            <div className="pt-2 space-y-2.5">
              <h4 className="font-serif font-bold text-amber-300 text-sm">
                Why I am running for Trustee with the Greater Essex County District School Board:
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {candidate.whyRunningHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gecdsb-900/90 border border-gecdsb-700/80 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-bold block">{item.title}:</strong>
                      <span className="text-slate-300">{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing Statement Callout with bolded text */}
            <div className="p-4 rounded-xl bg-gecdsb-800/90 border border-gecdsb-700 text-white space-y-2 mt-3">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Our schools need leadership that balances deep personal dedication with practical, real-world experience.
              </p>
              <p className="text-xs sm:text-sm font-bold text-amber-300 leading-relaxed pt-0.5">
                Vote for strong schools, accountable leadership, and a brighter future for our children.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4 border-t border-gecdsb-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <a href={`mailto:${candidate.email}`} className="hover:text-amber-300 transition-colors">{candidate.email}</a>
            </span>
            <span className="text-gecdsb-200">
              {candidate.riding}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPrintable}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Event Flyer & Platform PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE 3-PILLAR INTERACTIVE COMPACT SUITE */}
      <div id="pillars" className="scroll-mt-24 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gecdsb">
              Core Platform
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              The 3-Pillar Framework
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Click any pillar to see concrete actions & measurable goals
          </p>
        </div>

        {/* Pillar Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pillars.map((pillar, idx) => {
            const isSelected = selectedPillarIndex === idx;
            const icons = [
              <GraduationCap key={1} className="w-4 h-4" />,
              <Users key={2} className="w-4 h-4" />,
              <ShieldCheck key={3} className="w-4 h-4" />
            ];

            return (
              <button
                key={pillar.id || idx}
                onClick={() => setSelectedPillarIndex(idx)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gecdsb text-white border-gecdsb shadow-md ring-2 ring-gecdsb/20'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {icons[idx % icons.length]}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>
                    Pillar {pillar.number || idx + 1}
                  </span>
                </div>
                <h3 className="font-bold text-sm leading-snug">
                  {pillar.title}
                </h3>
                <p className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-gecdsb-100' : 'text-slate-500'}`}>
                  {pillar.badge}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep-Dive Box (Dense & Clean) */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                Pillar {activePillar.number}: {activePillar.title}
              </h3>
              <p className="text-xs text-slate-600 italic">
                "{activePillar.tagline}"
              </p>
            </div>
            <span className="text-xs font-semibold text-gecdsb-900 bg-gecdsb-100 px-2.5 py-1 rounded-md">
              {activePillar.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {activePillar.subPillars.map((sub, i) => (
              <div key={i} className="bg-white rounded-lg p-3.5 border border-slate-200 space-y-2 flex flex-col justify-start">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-5 h-5 rounded-full bg-gecdsb text-white text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900">
                      {sub.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {sub.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. TWO-COLUMN SPLIT: Local Schools Spotlight + Voter FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LaSalle & Amherstburg Schools Card */}
        <div id="schools" className="scroll-mt-24 lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-900">
                <School className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                  Our LaSalle & Amherstburg Schools
                </h2>
              </div>
            </div>

            {/* Municipality Filter Pills */}
            <div className="flex items-center gap-1">
              {(['All', 'LaSalle', 'Amherstburg'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMun(m)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    selectedMun === m
                      ? 'bg-emerald-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
            {filteredSchools.map((s) => (
              <div key={s.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 truncate">{s.name}</span>
                  <span className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                    {s.municipality}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">{s.grades} • {s.address}</div>
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between">
            <span>Advocating for rural busing safety, skilled trades & equitable facility upgrades.</span>
          </div>
        </div>

        {/* Voter FAQ & Election Guide */}
        <div id="faq" className="scroll-mt-24 lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-amber-100 text-amber-900">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                  Voter Guide & FAQ
                </h2>
                <p className="text-xs text-slate-500">Quick answers for electors</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {faqs.slice(0, 4).map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="rounded-lg border border-slate-200 overflow-hidden bg-slate-50/60">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-2.5 font-bold text-slate-900 flex items-center justify-between gap-2 hover:bg-slate-100 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-90 text-blue-700' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-2.5 pb-2.5 pt-1 text-[11px] text-slate-600 border-t border-slate-200 bg-white leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
            <span>
              For information on eligibility and timeline, visit the LaSalle election page here,{' '}
              <a
                href="https://www.lasalle.ca/town-hall/lasalle-election/voter-information/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-amber-950 hover:text-amber-800 break-all inline-flex items-center gap-0.5"
              >
                https://www.lasalle.ca/town-hall/lasalle-election/voter-information/
                <ExternalLink className="w-3 h-3 inline-block shrink-0 ml-0.5" />
              </a>
            </span>
          </div>
        </div>

      </div>

      {/* 4. CONNECT & DIRECT CONTACT SECTION */}
      <div id="contact" className="scroll-mt-24 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gecdsb-100 text-gecdsb-900">
                <Mail className="w-4 h-4 text-gecdsb" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gecdsb">
                Direct Contact
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Connect with Adam Peterson
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Have questions regarding public school board priorities, facility investments, or student support in LaSalle & Amherstburg? Reach out directly via email.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <a
              href={`mailto:${candidate.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gecdsb hover:bg-gecdsb-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4 text-amber-300" />
              <span>{candidate.email}</span>
            </a>
            <button
              onClick={onOpenPrintable}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Print 1-Pager (PDF)</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
