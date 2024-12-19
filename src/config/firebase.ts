import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCdwW0QyINzJpy5Ic2Hr-0uXUwDOxv5s2Y",
    authDomain: "habits-9b6d8.firebaseapp.com",
    projectId: "habits-9b6d8",
    storageBucket: "habits-9b6d8.firebasestorage.app",
    messagingSenderId: "248313003503",
    appId: "1:248313003503:web:72a443f120ac5be35b4a1a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 