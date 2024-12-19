import React from 'react';
import { CheckCircle2, Trash2, Flame } from 'lucide-react';
import { HabitGridProps } from '../types/habit';
import HabitSquare from './HabitSquare';
import HabitStats from './HabitStats';
import { getDaysInMonth } from '../utils/dates';
import { calculateStreak } from '../utils/streaks';

const HabitGrid: React.FC<HabitGridProps> = ({ habit, month, onToggle, onDelete }) => {
  const daysInMonth = getDaysInMonth(month);
  const monthProgress = habit.progress[month] || Array(daysInMonth).fill(false);
  const completedDays = monthProgress.filter(Boolean).length;
  const currentStreak = calculateStreak(habit);

  return (
    <div className="mb-4 group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className={`w-4 h-4 ${habit.textColor}`} />
          <span className="text-sm font-medium text-gray-300">{habit.name}</span>
        </div>
        <div className="flex items-center gap-4">
          {currentStreak > 0 && (
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-orange-400 font-medium">
                {currentStreak} day{currentStreak !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <HabitStats completedDays={completedDays} month={month} />
            <button
              onClick={() => onDelete?.(habit.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-800 rounded"
            >
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-[repeat(31,1fr)] gap-0.5 mb-1">
          {Array.from({ length: daysInMonth }, (_, i) => (
            <div key={i} className="text-[10px] text-gray-500 text-center">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(31,1fr)] gap-0.5">
          {monthProgress.map((completed, index) => (
            <HabitSquare
              key={index}
              completed={completed}
              color={habit.color}
              onClick={() => onToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitGrid;