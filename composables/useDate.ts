import type { TimelinePeriod } from '~/types/components/timeline';

const MONTH_KEYS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const useDate = () => {
  const { $i18n } = useNuxtApp();

  const getCurrentTimeline = (): TimelinePeriod => {
    const date = new Date();
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const yyyy = String(date.getFullYear());
    return `${mm}/${yyyy}`;
  };

  const sortFn = (start: TimelinePeriod, end: TimelinePeriod = getCurrentTimeline()) => {
    const [endMonth, endYear] = end.split('/', 2);
    const [startMonth, startYear] = start.split('/', 2);
    return +endYear - +startYear || +endMonth - +startMonth;
  };

  const getDateFromString = (str: TimelinePeriod) => {
    const [mm, yyyy] = str.split('/');
    return new Date([mm, '01', yyyy].join('/'));
  };

  const getDurationText = (start: TimelinePeriod, end: TimelinePeriod | undefined = getCurrentTimeline()) => {

    const startDate = getDateFromString(start);
    const endDate = getDateFromString(end);

    const totalNumberOfMonths =
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear()) + 1;

    const numberOfYears = Math.floor(totalNumberOfMonths / 12);
    const numberOfMonths = totalNumberOfMonths - numberOfYears * 12;

    const monthText = numberOfMonths
      ? $i18n.t('components.UiTimeline.month', {
        count: numberOfMonths,
      })
      : '';
    const yearText = numberOfYears
      ? $i18n.t('components.UiTimeline.year', {
        count: numberOfYears,
      })
      : '';
    return [yearText, monthText].filter(Boolean).join(' ');
  };

  const getQualifiedDate = (date: TimelinePeriod | undefined, format: 'long' | 'short' = 'short') => {
    if (!date) {
      return '';
    }
    const [mm, yyyy] = date.split('/');
    const mmNum = Number(mm);
    if (isNaN(mmNum)) {
      return '';
    }
    const translationKey = `main.career.timeline.months.${format}.${MONTH_KEYS[mmNum - 1]}`;
    return `${$i18n.t(translationKey)} ${String(yyyy)}`;
  };

  return {
    sortFn,
    getCurrentTimeline,
    getDurationText,
    getQualifiedDate,
  };
};
