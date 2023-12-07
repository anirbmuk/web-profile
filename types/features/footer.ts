import type { BaseDocument } from '../base';
import type { Link } from './../components/link';

export type FooterBlock = BaseDocument & {
  links?: Link[];
  copyright: string;
  publishdate?: string;
};
