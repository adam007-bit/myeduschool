import { useMemo, useState } from 'react';
import { getPlan } from '../config/schoolConfig';

const nav = ['Overview', 'Students', 'Teachers', 'Classes', 'Attendance', 'Homework', 'PBD', 'Peperiksaan', 'Analysis', 'Reports', 'Subscription', 'Settings'];

export default function SchoolAdminDashboard({ school }) {
  const [active, setActive] = useState('Overview');
  const plan = useMemo(() => getPlan(school?.subscription?.planId), [school]);
  const name = school?.name || 'Your School';
  const motto = school?.motto || 'Your school motto';

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="school-brand">
          <div className="school-logo">{school?.logoUrl ? <img src={school.logoUrl} alt="School logo" /> : <span>{name.slice(0, 2).toUpperCase()}</span>}</div>
          <strong>{name}</strong>
          <small>{motto}</small>
        </div>
        <nav>{nav.map((item) => <button key={item} className={active === item ? 'active' : ''} onClick={() => setActive(item)}>{item}</button>)}</nav>
        <div className="trial-box"><span>14-DAY TRIAL</span><strong>Workspace ready</strong><small>{plan.name} plan selected</small></div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar"><div><span className="eyebrow">SCHOOL ADMINISTRATION</span><h1>{active}</h1></div><div className="admin-user"><span>{school?.adminName || 'Administrator'}</span><small>{school?.code || 'SCHOOL'}</small></div></header>
        {active === 'Overview' ? <Overview school={school} plan={plan} /> : <ModulePlaceholder title={active} school={school} />}
      </main>
    </div>
  );
}

function Overview({ school, plan }) {
  const cards = [
    ['Students', '0', `of ${plan.studentLimit.toLocaleString()} allowed`],
    ['Teachers', '0', `of ${plan.teacherLimit} allowed`],
    ['Today attendance', '—', 'No attendance recorded'],
    ['Subscription', 'TRIAL', '14-day trial'],
  ];
  return <>
    <section className="welcome-panel"><div><span className="eyebrow">WELCOME TO MYEDUSCHOOL</span><h2>{school?.name || 'School'} is ready to go.</h2><p>Complete your school profile, add staff and students, then configure your morning attendance schedule.</p></div><div className="brand-mark">{school?.logoUrl ? <img src={school.logoUrl} alt="" /> : 'ME'}</div></section>
    <section className="stat-grid">{cards.map(([label, value, note]) => <article className="stat-card" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>
    <section className="quick-grid"><article><span className="eyebrow">NEXT STEP</span><h3>Configure morning attendance</h3><p>Set the school's face-recognition start time, on-time cutoff, late cutoff and closing time.</p><button>Open Attendance Settings →</button></article><article><span className="eyebrow">ACADEMIC DATA</span><h3>Import PBD / Peperiksaan</h3><p>Securely upload authorized Excel or CSV files and generate analysis without making IC numbers your permanent student identifier.</p><button>Open Secure Import →</button></article></section>
  </>;
}

function ModulePlaceholder({ title, school }) {
  return <section className="module-placeholder"><span className="eyebrow">{school?.name}</span><h2>{title}</h2><p>This module is connected to the school workspace. Its full data workflow will be added in the next implementation phase.</p></section>;
}
