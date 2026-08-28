import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';

export const schoolRef = (schoolId) => doc(db, 'schools', schoolId);
export const schoolCollection = (schoolId, collectionName) => collection(db, 'schools', schoolId, collectionName);

export async function getSchool(schoolId) {
  const snapshot = await getDoc(schoolRef(schoolId));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function createSchool(schoolId, data) {
  await setDoc(schoolRef(schoolId), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return schoolId;
}

export async function createSchoolRecord(schoolId, collectionName, data) {
  const ref = await addDoc(schoolCollection(schoolId, collectionName), { ...data, schoolId, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return ref.id;
}

export async function getSchoolRecords(schoolId, collectionName, constraints = []) {
  const base = collection(db, 'schools', schoolId, collectionName);
  const snapshot = await getDocs(query(base, ...constraints));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export function activeStudentsQuery(schoolId) {
  return query(schoolCollection(schoolId, 'students'), where('status', '==', 'ACTIVE'), orderBy('name'), limit(2000));
}

export function attendanceDateQuery(schoolId, dateKey) {
  return query(schoolCollection(schoolId, 'attendance'), where('dateKey', '==', dateKey), orderBy('timestamp', 'desc'));
}
