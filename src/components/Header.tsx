import React, { useState } from 'react';
import { Plus, Settings, LogOut } from 'lucide-react';
import AddHabitDialog from './AddHabitDialog';
import { useAuth } from '../contexts/AuthContext';

type HeaderProps = {
  onAddHabit: (name: string) => void;
};

const Header: React.FC<HeaderProps> = ({ onAddHabit }) => {
  const { signOut } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">
            Engine Power
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Plus className="w-6 h-6 text-gray-400" />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-400" />
            </button>
            
            {/* Settings Dropdown */}
            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddHabitDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={onAddHabit}
      />
    </>
  );
};

export default Header;