import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DirectionBadgeProps {
  direction: "LONG" | "SHORT";
}

export function DirectionBadge({ direction }: DirectionBadgeProps) {
  const isLong = direction === "LONG";

  return (
    <Badge variant={isLong ? "success" : "danger"} className="gap-1">
      {isLong ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {direction}
    </Badge>
  );
}
