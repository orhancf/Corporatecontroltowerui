import { useState } from "react";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import type { DateRange } from "react-day-picker";

const presets = [
  { label: "Today", range: () => ({ from: new Date(), to: new Date() }) },
  { label: "Last 7 days", range: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
  { label: "Last 30 days", range: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
  { label: "This month", range: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
  { label: "Last month", range: () => ({ from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }) },
  { label: "Last 90 days", range: () => ({ from: subDays(new Date(), 90), to: new Date() }) },
];

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const displayValue =
    dateRange?.from && dateRange?.to
      ? `${format(dateRange.from, "MMM d")} — ${format(dateRange.to, "MMM d, yyyy")}`
      : "Select date range";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2/60 border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-surface-3/60 transition-colors">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{displayValue}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-auto p-0 bg-popover border border-border rounded-xl shadow-lg"
      >
        <div className="flex">
          {/* Presets sidebar */}
          <div className="border-r border-border p-2 space-y-0.5 min-w-[140px]">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider px-2 py-1">
              Presets
            </p>
            {presets.map((preset) => (
              <button
                key={preset.label}
                className="w-full text-left px-2 py-1.5 rounded-md text-xs text-foreground hover:bg-surface-2 transition-colors"
                onClick={() => {
                  const r = preset.range();
                  onDateRangeChange(r);
                  setOpen(false);
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className="p-2">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              defaultMonth={subMonths(new Date(), 1)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2">
          <span className="text-xs text-muted-foreground">
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "MMM d, yyyy")} — ${format(dateRange.to, "MMM d, yyyy")}`
              : "No range selected"}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
              onClick={() => {
                onDateRangeChange(undefined);
              }}
            >
              Reset
            </button>
            <button
              className="px-3 py-1 rounded-md text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => setOpen(false)}
            >
              Apply
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
