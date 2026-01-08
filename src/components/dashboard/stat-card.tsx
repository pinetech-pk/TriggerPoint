import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({
  title,
  value,
  subValue,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p
              className={cn(
                "text-2xl font-bold mt-1 font-mono",
                trend === "up" && "text-green",
                trend === "down" && "text-red"
              )}
            >
              {value}
            </p>
            {subValue && (
              <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
            )}
          </div>
          {Icon && (
            <div
              className={cn(
                "p-3 rounded-full",
                trend === "up" && "bg-green-bg",
                trend === "down" && "bg-red-bg",
                !trend && "bg-blue-bg"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  trend === "up" && "text-green",
                  trend === "down" && "text-red",
                  !trend && "text-blue"
                )}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
