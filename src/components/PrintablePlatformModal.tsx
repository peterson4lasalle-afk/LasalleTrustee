import React, { useState, useEffect, useRef } from 'react';
import { CandidateProfile, Pillar } from '../types';
import { CAMPAIGN_PILLARS } from '../data/campaignData';
import {
  X,
  Printer,
  CheckCircle2,
  MapPin,
  Mail,
  GraduationCap,
  Users,
  ShieldCheck,
  Sparkles,
  Download,
  Share2,
  Copy,
  Check,
  Facebook,
  FileText,
  Smartphone,
  Layers,
  Award,
  Vote,
  Send,
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export type FlyerFormat = 'compact' | 'full' | 'facebook';

interface PrintablePlatformModalProps {
  candidate: CandidateProfile;
  pillars?: Pillar[];
  isOpen: boolean;
  onClose: () => void;
  initialFormat?: FlyerFormat;
}

export const PrintablePlatformModal: React.FC<PrintablePlatformModalProps> = ({
  candidate,
  pillars = CAMPAIGN_PILLARS,
  isOpen,
  onClose,
  initialFormat = 'compact',
}) => {
  const [activeFormat, setActiveFormat] = useState<FlyerFormat>(initialFormat);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Dedicated refs for high-precision capture
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync initial format when opened
  useEffect(() => {
    if (isOpen && initialFormat) {
      setActiveFormat(initialFormat);
    }
  }, [isOpen, initialFormat]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);

      if (!cardRef.current) return;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const orientation = activeFormat === 'full' ? 'landscape' : 'portrait';

      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const margin = 8;
      const maxPdfWidth = pageWidth - margin * 2;
      const maxPdfHeight = pageHeight - margin * 2;

      const widthRatio = maxPdfWidth / canvasWidth;
      const heightRatio = maxPdfHeight / canvasHeight;
      const ratio = Math.min(widthRatio, heightRatio);

      const finalWidth = canvasWidth * ratio;
      const finalHeight = canvasHeight * ratio;

      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      pdf.save(`${candidate.fullName.toLowerCase().replace(/\s+/g, '-')}-${activeFormat}-platform.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsExportingImage(true);
      const candidateSlug = candidate.fullName.toLowerCase().replace(/\s+/g, '-');

      if (!cardRef.current) return;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${candidateSlug}-${activeFormat}-post.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error('Error generating image export:', err);
    } finally {
      setIsExportingImage(false);
    }
  };

  const handleCopyCaption = () => {
    const caption = `🗳️ Proud to share my platform as candidate for Public School Trustee representing LaSalle and Amherstburg (GECDSB).\n\nAs a college professor, educator family member, and public school parent, I am focused on:\n✅ Academic Success & Classroom Support\n✅ Safe, Modern & Well-Maintained Schools\n✅ Transparent Fiscal Stewardship & Parent Voice\n\nLearn more or get in touch: ${candidate.email}\n\n#GECDSB #LaSalle #Amherstburg #TrusteeElection #VotePeterson #PublicEducation #StudentSuccess`;

    navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0 print:bg-white print:static print:overflow-visible"
    >
      {/* Print Orientation Override Style Tag */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            @page {
              size: ${activeFormat === 'full' ? 'landscape' : 'portrait'};
              margin: 6mm;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `,
        }}
      />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:border-none print:w-full print:max-w-none transition-all duration-200 my-auto flex flex-col max-h-[92vh] print:max-h-none">
        
        {/* MODAL TOP TOOLBAR: Format Switcher & Actions (Hidden during print) */}
        <div className="bg-slate-900 text-white p-3 sm:px-6 sm:py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Share2 className="w-4 h-4" />
              <span>Campaign Platform Flyer Suite</span>
            </span>
          </div>

          {/* Format Selector Tabs */}
          <div className="flex flex-wrap items-center bg-slate-800 p-1 rounded-xl border border-slate-700 gap-1">
            <button
              onClick={() => setActiveFormat('compact')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFormat === 'compact'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Compact Handout (PDF)</span>
            </button>

            <button
              onClick={() => setActiveFormat('full')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFormat === 'full'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Flyer (Landscape)</span>
            </button>

            <button
              onClick={() => setActiveFormat('facebook')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFormat === 'facebook'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook Post (Square)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors ml-auto sm:ml-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PREVIEW SCROLLABLE CONTAINER */}
        <div className="p-3 sm:p-6 overflow-y-auto bg-slate-100/80 flex-1 flex flex-col items-center justify-start print:p-0 print:bg-white print:overflow-visible space-y-6">
          
          {/* ======================================================== */}
          {/* FORMAT 1: FACEBOOK POST GRAPHIC (Optimized 1:1 Square)   */}
          {/* ======================================================== */}
          {activeFormat === 'facebook' && (
            <div
              ref={cardRef}
              id="facebook-social-post-graphic"
              className="w-full max-w-xl bg-white rounded-2xl border-4 border-slate-900 shadow-xl overflow-hidden flex flex-col text-slate-900 print:shadow-none print:max-w-none print:border-2"
            >
              {/* Top Facebook Header Banner */}
              <div className="bg-linear-to-r from-gecdsb-950 via-gecdsb-900 to-gecdsb-800 text-white p-4 sm:p-5 border-b-4 border-amber-400">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                    <Vote className="w-3 h-3" />
                    Trustee Candidate
                  </div>
                  <span className="text-gecdsb-200 text-[11px] font-semibold tracking-wide uppercase">
                    GECDSB Public Schools
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Candidate Headshot */}
                  <div className="relative shrink-0">
                    <img
                      src={candidate.photoUrl || "./candidate-headshot.jpg"}
                      alt={candidate.fullName}
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl object-cover border-2 border-amber-400 shadow-md bg-gecdsb-950"
                      style={{ objectPosition: 'center 10%' }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = './candidate-headshot.jpg';
                      }}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Candidate Identity */}
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
                      {candidate.fullName}
                    </h2>
                    <p className="text-amber-300 font-bold text-xs sm:text-sm mt-0.5">
                      Trustee for {candidate.riding}
                    </p>
                    <p className="text-gecdsb-200 text-xs italic mt-1 leading-snug">
                      "{candidate.slogan}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Background Tags */}
              <div className="bg-gecdsb-50 px-4 py-2 border-b border-gecdsb-100 flex flex-wrap items-center justify-around gap-2 text-[11px] font-bold text-gecdsb-900">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" /> College Professor
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 20+ Years Experience
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-gecdsb" /> Public School Parent
                </span>
              </div>

              {/* Core 3 Pillars for Facebook Post */}
              <div className="p-4 sm:p-5 space-y-3 bg-white">
                <div className="text-center mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                    Three Core Commitments to Our Community
                  </span>
                </div>

                {/* Pillar 1 */}
                {pillars[0] && (
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-8 h-8 rounded-lg bg-gecdsb text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                        {pillars[0].title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                        {pillars[0].tagline}
                      </p>
                    </div>
                  </div>
                )}

                {/* Pillar 2 */}
                {pillars[1] && (
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                        {pillars[1].title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                        {pillars[1].tagline}
                      </p>
                    </div>
                  </div>
                )}

                {/* Pillar 3 */}
                {pillars[2] && (
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                        {pillars[2].title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                        {pillars[2].tagline}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Social Callout Strip */}
              <div className="bg-slate-950 text-white px-4 py-3 flex items-center justify-between border-t-2 border-amber-400 text-xs">
                <div>
                  <span className="font-black text-amber-400 block tracking-wider uppercase text-[11px]">
                    VOTE PETERSON FOR TRUSTEE
                  </span>
                  <span className="text-[10px] text-slate-300">
                    LaSalle & Amherstburg • Greater Essex County
                  </span>
                </div>

                <div className="text-right text-[11px] font-semibold text-gecdsb-200">
                  <span className="block text-white">{candidate.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* FORMAT 2: COMPACT 1-PAGE HANDOUT / PORTRAIT PDF          */}
          {/* ======================================================== */}
          {activeFormat === 'compact' && (
            <div
              ref={cardRef}
              id="compact-handout-graphic"
              className="w-full max-w-xl bg-white rounded-2xl border-2 border-slate-900 shadow-xl overflow-hidden flex flex-col text-slate-900 print:shadow-none print:max-w-none print:border"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-gecdsb-950 via-gecdsb-900 to-gecdsb-800 text-white p-5 border-b-4 border-amber-400">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gecdsb-700 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
                    <Sparkles className="w-3 h-3" /> Greater Essex County District School Board
                  </span>
                  <span className="text-xs font-bold text-amber-400">Public School Trustee</span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={candidate.photoUrl || "./candidate-headshot.jpg"}
                    alt={candidate.fullName}
                    className="w-24 h-32 rounded-xl object-cover border-2 border-amber-400 shadow-md bg-gecdsb-950 shrink-0"
                    style={{ objectPosition: 'center 10%' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = './candidate-headshot.jpg';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h1 className="text-3xl font-serif font-black text-white leading-tight">
                      {candidate.fullName}
                    </h1>
                    <p className="text-sm font-bold text-amber-300">
                      Candidate for Trustee • {candidate.riding}
                    </p>
                    <p className="text-xs text-gecdsb-200 italic mt-1">
                      "{candidate.slogan}"
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-white bg-slate-900/60 px-3 py-1 rounded-lg w-fit border border-white/10">
                      <Mail className="w-3.5 h-3.5 text-amber-300" />
                      <span>{candidate.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Qualifications Quick Grid */}
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Experience & Background
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-800">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>College Professor</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>20 Years Experience</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Educator Family</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Public School Parent</span>
                  </div>
                </div>
              </div>

              {/* 3 Core Platform Pillars */}
              <div className="p-4 sm:p-5 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Campaign Platform & Priorities
                </h3>

                {pillars.map((pillar, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-3 bg-white shadow-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-gecdsb text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="font-serif font-bold text-slate-900 text-xs sm:text-sm">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-600 italic mb-2 pl-7">
                      {pillar.tagline}
                    </p>
                    <ul className="space-y-1 pl-7 text-[10.5px] text-slate-700">
                      {pillar.subPillars.slice(0, 2).map((sub, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1">
                          <span className="text-gecdsb font-bold">•</span>
                          <span><strong>{sub.title}:</strong> {sub.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-slate-950 text-white p-3 text-center border-t-2 border-amber-400">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Vote Aaron Peterson • Trustee for LaSalle & Amherstburg
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Sandwich West, Sandwich Secondary, Sandwich West PS, Malden Central, Western SS, Anderdon & Amherstburg
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* FORMAT 3: FULL EVENT FLYER (Landscape Detailed Format)   */}
          {/* ======================================================== */}
          {activeFormat === 'full' && (
            <div
              ref={cardRef}
              id="full-landscape-flyer-graphic"
              className="w-full max-w-5xl bg-white rounded-2xl border-2 border-slate-900 shadow-md overflow-hidden flex flex-col justify-between select-none print:shadow-none print:max-w-none print:border-none"
            >
              {/* TOP BANNER */}
              <div className="bg-linear-to-r from-gecdsb-950 via-gecdsb-900 to-gecdsb-800 text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-amber-400">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gecdsb-700/80 text-amber-300 text-[11px] font-bold tracking-wider uppercase border border-amber-400/30 mb-1">
                    <Sparkles className="w-3 h-3" />
                    Greater Essex County District School Board
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white leading-none">
                    {candidate.fullName}
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-gecdsb-200 mt-0.5">
                    Candidate for Trustee • {candidate.riding}
                  </p>
                </div>

                <div className="text-center md:text-right bg-slate-900/60 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/15">
                  <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block">
                    VOTE PETERSON FOR TRUSTEE
                  </span>
                  <p className="font-serif italic text-white text-xs sm:text-sm font-medium">
                    "{candidate.slogan}"
                  </p>
                </div>
              </div>

              {/* MAIN BODY */}
              <div className="p-5 sm:p-6 space-y-4 bg-slate-50/60">
                {/* Horizontal Candidate Profile Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-3.5 shrink-0">
                    <div className="relative shrink-0">
                      <img
                        src={candidate.photoUrl || "./candidate-headshot.jpg"}
                        alt={candidate.fullName}
                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-amber-400 shadow-sm"
                        style={{ objectPosition: 'center 10%' }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = './candidate-headshot.jpg';
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-1.5 -right-1.5 bg-gecdsb text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-amber-400 shadow-xs">
                        Trustee
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif font-black text-slate-900 text-base sm:text-lg leading-tight">
                        {candidate.fullName}
                      </h3>
                      <p className="text-[11px] font-bold text-gecdsb-700 uppercase tracking-wide">
                        {candidate.riding}
                      </p>
                      <p className="text-[11px] text-slate-600 italic mt-0.5 max-w-xs leading-tight hidden lg:block">
                        "Focus on classroom success, collaborative leadership, and transparent fiscal stewardship."
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 border-y md:border-y-0 md:border-x border-slate-200 py-2.5 md:py-0 md:px-5 w-full md:w-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>College Professor</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>20 Years Experience</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>Educator Family</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>Public School Parent</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 bg-gecdsb-50 p-2.5 rounded-lg border border-gecdsb-200 text-[11px] text-gecdsb-950 flex flex-col gap-1 w-full md:w-auto">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Mail className="w-3.5 h-3.5 text-gecdsb shrink-0" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 text-[10px]">
                      <MapPin className="w-3.5 h-3.5 text-gecdsb shrink-0" />
                      <span>{candidate.riding}</span>
                    </div>
                  </div>
                </div>

                {/* 3 Pillars in 3 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                  {pillars[0] && (
                    <div className="bg-white rounded-xl border border-gecdsb-200 p-4 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gecdsb"></div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-gecdsb-100 text-gecdsb-800 flex items-center justify-center font-bold text-xs shrink-0">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-gecdsb block">Pillar 1</span>
                            <h4 className="font-serif font-bold text-slate-900 text-sm leading-tight">{pillars[0].title}</h4>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-600 italic leading-snug mb-3 pb-2 border-b border-slate-100">
                          {pillars[0].tagline}
                        </p>
                        <ul className="space-y-2 text-xs text-slate-800">
                          {pillars[0].subPillars.map((sub, i) => (
                            <li key={i} className="space-y-0.5">
                              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-gecdsb shrink-0"></span>
                                <span>{sub.title}</span>
                              </div>
                              <p className="text-[10.5px] text-slate-600 leading-tight pl-3">
                                {sub.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {pillars[1] && (
                    <div className="bg-white rounded-xl border border-emerald-200 p-4 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600"></div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Pillar 2</span>
                            <h4 className="font-serif font-bold text-slate-900 text-sm leading-tight">{pillars[1].title}</h4>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-600 italic leading-snug mb-3 pb-2 border-b border-slate-100">
                          {pillars[1].tagline}
                        </p>
                        <ul className="space-y-2 text-xs text-slate-800">
                          {pillars[1].subPillars.map((sub, i) => (
                            <li key={i} className="space-y-0.5">
                              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                                <span>{sub.title}</span>
                              </div>
                              <p className="text-[10.5px] text-slate-600 leading-tight pl-3">
                                {sub.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {pillars[2] && (
                    <div className="bg-white rounded-xl border border-amber-300 p-4 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500"></div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">Pillar 3</span>
                            <h4 className="font-serif font-bold text-slate-900 text-sm leading-tight">{pillars[2].title}</h4>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-600 italic leading-snug mb-3 pb-2 border-b border-slate-100">
                          {pillars[2].tagline}
                        </p>
                        <ul className="space-y-2 text-xs text-slate-800">
                          {pillars[2].subPillars.map((sub, i) => (
                            <li key={i} className="space-y-0.5">
                              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                                <span>{sub.title}</span>
                              </div>
                              <p className="text-[10.5px] text-slate-600 leading-tight pl-3">
                                {sub.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* BOTTOM STRIP */}
              <div className="bg-slate-950 text-white px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t-2 border-amber-400">
                <div className="text-center sm:text-left">
                  <span className="text-slate-300 text-[11px]">
                    Serving Sandwich West, Sandwich Secondary, Sandwich West PS, Malden Central, Western SS, Anderdon & Amherstburg
                  </span>
                </div>
                <div className="flex items-center gap-3 font-semibold text-amber-300 text-xs shrink-0">
                  <span>Connect: {candidate.email}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM ACTION BAR (Hidden during Print) */}
        <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCaption}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer transition-colors border border-slate-200"
              title="Copy social post text caption"
            >
              {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copiedCaption ? 'Caption Copied!' : 'Copy Caption'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 ml-auto">
            {/* Download Image Button */}
            <button
              onClick={handleDownloadImage}
              disabled={isExportingImage || isExportingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer transition-colors border border-slate-300 shadow-xs disabled:opacity-50"
              title="Download high-resolution image"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>{isExportingImage ? 'Generating PNG...' : 'Download Image (.png)'}</span>
            </button>

            {/* Direct PDF File Download */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf || isExportingImage}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold cursor-pointer transition-colors shadow-xs disabled:opacity-50"
              title={activeFormat === 'postcard' ? 'Download print-ready 4x6 inch Postcard PDF' : 'Download document as PDF'}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>
                {isExportingPdf
                  ? 'Creating PDF...'
                  : activeFormat === 'postcard'
                  ? 'Download 4×6 Postcard PDF'
                  : 'Download PDF (.pdf)'}
              </span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              disabled={isExportingPdf || isExportingImage}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gecdsb hover:bg-gecdsb-700 text-white font-bold cursor-pointer transition-colors shadow-xs"
              title="Open browser print dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
