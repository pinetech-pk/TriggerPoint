import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface ResultBadgeProps {
  isWinner: boolean | null;
}

export function ResultBadge({ isWinner }: ResultBadgeProps) {
  if (isWinner === null) {
    return <Badge variant="secondary">Pending</Badge>;
  }

  return (
    <Badge variant={isWinner ? "success" : "danger"} className="gap-1">
      {isWinner ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {isWinner ? "WIN" : "LOSS"}
    </Badge>
  );
}
