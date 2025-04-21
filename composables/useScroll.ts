import { debounce } from 'radash';

export const useScroll = (key = 'scroll') => {
  const { $i18n } = useNuxtApp();
  const { trackInternalClickEvent } = useTracking();

  const scrollState = useState<number>(key, () => 0);

  const callback = debounce({
    delay: 200,
  }, () => (scrollState.value = window.scrollY));

  useEventListener('scroll', callback);

  const scrollToTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
    trackInternalClickEvent({
      pageTitle: window.document.title,
      pageType: 'body',
      pageUrl: window.location.href,
      locale: $i18n.locale.value,
      event_section: 'backtotop_section',
      event_url: undefined,
    });
  };

  onMounted(() => scrollState.value = window.scrollY);

  return {
    scrollState,
    scrollToTop,
  };
};
