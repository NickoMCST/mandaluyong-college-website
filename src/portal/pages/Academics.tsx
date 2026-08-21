import { useState } from 'react';
import { User, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

type Tab = 'overview' | 'grades' | 'schedule' | 'history';

const subjects = [
  { code: 'IS 301', name: 'Data Warehousing', units: 3, instructor: 'Dr. Maria Santos', schedule: 'MWF 7:30–8:30 AM', room: 'Room 201', midterm: 88, final: null },
  { code: 'IS 302', name: 'Data Mining', units: 3, instructor: 'Prof. Jose Reyes', schedule: 'TTh 8:00–9:30 AM', room: 'Room 305', midterm: 91, final: null },
  { code: 'IS 303', name: 'Application Development', units: 3, instructor: 'Dr. Ana Lim', schedule: 'MWF 9:30–10:30 AM', room: 'CL 1', midterm: 85, final: null },
  { code: 'IS 304', name: 'IT Infrastructure and Network Technologies', units: 3, instructor: 'Prof. Carlos Cruz', schedule: 'TTh 10:00–11:30 AM', room: 'Room 108', midterm: 82, final: null },
  { code: 'IS 305', name: 'Computer Programming', units: 3, instructor: 'Ms. Rosa Garcia', schedule: 'MWF 1:00–2:00 PM', room: 'Room 112', midterm: 90, final: null },
];

const prevSemesters = [
  { sem: 'AY 2025–2026, 1st Semester', gwa: '1.50', units: 21, status: 'Passed' },
  { sem: 'AY 2024–2025, 2nd Semester', gwa: '1.75', units: 21, status: 'Passed' },
  { sem: 'AY 2024–2025, 1st Semester', gwa: '1.75', units: 21, status: 'Passed' },
];

function gradeColor(score: number) {
  if (score >= 90) return 'text-success';
  if (score >= 75) return 'text-foreground';
  return 'text-error';
}

export default function Academics() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const totalUnits = subjects.reduce((acc, s) => acc + s.units, 0);
  const avgMidterm = Math.round(subjects.reduce((acc, s) => acc + s.midterm, 0) / subjects.length);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'grades', label: 'Grades' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'history', label: 'History' },
  ];

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="font-serif text-4xl text-foreground leading-[1.1]">Academics</h1>
        <p className="text-muted-foreground text-sm mt-2">AY 2025–2026 &middot; 2nd Semester &middot; BS Information Systems &middot; BSIS 3-1</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm border-b-2 transition-colors -mb-px',
              activeTab === tab.id
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_248px] gap-6">
          <div className="space-y-1.5">
            {subjects.map((s) => (
              <div
                key={s.code}
                className="bg-card border border-border rounded-md px-4 py-3.5 flex items-center gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="shrink-0 w-16">
                  <p className="font-mono text-[11px] font-semibold text-primary">{s.code}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.units} units</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {s.instructor}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className={cn('font-mono text-base font-semibold', gradeColor(s.midterm))}>
                    {s.midterm}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Midterm</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-md p-4">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
                Current Standing
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Midterm Average</span>
                    <span className={cn('font-mono font-semibold', gradeColor(avgMidterm))}>{avgMidterm}</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: `${avgMidterm}%` }} />
                  </div>
                </div>
                <div className="pt-3 border-t border-border space-y-2.5 text-[11.5px]">
                  {[
                    { label: 'Units Enrolled', value: totalUnits.toString() },
                    { label: 'Subjects', value: subjects.length.toString() },
                    { label: 'Final Grades', value: 'In Progress' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium font-mono text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grades */}
      {activeTab === 'grades' && (
        <div className="bg-card border border-border rounded-md overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-[11px] text-muted-foreground">Final grades are not yet available — examinations in progress.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Subject</th>
                  <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Units</th>
                  <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Midterm</th>
                  <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {subjects.map((s) => (
                  <tr key={s.code} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-mono text-[10.5px] text-primary font-semibold">{s.code}</p>
                      <p className="text-[13px] font-medium text-foreground mt-0.5">{s.name}</p>
                    </td>
                    <td className="text-center px-4 py-3.5 text-[11px] text-muted-foreground">{s.units}</td>
                    <td className="text-center px-4 py-3.5">
                      <span className={cn('font-mono font-semibold text-sm', gradeColor(s.midterm))}>{s.midterm}</span>
                    </td>
                    <td className="text-center px-4 py-3.5 text-[11px] text-muted-foreground/50 italic">Pending</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-border bg-secondary/30">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold">Total</td>
                  <td className="text-center px-4 py-3 font-mono font-semibold text-sm">{totalUnits}</td>
                  <td className="text-center px-4 py-3 font-mono font-semibold text-success">{avgMidterm}</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Schedule */}
      {activeTab === 'schedule' && (
        <div className="bg-card border border-border rounded-md divide-y divide-border">
          {subjects.map((s) => (
            <div key={s.code} className="px-4 py-3.5 flex items-start gap-4">
              <div className="shrink-0 w-32">
                <p className="font-mono text-[10.5px] font-semibold text-primary">{s.code}</p>
                <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {s.schedule}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {s.instructor}
                  </span>
                  <span>{s.room}</span>
                </p>
              </div>
              <div className="shrink-0 text-right text-[11px] text-muted-foreground">
                {s.units} units
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="bg-card border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Semester</th>
                <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Units</th>
                <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">GWA</th>
                <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {prevSemesters.map((r) => (
                <tr key={r.sem} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3.5 font-medium">{r.sem}</td>
                  <td className="text-center px-4 py-3.5 font-mono text-muted-foreground">{r.units}</td>
                  <td className="text-center px-4 py-3.5 font-mono font-semibold text-success">{r.gwa}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-success/10 text-success">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
