import React, { useState, useRef } from 'react';
import { CandidateProfile } from '../types';
import { INITIAL_CANDIDATE_PROFILE } from '../data/campaignData';
import { X, Save, RotateCcw, User, Mail, Phone, MapPin, Sparkles, Upload, Image as ImageIcon } from 'lucide-react';

interface CandidateCustomizerModalProps {
  candidate: CandidateProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: CandidateProfile) => void;
}

export const CandidateCustomizerModal: React.FC<CandidateCustomizerModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<CandidateProfile>({ ...candidate });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleReset = () => {
    setFormData({ ...INITIAL_CANDIDATE_PROFILE });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormData((prev) => ({ ...prev, photoUrl: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-base">
              Personalize Candidate & Campaign Information
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <p className="text-xs text-slate-600">
            You can customize candidate details here. All sections of the single-page site and printable 1-pager will automatically update.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Candidate Full Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preferred First Name
              </label>
              <input
                type="text"
                required
                value={formData.preferredName}
                onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Campaign Slogan / Subtitle
            </label>
            <input
              type="text"
              required
              value={formData.slogan}
              onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Campaign Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Campaign Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
              />
            </div>
          </div>

          {/* Candidate Photo (Pure Crop, No Filters) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Candidate Photo (Original Image, Purely Cropped)
              </label>
              {formData.photoUrl && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, photoUrl: '/candidate-headshot.jpg' })}
                  className="text-[11px] text-gecdsb hover:underline cursor-pointer"
                >
                  Reset Default Photo
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={formData.photoUrl || '/candidate-headshot.jpg'}
                  alt="Candidate preview"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-amber-400 shadow-sm shrink-0 bg-slate-200"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/candidate-headshot.jpg';
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-gecdsb" />
                  <span>Choose Photo from Device</span>
                </button>
                <p className="text-[11px] text-slate-500">
                  Select your original picture. It is displayed directly with clean proportional cropping and zero alterations.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Candidate Intro Statement
            </label>
            <textarea
              rows={3}
              value={formData.bioIntro}
              onChange={(e) => setFormData({ ...formData, bioIntro: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-gecdsb focus:bg-white"
            />
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gecdsb hover:bg-gecdsb-800 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
              >
                <Save className="w-3.5 h-3.5 text-amber-300" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
