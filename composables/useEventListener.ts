export const useEventListener = <K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
) => {
  onMounted(() => window.addEventListener(type, listener));

  onBeforeUnmount(() => window.removeEventListener(type, listener));
};
