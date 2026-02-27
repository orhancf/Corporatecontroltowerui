import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Factory,
  Search,
  Bell,
  Settings,
  HelpCircle,
  FileText,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Truck,
  Filter,
  Download,
  RefreshCw,
  Moon,
  Sun,
} from "lucide-react";

const pages = [
  { label: "Executive Overview", path: "/", icon: LayoutDashboard, keywords: "dashboard home overview kpi" },
  { label: "Inventory Control", path: "/inventory", icon: Package, keywords: "inventory stock sku warehouse" },
  { label: "Orders & Backlog", path: "/orders", icon: ShoppingCart, keywords: "orders purchase po backlog" },
  { label: "Supplier Performance", path: "/suppliers", icon: Users, keywords: "suppliers vendor scorecard" },
  { label: "Production & Capacity", path: "/production", icon: Factory, keywords: "production line capacity work order" },
];

const quickActions = [
  { label: "Export Dashboard Report", icon: Download, shortcut: "⌘E" },
  { label: "Refresh All Data", icon: RefreshCw, shortcut: "⌘R" },
  { label: "View Active Alerts", icon: AlertTriangle, shortcut: "⌘A" },
  { label: "Toggle Theme", icon: Moon, shortcut: "⌘T" },
];

const recentSearches = [
  { label: "SKU-4821 — Bearing Set BS-4", icon: Package },
  { label: "PO-7888 — SteelWorks Delay", icon: Truck },
  { label: "Line 3 Maintenance", icon: Factory },
  { label: "Low stock alerts", icon: AlertTriangle },
];

const dataEntities = [
  { label: "Steel Rod 12mm — SKU-1001", icon: Package, category: "Inventory" },
  { label: "PO-7891 — Acme Corp", icon: FileText, category: "Orders" },
  { label: "Acme Corp — Preferred Supplier", icon: Users, category: "Suppliers" },
  { label: "WO-3401 — Motor Unit M-7", icon: Factory, category: "Production" },
  { label: "Copper Wire 2.5mm — Low Stock", icon: AlertTriangle, category: "Inventory" },
  { label: "GlobalTex — Under Review", icon: Users, category: "Suppliers" },
  { label: "PO-7888 — Delayed", icon: Truck, category: "Orders" },
  { label: "PCB Assembly v3 — WIP", icon: BarChart3, category: "Production" },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();

  // Global ⌘K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      // Escape closes
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      onOpenChange(false);
    },
    [navigate, onOpenChange]
  );

  const handleAction = useCallback(
    (label: string) => {
      // Mock actions
      onOpenChange(false);
    },
    [onOpenChange]
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, orders, SKUs, suppliers..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.path}
              onSelect={() => handleNavigate(page.path)}
              keywords={[page.keywords]}
            >
              <page.icon className="text-muted-foreground" />
              <span>{page.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          {quickActions.map((action) => (
            <CommandItem
              key={action.label}
              onSelect={() => handleAction(action.label)}
            >
              <action.icon className="text-muted-foreground" />
              <span>{action.label}</span>
              <CommandShortcut>{action.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent Searches">
          {recentSearches.map((item) => (
            <CommandItem
              key={item.label}
              onSelect={() => onOpenChange(false)}
            >
              <item.icon className="text-muted-foreground" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Data">
          {dataEntities.map((entity) => (
            <CommandItem
              key={entity.label}
              onSelect={() => onOpenChange(false)}
              keywords={[entity.category]}
            >
              <entity.icon className="text-muted-foreground" />
              <div className="flex flex-col">
                <span>{entity.label}</span>
                <span className="text-[10px] text-muted-foreground">{entity.category}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
