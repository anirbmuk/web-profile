import type { BaseDocument } from '../base';

export type TimelinePeriod = `${string}/${string}`;

export type Timeline = BaseDocument & {
  start: TimelinePeriod;
  end?: TimelinePeriod;
  provider?: string | undefined;
  location?: string | undefined;
  description?: string | undefined;
  designation: string;
  size?: string;
  alignment?: 'left' | 'right';
};
