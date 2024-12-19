import React from 'react';

type HabitSquareProps = {
  completed: boolean;
  color: string;
  onClick: () => void;
};

const HabitSquare: React.FC<HabitSquareProps> = ({ completed, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full aspect-square rounded-[2px] transition-all duration-200 cursor-pointer hover:opacity-80 ${
        completed ? color + ' opacity-100' : 'bg-gray-800/50 hover:bg-gray-700/50'
      }`}
    />
  );
};

export default HabitSquare;