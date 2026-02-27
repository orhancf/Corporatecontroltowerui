interface StatusPillProps {
  status: "success" | "warning" | "danger" | "info" | "neutral";
  label: string;
}

const styles = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-info/10 text-info border-info/20",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatusPill({ status, label }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border ${styles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "success" ? "bg-success" :
        status === "warning" ? "bg-warning" :
        status === "danger" ? "bg-destructive" :
        status === "info" ? "bg-info" :
        "bg-muted-foreground"
      }`} />
      {label}
    </span>
  );
}
