const IC_HEADERS = ['ic', 'no ic', 'no. ic', 'no kad pengenalan', 'kad pengenalan', 'mykad', 'identification number', 'identification no'];

export function normalizeHeader(value = '') {
  return String(value).trim().toLowerCase().replace(/[._-]+/g, ' ').replace(/\s+/g, ' ');
}

export function detectSensitiveColumns(headers = []) {
  return headers.filter((header) => IC_HEADERS.includes(normalizeHeader(header)));
}

export function maskIdentification(value = '') {
  const raw = String(value).trim();
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 4) return '••••';
  return `${'•'.repeat(Math.max(0, raw.length - 4))}${raw.slice(-4)}`;
}

export function validatePbdValue(value) {
  const numeric = Number(String(value).replace(/[^0-9]/g, ''));
  return Number.isInteger(numeric) && numeric >= 1 && numeric <= 6 ? numeric : null;
}

export function validateMark(value, maximum = 100) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 && numeric <= maximum ? numeric : null;
}

export function summarizePbd(records = []) {
  const counts = Object.fromEntries([1, 2, 3, 4, 5, 6].map((tp) => [`TP${tp}`, 0]));
  records.forEach((record) => { const tp = validatePbdValue(record.tp); if (tp) counts[`TP${tp}`] += 1; });
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  return { counts, total, percentages: Object.fromEntries(Object.entries(counts).map(([key, value]) => [key, total ? Number(((value / total) * 100).toFixed(1)) : 0])) };
}

export function summarizeExam(records = []) {
  const marks = records.map((record) => Number(record.mark)).filter(Number.isFinite);
  if (!marks.length) return { count: 0, average: 0, highest: 0, lowest: 0, passRate: 0 };
  const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
  const passCount = marks.filter((mark) => mark >= 40).length;
  return { count: marks.length, average: Number(average.toFixed(1)), highest: Math.max(...marks), lowest: Math.min(...marks), passRate: Number(((passCount / marks.length) * 100).toFixed(1)) };
}
