import { cn } from "@/lib/utils";

interface PerformanceBarProps {
  label: string;
  value: number;
  maxValue: number;
  trades: number;
  pnl: number;
  color?: string;
}

export function PerformanceBar({
  label,
  value,
  maxValue,
  trades,
  pnl,
  color = "bg-blue",
}: PerformanceBarProps) {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {trades} trades |{" "}
          <span className={pnl >= 0 ? "text-green" : "text-red"}>
            {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", color)}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-medium w-12 text-right">{value.toFixed(0)}%</span>
      </div>
    </div>
  );
}
