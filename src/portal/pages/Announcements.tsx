import { useState } from 'react';
import { Bell } from 'lucide-react';
import { cn } from '../lib/utils';

type AnnType = 'important' | 'academic' | 'enrollment' | 'general';

const all = [
  {
    id: 1,
    title: 'Enrollment for AY 2026–2027 1st Semester',
    body: 'Enrollment for incoming and continuing students will begin on June 2, 2026. Returning students must secure a clearance from the current semester before proceeding. Please review the enrollment checklist available at the Registrar\'s Office.',
    date: 'Aug 15, 2026',
    type: 'enrollment' as AnnType,
    read: false,
  },
  {
    id: 2,
    title: 'Final Examinations Schedule — 2nd Semester AY 2025–2026',
    body: 'The schedule for 2nd semester final examinations is now available. Examinations will be held from August 18 to 29, 2026. Students are advised to check with their respective instructors for room assignments.',
    date: 'Aug 12, 2026',
    type: 'academic' as AnnType,
    read: false,
  },
  {
    id: 3,
    title: 'Library Hours Extended During Finals Week',
    body: 'The college library will be open until 9:00 PM from August 18–29 to support students during the examination period. Students are reminded to bring their school ID for entry.',
    date: 'Aug 10, 2026',
    type: 'general' as AnnType,
    read: true,
  },
  {
    id: 4,
    title: 'Scholarship Applications Now Open',
    body: 'Applications for government scholarships and MCST-administered financial assistance are now open for the next academic year. Eligible students may apply at the Student Affairs Office. Deadline for submission is September 15, 2026.',
    date: 'Aug 8, 2026',
    type: 'important' as AnnType,
    read: true,
  },
  {
    id: 5,
    title: 'Campus Clean-Up Day — August 17',
    body: 'All students are requested to participate in the College-wide Campus Clean-Up Day on August 17, 2026 (Saturday). Report to your respective department by 7:00 AM.',
    date: 'Aug 5, 2026',
    type: 'general' as AnnType,
    read: true,
  },
  {
    id: 6,
    title: 'Academic Calendar Update',
    body: 'The Academic Calendar for AY 2025–2026 has been updated. The semester will end on September 5, 2026. Grade submission deadline for faculty is September 10, 2026.',
    date: 'Jul 28, 2026',
    type: 'academic' as AnnType,
    read: true,
  },
];

const typeConfig: Record<AnnType, { label: string; className: string }> = {
  important: { label: 'Important', className: 'bg-error/10 text-error' },
  academic: { label: 'Academic', className: 'bg-primary/10 text-primary' },
  enrollment: { label: 'Enrollment', className: 'bg-warning/10 text-warning' },
  general: { label: 'General', className: 'bg-secondary text-secondary-foreground' },
};

const filters: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Important', value: 'important' },
  { label: 'Academic', value: 'academic' },
  { label: 'Enrollment', value: 'enrollment' },
  { label: 'General', value: 'general' },
];

export default function Announcements() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<number | null>(1);

  const filtered = filter === 'all' ? all : all.filter((a) => a.type === filter);

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="font-serif text-4xl text-foreground leading-[1.1]">Announcements</h1>
        <p className="text-muted-foreground text-sm mt-2">School notices, academic updates, and important information.</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              'text-[12px] px-3 py-1.5 rounded border transition-colors',
              filter === f.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-md px-5 py-12 text-center">
          <Bell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-[13px] text-muted-foreground">No announcements in this category.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((a) => (
            <div
              key={a.id}
              className={cn(
                'bg-card border border-border rounded-md overflow-hidden',
                !a.read && 'border-l-2 border-l-primary'
              )}
            >
              <button
                className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-secondary/30 transition-colors"
                onClick={() => setExpanded(expanded === a.id ? null : a.id)}
              >
                {!a.read && <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                {a.read && <span className="mt-2 w-1.5 h-1.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className={cn('text-[13px] font-medium leading-snug', !a.read ? 'text-foreground' : 'text-foreground/80')}>
                      {a.title}
                    </p>
                    <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0', typeConfig[a.type].className)}>
                      {typeConfig[a.type].label}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/60">{a.date}</p>
                </div>
              </button>
              {expanded === a.id && (
                <div className="px-5 pb-4 pt-0 pl-[2.875rem]">
                  <p className="text-[12.5px] text-muted-foreground leading-relaxed">{a.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
