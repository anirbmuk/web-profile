export const TIMELINE_COLORS = [
  '#931F92',
  '#3c763d',
  '#b84f0b',
  '#31708f',
  '#FF2500',
  '#0096FF',
  '#445469',
];

export const getTimelineColor = (index: number): string => {
  return TIMELINE_COLORS[index % TIMELINE_COLORS.length] || '#931F92';
};
