import { useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import HabitGrid from './components/HabitGrid';
import MonthSelector from './components/MonthSelector';
import { useHabits } from './hooks/useHabits';

function App() {
  const { user, isLoading } = useAuth();
  const {
    habits,
    currentMonth,
    setCurrentMonth,
    addHabit,
    deleteHabit,
    toggleHabitProgress,
    isLoading: habitsLoading
  } = useHabits();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-xl mx-auto px-4 py-6">
        <Header onAddHabit={addHabit} />
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
          <MonthSelector
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />
          {habitsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          ) : habits.length === 0 ? (
            <p className="text-center text-gray-400 py-8">
              No habits yet. Click the + button to add one!
            </p>
          ) : (
            habits.map((habit) => (
              <HabitGrid
                key={habit.id}
                habit={habit}
                month={currentMonth}
                onToggle={(day) => toggleHabitProgress(habit.id, day)}
                onDelete={deleteHabit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;