import { Outlet, NavLink, useLocation, Link } from 'react-router';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  FileText,
  Bell,
  Settings,
  Menu,
  X,
  Search,
  ChevronDown,
  ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from './lib/utils';
import logo from './assets/logo.png';

const navGroups = [
  {
    label: null,
    items: [{ name: 'Dashboard', href: '/', icon: LayoutDashboard }],
  },
  {
    label: 'Academic',
    items: [
      { name: 'Academics', href: '/academics', icon: GraduationCap },
      { name: 'Enrollment', href: '/enrollment', icon: BookOpen },
    ],
  },
  {
    label: 'Services',
    items: [
      { name: 'Documents', href: '/documents', icon: FileText },
      { name: 'Announcements', href: '/announcements', icon: Bell },
    ],
  },
  {
    label: 'Account',
    items: [{ name: 'Settings', href: '/settings', icon: Settings }],
  },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-6 pb-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="MCST" className="w-9 h-9 rounded-full object-cover shrink-0" />
          <div>
            <span className="font-serif text-[1.375rem] text-foreground leading-none block tracking-tight">MCST</span>
            <span className="text-[9px] text-muted-foreground font-medium tracking-[0.1em] uppercase mt-0.5 block">
              Student Portal
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="px-3 pb-3">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 px-2.5 py-2 text-[12.5px] font-medium text-muted-foreground rounded hover:bg-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          Back to Main Website
        </Link>
      </div>
      <div className="mx-3 border-t border-border" />

      <nav className="flex-1 px-3 overflow-y-auto pb-4">
        {navGroups.map((group) => (
          <div key={group.label ?? 'main'} className="mb-5">
            {group.label && (
              <p className="px-2 mb-1.5 text-[9px] uppercase tracking-[0.1em] font-semibold text-muted-foreground/50">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.href);
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'relative flex items-center gap-2.5 px-2.5 py-2 text-[13px] rounded transition-colors overflow-hidden',
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                    onClick={onClose}
                  >
                    {isActive && (
                      <span className="absolute left-0 inset-y-0 w-[2.5px] bg-primary" />
                    )}
                    <item.icon
                      className={cn(
                        'w-[15px] h-[15px] shrink-0',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                    />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-border shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded hover:bg-secondary transition-colors cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=48&h=48&fit=crop&crop=faces&auto=format"
            alt="Lenver Nicko Andes"
            className="w-7 h-7 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-medium text-foreground truncate leading-none mb-0.5">
              Lenver Nicko Andes
            </p>
            <p className="text-[10.5px] text-muted-foreground font-mono truncate">2022-30147</p>
          </div>
          <Settings className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans antialiased" style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[212px] shrink-0 flex-col bg-card border-r border-border">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[212px] bg-card border-r border-border flex flex-col md:hidden">
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between bg-card border-b border-border px-4 h-11 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 -ml-1 text-muted-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <img src={logo} alt="MCST" className="w-6 h-6 rounded-full object-cover" />
            <span className="font-serif text-lg text-foreground">MCST</span>
          </div>
          <button className="relative p-1 -mr-1 text-muted-foreground">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-error" />
          </button>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex h-11 bg-card border-b border-border items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2 text-muted-foreground w-72">
            <Search className="w-3.5 h-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Search portal..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/50 text-foreground"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-error" />
            </button>
            <div className="h-3.5 w-px bg-border" />
            <div className="flex items-center gap-1 text-[11.5px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none">
              <span>AY 2025–2026, 2nd Sem</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
