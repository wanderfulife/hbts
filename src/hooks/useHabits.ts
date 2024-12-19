import { useState, useEffect } from 'react';
import { Habit } from '../types/habit';
import { getDaysInMonth } from '../utils/dates';
import { getRandomColor } from '../utils/colors';
import { habitService } from '../services/habitService';
import { useAuth } from '../contexts/AuthContext';

export const useHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [isLoading, setIsLoading] = useState(true);

  // Load habits from Firebase on initial mount
  useEffect(() => {
    const loadHabits = async () => {
      if (!user) return;
      
      try {
        const loadedHabits = await habitService.loadHabits(user.uid);
        setHabits(loadedHabits);
      } catch (error) {
        console.error('Error loading habits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHabits();
  }, [user]);

  // Save habits to Firebase whenever they change
  useEffect(() => {
    if (!isLoading && user) {
      habitService.saveHabits(user.uid, habits)
        .catch(error => console.error('Error saving habits:', error));
    }
  }, [habits, isLoading, user]);

  const addHabit = (name: string) => {
    const { bg, text } = getRandomColor();
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      progress: {},
      color: bg,
      textColor: text,
    };
    setHabits((current) => [...current, newHabit]);
  };

  const deleteHabit = async (habitId: string) => {
    try {
      await habitService.deleteHabit(habitId);
      setHabits((current) => current.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const toggleHabitProgress = (habitId: string, day: number) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id !== habitId) return habit;
        
        const monthProgress = habit.progress[currentMonth] || Array(getDaysInMonth(currentMonth)).fill(false);
        return {
          ...habit,
          progress: {
            ...habit.progress,
            [currentMonth]: monthProgress.map((value, i) =>
              i === day ? !value : value
            ),
          },
        };
      })
    );
  };

  return {
    habits,
    currentMonth,
    setCurrentMonth,
    addHabit,
    deleteHabit,
    toggleHabitProgress,
    isLoading
  };
};