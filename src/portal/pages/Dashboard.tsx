import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import mcstLogo from '../assets/mcst-watermark.png';

const ANNOUNCEMENTS = [
  {
    title: 'Enrollment for AY 2026–2027 1st Semester',
    tag: 'Important',
    color: '#c0392b',
    body: 'Enrollment for incoming and continuing students will begin on June 2, 2026. Please review your checklist on the Enrollment page.',
    date: 'Aug 15, 2026',
  },
  {
    title: 'Final Examinations Schedule Released',
    tag: 'Academic',
    color: '#1a5fb4',
    body: 'The schedule for 2nd semester final examinations is now available. Check the Academics page for details.',
    date: 'Aug 12, 2026',
  },
  {
    title: 'Library Hours Extended During Finals Week',
    tag: 'General',
    color: '#5a6a8a',
    body: 'The college library will be open until 9:00 PM from August 18–29 to support students during the examination period.',
    date: 'Aug 10, 2026',
  },
];

const DEADLINES = [
  { label: 'Final Examinations', date: 'Aug 18–29, 2026', urgent: true },
  { label: 'Grade Submission Deadline', date: 'Sep 5, 2026', urgent: true },
  { label: 'Enrollment (Next Semester)', date: 'Jun 2, 2026', urgent: false },
];

const SUBJECTS = [
  { code: 'IT 321', title: 'Information Assurance & Security', units: 3, time: 'MWF 7:30–8:30', room: 'ICT-201' },
  { code: 'IT 322', title: 'Systems Integration & Architecture', units: 3, time: 'TTh 9:00–10:30', room: 'ICT-205' },
  { code: 'IT 323', title: 'Capstone Project 1', units: 3, time: 'MWF 10:30–11:30', room: 'ICT-Lab' },
  { code: 'GE 401', title: 'Life & Works of Rizal', units: 3, time: 'TTh 1:00–2:30', room: 'R-301' },
  { code: 'PE 4', title: 'Physical Education 4', units: 2, time: 'F 3:00–5:00', room: 'Gym' },
];

