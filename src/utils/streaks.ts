import { Habit } from '../types/habit';
import { getDaysInMonth } from './dates';

export const calculateStreak = (habit: Habit): number => {
  let streak = 0;
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate() - 1; // 0-based index

  let checkingMonth = currentMonth;
  let checkingDay = currentDay;

  // Check today first
  const currentMonthProgress = habit.progress[currentMonth];
  if (!currentMonthProgress || !currentMonthProgress[currentDay]) {
    return 0; // No streak if today isn't completed
  }

  while (true) {
    const monthProgress = habit.progress[checkingMonth];
    
    // Check if this day was completed
    if (!monthProgress || !monthProgress[checkingDay]) {
      break;
    }

    streak++;

    // Move to previous day
    checkingDay--;
    
    // If we need to move to the previous month
    if (checkingDay < 0) {
      checkingMonth--;
      // Stop if we go before January
      if (checkingMonth < 0) break;
      // Move to the last day of previous month
      checkingDay = getDaysInMonth(checkingMonth) - 1;
    }

    // Safety limit to prevent infinite loops
    if (streak >= 365) break;
  }

  return streak;
}; 