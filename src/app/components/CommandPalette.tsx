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
  Radar,
  Calendar,
  ShoppingBag,
  Database,
  LineChart,
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
  Package,
} from "lucide-react";

const pages = [
  { label: "Tower", path: "/", icon: Radar, keywords: "tower dashboard kontrol merkezi kpi" },
  { label: "Planning", path: "/planning", icon: Calendar, keywords: "planning talep tahmin forecast" },
  { label: "Procurement", path: "/procurement", icon: ShoppingBag, keywords: "procurement satın alma tedarik po" },
  { label: "Masterdata", path: "/masterdata", icon: Database, keywords: "masterdata katalog ürün tedarikçi" },
  { label: "IBP", path: "/ibp", icon: LineChart, keywords: "ibp integrated business planning sop" },
];

const quickActions = [
  { label: "Rapor İndir", icon: Download, shortcut: "⌘E" },
  { label: "Veriyi Yenile", icon: RefreshCw, shortcut: "⌘R" },
  { label: "Kritik Uyarılar", icon: AlertTriangle, shortcut: "⌘A" },
  { label: "Tema Değiştir", icon: Moon, shortcut: "⌘T" },
];

const recentSearches = [
  { label: "CAM-002 — Negatif Net Pozisyon", icon: Package },
  { label: "CAM-004 — Gecikmiş Sipariş", icon: Truck },
  { label: "W11 Haftalık Plan", icon: Calendar },
  { label: "Düşük stok uyarıları", icon: AlertTriangle },
];

const dataEntities = [
  { label: "CAM-001 — 850 KG Net Poz", icon: Package, category: "Key Item" },
  { label: "CAM-002 — Kritik Uyarı", icon: AlertTriangle, category: "Key Item" },
  { label: "TR Katman1 — Stok Durumu", icon: BarChart3, category: "Lokasyon" },
  { label: "BG Katman1 — Transit", icon: Truck, category: "Lokasyon" },
  { label: "W11 — Net Pozisyon Raporu", icon: FileText, category: "Rapor" },
  { label: "ABC Segment Analizi", icon: TrendingUp, category: "Analiz" },
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
      <CommandInput placeholder="Sayfa, sipariş, ürün, tedarikçi ara..." />
      <CommandList>
        <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>

        <CommandGroup heading="Sayfalar">
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

        <CommandGroup heading="Hızlı Eylemler">
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

        <CommandGroup heading="Son Aramalar">
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

        <CommandGroup heading="Veri">
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