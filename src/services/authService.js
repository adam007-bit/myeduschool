import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const ROLES = Object.freeze({ SUPER_ADMIN: 'SUPER_ADMIN', SCHOOL_ADMIN: 'SCHOOL_ADMIN', TEACHER: 'TEACHER', STUDENT: 'STUDENT', PARENT: 'PARENT' });

export async function registerWithEmail({ email, password, displayName }) {
  const credential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  if (displayName) await updateProfile(credential.user, { displayName: displayName.trim() });
  return credential.user;
}

export async function loginWithEmail(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  return credential.user;
}

export function watchAuth(callback) { return onAuthStateChanged(auth, callback); }
export function logout() { return signOut(auth); }

export async function getCurrentUserProfile(uid) {
  if (!uid) return null;
  const snapshot = await getDoc(doc(db, 'users', uid));
  return snapshot.exists() ? { uid: snapshot.id, ...snapshot.data() } : null;
}

export function createUserRecord({ uid, schoolId, name, email, role }) {
  if (!uid || !schoolId || !name || !email || !role) throw new Error('uid, schoolId, name, email and role are required');
  if (!Object.values(ROLES).includes(role)) throw new Error('Invalid role');
  return { uid, schoolId, name: name.trim(), email: email.trim().toLowerCase(), role, active: true, createdAt: new Date().toISOString() };
}

export function canAccessSchool(user, schoolId) { return Boolean(user && schoolId && (user.role === ROLES.SUPER_ADMIN || user.schoolId === schoolId)); }
export function canManageSchool(user, schoolId) { return Boolean(user && schoolId && (user.role === ROLES.SUPER_ADMIN || (user.role === ROLES.SCHOOL_ADMIN && user.schoolId === schoolId))); }
export function canManageStudents(user, schoolId) { return canManageSchool(user, schoolId) || Boolean(user?.role === ROLES.TEACHER && user.schoolId === schoolId); }
