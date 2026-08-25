import React, { useState } from 'react';
import { CandidateProfile, EngagementFormData } from '../types';
import { HeartHandshake, Mail, Send, CheckCircle2, FileText, MapPin, Phone, Sparkles, MessageSquare, Users2 } from 'lucide-react';

interface GetInvolvedProps {
  candidate: CandidateProfile;
  onOpenPrintable: () => void;
}

export const GetInvolvedSection: React.FC<GetInvolvedProps> = ({ candidate, onOpenPrintable }) => {
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

  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'volunteer' | 'contact'>('volunteer');

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.volunteerInterests.includes(interest);
      return {
        ...prev,
        volunteerInterests: exists
          ? prev.volunteerInterests.filter((i) => i !== interest)
          : [...prev.volunteerInterests, interest],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="get-involved" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gecdsb-100 border border-gecdsb-200 text-gecdsb-900 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5 text-gecdsb" />
            <span>Connect & Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Connect with {candidate.fullName}'s Campaign
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Have questions about local schools, want to volunteer, or wish to share your priorities for LaSalle and Amherstburg? We would love to hear from you.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Ways to Support & 1-Pager Platform Download */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Action Selector Cards */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setActiveTab('volunteer');
                  setFormData((p) => ({ ...p, canVolunteer: true }));
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 cursor-pointer ${
                  activeTab === 'volunteer'
                    ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-600/30'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="p-2.5 rounded-lg bg-emerald-700 text-white shrink-0">
                  <Users2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Volunteer with Team {candidate.preferredName}</h4>
                  <p className="text-xs text-slate-600">Canvassing, community outreach, hosting coffee meets, or digital support.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 cursor-pointer ${
                  activeTab === 'contact'
                    ? 'bg-gecdsb-50 border-gecdsb ring-1 ring-gecdsb/30'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="p-2.5 rounded-lg bg-gecdsb text-white shrink-0">
                  <MessageSquare className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Ask a Question or Share Feedback</h4>
                  <p className="text-xs text-slate-600">Send educational priorities or questions directly to {candidate.fullName}.</p>
                </div>
              </button>
            </div>

            {/* Printable Platform 1-Pager Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gecdsb-950 via-gecdsb-900 to-gecdsb-950 text-white space-y-4 shadow-lg border border-gecdsb-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Campaign Literature</span>
              </div>
              <h4 className="text-lg font-serif font-bold text-white">
                Download or Print the Official 1-Page Platform
              </h4>
              <p className="text-xs text-gecdsb-100 leading-relaxed">
                A clean, formatted overview of the 3 pillars, candidate background, and why {candidate.preferredName} is running. Perfect to review or share with neighbors and family.
              </p>
              <button
                onClick={onOpenPrintable}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Open Printable 1-Pager Platform</span>
              </button>
            </div>

            {/* Contact Information Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <h5 className="font-bold text-slate-900 text-sm">Direct Campaign Contacts:</h5>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gecdsb shrink-0" />
                <a href={`mailto:${candidate.email}`} className="text-gecdsb hover:underline">{candidate.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gecdsb shrink-0" />
                <span>{candidate.location}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Thank you for reaching out!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    We have received your details. {candidate.fullName}'s campaign team will be in touch shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
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
                    }}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-gecdsb text-white text-xs font-bold hover:bg-gecdsb-800 transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      {activeTab === 'volunteer' ? 'Volunteer with Team ' + candidate.preferredName : 'Send a Message or Question'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Bringing student-centered leadership to LaSalle and Amherstburg.
                    </p>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-gecdsb"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-gecdsb"
                      />
                    </div>
                  </div>

                  {/* Phone & Municipality */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(519) 555-0123"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-gecdsb"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Municipality
                      </label>
                      <select
                        value={formData.municipality}
                        onChange={(e) => setFormData({ ...formData, municipality: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-gecdsb"
                      >
                        <option value="LaSalle">Town of LaSalle</option>
                        <option value="Amherstburg">Town of Amherstburg</option>
                        <option value="Other Essex County">Other (Essex County)</option>
                      </select>
                    </div>
                  </div>

                  {/* Volunteer Interest Checkboxes */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                    <label className="flex items-center gap-3 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.canVolunteer}
                        onChange={(e) => setFormData({ ...formData, canVolunteer: e.target.checked })}
                        className="w-4 h-4 rounded text-gecdsb focus:ring-gecdsb"
                      />
                      <span>I would like to volunteer on the campaign</span>
                    </label>

                    {formData.canVolunteer && (
                      <div className="pt-2 pl-7 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {['Canvassing & Community Outreach', 'Phone & Email Outreach', 'Hosting a Meet & Greet', 'Digital / Social Media Sharing'].map((interest) => (
                          <label key={interest} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.volunteerInterests.includes(interest)}
                              onChange={() => handleInterestToggle(interest)}
                              className="rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>{interest}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message / Question */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Message, Question or School Priority
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share what educational issues matter most to your family or local school..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-gecdsb"
                    />
                  </div>

                  {/* Endorsement Permission */}
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.endorsementPermission}
                      onChange={(e) => setFormData({ ...formData, endorsementPermission: e.target.checked })}
                      className="w-4 h-4 rounded text-gecdsb focus:ring-gecdsb mt-0.5"
                    />
                    <span>You may list my name as a community supporter of {candidate.fullName}</span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gecdsb hover:bg-gecdsb-800 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Send Message / Join Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