function GradesIcon() {
  return <svg width={20} height={20} viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 9h8M4 13h10M4 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
function ReqDocIcon() {
  return <svg width={20} height={20} viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M7 7h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
function BellSmIcon() {
  return <svg width={20} height={20} viewBox="0 0 20 20" fill="none"><path d="M10 2A5.5 5.5 0 004.5 7.5v4L3 13h14l-1.5-1.5v-4A5.5 5.5 0 0010 2z" stroke="currentColor" strokeWidth="1.5" /><path d="M8 13a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
function EnrollIcon() {
  return <svg width={20} height={20} viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M2 8h16M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M6 12l2.5 2.5L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function ClockIcon({ size = 10, color = 'currentColor' }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.3" /><path d="M8 4.5V8l2.5 2" stroke={color} strokeWidth="1.3" strokeLinecap="round" /></svg>;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'announcements' | 'subjects'>('announcements');

  return (
    <div className="-mt-8">
      {/* Welcome banner */}
      <div
        className="relative overflow-hidden px-4 sm:px-6 md:px-8 py-5 md:py-7 rounded-t-xl"
        style={{
          background: 'linear-gradient(105deg, #0b1d52 0%, #1a3a8a 55%, #1a5fb4 100%)',
          borderBottom: '3px solid #2575d4',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#ffffff06 1px, transparent 1px), linear-gradient(90deg, #ffffff06 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Watermark seal */}
        <img
          src={mcstLogo}
          alt=""
          aria-hidden="true"
          style={{
            mixBlendMode: 'screen',
            opacity: 0.06,
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 180,
            pointerEvents: 'none',
          }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.24em', color: '#7ab0e8', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
              Dashboard &nbsp;/&nbsp; Overview
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 6vw, 32px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
              Welcome back, <em style={{ fontStyle: 'italic', color: '#7ab0e8' }}>Lenver.</em>
            </h1>
            <p style={{ fontSize: 12.5, color: '#4a7ab4', marginTop: 7 }}>
              AY 2025–2026 &nbsp;·&nbsp; 2nd Semester &nbsp;·&nbsp; Student No. 2022-30147
            </p>
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: '#ffffff12', border: '1px solid #ffffff25', fontSize: 12, color: '#a8d8a8' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: '#5aad6a' }} />
              Enrolled
            </span>
            <span style={{ fontSize: 11, color: '#000000' }}>2nd Semester, A.Y. 2025–2026</span>
          </div>
        </div>

        {/* Stat strip inside banner */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-5 md:mt-6">
          {[
            { label: 'Academic Status', value: 'Good Standing', icon: '✓', accent: '#5aad6a' },
            { label: 'Enrollment Status', value: 'Enrolled', icon: '◉', accent: '#7ab0e8' },
            { label: 'Units Enrolled', value: '15 units', icon: '⊞', accent: '#e8c96a' },
            { label: 'Documents', value: '2 Ready', icon: '▤', accent: '#e8946a' },
          ].map((c, i) => (
            <div
              key={i}
              className="rounded-lg px-4 py-3"
              style={{
                background: '#ffffff0d',
                border: '1px solid #ffffff14',
                backdropFilter: 'blur(4px)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: 10, letterSpacing: '0.1em', color: '#4a7ab4', textTransform: 'uppercase' }}>{c.label}</span>
                <span style={{ fontSize: 12, color: c.accent }}>{c.icon}</span>
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#ffffff' }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="px-4 sm:px-6 md:px-8 py-5 md:py-6" style={{ background: '#e8edf6' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

            {/* Left column */}
            <div className="flex flex-col gap-5">

              {/* Quick actions */}
              <div className="rounded-xl bg-white overflow-hidden" style={{ border: '1px solid #d0daea', boxShadow: '0 1px 6px #0b1d5210' }}>
                <div className="px-5 py-3.5" style={{ borderBottom: '1px solid #edf1f8', background: '#f8fafd' }}>
                  <span style={{ fontSize: 9.5, letterSpacing: '0.2em', color: '#9aaac4', textTransform: 'uppercase', fontWeight: 700 }}>Quick Actions</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: '#edf1f8' }}>
                  {[
                    { label: 'View Grades', icon: <GradesIcon />, desc: 'Check academic records', goTo: '/portal/academics' },
                    { label: 'Request Document', icon: <ReqDocIcon />, desc: 'COE, transcripts & more', goTo: '/portal/documents' },
                    { label: 'Announcements', icon: <BellSmIcon />, desc: 'News & updates', goTo: '/portal/announcements' },
                    { label: 'Enrollment', icon: <EnrollIcon />, desc: 'Manage subjects', goTo: '/portal/enrollment' },
                  ].map((a, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(a.goTo)}
                      className="flex flex-col items-center gap-2 py-4 sm:py-5 px-2 sm:px-3 transition-colors text-center"
                      style={{
                        color: '#1a5fb4',
                        background: 'white',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f4f8ff')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                    >
                      {a.icon}
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1a2a4a' }}>{a.label}</div>
                        <div style={{ fontSize: 10, color: '#9aaac4', marginTop: 2, lineHeight: 1.3 }}>{a.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabs: Announcements / Current Subjects */}
              <div className="rounded-xl bg-white overflow-hidden" style={{ border: '1px solid #d0daea', boxShadow: '0 1px 6px #0b1d5210' }}>
                {/* Tab header */}
                <div className="flex" style={{ borderBottom: '1px solid #edf1f8', background: '#f8fafd' }}>
                  {(['announcements', 'subjects'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className="px-3 sm:px-5 py-3 sm:py-3.5 transition-colors"
                      style={{
                        fontSize: 11.5,
                        fontWeight: tab === t ? 700 : 500,
                        color: tab === t ? '#1a5fb4' : '#8a9ab8',
                        borderBottom: tab === t ? '2px solid #1a5fb4' : '2px solid transparent',
                        letterSpacing: '0.04em',
                        background: 'transparent',
                      }}
                    >
                      {t === 'announcements' ? 'Recent Announcements' : 'Current Subjects'}
                    </button>
                  ))}
                  {tab === 'announcements' && (
                    <Link to="/portal/announcements" className="ml-auto px-3 sm:px-5 flex items-center" style={{ fontSize: 11.5, color: '#1a5fb4', fontWeight: 500 }}>View all →</Link>
                  )}
                </div>

                {/* Tab content */}
                {tab === 'announcements' ? (
                  <div className="divide-y" style={{ borderColor: '#f0f4fa' }}>
                    {ANNOUNCEMENTS.map((ann, i) => (
                      <div key={i} className="flex gap-3 sm:gap-3.5 px-4 sm:px-5 py-4">
                        <div className="w-[3px] shrink-0 rounded-full self-stretch" style={{ background: ann.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1a2a4a' }}>{ann.title}</span>
                            <span
                              className="px-2 py-0.5 rounded text-xs shrink-0"
                              style={{ fontSize: 9.5, background: ann.color + '15', color: ann.color, border: `1px solid ${ann.color}28`, letterSpacing: '0.05em', fontWeight: 600 }}
                            >{ann.tag}</span>
                          </div>
                          <p style={{ fontSize: 12, color: '#5a6a8a', lineHeight: 1.65 }}>{ann.body}</p>
                          <span style={{ fontSize: 10.5, color: '#b0bcd4', marginTop: 5, display: 'block' }}>{ann.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {/* Card view — phones */}
                    <div className="sm:hidden divide-y" style={{ borderColor: '#f0f4fa' }}>
                      {SUBJECTS.map((s, i) => (
                        <div key={i} className="px-4 py-3.5 flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#1a5fb4', fontFamily: 'JetBrains Mono, monospace' }}>{s.code}</span>
                            <span style={{ fontSize: 11, color: '#5a6a8a' }}>{s.units} units</span>
                          </div>
                          <div style={{ fontSize: 12.5, color: '#1a2a4a', fontWeight: 500 }}>{s.title}</div>
                          <div className="flex items-center justify-between gap-2 mt-0.5">
                            <span style={{ fontSize: 11.5, color: '#5a6a8a' }}>{s.time}</span>
                            <span style={{ fontSize: 11.5, color: '#9aaac4' }}>{s.room}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Table view — tablet & up */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
                        <thead>
                          <tr style={{ background: '#f8fafd' }}>
                            {['Code', 'Subject', 'Units', 'Schedule', 'Room'].map(h => (
                              <th key={h} style={{ fontSize: 9.5, letterSpacing: '0.14em', color: '#9aaac4', textTransform: 'uppercase', fontWeight: 700, padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid #edf1f8' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {SUBJECTS.map((s, i) => (
                            <tr key={i} style={{ borderBottom: i < SUBJECTS.length - 1 ? '1px solid #f0f4fa' : 'none' }}
                              onMouseEnter={e => (e.currentTarget.style.background = '#f4f8ff')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                              <td style={{ padding: '11px 16px', fontSize: 12, fontWeight: 700, color: '#1a5fb4', fontFamily: 'JetBrains Mono, monospace' }}>{s.code}</td>
                              <td style={{ padding: '11px 16px', fontSize: 12.5, color: '#1a2a4a', fontWeight: 500 }}>{s.title}</td>
                              <td style={{ padding: '11px 16px', fontSize: 12, color: '#5a6a8a', textAlign: 'center' }}>{s.units}</td>
                              <td style={{ padding: '11px 16px', fontSize: 11.5, color: '#5a6a8a' }}>{s.time}</td>
                              <td style={{ padding: '11px 16px', fontSize: 11.5, color: '#9aaac4' }}>{s.room}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="px-4 sm:px-5 py-3 flex items-center justify-between" style={{ background: '#f8fafd', borderTop: '1px solid #edf1f8' }}>
                      <span style={{ fontSize: 11.5, color: '#8a9ab8' }}>5 subjects enrolled</span>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: '#1a5fb4' }}>Total: 15 units</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">

              {/* Semester progress */}
              <div className="rounded-xl bg-white px-5 py-4" style={{ border: '1px solid #d0daea', boxShadow: '0 1px 6px #0b1d5210' }}>
                <div style={{ fontSize: 9.5, letterSpacing: '0.2em', color: '#9aaac4', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Semester Progress</div>
                <div className="flex justify-between items-end mb-2">
                  <span style={{ fontSize: 12, color: '#5a6a8a' }}>2nd Semester</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1a5fb4' }}>68%</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 6, background: '#e8edf6' }}>
                  <div style={{ height: '100%', width: '68%', background: 'linear-gradient(90deg, #1a5fb4, #4a9fe0)', borderRadius: 9999 }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span style={{ fontSize: 10, color: '#b0bcd4' }}>Aug 5</span>
                  <span style={{ fontSize: 10, color: '#b0bcd4' }}>Dec 20</span>
                </div>
              </div>

              {/* Deadlines */}
              <div className="rounded-xl bg-white overflow-hidden" style={{ border: '1px solid #d0daea', boxShadow: '0 1px 6px #0b1d5210' }}>
                <div className="px-5 py-3.5" style={{ borderBottom: '1px solid #edf1f8', background: '#f8fafd' }}>
                  <span style={{ fontSize: 9.5, letterSpacing: '0.2em', color: '#9aaac4', textTransform: 'uppercase', fontWeight: 700 }}>Upcoming Deadlines</span>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3.5">
                  {DEADLINES.map((d, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div
                        className="w-5 h-5 shrink-0 rounded flex items-center justify-center mt-0.5"
                        style={{
                          background: d.urgent ? '#fff5f5' : '#f4f7fc',
                          border: `1px solid ${d.urgent ? '#f0a5a5' : '#d0daea'}`,
                        }}
                      >
                        <ClockIcon size={9} color={d.urgent ? '#c0392b' : '#8a9ab8'} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1a2a4a' }}>{d.label}</div>
                        <div style={{ fontSize: 11, color: '#9aaac4', marginTop: 1 }}>{d.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student profile card */}
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #d0daea', boxShadow: '0 1px 6px #0b1d5210' }}>
                {/* Banner */}
                <div
                  className="relative overflow-hidden px-5 py-5 flex items-center gap-4"
                  style={{ background: 'linear-gradient(115deg, #0b1d52 0%, #1a5fb4 100%)' }}
                >
                  <img
                    src={mcstLogo}
                    alt=""
                    aria-hidden="true"
                    style={{
                      mixBlendMode: 'screen',
                      opacity: 0.1,
                      position: 'absolute',
                      right: -14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 80,
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: '#0b1d52', border: '2.5px solid #4a9fe0' }}
                  >
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: '#ffffff' }}>LN</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: '#ffffff' }}>Lenver Nicko Andes</div>
                    <div style={{ fontSize: 10.5, color: '#7ab0e8', marginTop: 2, letterSpacing: '0.04em' }}>Student ID: 2022-30147</div>
                  </div>
                </div>

                {/* Fields */}
                <div className="bg-white">
                  <div className="px-5 pt-4 pb-1">
                    <span style={{ fontSize: 9, letterSpacing: '0.22em', color: '#9aaac4', textTransform: 'uppercase', fontWeight: 700 }}>Student Profile</span>
                  </div>
                  {[
                    ['Program', 'BS Information Systems'],
                    ['Year Level', '3rd Year, 2nd Sem'],
                    ['Section', 'BSIS 3-1'],
                    ['Status', 'Regularly Enrolled'],
                  ].map(([k, v], i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center px-5 py-3"
                      style={{ borderTop: '1px solid #f0f4fa' }}
                    >
                      <span style={{ fontSize: 12, color: '#8a9ab8' }}>{k}</span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: k === 'Status' ? '#2e7d32' : '#0d2260',
                        background: k === 'Status' ? '#e8f5e9' : 'transparent',
                        padding: k === 'Status' ? '2px 8px' : '0',
                        borderRadius: k === 'Status' ? 20 : 0,
                        border: k === 'Status' ? '1px solid #a5d6a7' : 'none',
                      }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
