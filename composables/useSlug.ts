export const useSlug = () => {
  const { $i18n } = useNuxtApp();

  const getSlug = (slug: string) => `${slug}_${$i18n.locale.value}`;

  return {
    getSlug,
  };
};
