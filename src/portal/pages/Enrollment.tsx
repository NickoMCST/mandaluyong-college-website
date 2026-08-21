import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const requirements = [
  { label: 'Accomplished Enrollment Form', status: 'done' },
  { label: 'Updated Student Record', status: 'done' },
  { label: 'Clearance from Previous Semester', status: 'done' },
  { label: 'Medical Certificate (Annual)', status: 'done' },
  { label: 'Barangay Clearance (New Students)', status: 'na' },
];

const subjects = [
  { code: 'IS 301', name: 'Data Warehousing', units: 3, schedule: 'MWF 7:30–8:30 AM', room: 'Room 201' },
  { code: 'IS 302', name: 'Data Mining', units: 3, schedule: 'TTh 8:00–9:30 AM', room: 'Room 305' },
  { code: 'IS 303', name: 'Application Development', units: 3, schedule: 'MWF 9:30–10:30 AM', room: 'CL 1' },
  { code: 'IS 304', name: 'IT Infrastructure and Network Technologies', units: 3, schedule: 'TTh 10:00–11:30 AM', room: 'Room 108' },
  { code: 'IS 305', name: 'Computer Programming', units: 3, schedule: 'MWF 1:00–2:00 PM', room: 'Room 112' },
];

function StatusIcon({ status }: { status: string }) {
  if (status === 'done') return <CheckCircle2 className="w-4 h-4 text-success shrink-0" />;
  if (status === 'na') return <span className="w-4 h-4 shrink-0 flex items-center justify-center text-[10px] text-muted-foreground/50">N/A</span>;
  return <Clock className="w-4 h-4 text-warning shrink-0" />;
}

export default function Enrollment() {
  const totalUnits = subjects.reduce((acc, s) => acc + s.units, 0);

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-foreground leading-[1.1]">Enrollment</h1>
          <p className="text-muted-foreground text-sm mt-2">AY 2025–2026, 2nd Semester</p>
        </div>
        <span className="shrink-0 mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-success bg-success/10 border border-success/20 px-2.5 py-1 rounded">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Officially Enrolled
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Enrolled Subjects', value: subjects.length.toString() },
          { label: 'Total Units', value: totalUnits.toString() },
          { label: 'Program / Section', value: 'BSIS 3-1' },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-md px-4 py-4">
            <p className="text-[11px] text-muted-foreground mb-2">{s.label}</p>
            <p className="font-mono text-xl font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_248px] gap-6">
        {/* Subject List */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
            Enrolled Subjects
          </h2>
          <div className="bg-card border border-border rounded-md divide-y divide-border">
            {subjects.map((s) => (
              <div key={s.code} className="px-4 py-3.5 flex items-center gap-4">
                <div className="shrink-0 w-16">
                  <p className="font-mono text-[10.5px] font-semibold text-primary">{s.code}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.units} units</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {s.schedule} &middot; {s.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
            Enrollment Requirements
          </h2>
          <div className="bg-card border border-border rounded-md divide-y divide-border">
            {requirements.map((r) => (
              <div key={r.label} className="px-4 py-3 flex items-center gap-3">
                <StatusIcon status={r.status} />
                <span
                  className={cn(
                    'text-[12.5px]',
                    r.status === 'na' ? 'text-muted-foreground/50 line-through' : 'text-foreground'
                  )}
                >
                  {r.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 bg-success/10 text-success text-[11.5px] font-medium rounded px-3 py-2 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            All requirements submitted
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-accent border border-accent-foreground/10 rounded-md px-5 py-4 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-[12.5px] font-medium text-foreground mb-0.5">MCST is tuition-free</p>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            As a state college, MCST does not charge tuition fees. Enrollment is free for qualified students. For scholarship and financial assistance inquiries, visit the Student Affairs Office.
          </p>
        </div>
      </div>
    </div>
  );
}
