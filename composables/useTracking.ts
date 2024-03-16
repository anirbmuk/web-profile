import type {
  BaseEvent,
  BaseEventParams,
  ClickEventParams,
  ImpressionEventParams,
  ImpressionItemEventParams,
} from '../types/tracking';

export const useTracking = () => {
  const { gtag } = useGtag();

  const getClientTimestamp = () => {
    const date = new Date();
    const dd = `${date.getDate()}`.padStart(2, '0');
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const yyyy = `${date.getUTCFullYear()}`;
    const hh = `${date.getHours()}`.padStart(2, '0');
    const mi = `${date.getMinutes()}`.padStart(2, '0');
    const ss = `${date.getSeconds()}`.padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss}`;
  };

  const track = async <T extends BaseEventParams>({ event }: BaseEvent, metadata: T) => {
    await new Promise((resolve) => {
      resolve(
        gtag('event', event, {
          event,
          ...metadata,
          clientTimestamp: getClientTimestamp(),
          locale: metadata.locale || window.navigator.language,
          agent: window.navigator.userAgent,
          vendor: window.navigator.vendor,
          platform: window.navigator.platform,
        }),
      );
    });
  };

  const trackPageViewEvent = <T extends BaseEventParams>(metadata: T) =>
    track({
      event: 'page_view', 
    }, metadata);

  const trackImpressionCollectionEvent = <T extends ImpressionEventParams>(metadata: T) =>
    track({
      event: 'view_list', 
    }, metadata);

  const trackImpressionItemEvent = <T extends ImpressionItemEventParams>(metadata: T) =>
    track({
      event: 'view_list_item', 
    }, metadata);

  const trackInternalClickEvent = <T extends ClickEventParams>(metadata: T) =>
    track({
      event: 'internal_click', 
    }, metadata);

  const trackExternalClickEvent = <T extends ClickEventParams>(metadata: T) =>
    track({
      event: 'external_click', 
    }, metadata);

  const trackCountrySwitchEvent = <T extends ClickEventParams>(metadata: T) =>
    track({
      event: 'country_switch', 
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
