import { useMemo, useState } from 'react';
import { defaultSchoolSettings, subscriptionPlans } from '../config/schoolConfig';
import { createSchoolDraft, validateSchoolRegistration } from '../services/tenantService';

const states = ['Perlis', 'Kedah', 'Pulau Pinang', 'Perak', 'Selangor', 'Kuala Lumpur', 'Putrajaya', 'Negeri Sembilan', 'Melaka', 'Johor', 'Pahang', 'Terengganu', 'Kelantan', 'Sabah', 'Sarawak'];

export default function SchoolRegistration({ onComplete }) {
  const [form, setForm] = useState({ ...defaultSchoolSettings, adminName: '', adminEmail: '', password: '', planId: 'school' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const selectedPlan = useMemo(() => subscriptionPlans.find((p) => p.id === form.planId), [form.planId]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateSchoolRegistration(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const school = createSchoolDraft(form);
    setSubmitted(true);
    onComplete?.(school);
  };

  if (submitted) {
    return (
      <section className="registration-success">
        <div className="success-icon">✓</div>
        <h2>School registration ready</h2>
        <p>Your school workspace has been prepared as a 14-day trial.</p>
        <div className="success-card">
          <strong>{form.name}</strong>
          <span>{form.motto}</span>
          <small>{selectedPlan.name} · RM{selectedPlan.monthlyPrice}/month after trial</small>
        </div>
        <button className="primary-button" onClick={() => onComplete?.(createSchoolDraft(form))}>Open School Dashboard</button>
      </section>
    );
  }

  return (
    <section className="registration-page">
      <div className="registration-header">
        <span className="eyebrow">MYEDUSCHOOL · SCHOOL ONBOARDING</span>
        <h1>Create your school's workspace</h1>
        <p>Set up your school's identity, administrator account and subscription plan.</p>
      </div>

      <form onSubmit={submit} className="registration-form">
        <div className="form-section">
          <h3>School information</h3>
          <div className="form-grid">
            <label>School name<input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="SEKOLAH MENENGAH KEBANGSAAN CONTOH" />{errors.name && <em>{errors.name}</em>}</label>
            <label>School code<input value={form.code} onChange={(e) => update('code', e.target.value)} placeholder="SMKC01" />{errors.code && <em>{errors.code}</em>}</label>
            <label className="wide">School motto<input value={form.motto} onChange={(e) => update('motto', e.target.value)} placeholder="Berilmu, Berdisiplin, Berjaya" />{errors.motto && <em>{errors.motto}</em>}</label>
            <label>School type<select value={form.type} onChange={(e) => update('type', e.target.value)}><option>Sekolah Menengah</option><option>Sekolah Rendah</option><option>Sekolah Swasta</option><option>International School</option><option>Tuition Centre</option></select></label>
            <label>State<select value={form.state} onChange={(e) => update('state', e.target.value)}><option value="">Select state</option>{states.map((state) => <option key={state}>{state}</option>)}</select>{errors.state && <em>{errors.state}</em>}</label>
            <label>District<input value={form.district} onChange={(e) => update('district', e.target.value)} placeholder="District" /></label>
            <label className="wide">Address<input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="School address" /></label>
            <label>School phone<input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="04-1234567" /></label>
            <label>School email<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="school@example.edu.my" /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Administrator account</h3>
          <div className="form-grid">
            <label>Administrator name<input value={form.adminName} onChange={(e) => update('adminName', e.target.value)} placeholder="School administrator" />{errors.adminName && <em>{errors.adminName}</em>}</label>
            <label>Administrator email<input type="email" value={form.adminEmail} onChange={(e) => update('adminEmail', e.target.value)} placeholder="admin@example.com" />{errors.adminEmail && <em>{errors.adminEmail}</em>}</label>
            <label>Password<input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="At least 8 characters" />{errors.password && <em>{errors.password}</em>}</label>
          </div>
        </div>

        <div className="form-section">
          <h3>Choose a plan</h3>
          <div className="plan-grid">
            {subscriptionPlans.map((plan) => (
              <button type="button" key={plan.id} className={`plan-card ${form.planId === plan.id ? 'selected' : ''}`} onClick={() => update('planId', plan.id)}>
                {plan.recommended && <span className="recommended">RECOMMENDED</span>}
                <strong>{plan.name}</strong>
                <b>RM{plan.monthlyPrice}<small>/month</small></b>
                <span>Up to {plan.studentLimit.toLocaleString()} students</span>
                <span>{plan.teacherLimit} teachers</span>
              </button>
            ))}
          </div>
        </div>

        <button className="primary-button submit-button" type="submit">Create School Workspace →</button>
      </form>
    </section>
  );
}
