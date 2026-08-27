export const defaultSchoolSettings = {
  name: '',
  code: '',
  motto: '',
  type: 'Sekolah Menengah',
  address: '',
  state: '',
  district: '',
  phone: '',
  email: '',
  logoUrl: '',
  attendance: {
    morningFaceEnabled: true,
    qrEnabled: true,
    manualEnabled: true,
    startTime: '06:30',
    onTimeCutoff: '07:30',
    lateCutoff: '08:00',
    closingTime: '08:15',
  },
};

export const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 19,
    annualPrice: 190,
    studentLimit: 100,
    teacherLimit: 15,
    features: ['students', 'teachers', 'classes', 'basicAttendance', 'qrAttendance', 'homework', 'basicReports'],
  },
  {
    id: 'school',
    name: 'School',
    monthlyPrice: 39,
    annualPrice: 390,
    studentLimit: 500,
    teacherLimit: 50,
    recommended: true,
    features: ['students', 'teachers', 'classes', 'basicAttendance', 'qrAttendance', 'faceAttendance', 'homework', 'pbd', 'peperiksaan', 'secureImport', 'analytics', 'parentPortal', 'studentPortal', 'pdfReports'],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 69,
    annualPrice: 690,
    studentLimit: 1500,
    teacherLimit: 150,
    features: ['students', 'teachers', 'classes', 'basicAttendance', 'qrAttendance', 'faceAttendance', 'homework', 'pbd', 'peperiksaan', 'secureImport', 'analytics', 'advancedAnalytics', 'advancedReports', 'multipleAdmins', 'auditLogs'],
  },
];

export function getPlan(planId) {
  return subscriptionPlans.find((plan) => plan.id === planId) ?? subscriptionPlans[0];
}
