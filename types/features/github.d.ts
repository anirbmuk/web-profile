import type { FbDocument } from '../components/document';

export type GithubBlock = FbDocument & {
  position: number;
  technologies: string[];
};
