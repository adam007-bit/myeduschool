import { useMemo, useState } from 'react';
import { defaultSchoolSettings } from '../config/schoolConfig';
import { getAttendanceStatus, isWithinMorningAttendanceWindow } from '../services/attendanceService';

export default function MorningAttendance({ school, onSave }) {
  const [settings, setSettings] = useState({ ...defaultSchoolSettings.attendance, ...(school?.attendance || {}) });
  const [message, setMessage] = useState('');
  const status = useMemo(() => getAttendanceStatus(new Date().toTimeString().slice(0, 5), settings), [settings]);
  const active = isWithinMorningAttendanceWindow(new Date().toTimeString().slice(0, 5), settings);

  const update = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
  const save = () => { onSave?.(settings); setMessage('Attendance settings saved for this school.'); };

  return (
    <section className="attendance-settings">
      <div className="module-header"><div><span className="eyebrow">ATTENDANCE · MORNING SESSION</span><h2>Morning attendance</h2><p>Face recognition is available only during the school's configured morning window.</p></div><span className={`status-pill ${active ? 'open' : 'closed'}`}>{active ? 'WINDOW OPEN' : 'WINDOW CLOSED'}</span></div>
      <div className="attendance-card-grid">
        <article className="attendance-card"><span>Morning face recognition</span><strong>{settings.morningFaceEnabled ? 'Enabled' : 'Disabled'}</strong><button className="toggle" type="button" onClick={() => update('morningFaceEnabled', !settings.morningFaceEnabled)}>{settings.morningFaceEnabled ? 'Turn off' : 'Turn on'}</button><small>Face attendance is restricted to the morning session.</small></article>
        <article className="attendance-card"><span>QR attendance</span><strong>{settings.qrEnabled ? 'Enabled' : 'Disabled'}</strong><button className="toggle" type="button" onClick={() => update('qrEnabled', !settings.qrEnabled)}>{settings.qrEnabled ? 'Turn off' : 'Turn on'}</button><small>Useful as a fallback to face attendance.</small></article>
      </div>
      <div className="time-settings"><h3>School attendance schedule</h3><div className="time-grid">
        <label>Start time<input type="time" value={settings.startTime} onChange={(e) => update('startTime', e.target.value)} /></label>
        <label>On-time cutoff<input type="time" value={settings.onTimeCutoff} onChange={(e) => update('onTimeCutoff', e.target.value)} /></label>
        <label>Late cutoff<input type="time" value={settings.lateCutoff} onChange={(e) => update('lateCutoff', e.target.value)} /></label>
        <label>Closing time<input type="time" value={settings.closingTime} onChange={(e) => update('closingTime', e.target.value)} /></label>
      </div><div className="attendance-preview"><span>Current status</span><strong>{status.replace('_', ' ')}</strong><small>Based on the current local device time.</small></div></div>
      <div className="module-actions"><button className="primary-button" onClick={save}>Save Attendance Settings</button>{message && <span className="save-message">✓ {message}</span>}</div>
    </section>
  );
}
