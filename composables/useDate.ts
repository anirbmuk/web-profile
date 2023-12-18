export const useDate = () => {
  const { $i18n } = useNuxtApp();

  const getCurrentTimeline = () => {
    const date = new Date();
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${yyyy}`;
  };

  const sortFn = (start: string, end = getCurrentTimeline()) => {
    const [endMonth, endYear] = end.split('/', 2);
    const [startMonth, startYear] = start.split('/', 2);
    return +endYear - +startYear || +endMonth - +startMonth;
  };

  const getDateFromString = (str: string) => {
    const [mm, yyyy] = str.split('/');
    return new Date([mm, '01', yyyy].join('/'));
  };

  const getDurationText = (start: string, end: string | undefined) => {
    if (!end) {
      return '';
    }

    const startDate = getDateFromString(start);
    const endDate = getDateFromString(end);

    const totalNumberOfMonths =
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear());

    const numberOfYears = Math.floor(totalNumberOfMonths / 12);
    const numberOfMonths = totalNumberOfMonths - numberOfYears * 12;

    const monthText = numberOfMonths
      ? $i18n.t('components.UiTimeline.month', { count: numberOfMonths })
      : '';
    const yearText = numberOfYears
      ? $i18n.t('components.UiTimeline.year', { count: numberOfYears })
      : '';
    return [yearText, monthText].filter(Boolean).join(' ');
  };

  return {
    sortFn,
    getCurrentTimeline,
    getDurationText,
  };
};
