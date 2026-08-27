import React from 'react';
import { createRoot } from 'react-dom/client';
import { School, ShieldCheck, BarChart3, ClipboardCheck, BookOpen, CreditCard } from 'lucide-react';
import './styles.css';

const modules = [
  { icon: ClipboardCheck, title: 'Attendance', text: 'Morning face attendance, QR and manual attendance.' },
  { icon: BookOpen, title: 'PBD & Peperiksaan', text: 'Secure import, validation and automatic academic analysis.' },
  { icon: BarChart3, title: 'Analytics', text: 'Clear class, subject and student performance trends.' },
  { icon: ShieldCheck, title: 'Privacy by Design', text: 'School-level isolation and minimized sensitive data.' },
  { icon: CreditCard, title: 'Subscriptions', text: 'Affordable school plans with configurable billing.' },
];

function App() {
  return (
    <main className="page">
      <nav className="nav">
        <div className="brand"><div className="brandIcon"><School size={21} /></div><span>MyEduSchool</span></div>
        <button className="login">School Login</button>
      </nav>

      <section className="hero">
        <div className="eyebrow">MALAYSIAN SCHOOL SAAS</div>
        <h1>One smart platform for your <span>school.</span></h1>
        <p>Attendance, homework, PBD, examinations and academic analysis — built as a secure multi-school platform.</p>
        <div className="actions"><button className="primary">Register Your School</button><button className="secondary">View Features</button></div>
        <div className="trust"><ShieldCheck size={17}/> Privacy-first architecture · Affordable plans · School-controlled settings</div>
      </section>

      <section className="modules">
        {modules.map(({icon: Icon, title, text}) => <article className="card" key={title}><Icon size={22}/><h3>{title}</h3><p>{text}</p></article>)}
      </section>

      <footer>MyEduSchool · Built for schools · 2026</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
