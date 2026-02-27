import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";
import { useState } from "react";

interface AlertBannerProps {
  type: "warning" | "info" | "success" | "error";
  title: string;
  message: string;
  dismissible?: boolean;
}

const icons = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
  error: XCircle,
};

const alertStyles = {
  warning: "bg-warning/5 border-warning/20 text-warning",
  info: "bg-info/5 border-info/20 text-info",
  success: "bg-success/5 border-success/20 text-success",
  error: "bg-destructive/5 border-destructive/20 text-destructive",
};

export function AlertBanner({ type, title, message, dismissible = true }: AlertBannerProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const Icon = icons[type];

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${alertStyles[type]}`}>
      <Icon className="w-4 h-4 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{message}</p>
      </div>
      {dismissible && (
        <button onClick={() => setVisible(false)} className="p-0.5 hover:bg-surface-2 rounded transition-colors">
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
