import type { BaseDocument } from '../base';

export type TechstackBlock = BaseDocument & {
  technology: {
    name: string;
    rating: number;
    position: number;
    icon?: string;
    url?: string | undefined;
  }[];
  repository: {
    name: string;
    position: number;
    icon?: string;
    url?: string | undefined;
  }[];
  database: {
    name: string;
    rating: number;
    position: number;
    icon?: string;
    url?: string | undefined;
  }[];
};
