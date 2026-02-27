import { useState } from "react";
import { X, ChevronDown, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

export interface FilterOption {
  id: string;
  label: string;
  group: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  multi?: boolean;
}

interface FilterChipsProps {
  groups: FilterGroup[];
  activeFilters: FilterOption[];
  onAddFilter: (filter: FilterOption) => void;
  onRemoveFilter: (filterId: string) => void;
  onClearAll: () => void;
}

export function FilterChips({
  groups,
  activeFilters,
  onAddFilter,
  onRemoveFilter,
  onClearAll,
}: FilterChipsProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Filter button + dropdown per group */}
      {groups.map((group) => (
        <Popover
          key={group.key}
          open={openGroup === group.key}
          onOpenChange={(o) => setOpenGroup(o ? group.key : null)}
        >
          <PopoverTrigger asChild>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2/60 border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-surface-3/60 transition-colors">
              <Filter className="w-3 h-3" />
              {group.label}
              <ChevronDown className="w-3 h-3" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-48 p-1 bg-popover border border-border rounded-lg shadow-lg"
          >
            <div className="space-y-0.5">
              {group.options.map((opt) => {
                const isActive = activeFilters.some(
                  (f) => f.id === `${group.key}:${opt.value}`
                );
                return (
                  <button
                    key={opt.value}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-surface-2"
                    }`}
                    onClick={() => {
                      const filterId = `${group.key}:${opt.value}`;
                      if (isActive) {
                        onRemoveFilter(filterId);
                      } else {
                        onAddFilter({
                          id: filterId,
                          label: opt.label,
                          group: group.label,
                        });
                      }
                      if (!group.multi) setOpenGroup(null);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-primary border-primary"
                            : "border-border"
                        }`}
                      >
                        {isActive && (
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <path
                              d="M1.5 4L3 5.5L6.5 2"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary-foreground"
                            />
                          </svg>
                        )}
                      </span>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      ))}

      {/* Active filter chips */}
      {activeFilters.map((filter) => (
        <span
          key={filter.id}
          className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20"
        >
          <span className="text-[10px] text-primary/60">{filter.group}:</span>
          {filter.label}
          <button
            onClick={() => onRemoveFilter(filter.id)}
            className="p-0.5 rounded-full hover:bg-primary/20 transition-colors"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      ))}

      {/* Clear all */}
      {activeFilters.length > 0 && (
        <button
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
