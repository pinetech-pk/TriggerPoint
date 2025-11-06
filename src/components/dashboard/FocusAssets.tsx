import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Asset, TradingMode } from "@/lib/oldtypes";

interface FocusAssetsProps {
  tradingMode: TradingMode;
  focusAssets: Asset[];
  marketConditions: string;
}

export function FocusAssets({
  tradingMode,
  focusAssets,
  marketConditions,
}: FocusAssetsProps) {
  const getModeColor = (mode: TradingMode) => {
    switch (mode) {
      case "scalp":
        return "bg-red-500";
      case "day-trade":
        return "bg-blue-500";
      case "swing":
        return "bg-green-500";
    }
  };

  const getModeLabel = (mode: TradingMode) => {
    switch (mode) {
      case "scalp":
        return "Scalp Mode";
      case "day-trade":
        return "Day Trade Mode";
      case "swing":
        return "Swing Mode";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Today's Focus</h2>
        <Badge className={getModeColor(tradingMode)}>
          {getModeLabel(tradingMode)}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground mb-2">Focus Assets</div>
          <div className="flex flex-wrap gap-2">
            {focusAssets.map((asset) => (
              <Badge
                key={asset.id}
                variant="outline"
                className="text-base px-3 py-1"
              >
                {asset.symbol}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Market Conditions
          </div>
          <p className="text-sm">{marketConditions}</p>
        </div>
      </div>
    </Card>
  );
}
