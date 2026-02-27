import { useState } from "react";
import { NavLink } from "react-router";
import {
  Radar,
  Calendar,
  ShoppingBag,
  Database,
  LineChart,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  HelpCircle,
  Workflow,
} from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../components/ui/tooltip";

const navItems = [
  { to: "/", icon: Radar, label: "Tower", end: true },
  { to: "/planning", icon: Calendar, label: "Planning" },
  { to: "/procurement", icon: ShoppingBag, label: "Procurement" },
  { to: "/masterdata", icon: Database, label: "Masterdata" },
  { to: "/ibp", icon: LineChart, label: "IBP" },
];

const bottomItems = [
  { icon: Bell, label: "Notifications" },
  { icon: HelpCircle, label: "Help" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        relative flex flex-col h-full bg-sidebar border-r border-sidebar-border
        transition-all duration-200 ease-out shrink-0
        ${collapsed ? "w-[68px]" : "w-[240px]"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Workflow className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm text-foreground tracking-tight truncate">
              WiseFlow SCCT
            </span>
            <span className="text-[11px] text-muted-foreground truncate">
              Cambro Özay
            </span>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 w-6 h-6 rounded-full bg-surface-2 border border-border flex items-center justify-center hover:bg-surface-3 transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 mt-4">
        {navItems.map((item) => (
          <Tooltip key={item.to}>
            <TooltipTrigger asChild>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150
                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
                  }
                  ${collapsed ? "justify-center" : ""}`
                }
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && (
                  <span className="text-sm truncate">{item.label}</span>
                )}
              </NavLink>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1 px-3 pb-4 border-t border-sidebar-border pt-3 mt-2">
        {bottomItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <button
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-all duration-150 ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && (
                  <span className="text-sm truncate">{item.label}</span>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>
    </aside>
  );
}