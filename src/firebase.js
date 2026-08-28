import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDfdzmDWCOBNctXLZ08FolQU0ypsmndp_U',
  authDomain: 'saas-school-d768c.firebaseapp.com',
  projectId: 'saas-school-d768c',
  storageBucket: 'saas-school-d768c.firebasestorage.app',
  messagingSenderId: '231050844013',
  appId: '1:231050844013:web:165d350231ff793e95ec64',
  measurementId: 'G-L548EFH9B2',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
