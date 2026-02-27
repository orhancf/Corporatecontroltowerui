import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger";
  sparkline?: number[];
}

const variantStyles = {
  default: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KpiCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
  sparkline,
}: KpiCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === 0;

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/20 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center ${variantStyles[variant]}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-2xl text-foreground tracking-tight">{value}</span>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive && <TrendingUp className="w-3 h-3 text-success" />}
              {isNegative && <TrendingDown className="w-3 h-3 text-destructive" />}
              {isNeutral && <Minus className="w-3 h-3 text-muted-foreground" />}
              <span
                className={`text-xs ${
                  isPositive
                    ? "text-success"
                    : isNegative
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {sparkline && (
          <MiniSparkline
            data={sparkline}
            color={
              variant === "success"
                ? "#34d399"
                : variant === "warning"
                ? "#fbbf24"
                : variant === "danger"
                ? "#f87171"
                : "#60a5fa"
            }
          />
        )}
      </div>
    </div>
  );
}
