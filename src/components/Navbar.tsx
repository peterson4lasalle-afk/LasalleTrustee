import React, { useState, useEffect } from 'react';
import { CandidateProfile } from '../types';
import { LayoutMode } from '../App';
import {
  Menu,
  X,
  Shield,
  Settings2,
  HeartHandshake,
  FileText,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Compass,
  UserCheck,
  School,
  HelpCircle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  candidate: CandidateProfile;
  layoutMode?: LayoutMode;
  onChangeLayoutMode?: (mode: LayoutMode) => void;
  onOpenCustomizer: () => void;
  onOpenPrintable: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  candidate,
  onOpenCustomizer,
  onOpenPrintable,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileDrawerOpen]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    {
      name: 'Platform',
      subtitle: '3 core pillars & measurable commitments',
      href: '#pillars',
      icon: GraduationCap,
      badge: '3 Pillars',
      badgeColor: 'bg-gecdsb-100 text-gecdsb-900',
    },
    {
      name: 'Why I am Running',
      subtitle: 'Commitment to student success & service',
      href: '#why-running',
      icon: Compass,
      badge: 'Vision',
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      name: 'About Me',
      subtitle: 'Community roots, biography & background',
      href: '#about',
      icon: UserCheck,
      badge: 'Bio',
      badgeColor: 'bg-slate-100 text-slate-800',
    },
    {
      name: 'Local Schools',
      subtitle: 'LaSalle & Amherstburg public school profiles',
      href: '#schools',
      icon: School,
      badge: 'Riding',
      badgeColor: 'bg-emerald-100 text-emerald-900',
    },
    {
      name: 'FAQ',
      subtitle: 'Ballot guidelines, eligibility & FAQs',
      href: '#faq',
      icon: HelpCircle,
      badge: 'Guide',
      badgeColor: 'bg-gecdsb-100 text-gecdsb-900',
    },
  ];

  const handleNavClick = (href: string) => {
    setMobileDrawerOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Allow drawer close animation to start before scrolling smoothly
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          <div className="flex items-center justify-between h-17 sm:h-18">
            {/* Candidate Brand */}
            <a
              id="brand-logo-link"
              href="#hero"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden focus:ring-2 focus:ring-gecdsb rounded-lg p-1"
            >
              {candidate.photoUrl ? (
                <img
                  src={candidate.photoUrl}
                  alt={candidate.fullName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-lg object-cover object-top border border-gecdsb/40 shadow-xs group-hover:ring-2 group-hover:ring-gecdsb transition-all"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gecdsb text-white flex items-center justify-center font-serif font-bold text-xl shadow-xs border border-gecdsb-700 group-hover:bg-gecdsb-700 transition-colors">
                  {candidate.preferredName ? candidate.preferredName[0] : 'P'}
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                    {candidate.fullName}
                  </span>
                  <span className="bg-gecdsb-100 text-gecdsb-900 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border border-gecdsb-200">
                    Trustee
                  </span>
                </div>
                <span className="text-xs text-slate-600 font-medium line-clamp-1">
                  Peterson for Trustee • {candidate.riding}
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`desktop-nav-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-gecdsb hover:bg-gecdsb-50 rounded-md transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                id="header-platform-summary-btn"
                onClick={onOpenPrintable}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-gecdsb hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                title="View & print 1-page campaign platform"
              >
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>1-Page Flyer</span>
              </button>

              <a
                id="desktop-connect-btn"
                href="#get-involved"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#get-involved');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gecdsb hover:bg-gecdsb-700 active:bg-gecdsb-800 rounded-lg transition-all shadow-xs"
              >
                <Mail className="w-4 h-4 text-amber-300" />
                <span>Connect</span>
              </a>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                id="mobile-header-flyer-btn"
                onClick={onOpenPrintable}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
                title="Print Flyer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Flyer</span>
              </button>
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-gecdsb transition-colors"
                aria-label="Open navigation drawer"
                aria-expanded={mobileDrawerOpen}
              >
                <Menu className="w-5 h-5 text-slate-800" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Slide-out Drawer Menu */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div
            id="mobile-navigation-drawer"
            className="fixed inset-0 z-50 lg:hidden flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity cursor-pointer"
              aria-hidden="true"
            />

            {/* Slide-out Drawer Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Drawer Top Brand Header */}
              <div className="p-4 sm:p-5 bg-linear-to-r from-gecdsb-950 via-gecdsb-900 to-gecdsb-950 text-white border-b border-gecdsb-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {candidate.photoUrl ? (
                    <img
                      src={candidate.photoUrl}
                      alt={candidate.fullName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover object-top border-2 border-amber-400/80 shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gecdsb text-white flex items-center justify-center font-serif font-bold text-xl border-2 border-amber-400/80 shadow-md">
                      {candidate.preferredName ? candidate.preferredName[0] : 'P'}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-serif font-bold text-base sm:text-lg text-white leading-tight">
                        {candidate.fullName}
                      </h2>
                      <span className="bg-amber-400 text-slate-950 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded">
                        Trustee
                      </span>
                    </div>
                    <p className="text-xs text-gecdsb-200 font-medium mt-0.5">
                      Peterson for Trustee • {candidate.riding}
                    </p>
                  </div>
                </div>

                <button
                  id="mobile-drawer-close-btn"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-gecdsb-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Navigation Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 bg-white">
                {/* Civic Riding Quick Banner */}
                <div className="p-3 rounded-xl bg-gecdsb-50/90 border border-gecdsb-100 flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-gecdsb shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-gecdsb-950 font-semibold block">English Public School Board</strong>
                    Representing the Town of LaSalle & the Town of Amherstburg
                  </div>
                </div>

                {/* Main Navigation Links */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                    Campaign Navigation
                  </div>
                  <nav className="space-y-1">
                    {navLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <a
                          key={link.name}
                          id={`mobile-drawer-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link.href);
                          }}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-gecdsb-50 active:bg-gecdsb-100 text-slate-800 transition-all group border border-transparent hover:border-gecdsb-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-gecdsb group-hover:text-white text-slate-700 flex items-center justify-center transition-colors shrink-0">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="text-sm font-bold text-slate-900 group-hover:text-gecdsb transition-colors">
                                {link.name}
                              </span>
                              <span className="text-[11px] text-slate-500 line-clamp-1">
                                {link.subtitle}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${link.badgeColor}`}>
                              {link.badge}
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-gecdsb group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </a>
                      );
                    })}
                  </nav>
                </div>

                {/* Campaign Action Cards */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
                    Quick Actions
                  </div>

                  <button
                    id="mobile-drawer-print-flyer-btn"
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      onOpenPrintable();
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-linear-to-r from-gecdsb-950 to-gecdsb-900 text-white font-medium shadow-sm hover:from-gecdsb-900 hover:to-gecdsb-800 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          Download 1-Page Flyer
                          <Sparkles className="w-3 h-3 text-amber-400" />
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Printable campaign summary sheet
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <a
                    id="mobile-drawer-lawn-sign-btn"
                    href="#get-involved"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#get-involved');
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all text-left shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-950/10 text-slate-950 flex items-center justify-center">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-950">
                          Request a Lawn Sign
                        </div>
                        <div className="text-[11px] text-slate-800">
                          Free delivery in LaSalle & Amherstburg
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-900" />
                  </a>
                </div>

                {/* Candidate Direct Contact Links */}
                <div className="p-3.5 rounded-xl bg-gecdsb-50/60 border border-gecdsb-100 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gecdsb-900">
                    Direct Campaign Contact
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <a
                      id="mobile-drawer-email-link"
                      href={`mailto:${candidate.email}`}
                      className="flex items-center gap-2 text-gecdsb font-medium hover:underline break-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-gecdsb shrink-0" />
                      <span>{candidate.email}</span>
                    </a>
                    {candidate.phone && (
                      <a
                        id="mobile-drawer-phone-link"
                        href={`tel:${candidate.phone.replace(/[^0-9+]/g, '')}`}
                        className="flex items-center gap-2 text-gecdsb font-medium hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5 text-gecdsb shrink-0" />
                        <span>{candidate.phone}</span>
                      </a>
                    )}
                    <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{candidate.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Bar with Close */}
              <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-end shrink-0">
                <button
                  id="mobile-drawer-bottom-close-btn"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-gecdsb-900 hover:bg-gecdsb-800 rounded-lg transition-colors text-center"
                >
                  Close Menu
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

