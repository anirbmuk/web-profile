import type { BaseDocument } from '../base';

export type Timeline = BaseDocument & {
  start: string;
  end?: string | undefined;
  provider?: string | undefined;
  location?: string | undefined;
  description?: string | undefined;
  designation: string;
  size?: string;
  alignment?: 'left' | 'right';
};
