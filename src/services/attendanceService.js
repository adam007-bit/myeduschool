export function isWithinMorningAttendanceWindow(time, settings) {
  const start = settings?.startTime || '06:30';
  const end = settings?.closingTime || '08:15';
  return time >= start && time <= end;
}

export function getAttendanceStatus(time, settings) {
  const onTimeCutoff = settings?.onTimeCutoff || '07:30';
  const lateCutoff = settings?.lateCutoff || '08:00';
  const closingTime = settings?.closingTime || '08:15';

  if (time <= onTimeCutoff) return 'PRESENT';
  if (time <= lateCutoff) return 'LATE';
  if (time <= closingTime) return 'VERY_LATE';
  return 'CLOSED';
}

export function createAttendanceRecord({ schoolId, studentId, method, timestamp, settings }) {
  const date = new Date(timestamp);
  const time = date.toTimeString().slice(0, 5);
  const status = getAttendanceStatus(time, settings);

  return {
    attendanceId: crypto.randomUUID(),
    schoolId,
    studentId,
    method,
    status,
    timestamp: date.toISOString(),
    attendanceSession: 'MORNING',
  };
}
