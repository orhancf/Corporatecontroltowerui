interface StatusPillProps {
  status: "success" | "warning" | "danger" | "info" | "neutral" | "transit" | "overdue";
  label: string;
}

const styles = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-info/10 text-info border-info/20",
  neutral: "bg-muted text-muted-foreground border-border",
  transit: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  overdue: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export function StatusPill({ status, label }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border ${styles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${\n        status === \"success\" ? \"bg-success\" :\n        status === \"warning\" ? \"bg-warning\" :\n        status === \"danger\" ? \"bg-destructive\" :\n        status === \"info\" ? \"bg-info\" :\n        status === \"transit\" ? \"bg-purple-400\" :\n        status === \"overdue\" ? \"bg-amber-400\" :\n        \"bg-muted-foreground\"\n      }`} />
      {label}
    </span>
  );
}