import React, { useState, useRef } from 'react';
import {
  CandidateProfile,
  Pillar,
  SchoolInfo,
  FaqItem,
  SiteContentData,
  EditorTabId
} from '../types';
import {
  INITIAL_CANDIDATE_PROFILE,
  CAMPAIGN_PILLARS,
  LOCAL_SCHOOLS,
  VOTER_FAQS
} from '../data/campaignData';
import {
  X,
  Save,
  RotateCcw,
  User,
  Compass,
  GraduationCap,
  School,
  HelpCircle,
  Download,
  Upload,
  Plus,
  Trash2,
  Check,
  CheckCircle2,
  FileCode,
  Sparkles,
  Info,
  Copy
} from 'lucide-react';

interface SiteContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: EditorTabId;
  content: SiteContentData;
  onSave: (updated: SiteContentData) => void;
}

export const SiteContentEditorModal: React.FC<SiteContentEditorModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'candidate',
  content,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<EditorTabId>(initialTab);
  const [formData, setFormData] = useState<SiteContentData>(() => JSON.parse(JSON.stringify(content)));
  const [selectedPillarIndex, setSelectedPillarIndex] = useState(0);
  const [selectedSchoolIndex, setSelectedSchoolIndex] = useState(0);
  const [selectedFaqIndex, setSelectedFaqIndex] = useState(0);
  const [importJsonText, setImportJsonText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync state when modal opens or initialTab changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(content)));
      if (initialTab) {
        setActiveTab(initialTab);
      }
    }
  }, [isOpen, content, initialTab]);

  // Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  if (!isOpen) return null;

  // Photo file upload helper
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormData((prev) => ({
            ...prev,
            candidate: { ...prev.candidate, photoUrl: result },
          }));
          showToast('Candidate photo loaded!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    onSave(formData);
    showToast('All text updates saved successfully!');
    setTimeout(() => {
      onClose();
    }, 350);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all site wording and content back to the default campaign copy?')) {
      const defaultData: SiteContentData = {
        candidate: JSON.parse(JSON.stringify(INITIAL_CANDIDATE_PROFILE)),
        pillars: JSON.parse(JSON.stringify(CAMPAIGN_PILLARS)),
        schools: JSON.parse(JSON.stringify(LOCAL_SCHOOLS)),
        faqs: JSON.parse(JSON.stringify(VOTER_FAQS)),
      };
      setFormData(defaultData);
      onSave(defaultData);
      showToast('Restored all defaults!');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'campaign-site-content.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported campaign-site-content.json');
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    showToast('JSON copied to clipboard!');
  };

  const handleApplyImportJson = () => {
    try {
      setJsonError(null);
      const parsed = JSON.parse(importJsonText);
      if (!parsed.candidate || !parsed.pillars) {
        throw new Error('Invalid schema: Missing candidate or pillars objects.');
      }
      setFormData(parsed);
      onSave(parsed);
      setImportJsonText('');
      showToast('Imported and applied content successfully!');
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax.');
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-slate-900 text-white shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-white leading-tight">
                Site Text & Wording Editor
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Edit any wording, headline, bio, pillar, school description, or FAQ on the site.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md cursor-pointer transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 flex overflow-x-auto gap-1 text-xs font-semibold shrink-0 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('candidate')}
            className={`flex items-center gap-2 py-3 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'candidate'
                ? 'border-gecdsb text-gecdsb font-bold bg-white/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Candidate & Bio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('whyRunning')}
            className={`flex items-center gap-2 py-3 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'whyRunning'
                ? 'border-gecdsb text-gecdsb font-bold bg-white/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Why I Am Running</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pillars')}
            className={`flex items-center gap-2 py-3 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pillars'
                ? 'border-gecdsb text-gecdsb font-bold bg-white/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>3 Campaign Pillars</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('schools')}
            className={`flex items-center gap-2 py-3 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'schools'
                ? 'border-gecdsb text-gecdsb font-bold bg-white/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Local Schools</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center gap-2 py-3 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'faqs'
                ? 'border-gecdsb text-gecdsb font-bold bg-white/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Voter FAQs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 py-3 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'backup'
                ? 'border-gecdsb text-gecdsb font-bold bg-white/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Export / Backup</span>
          </button>
        </div>

        {/* Main Tab Content Body (Scrollable) */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 bg-slate-50/50 space-y-6">

          {/* ======================================================== */}
          {/* TAB 1: CANDIDATE & BIO                                   */}
          {/* ======================================================== */}
          {activeTab === 'candidate' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gecdsb-900 border-b border-slate-100 pb-2">
                  General Information & Brand
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.candidate.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          candidate: { ...formData.candidate, fullName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Preferred / First Name
                    </label>
                    <input
                      type="text"
                      value={formData.candidate.preferredName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          candidate: { ...formData.candidate, preferredName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Campaign Slogan / Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.candidate.slogan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          candidate: { ...formData.candidate, slogan: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Riding / Municipalities
                    </label>
                    <input
                      type="text"
                      value={formData.candidate.riding}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          candidate: { ...formData.candidate, riding: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      School Board Title
                    </label>
                    <input
                      type="text"
                      value={formData.candidate.schoolBoard}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          candidate: { ...formData.candidate, schoolBoard: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Campaign Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.candidate.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          candidate: { ...formData.candidate, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.candidate.phone || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          candidate: { ...formData.candidate, phone: e.target.value },
                        })
                      }
                      placeholder="(519) ..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
                    />
                  </div>
                </div>

                {/* Candidate Photo */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Candidate Photo
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                      src={formData.candidate.photoUrl || './candidate-headshot.jpg'}
                      alt="Candidate Preview"
                      className="w-16 h-16 rounded-xl object-cover border-2 border-amber-400 shadow-xs shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = './candidate-headshot.jpg';
                      }}
                    />
                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={formData.candidate.photoUrl || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            candidate: { ...formData.candidate, photoUrl: e.target.value },
                          })
                        }
                        placeholder="Image URL (e.g. /candidate-headshot.jpg or https://...)"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer border border-slate-300"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload from device</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Narrative */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gecdsb-900 border-b border-slate-100 pb-2">
                  Biography & Personal Narrative
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Introduction Paragraph (Bio Intro)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.candidate.bioIntro}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        candidate: { ...formData.candidate, bioIntro: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Extended Bio Paragraphs ({formData.candidate.extendedBio.length})
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          candidate: {
                            ...formData.candidate,
                            extendedBio: [...formData.candidate.extendedBio, ''],
                          },
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-gecdsb hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Paragraph</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.candidate.extendedBio.map((paragraph, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <textarea
                          rows={2}
                          value={paragraph}
                          onChange={(e) => {
                            const updated = [...formData.candidate.extendedBio];
                            updated[index] = e.target.value;
                            setFormData({
                              ...formData,
                              candidate: { ...formData.candidate, extendedBio: updated },
                            });
                          }}
                          className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-gecdsb focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.candidate.extendedBio.filter((_, i) => i !== index);
                            setFormData({
                              ...formData,
                              candidate: { ...formData.candidate, extendedBio: updated },
                            });
                          }}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          title="Remove paragraph"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Credentials & Qualifications */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Credentials & Qualifications List ({formData.candidate.credentials.length})
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          candidate: {
                            ...formData.candidate,
                            credentials: [...formData.candidate.credentials, ''],
                          },
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-gecdsb hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Credential</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.candidate.credentials.map((cred, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={cred}
                          onChange={(e) => {
                            const updated = [...formData.candidate.credentials];
                            updated[index] = e.target.value;
                            setFormData({
                              ...formData,
                              candidate: { ...formData.candidate, credentials: updated },
                            });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-gecdsb focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.candidate.credentials.filter((_, i) => i !== index);
                            setFormData({
                              ...formData,
                              candidate: { ...formData.candidate, credentials: updated },
                            });
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                          title="Remove credential"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: WHY I AM RUNNING                                  */}
          {/* ======================================================== */}
          {activeTab === 'whyRunning' && (
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gecdsb-900">
                    Why I Am Running Highlights
                  </h3>
                  <p className="text-xs text-slate-600">
                    These 4 core cards explain candidate motivations across the executive Bento and full view.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      candidate: {
                        ...formData.candidate,
                        whyRunningHighlights: [
                          ...formData.candidate.whyRunningHighlights,
                          { title: 'New Focus Area', description: 'Description of commitment...' },
                        ],
                      },
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gecdsb hover:bg-gecdsb-700 text-white text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Highlight Card</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.candidate.whyRunningHighlights.map((item, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 relative">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...formData.candidate.whyRunningHighlights];
                            updated[index].title = e.target.value;
                            setFormData({
                              ...formData,
                              candidate: { ...formData.candidate, whyRunningHighlights: updated },
                            });
                          }}
                          placeholder="Card Title"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.candidate.whyRunningHighlights.filter((_, i) => i !== index);
                          setFormData({
                            ...formData,
                            candidate: { ...formData.candidate, whyRunningHighlights: updated },
                          });
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove highlight"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Card Description
                      </label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...formData.candidate.whyRunningHighlights];
                          updated[index].description = e.target.value;
                          setFormData({
                            ...formData,
                            candidate: { ...formData.candidate, whyRunningHighlights: updated },
                          });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: 3 PLATFORM PILLARS                                */}
          {/* ======================================================== */}
          {activeTab === 'pillars' && (
            <div className="space-y-6 max-w-4xl">
              {/* Pillar Selector Pills */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 rounded-xl">
                {formData.pillars.map((pillar, idx) => (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setSelectedPillarIndex(idx)}
                    className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                      selectedPillarIndex === idx
                        ? 'bg-gecdsb text-white shadow-xs'
                        : 'bg-transparent text-slate-700 hover:bg-white/60'
                    }`}
                  >
                    Pillar {pillar.number}: {pillar.title}
                  </button>
                ))}
              </div>

              {/* Selected Pillar Editor Form */}
              {formData.pillars[selectedPillarIndex] && (() => {
                const curPillar = formData.pillars[selectedPillarIndex];

                const updateCurPillar = (fields: Partial<Pillar>) => {
                  const updatedPillars = [...formData.pillars];
                  updatedPillars[selectedPillarIndex] = {
                    ...updatedPillars[selectedPillarIndex],
                    ...fields,
                  };
                  setFormData({ ...formData, pillars: updatedPillars });
                };

                return (
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-gecdsb">
                          Pillar {curPillar.number} Configuration
                        </span>
                        <h4 className="font-serif font-bold text-base text-slate-900">
                          {curPillar.title}
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Pillar Headline Title
                        </label>
                        <input
                          type="text"
                          value={curPillar.title}
                          onChange={(e) => updateCurPillar({ title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          value={curPillar.badge}
                          onChange={(e) => updateCurPillar({ badge: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm text-slate-900"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Tagline / One-Liner
                        </label>
                        <input
                          type="text"
                          value={curPillar.tagline}
                          onChange={(e) => updateCurPillar({ tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm text-slate-900"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Pillar Summary Description
                        </label>
                        <textarea
                          rows={2}
                          value={curPillar.summary}
                          onChange={(e) => updateCurPillar({ summary: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    {/* Sub-Pillars / Initiatives */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Key Focus Areas & Commitments ({curPillar.subPillars.length})
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedSub = [
                              ...curPillar.subPillars,
                              { title: 'New Focus Area', description: 'Description here...' },
                            ];
                            updateCurPillar({ subPillars: updatedSub });
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-gecdsb hover:underline"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Focus Point</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {curPillar.subPillars.map((sub, sIdx) => (
                          <div key={sIdx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <input
                                type="text"
                                value={sub.title}
                                onChange={(e) => {
                                  const updatedSub = [...curPillar.subPillars];
                                  updatedSub[sIdx].title = e.target.value;
                                  updateCurPillar({ subPillars: updatedSub });
                                }}
                                placeholder="Point Header"
                                className="flex-1 px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs font-bold text-slate-900"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedSub = curPillar.subPillars.filter((_, i) => i !== sIdx);
                                  updateCurPillar({ subPillars: updatedSub });
                                }}
                                className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={sub.description}
                              onChange={(e) => {
                                const updatedSub = [...curPillar.subPillars];
                                updatedSub[sIdx].description = e.target.value;
                                updateCurPillar({ subPillars: updatedSub });
                              }}
                              placeholder="Full description..."
                              className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs text-slate-800"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: LOCAL SCHOOLS                                     */}
          {/* ======================================================== */}
          {activeTab === 'schools' && (
            <div className="space-y-5 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gecdsb-900">
                    Local Schools in LaSalle & Amherstburg ({formData.schools.length})
                  </h3>
                  <p className="text-xs text-slate-600">
                    Edit school details, addresses, grade levels, and customized advocacy focus areas.
                  </p>
                </div>
              </div>

              {/* School Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {formData.schools.map((sch, sIndex) => (
                  <button
                    key={sch.id}
                    type="button"
                    onClick={() => setSelectedSchoolIndex(sIndex)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedSchoolIndex === sIndex
                        ? 'bg-emerald-700 text-white shadow-xs font-bold'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {sch.name}
                  </button>
                ))}
              </div>

              {/* Selected School Form */}
              {formData.schools[selectedSchoolIndex] && (() => {
                const curSchool = formData.schools[selectedSchoolIndex];

                const updateCurSchool = (fields: Partial<SchoolInfo>) => {
                  const updatedSchools = [...formData.schools];
                  updatedSchools[selectedSchoolIndex] = {
                    ...updatedSchools[selectedSchoolIndex],
                    ...fields,
                  };
                  setFormData({ ...formData, schools: updatedSchools });
                };

                return (
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          School Name
                        </label>
                        <input
                          type="text"
                          value={curSchool.name}
                          onChange={(e) => updateCurSchool({ name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Municipality
                        </label>
                        <select
                          value={curSchool.municipality}
                          onChange={(e) => updateCurSchool({ municipality: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm text-slate-900"
                        >
                          <option value="LaSalle">LaSalle</option>
                          <option value="Amherstburg">Amherstburg</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Grade Levels
                        </label>
                        <input
                          type="text"
                          value={curSchool.grades}
                          onChange={(e) => updateCurSchool({ grades: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          School Type
                        </label>
                        <select
                          value={curSchool.type}
                          onChange={(e) => updateCurSchool({ type: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                        >
                          <option value="Elementary">Elementary</option>
                          <option value="Secondary">Secondary</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Physical Address
                        </label>
                        <input
                          type="text"
                          value={curSchool.address}
                          onChange={(e) => updateCurSchool({ address: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Trustee Focus & Advocacy Goal
                        </label>
                        <textarea
                          rows={2}
                          value={curSchool.focusArea}
                          onChange={(e) => updateCurSchool({ focusArea: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: VOTER FAQS                                        */}
          {/* ======================================================== */}
          {activeTab === 'faqs' && (
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gecdsb-900">
                    Voter Frequently Asked Questions ({formData.faqs.length})
                  </h3>
                  <p className="text-xs text-slate-600">
                    Update questions, explanations, and category tags.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      faqs: [
                        ...formData.faqs,
                        {
                          id: `faq-${Date.now()}`,
                          category: 'Governance & Budget',
                          question: 'New Question Title?',
                          answer: 'Detailed explanation here...',
                        },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gecdsb hover:bg-gecdsb-700 text-white text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ Item</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.faqs.map((faq, fIdx) => (
                  <div key={faq.id || fIdx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                          {fIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...formData.faqs];
                            updated[fIdx].question = e.target.value;
                            setFormData({ ...formData, faqs: updated });
                          }}
                          placeholder="Question Title"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900"
                        />
                      </div>

                      <select
                        value={faq.category}
                        onChange={(e) => {
                          const updated = [...formData.faqs];
                          updated[fIdx].category = e.target.value as any;
                          setFormData({ ...formData, faqs: updated });
                        }}
                        className="text-[11px] px-2 py-1.5 rounded bg-slate-100 border border-slate-300 font-semibold"
                      >
                        <option value="Governance & Budget">Governance & Budget</option>
                        <option value="Academics & Well-Being">Academics & Well-Being</option>
                        <option value="Local Riding">Local Riding</option>
                        <option value="Voting & Election">Voting & Election</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.faqs.filter((_, i) => i !== fIdx);
                          setFormData({ ...formData, faqs: updated });
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...formData.faqs];
                        updated[fIdx].answer = e.target.value;
                        setFormData({ ...formData, faqs: updated });
                      }}
                      placeholder="Detailed answer text..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: EXPORT / BACKUP & RESTORE                         */}
          {/* ======================================================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gecdsb-900">
                  Export & Backup Content
                </h3>
                <p className="text-xs text-slate-600">
                  Save a copy of all current site text and candidate information as a backup file.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Download JSON File</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer border border-slate-300 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>Copy JSON to Clipboard</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gecdsb-900">
                  Import / Restore from JSON
                </h3>
                <p className="text-xs text-slate-600">
                  Paste previously exported JSON to bulk-update or restore all site text.
                </p>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste JSON content here..."
                  className="w-full font-mono text-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                />
                {jsonError && (
                  <p className="text-xs text-red-600 font-semibold">{jsonError}</p>
                )}
                <div>
                  <button
                    type="button"
                    disabled={!importJsonText.trim()}
                    onClick={handleApplyImportJson}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gecdsb hover:bg-gecdsb-700 disabled:opacity-50 text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Apply Imported JSON</span>
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 shadow-xs space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-950">
                  Reset to Original Defaults
                </h3>
                <p className="text-xs text-amber-900">
                  Restore all site wording, pillars, and FAQs back to the initial template copy.
                </p>
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-amber-700" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="absolute bottom-16 right-6 z-30 bg-slate-950 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-amber-400 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Bottom Action Bar */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 sm:px-6 py-3 flex items-center justify-between text-xs shrink-0">
          <div className="text-slate-500 text-[11px] hidden sm:block">
            All edits save to your browser and update live everywhere across the site and printable flyer.
          </div>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 font-semibold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gecdsb hover:bg-gecdsb-700 text-white font-bold cursor-pointer transition-colors shadow-xs"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>Save & Apply Updates</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
