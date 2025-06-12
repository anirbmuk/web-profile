import type {
  BaseEvent,
  BaseEventParams,
  ClickEventParams,
  ImpressionEventParams,
  ImpressionItemEventParams,
} from './../types/tracking';

export const useTracking = () => {
  const gtm = useGtm();

  const getClientTimestamp = () => {
    const date = new Date();
    const dd = `${date.getDate()}`.padStart(2, '0');
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const yyyy = `${date.getUTCFullYear()}`;
    const hh = `${date.getHours()}`.padStart(2, '0');
    const mi = `${date.getMinutes()}`.padStart(2, '0');
    const ss = `${date.getSeconds()}`.padStart(2, '0');
    return `${dd}.${mm}.${yyyy} ${hh}:${mi}:${ss}`;
  };

  const track = async <T extends BaseEventParams>({
    event,
    action,
  }: BaseEvent, metadata: T) => Promise.resolve(
    gtm?.trackEvent({
      event,
      action,
      category: metadata.pageType,
      label: metadata.pageTitle,
      ...('event_url' in metadata && {
        value: metadata.event_url,
      }),
      ...metadata,
      locale: metadata.locale || window.navigator.language,
      clientTimestamp: getClientTimestamp(),
      agent: window.navigator.userAgent,
      vendor: window.navigator.vendor,
      platform: window.navigator.platform,
    }),
  );

  const trackPageViewEvent = <T extends BaseEventParams>(metadata: T) =>
    track({
      event: 'page_view',
      action: 'view_action',
    }, metadata);

  const trackImpressionCollectionEvent = <T extends ImpressionEventParams>(metadata: T) =>
    track({
      event: 'view_list',
      action: 'view_action',
    }, metadata);

  const trackImpressionItemEvent = <T extends ImpressionItemEventParams>(metadata: T) =>
    track({
      event: 'view_list_item',
      action: 'view_action',
    }, metadata);

  const trackInternalClickEvent = <T extends ClickEventParams>(metadata: T) =>
    track({
      event: 'internal_click',
      action: 'click_action',
    }, metadata);

  const trackExternalClickEvent = <T extends ClickEventParams>(metadata: T) =>
    track({
      event: 'external_click',
      action: 'click_action',
    }, metadata);

  const trackCountrySwitchEvent = <T extends ClickEventParams>(metadata: T) =>
    track({
      event: 'country_switch',
      action: 'click_action',
    }, metadata);

  return {
    trackPageViewEvent,
    trackImpressionCollectionEvent,
    trackImpressionItemEvent,
    trackInternalClickEvent,
    trackExternalClickEvent,
    trackCountrySwitchEvent,
  };
};
