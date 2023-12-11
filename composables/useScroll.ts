export const useScroll = (key = 'scroll') => {
  const scrollState = useState<number>(key, () => 0);

  const callback = () => (scrollState.value = window.scrollY);

  useEventListener('scroll', callback);

  const scrollToTop = () => window.scrollTo(0, 0);

  return {
    scrollState,
    scrollToTop,
  };
};
