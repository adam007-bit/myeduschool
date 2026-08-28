export const ROLES = Object.freeze({ SUPER_ADMIN: 'SUPER_ADMIN', SCHOOL_ADMIN: 'SCHOOL_ADMIN', TEACHER: 'TEACHER', STUDENT: 'STUDENT', PARENT: 'PARENT' });

export function createUserRecord({ uid, schoolId, name, email, role }) {
  if (!uid || !schoolId || !name || !email || !role) throw new Error('uid, schoolId, name, email and role are required');
  if (!Object.values(ROLES).includes(role)) throw new Error('Invalid role');
  return { uid, schoolId, name: name.trim(), email: email.trim().toLowerCase(), role, active: true, createdAt: new Date().toISOString() };
}

export function canAccessSchool(user, schoolId) {
  if (!user || !schoolId) return false;
  return user.role === ROLES.SUPER_ADMIN || user.schoolId === schoolId;
}

export function canManageSchool(user, schoolId) {
  return Boolean(user && (user.role === ROLES.SUPER_ADMIN || (user.role === ROLES.SCHOOL_ADMIN && user.schoolId === schoolId)));
}

export function canManageStudents(user, schoolId) {
  return canManageSchool(user, schoolId) || Boolean(user?.role === ROLES.TEACHER && user.schoolId === schoolId);
}
