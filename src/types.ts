export interface SubPillar {
  title: string;
  description: string;
  keyInitiatives?: string[];
  measurableGoal?: string;
}

export interface Pillar {
  id: string;
  number: number;
  title: string;
  tagline: string;
  summary: string;
  badge: string;
  subPillars: SubPillar[];
  icon: string;
  colorClass: {
    badgeBg: string;
    badgeText: string;
    border: string;
    accentBg: string;
    lightBg: string;
  };
}

export interface SchoolInfo {
  id: string;
  name: string;
  municipality: 'LaSalle' | 'Amherstburg';
  grades: string;
  type: 'Elementary' | 'Secondary';
  specialFeatures: string[];
  address: string;
  focusArea: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Governance & Budget' | 'Academics & Well-Being' | 'Local Riding' | 'Voting & Election';
}

export interface CandidateProfile {
  fullName: string;
  preferredName: string;
  slogan: string;
  riding: string;
  schoolBoard: string;
  bioIntro: string;
  extendedBio: string[];
  whyRunningHighlights: {
    title: string;
    description: string;
  }[];
  credentials: string[];
  email: string;
  phone?: string;
  location: string;
  photoUrl?: string;
}

export interface EngagementFormData {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  municipality: 'LaSalle' | 'Amherstburg' | 'Other Essex County';
  postalCode?: string;
  requestLawnSign?: boolean;
  canVolunteer: boolean;
  volunteerInterests: string[];
  message: string;
  endorsementPermission: boolean;
}

export type EditorTabId = 'candidate' | 'whyRunning' | 'pillars' | 'schools' | 'faqs' | 'backup';

export interface SiteContentData {
  candidate: CandidateProfile;
  pillars: Pillar[];
  schools: SchoolInfo[];
  faqs: FaqItem[];
}
