import type { BaseDocument } from '../base';

export type EducationBlock = BaseDocument & {
  degree: string;
  startyear: number;
  endyear: number;
  field: string;
  school: string;
  position: number;
  location: string;
};
