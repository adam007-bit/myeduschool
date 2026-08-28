import { useMemo, useState } from 'react';
import { detectSensitiveColumns, maskIdentification, summarizeExam, summarizePbd } from '../services/academicImportService';

export default function SecureAcademicImport() {
  const [type, setType] = useState('PBD');
  const [headers, setHeaders] = useState([]);
  const [sensitive, setSensitive] = useState([]);
  const [consented, setConsented] = useState(false);
  const [status, setStatus] = useState('');
  const [pbdSummary, setPbdSummary] = useState(null);
  const [examSummary, setExamSummary] = useState(null);
  const [preview, setPreview] = useState(null);

  const templateHeaders = useMemo(() => type === 'PBD'
    ? ['Student ID', 'Nama Murid', 'No. Kad Pengenalan', 'Kelas', 'Mata Pelajaran', 'Tahap Penguasaan']
    : ['Student ID', 'Nama Murid', 'No. Kad Pengenalan', 'Kelas', 'Mata Pelajaran', 'Markah', 'Gred'], [type]);

  function inspectFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const allowed = ['.csv', '.xlsx', '.xls'];
    if (!allowed.some((ext) => file.name.toLowerCase().endsWith(ext))) { setStatus('Unsupported file. Please upload CSV or Excel.'); return; }
    // Client-side demo inspection. Production should parse on a trusted backend/worker.
    const found = detectSensitiveColumns(templateHeaders);
    setHeaders(templateHeaders);
    setSensitive(found);
    setPreview({ name: file.name, size: `${(file.size / 1024).toFixed(1)} KB` });
    setStatus('File inspected. Review sensitive columns before processing.');
  }

  function processImport() {
    if (!consented) { setStatus('Please confirm the school is authorized to process this file.'); return; }
    if (!preview) { setStatus('Choose a file first.'); return; }
    if (type === 'PBD') {
      setPbdSummary(summarizePbd([]));
      setExamSummary(null);
    } else {
      setExamSummary(summarizeExam([]));
      setPbdSummary(null);
    }
    setStatus('Import validation completed. Connect this workflow to the secure server parser before production use.');
  }

  return <section className="secure-import">
    <div className="module-header"><div><span className="eyebrow">ACADEMIC DATA · PRIVACY FIRST</span><h2>Secure PBD & Peperiksaan Import</h2><p>Upload an authorized Excel/CSV export, review sensitive fields, validate records and generate analysis.</p></div><span className="status-pill open">SECURE IMPORT</span></div>

    <div className="import-tabs"><button className={type === 'PBD' ? 'active' : ''} onClick={() => setType('PBD')}>PBD Import</button><button className={type === 'PEPERIKSAAN' ? 'active' : ''} onClick={() => setType('PEPERIKSAAN')}>Peperiksaan Import</button></div>

    <div className="privacy-banner"><strong>⚠ Sensitive data protection</strong><span>If the source contains IC numbers, they are used only for controlled matching and should not become the permanent student identifier.</span></div>

    <div className="import-card"><label className="file-drop"> <strong>Choose Excel / CSV file</strong><span>Supported: .xlsx, .xls, .csv · Maximum 10 MB</span><input type="file" accept=".xlsx,.xls,.csv" onChange={inspectFile} /></label>
      {preview && <div className="file-summary"><strong>{preview.name}</strong><span>{preview.size}</span><span className="status-pill open">INSPECTED</span></div>}
    </div>

    <div className="mapping-card"><div className="mapping-title"><h3>Detected columns</h3><small>Review before processing</small></div>{headers.length ? <div className="column-list">{headers.map((header) => <div key={header}><span>{header}</span>{sensitive.includes(header) ? <b className="sensitive">SENSITIVE · {maskIdentification('010101-01-1234')}</b> : <b>READY</b>}</div>)}</div> : <div className="empty-state">Upload a file to inspect its columns.</div>}</div>

    <label className="consent-check"><input type="checkbox" checked={consented} onChange={(e) => setConsented(e.target.checked)} /><span>I confirm that the school is authorized to process the uploaded academic data.</span></label>
    <div className="module-actions"><button className="primary-button" onClick={processImport}>Validate & Generate Analysis →</button>{status && <span className="save-message">{status}</span>}</div>

    {pbdSummary && <div className="analysis-card"><h3>PBD analysis ready</h3><p>{pbdSummary.total} valid PBD records detected.</p></div>}
    {examSummary && <div className="analysis-card"><h3>Peperiksaan analysis ready</h3><p>{examSummary.count} valid marks detected · Average {examSummary.average}% · Pass rate {examSummary.passRate}%</p></div>}
  </section>;
}
