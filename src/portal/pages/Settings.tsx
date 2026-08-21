import { useState } from 'react';
import { User, Bell, Shield, Save } from 'lucide-react';
import { cn } from '../lib/utils';

type Tab = 'profile' | 'notifications' | 'security';

type NotifKey = 'announcements' | 'academics' | 'enrollment' | 'documents';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>({
    announcements: true,
    academics: true,
    enrollment: true,
    documents: true,
  });

  const toggle = (key: NotifKey) => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="font-serif text-4xl text-foreground leading-[1.1]">Settings</h1>
        <p className="text-muted-foreground text-sm mt-2">Manage your account and notification preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border flex">
        {(
          [
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
          ] as { id: Tab; label: string; icon: React.ElementType }[]
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 text-sm border-b-2 transition-colors -mb-px',
              activeTab === id
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Profile */}
      {activeTab === 'profile' && (
        <div className="max-w-xl space-y-5">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces&auto=format"
              alt="Lenver Nicko Andes"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-border"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">Lenver Nicko Andes</p>
              <p className="font-mono text-[11px] text-muted-foreground">2022-30147</p>
              <button className="text-xs text-primary hover:underline mt-1">Change photo</button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-md divide-y divide-border">
            {[
              { label: 'Full Name', value: 'Andes, Lenver Nicko', editable: false },
              { label: 'Student Number', value: '2022-30147', editable: false },
              { label: 'Email Address', value: 'lenvernicko.andes@mcst.edu.ph', editable: true },
              { label: 'Contact Number', value: '+63 917 000 0000', editable: true },
              { label: 'Program', value: 'BS Information Systems', editable: false },
              { label: 'Section', value: 'BSIS 3-1', editable: false },
            ].map((field) => (
              <div key={field.label} className="px-4 py-3.5 flex items-center gap-4">
                <span className="shrink-0 w-32 text-[11.5px] text-muted-foreground">{field.label}</span>
                <div className="flex-1">
                  {field.editable ? (
                    <input
                      defaultValue={field.value}
                      className="w-full text-sm font-medium bg-transparent border-none outline-none text-foreground"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground">{field.value}</p>
                  )}
                </div>
                {!field.editable && (
                  <span className="shrink-0 text-[9.5px] text-muted-foreground/40 uppercase tracking-wide">
                    Read-only
                  </span>
                )}
              </div>
            ))}
          </div>

          <button className="bg-primary text-white px-5 py-2 rounded text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Save className="w-3.5 h-3.5" />
            Save Changes
          </button>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="max-w-xl">
          <div className="bg-card border border-border rounded-md divide-y divide-border">
            {(
              [
                { key: 'announcements', label: 'Announcements', desc: 'School notices and important updates' },
                { key: 'academics', label: 'Academic Deadlines', desc: 'Grade submissions and examination schedules' },
                { key: 'enrollment', label: 'Enrollment Notices', desc: 'Enrollment period reminders' },
                { key: 'documents', label: 'Document Updates', desc: 'Status updates for your document requests' },
              ] as { key: NotifKey; label: string; desc: string }[]
            ).map((item) => (
              <div key={item.key} className="px-4 py-3.5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-[11.5px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className={cn(
                    'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus:outline-none',
                    notifs[item.key] ? 'bg-primary' : 'bg-secondary'
                  )}
                  aria-label={`Toggle ${item.label}`}
                >
                  <span
                    className={cn(
                      'inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform',
                      notifs[item.key] ? 'translate-x-4' : 'translate-x-0.5'
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <div className="max-w-xl space-y-4">
          <div className="bg-card border border-border rounded-md p-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Change Password</h3>
            {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
              <div key={label} className="space-y-1.5">
                <label className="text-[11.5px] font-medium text-muted-foreground">{label}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            ))}
            <button className="bg-primary text-white px-5 py-2 rounded text-sm font-semibold hover:bg-primary/90 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
