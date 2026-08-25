import React, { useState } from 'react';
import { CandidateProfile, EngagementFormData } from '../types';
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
  Send,
  Sparkles,
  Phone,
  Mail,
  Award,
  BookOpen,
  Briefcase,
  ExternalLink
} from 'lucide-react';

interface CompactExecutiveViewProps {
  candidate: CandidateProfile;
  onOpenPrintable: () => void;
  onOpenCustomizer: () => void;
}

export const CompactExecutiveView: React.FC<CompactExecutiveViewProps> = ({
  candidate,
  onOpenPrintable,
  onOpenCustomizer,
}) => {
  const [selectedPillarIndex, setSelectedPillarIndex] = useState(0);
  const [selectedMun, setSelectedMun] = useState<'All' | 'LaSalle' | 'Amherstburg'>('All');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Form State for Contact & Questions
  const [formData, setFormData] = useState<EngagementFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    municipality: 'LaSalle',
    postalCode: '',
    canVolunteer: false,
    volunteerInterests: [],
    message: '',
    endorsementPermission: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const activePillar = CAMPAIGN_PILLARS[selectedPillarIndex];

  const filteredSchools = selectedMun === 'All'
    ? LOCAL_SCHOOLS
    : LOCAL_SCHOOLS.filter((s) => s.municipality === selectedMun);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. TOP HERO BENTO: Candidate Profile, About Me & Connect Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Main Candidate & About Me Card */}
        <div className="lg:col-span-8 rounded-2xl bg-gradient-to-br from-gecdsb-950 via-gecdsb-900 to-gecdsb-950 text-white p-6 sm:p-7 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-5 border border-gecdsb-800">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gecdsb-800/90 border border-gecdsb-600/60 text-xs font-bold text-amber-300">
                <MapPin className="w-3.5 h-3.5" />
                Peterson for Trustee • {candidate.riding}
              </span>
              <span className="text-xs text-gecdsb-200 font-medium">
                English Public School Board
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
              <img
                src={candidate.photoUrl || "/candidate-headshot.jpg"}
                alt={candidate.fullName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-amber-400 shadow-md shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/candidate-headshot.jpg';
                }}
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
                  {candidate.fullName}
                </h1>
                <p className="text-base text-amber-300 font-medium italic">
                  "{candidate.slogan}"
                </p>
              </div>
            </div>

            {/* Candidate Narrative (About Me Core) */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-gecdsb-800/80 pt-3">
              <p>
                {candidate.bioIntro}
              </p>
              {candidate.extendedBio.map((paragraph, i) => (
                <p key={i} className="text-gecdsb-100">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Experience & Qualification Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1.5 bg-gecdsb-950/80 px-2.5 py-1.5 rounded-lg border border-gecdsb-800 text-slate-200">
                <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Teaching: Algonquin & St. Clair</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gecdsb-950/80 px-2.5 py-1.5 rounded-lg border border-gecdsb-800 text-slate-200">
                <Briefcase className="w-3.5 h-3.5 text-gecdsb-300 shrink-0" />
                <span>MBA & Management Background</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gecdsb-950/80 px-2.5 py-1.5 rounded-lg border border-gecdsb-800 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Responsible Resource Stewardship</span>
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
            <button
              onClick={onOpenPrintable}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Print 1-Page Platform</span>
            </button>
          </div>
        </div>

        {/* Connect / Ask a Question Box */}
        <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-gecdsb-100 text-gecdsb-900">
                  <Mail className="w-4 h-4 text-gecdsb" />
                </div>
                <h2 className="font-serif font-bold text-slate-900 text-base">
                  Connect with Adam
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gecdsb-100 text-gecdsb-900 px-2 py-0.5 rounded-full">
                Direct Contact
              </span>
            </div>

            {formSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Thank You for Reaching Out!</h3>
                <p className="text-xs text-slate-600">Your message has been sent to Adam Peterson's campaign team.</p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-gecdsb font-bold underline pt-1"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-2.5 text-xs">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gecdsb"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gecdsb"
                  />
                  <select
                    value={formData.municipality}
                    onChange={(e) => setFormData({ ...formData, municipality: e.target.value as any })}
                    className="w-full px-2 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gecdsb"
                  >
                    <option value="LaSalle">LaSalle</option>
                    <option value="Amherstburg">Amherstburg</option>
                    <option value="Other Essex County">Other</option>
                  </select>
                </div>
                <div>
                  <textarea
                    rows={2}
                    placeholder="Ask a question or share educational priorities..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gecdsb"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gecdsb hover:bg-gecdsb-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>Send Message to Candidate</span>
                </button>
              </form>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Independent Trustee Candidate</span>
            <button onClick={onOpenCustomizer} className="text-gecdsb hover:underline font-semibold">
              Edit profile info
            </button>
          </div>
        </div>

      </div>

      {/* 2. THE 3-PILLAR INTERACTIVE COMPACT SUITE */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-5">
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
          {CAMPAIGN_PILLARS.map((pillar, idx) => {
            const isSelected = selectedPillarIndex === idx;
            const icons = [
              <GraduationCap key={1} className="w-4 h-4" />,
              <Users key={2} className="w-4 h-4" />,
              <ShieldCheck key={3} className="w-4 h-4" />
            ];

            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarIndex(idx)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gecdsb text-white border-gecdsb shadow-md ring-2 ring-gecdsb/20'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {icons[idx]}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>
                    Pillar {pillar.number}
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
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-900">
                <School className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                  Our LaSalle & Amherstburg Schools
                </h2>
                <p className="text-xs text-slate-500">GECDSB riding facilities & priorities</p>
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
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
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
            {VOTER_FAQS.slice(0, 4).map((faq) => {
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

      {/* 4. BOTTOM COMPACT BAR */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-white">Peterson for Trustee</span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">{candidate.riding}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPrintable}
            className="text-amber-300 hover:text-white underline font-semibold cursor-pointer"
          >
            Platform 1-Pager PDF
          </button>
          <a
            href={`mailto:${candidate.email}`}
            className="text-slate-300 hover:text-white underline font-semibold"
          >
            Email Campaign
          </a>
        </div>
      </div>

    </div>
  );
};
