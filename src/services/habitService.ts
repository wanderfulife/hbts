import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Habit } from '../types/habit';

const COLLECTION_NAME = 'habits';

export const habitService = {
  async saveHabits(userId: string, habits: Habit[]): Promise<void> {
    const batch = [];
    
    for (const habit of habits) {
      const docRef = doc(db, COLLECTION_NAME, habit.id);
      batch.push(setDoc(docRef, {
        ...habit,
        userId,
        updatedAt: new Date().toISOString()
      }));
    }
    
    await Promise.all(batch);
  },

  async loadHabits(userId: string): Promise<Habit[]> {
    const habitsQuery = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(habitsQuery);
    return snapshot.docs.map(doc => doc.data() as Habit);
  },

  async deleteHabit(habitId: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION_NAME, habitId));
  }
}; 