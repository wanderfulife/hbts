export type Habit = {
  id: string;
  name: string;
  progress: Record<number, boolean[]>; // month -> days
  color: string;
  textColor: string;
};

export type HabitGridProps = {
  habit: Habit;
  month: number;
  onToggle: (day: number) => void;
  onDelete?: (id: string) => void;
};