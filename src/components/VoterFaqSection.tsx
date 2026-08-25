import React, { useState } from 'react';
import { VOTER_FAQS } from '../data/campaignData';
import { HelpCircle, ChevronDown, CheckCircle2, Calendar, Vote, Info, FileQuestion, ExternalLink } from 'lucide-react';

export const VoterFaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Governance & Budget', 'Academics & Well-Being', 'Local Riding', 'Voting & Election'];

  const filteredFaqs = selectedCategory === 'All'
    ? VOTER_FAQS
    : VOTER_FAQS.filter((f) => f.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gecdsb-100 border border-gecdsb-200 text-gecdsb-900 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-gecdsb" />
            <span>Voter Guide & Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Clear information about the GECDSB Trustee election, candidate platform, and how to cast your ballot in LaSalle and Amherstburg.
          </p>
        </div>

        {/* Voting Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gecdsb-100 text-gecdsb-900 flex items-center justify-center">
              <Vote className="w-5 h-5 text-gecdsb" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Who is on your ballot?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When voting in municipal elections in LaSalle or Amherstburg, English Public school supporters receive a separate ballot for GECDSB Trustee.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Check School Support
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ensure you are designated as an <strong>English Public</strong> supporter on VoterLookup.ca so you are eligible to vote for public board trustees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Advance & Online Voting
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Both LaSalle and Amherstburg offer advance polling stations and convenient online/telephone voting options during election periods.
            </p>
          </div>
        </div>

        {/* LaSalle Voter Info Callout */}
        <div className="max-w-4xl mx-auto mb-10 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              For information on eligibility and timeline, visit the LaSalle election page here,{' '}
              <a
                href="https://www.lasalle.ca/town-hall/lasalle-election/voter-information/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-amber-950 hover:text-amber-800 break-all inline-flex items-center gap-0.5"
              >
                https://www.lasalle.ca/town-hall/lasalle-election/voter-information/
                <ExternalLink className="w-3 h-3 inline-block shrink-0 ml-0.5" />
              </a>
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gecdsb text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-colors hover:border-slate-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
                      <FileQuestion className="w-4 h-4 text-gecdsb" />
                    </span>
                    <span className="font-serif font-bold text-base sm:text-lg text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-gecdsb' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-slate-700 leading-relaxed border-t border-slate-100 mt-1">
                    <div className="pt-3">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ask a Question Prompt */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600">
            Have a question not listed here?{' '}
            <a href="#get-involved" className="text-gecdsb hover:text-gecdsb-800 font-bold underline">
              Send a direct question to the campaign team →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
