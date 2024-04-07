import throttle from 'lodash/throttle';

export const useScroll = (key = 'scroll') => {
  const scrollState = useState<number>(key, () => 0);

  const callback = throttle(() => (scrollState.value = window.scrollY), 300);

  useEventListener('scroll', callback);

  const scrollToTop = () => window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth', 
  });

  return {
    scrollState,
    scrollToTop,
  };
};
