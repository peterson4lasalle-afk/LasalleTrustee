import React, { useState } from 'react';
import { CandidateProfile, EngagementFormData } from '../types';
import { LOCAL_SCHOOLS, VOTER_FAQS } from '../data/campaignData';
import {
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
  const [activeTab, setActiveTab] = useState<'about' | 'schools' | 'faq'>('about');
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

      {/* Primary Tab Navigation Selector (Bottom) */}
      <div className="rounded-2xl bg-white border border-slate-200 p-2 shadow-xs flex items-center justify-between gap-2 overflow-x-auto text-sm font-semibold">
        <button
          onClick={() => {
            setActiveTab('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'about'
              ? 'bg-gecdsb text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>About Me</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('schools');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'schools'
              ? 'bg-gecdsb text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <School className="w-4 h-4" />
          <span>Our Schools ({LOCAL_SCHOOLS.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('faq');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'faq'
              ? 'bg-gecdsb text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Voter FAQ & Contact</span>
        </button>
      </div>

      {/* Bottom Connect & Action Strip */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="text-xs font-bold uppercase tracking-wider text-gecdsb">
            Connect & Support
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Have questions or want to reach Adam Peterson directly?
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenPrintable}
            className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Platform PDF</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('faq');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg bg-gecdsb hover:bg-gecdsb-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-amber-300" />
            <span>Connect & Contact Candidate</span>
          </button>
        </div>
      </div>

    </div>
  );
};
