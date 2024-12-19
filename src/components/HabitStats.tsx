import React from 'react';
import { getDaysInMonth } from '../utils/dates';

type HabitStatsProps = {
  completedDays: number;
  month: number;
};

const HabitStats: React.FC<HabitStatsProps> = ({ completedDays, month }) => {
  const daysInMonth = getDaysInMonth(month);
  const percentage = Math.round((completedDays / daysInMonth) * 100);

  return (
    <span className="text-xs text-gray-400">
      {completedDays}/{daysInMonth} ({percentage}%)
    </span>
  );
};

export default HabitStats;