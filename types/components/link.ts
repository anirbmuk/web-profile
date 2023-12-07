export type Link = {
  type: 'internal' | 'external';
  text: string;
  title?: string;
  icon?: string;
  url: string;
};
