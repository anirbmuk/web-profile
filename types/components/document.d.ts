import type { BaseDocument } from '../base';

export type SupportedDocTypes = 'link' | 'text';
export type SupportedCatTypes = 'github' | 'about';

export type FbDocument = BaseDocument & {
  type: SupportedDocTypes;
  category: SupportedCatTypes;
  value: string | number | boolean | Date | undefined;
  description: string;
};
