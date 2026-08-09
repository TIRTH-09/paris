
export interface BannerData {
  companyName: string;
  headline: string;
  subtitle: string;
  ctaText: string;
  card1Category?: string;
  card1Title?: string;
  card1Text?: string;
  card2Category?: string;
  card2Title?: string;
  card2Text?: string;
  generatedEnergyValue?: string;
  generatedEnergyText?: string;
  impactValue?: string;
  impactText?: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

export type BackgroundMode = 'scroll-video' | 'static-image' | 'gradient' | 'studio-teal' | 'studio-dark' | 'studio-light' | 'photo' | 'transparent-grid';

export type ActiveModal = 'consultation' | 'menu' | 'solutions' | 'projects' | 'about' | 'contact' | 'editor' | null;


