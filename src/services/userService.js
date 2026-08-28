import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function createUserProfile(uid, profile) {
  if (!uid || !profile?.schoolId || !profile?.role) throw new Error('uid, schoolId and role are required');
  await setDoc(doc(db, 'users', uid), {
    uid,
    schoolId: profile.schoolId,
    role: profile.role,
    name: profile.name?.trim() || '',
    email: profile.email?.trim().toLowerCase() || '',
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}
