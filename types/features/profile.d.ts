import type { BaseDocument } from '../base';

export type SupportedSocialIcons = 'twitter' | 'linkedin' | 'github';

export type ProfileBlock = BaseDocument & {
  blog: Blog[];
  contact: Contact[];
  designation: string;
  currentjob?: string;
  location: string;
  social: Social[];
  bio?: string[];
  cover?: string[];
  artifact?: Artifact[];
};

export type Blog = {
  technology: string;
  url: string;
  icon?: string;
  description?: string;
  position?: 'start' | 'middle' | 'end' | undefined;
  iconSize?: number;
};

export type Contact = {
  type: 'email' | 'tel';
  value: string;
  icon?: string;
  iconSize?: number;
};

export type Social = {
  type: SupportedSocialIcons;
  url: string;
  icon?: string;
};

export type Artifact = {
  type: 'artifact';
  category: 'resume' | 'cover_letter';
  url: string;
};
