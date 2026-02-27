import { Search, Bell, Command, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 glass border-b border-glass-border z-20">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground -mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2/60 border border-border text-muted-foreground hover:text-foreground hover:bg-surface-3/60 transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs">Ara...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-muted-foreground bg-surface-3 px-1.5 py-0.5 rounded">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Date display */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-surface-2 transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
            SC
          </div>
        </div>
      </div>
    </header>
  );
}