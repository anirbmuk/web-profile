import debounce from 'lodash/debounce';

export const useScroll = (key = 'scroll') => {
  const scrollState = useState<number>(key, () => 0);

  const callback = debounce(() => (scrollState.value = window.scrollY), 200);

  useEventListener('scroll', callback);

  const scrollToTop = () => window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth', 
  });

  onMounted(() => scrollState.value = window.scrollY);

  return {
    scrollState,
    scrollToTop,
  };
};
