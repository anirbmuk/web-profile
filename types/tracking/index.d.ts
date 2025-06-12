export type TrackingEvents =
  | 'page_view'
  | 'impression'
  | 'internal_click'
  | 'external_click'
  | 'view_list'
  | 'view_list_item'
  | 'country_switch';

export type ExternalLink = 'twitter' | 'linkedin' | 'github' | 'blogger' | 'devto';
export type ImpressionSections = 'education' | 'github' | 'profile' | 'career';
export type PageType = 'home' | 'about' | 'footer' | 'error' | 'body';

export type BaseEvent = {
  event: TrackingEvents;
  action: 'click_action' | 'view_action'
};

export type BaseEventParams = {
  pageType: PageType;
  pageUrl: string;
  pageTitle: string;
  locale: string;
};

export type ImpressionEventParams = BaseEventParams & {
  event_section:
    | 'backtotop_section'
    | 'header_section'
    | 'footer_section'
    | 'profile_section'
    | 'profile_image_section'
    | 'career_section'
    | 'techstack_section'
    | 'github_section'
    | 'education_section'
    | 'aboutme_section'
    | 'blog_section'
    | 'error_page'
    | 'not_found';
};

export type ImpressionItemEventParams = ImpressionEventParams & {
  item: string;
};

export type ClickEventParams = ImpressionEventParams & {
  event_url: string | undefined;
};

export type ToggleEventParams = ImpressionEventParams & {
  state: boolean;
};
