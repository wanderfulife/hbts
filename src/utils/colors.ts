type Color = {
  bg: string;
  text: string;
};

const COLORS: Color[] = [
  { bg: 'bg-rose-500/20', text: 'text-rose-500' },
  { bg: 'bg-blue-500/20', text: 'text-blue-500' },
  { bg: 'bg-emerald-500/20', text: 'text-emerald-500' },
  { bg: 'bg-sky-500/20', text: 'text-sky-500' },
  { bg: 'bg-violet-500/20', text: 'text-violet-500' },
  { bg: 'bg-orange-500/20', text: 'text-orange-500' },
];

export const getRandomColor = (): Color => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};