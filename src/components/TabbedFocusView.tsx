import React, { useState } from 'react';
import { CandidateProfile, EngagementFormData } from '../types';
import { CAMPAIGN_PILLARS, LOCAL_SCHOOLS, VOTER_FAQS } from '../data/campaignData';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Vote,
  FileText,
  HelpCircle,
  School,
  User,
  Phone,
  Mail,
  Send,
  Sparkles,
  ChevronRight,
  BookOpen,
  Briefcase,
  Compass
} from 'lucide-react';

interface TabbedFocusViewProps {
  candidate: CandidateProfile;
  onOpenPrintable: () => void;
  onOpenCustomizer: () => void;
}

export const TabbedFocusView: React.FC<TabbedFocusViewProps> = ({
  candidate,
  onOpenPrintable,
  onOpenCustomizer,
}) => {
  const [activeTab, setActiveTab] = useState<'platform' | 'about' | 'schools' | 'faq'>('platform');
  const [selectedPillarIndex, setSelectedPillarIndex] = useState(0);
  const [selectedMun, setSelectedMun] = useState<'All' | 'LaSalle' | 'Amherstburg'>('All');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Form State
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Concise Candidate Strip with Headshot */}
      <div className="rounded-2xl bg-gecdsb-950 text-white p-5 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 border border-gecdsb-800">
        <div className="flex items-center gap-4">
          <img
            src={candidate.photoUrl || "/candidate-headshot.jpg"}
            alt={candidate.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-amber-400 shadow-lg shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/candidate-headshot.jpg';
            }}
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gecdsb-800 text-amber-300 text-[11px] font-bold">
              <MapPin className="w-3 h-3" />
              Peterson for Trustee • {candidate.riding}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {candidate.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-gecdsb-100 italic">
              "{candidate.slogan}"
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
          <button
            onClick={onOpenPrintable}
            className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Platform PDF</span>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className="px-3.5 py-2 rounded-lg bg-gecdsb hover:bg-gecdsb-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-amber-300" />
            <span>Contact Candidate</span>
          </button>
        </div>
      </div>

      {/* Primary Tab Navigation Selector */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('platform')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'platform'
              ? 'border-gecdsb text-gecdsb bg-gecdsb-50/70 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>3-Pillar Platform</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'about'
              ? 'border-gecdsb text-gecdsb bg-gecdsb-50/70 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>About Me & Why I Am Running</span>
        </button>

        <button
          onClick={() => setActiveTab('schools')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'schools'
              ? 'border-gecdsb text-gecdsb bg-gecdsb-50/70 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <School className="w-4 h-4" />
          <span>Our Schools ({LOCAL_SCHOOLS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('faq')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'faq'
              ? 'border-gecdsb text-gecdsb bg-gecdsb-50/70 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Voter FAQ & Contact</span>
        </button>
      </div>

      {/* TAB CONTENT 1: PLATFORM */}
      {activeTab === 'platform' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CAMPAIGN_PILLARS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelectedPillarIndex(i)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedPillarIndex === i
                    ? 'bg-gecdsb text-white border-gecdsb shadow-md'
                    : 'bg-white text-slate-900 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                  Pillar {p.number}
                </div>
                <h3 className="font-bold text-base leading-snug">{p.title}</h3>
                <p className={`text-xs mt-1 line-clamp-2 ${selectedPillarIndex === i ? 'text-gecdsb-100' : 'text-slate-500'}`}>
                  {p.tagline}
                </p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-gecdsb tracking-wider">
                  Detailed Commitments
                </span>
                <h2 className="text-xl font-serif font-bold text-slate-900">
                  Pillar {activePillar.number}: {activePillar.title}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-gecdsb-100 text-gecdsb-900 text-xs font-bold">
                {activePillar.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activePillar.subPillars.map((sub, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-start">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-gecdsb text-white text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {sub.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: ABOUT ME & WHY I AM RUNNING */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* About Me Narrative */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-gecdsb-100 text-gecdsb-900">
                  <User className="w-4 h-4 text-gecdsb" />
                </div>
                <h2 className="text-xl font-serif font-bold text-slate-900">
                  About Me
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {candidate.riding}
              </span>
            </div>

            {/* Photo & Intro Duo */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <img
                src={candidate.photoUrl || "/candidate-headshot.jpg"}
                alt={candidate.fullName}
                className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl object-cover object-top border-2 border-amber-400 shadow-sm shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/candidate-headshot.jpg';
                }}
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1 text-xs text-slate-700">
                <h3 className="font-bold text-slate-900 text-sm">{candidate.fullName}</h3>
                <p className="text-gecdsb font-medium">{candidate.schoolBoard}</p>
                <p className="text-slate-600">Candidate for the {candidate.riding}</p>
                <div className="pt-1 flex items-center gap-1 text-slate-800 font-medium">
                  <Mail className="w-3.5 h-3.5 text-gecdsb shrink-0" />
                  <a href={`mailto:${candidate.email}`} className="text-gecdsb hover:underline">{candidate.email}</a>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900">
                {candidate.bioIntro}
              </p>
              {candidate.extendedBio.map((paragraph, idx) => (
                <p key={idx} className="text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Why I Am Running Box */}
          <div className="lg:col-span-5 rounded-2xl bg-gecdsb-950 text-white p-6 shadow-md space-y-4 flex flex-col justify-between border border-gecdsb-800">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gecdsb-800 text-amber-300 text-xs font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>Mission for our School Board</span>
              </div>

              <h3 className="text-lg font-serif font-bold text-white">
                Why I Am Running
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  "I’m running to make student success the priority. The school board needs steady leadership, clear communication, collaborative and supportive environments with a practical focus"
                </p>
                <p>
                  Our classrooms need focus on foundational academics, safe and supportive school environments, and consensus-driven governance that respects teachers, parents, and community resources.
                </p>
              </div>

              <div className="pt-3 border-t border-gecdsb-800 space-y-1.5 text-xs text-gecdsb-200">
                <div><strong className="text-white">Email:</strong> {candidate.email}</div>
                <div><strong className="text-white">Riding:</strong> {candidate.riding}</div>
                <div><strong className="text-white">School Board:</strong> Greater Essex County District School Board</div>
              </div>
            </div>

            <button
              onClick={onOpenCustomizer}
              className="w-full py-2 rounded-lg bg-gecdsb-900 border border-gecdsb-700 text-slate-200 hover:bg-gecdsb-800 text-xs font-semibold"
            >
              Edit Candidate Details
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: SCHOOLS */}
      {activeTab === 'schools' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900">
                LaSalle & Amherstburg Public Schools
              </h2>
              <p className="text-xs text-slate-500">
                GECDSB facilities serving our local elementary and secondary students
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {(['All', 'LaSalle', 'Amherstburg'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMun(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedMun === m
                      ? 'bg-gecdsb text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredSchools.map((school) => (
              <div key={school.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{school.name}</span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-gecdsb">
                    {school.municipality}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {school.type} • {school.grades}
                </div>
                <p className="text-xs text-slate-600">
                  {school.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: VOTER FAQ & CONNECT */}
      {activeTab === 'faq' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Direct Contact Form */}
          <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-slate-900">
                Connect with Adam Peterson
              </h2>
              <span className="text-xs font-bold bg-gecdsb-100 text-gecdsb-900 px-2.5 py-0.5 rounded-full">
                Get in Touch
              </span>
            </div>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Message Received!</h3>
                <p className="text-xs text-slate-600">Thank you for sharing your thoughts on public education in LaSalle and Amherstburg.</p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-gecdsb font-bold underline pt-2"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                    placeholder="Your Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Municipality</label>
                    <select
                      value={formData.municipality}
                      onChange={(e) => setFormData({ ...formData, municipality: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                    >
                      <option value="LaSalle">LaSalle</option>
                      <option value="Amherstburg">Amherstburg</option>
                      <option value="Other Essex County">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Question or Message</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                    placeholder="Share your questions, ideas, or feedback for GECDSB schools..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gecdsb hover:bg-gecdsb-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Send Message to Candidate</span>
                </button>
              </form>
            )}
          </div>

          {/* Voter FAQ Accordion */}
          <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-2">
              Voter Frequently Asked Questions
            </h3>
            <div className="space-y-2 text-xs">
              {VOTER_FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div key={faq.id} className="rounded-lg border border-slate-200 overflow-hidden bg-slate-50/60">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full text-left p-3 font-bold text-slate-900 flex items-center justify-between gap-2 hover:bg-slate-100 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronRight className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-90 text-gecdsb' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 pt-1 text-slate-600 border-t border-slate-200 bg-white leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
