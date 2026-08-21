import { Clock, AlertCircle, BookOpen, FileText, Bell, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router';

const stats = [
  { label: 'Academic Status', value: 'Good Standing', sub: 'No academic concerns', icon: TrendingUp, color: 'text-success' },
  { label: 'Enrollment Status', value: 'Enrolled', sub: 'AY 2025–2026, 2nd Sem', icon: BookOpen, color: 'text-primary' },
  { label: 'Units Enrolled', value: '15 units', sub: '5 subjects this semester', icon: Calendar, color: 'text-primary' },
  { label: 'Documents', value: '2 Ready', sub: '1 pending request', icon: FileText, color: 'text-warning' },
];

const quickActions = [
  { name: 'View Grades', href: '/academics', icon: TrendingUp },
  { name: 'Request Document', href: '/documents', icon: FileText },
  { name: 'Announcements', href: '/announcements', icon: Bell },
  { name: 'Enrollment', href: '/enrollment', icon: BookOpen },
];

const announcements = [
  {
    id: 1,
    title: 'Enrollment for AY 2026–2027 1st Semester',
    body: 'Enrollment for incoming and continuing students will begin on June 2, 2026. Please review your checklist on the Enrollment page.',
    date: 'Aug 15, 2026',
    type: 'important',
    read: false,
  },
  {
    id: 2,
    title: 'Final Examinations Schedule Released',
    body: 'The schedule for 2nd semester final examinations is now available. Check the Academics page for details.',
    date: 'Aug 12, 2026',
    type: 'academic',
    read: false,
  },
  {
    id: 3,
    title: 'Library Hours Extended During Finals Week',
    body: 'The college library will be open until 9:00 PM from August 18–29 to support students during the examination period.',
    date: 'Aug 10, 2026',
    type: 'general',
    read: true,
  },
];

const deadlines = [
  { label: 'Final Examinations', date: 'Aug 18–29, 2026', status: 'upcoming' },
  { label: 'Grade Submission Deadline', date: 'Sep 5, 2026', status: 'upcoming' },
  { label: 'Enrollment (Next Semester)', date: 'Jun 2, 2026', status: 'future' },
];

function StatusBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    important: 'bg-error/10 text-error',
    academic: 'bg-primary/10 text-primary',
    general: 'bg-secondary text-secondary-foreground',
  };
  const labels: Record<string, string> = {
    important: 'Important',
    academic: 'Academic',
    general: 'General',
  };
  return (
    <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', map[type] ?? map.general)}>
      {labels[type] ?? type}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-16">
      {/* Welcome */}
      <section className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-foreground leading-[1.1]">Welcome back, Lenver.</h1>
          <p className="text-muted-foreground text-sm mt-2">
            AY 2025–2026 &middot; 2nd Semester &middot; Student No. <span className="font-mono">2022-30147</span>
          </p>
        </div>
        <span className="shrink-0 mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-success bg-success/10 border border-success/20 px-2.5 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          Enrolled
        </span>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-md px-4 py-4">
            <div className="flex items-start justify-between mb-3">
              <p className="text-[11px] font-medium text-muted-foreground">{s.label}</p>
              <s.icon className={cn('w-3.5 h-3.5 shrink-0', s.color)} />
            </div>
            <p className="text-[15px] font-semibold text-foreground leading-tight">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_296px] gap-8">
        <div className="space-y-8">
          {/* Quick Actions */}
          <section>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  to={action.href}
                  className="bg-card border border-border rounded-md px-2 py-3.5 flex flex-col items-center gap-2 hover:border-primary/40 hover:bg-primary/[0.03] transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <action.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[10.5px] font-medium text-center text-muted-foreground group-hover:text-foreground leading-tight transition-colors">
                    {action.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Announcements */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Recent Announcements
              </h2>
              <Link to="/announcements" className="text-[11px] text-primary hover:underline flex items-center gap-0.5">
                View all
              </Link>
            </div>
            <div className="bg-card border border-border rounded-md divide-y divide-border">
              {announcements.map((a) => (
                <div key={a.id} className={cn('px-4 py-3.5', !a.read && 'bg-accent/30')}>
                  <div className="flex items-start gap-2 mb-1">
                    {!a.read && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    {a.read && <span className="mt-1.5 w-1.5 h-1.5 shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-[13px] font-medium text-foreground leading-snug">{a.title}</p>
                        <StatusBadge type={a.type} />
                      </div>
                      <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">{a.body}</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-1">{a.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Deadlines */}
          <section>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
              Upcoming Deadlines
            </h2>
            <div className="bg-card border border-border rounded-md divide-y divide-border">
              {deadlines.map((d) => (
                <div key={d.label} className="flex items-start gap-2.5 px-4 py-3">
                  {d.status === 'upcoming' ? (
                    <AlertCircle className="w-3.5 h-3.5 text-warning mt-0.5 shrink-0" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="text-[12.5px] font-medium text-foreground leading-tight">{d.label}</p>
                    <p className="text-[11px] text-muted-foreground">{d.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Student Profile */}
          <section>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
              Student Profile
            </h2>
            <div className="bg-card border border-border rounded-md overflow-hidden">
              <div className="bg-primary px-4 py-3.5 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces&auto=format"
                  alt="Lenver Nicko Andes"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20 shrink-0"
                />
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Lenver Nicko Andes</p>
                  <p className="text-white/70 font-mono text-[11px] mt-0.5">2022-30147</p>
                </div>
              </div>
              <div className="divide-y divide-border">
                {[
                  { label: 'Program', value: 'BS Information Systems' },
                  { label: 'Year Level', value: '3rd Year, 2nd Sem' },
                  { label: 'Section', value: 'BSIS 3-1' },
                  { label: 'Status', value: 'Regularly Enrolled', ok: true },
                ].map((row) => (
                  <div key={row.label} className="flex px-4 py-2.5 gap-3 text-[12px]">
                    <span className="text-muted-foreground w-20 shrink-0">{row.label}</span>
                    <span className={cn('font-medium flex-1', row.ok && 'text-success')}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
