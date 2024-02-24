export type SupportedSlug =
  | 'aboutme'
  | 'blog'
  | 'career'
  | 'education'
  | 'footer'
  | 'github'
  | 'profile'
  | 'techstack';

export type SupportedParams = 'limit';

export type SupportedQueryParams = Record<SupportedParams, string>;
