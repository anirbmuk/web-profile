export const useLoader = (key = 'loader') => {
  const loadingState = useState<boolean>(key, () => false);

  return {
    loadingState,
  };
};
