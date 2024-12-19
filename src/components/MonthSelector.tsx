import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTHS } from '../utils/dates';

type MonthSelectorProps = {
  currentMonth: number;
  onMonthChange: (month: number) => void;
};

const MonthSelector: React.FC<MonthSelectorProps> = ({ currentMonth, onMonthChange }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={() => onMonthChange(Math.max(0, currentMonth - 1))}
        className="p-1 hover:bg-gray-800 rounded-full transition-colors"
      >
        <ChevronLeft className="w-4 h-4 text-gray-400" />
      </button>
      <span className="text-sm font-medium text-gray-300">
        {MONTHS[currentMonth]}
      </span>
      <button
        onClick={() => onMonthChange(Math.min(11, currentMonth + 1))}
        className="p-1 hover:bg-gray-800 rounded-full transition-colors"
      >
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
}

export default MonthSelector;