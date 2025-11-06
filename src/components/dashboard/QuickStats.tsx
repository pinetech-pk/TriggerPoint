import { Card } from "@/components/ui/card";
import { RiskMetrics } from "@/lib/oldtypes";

interface QuickStatsProps {
  riskMetrics: RiskMetrics;
}

export function QuickStats({ riskMetrics }: QuickStatsProps) {
  const riskUsedPercentage =
    (riskMetrics.dailyRiskUsed / riskMetrics.dailyRiskLimit) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Total Capital</div>
        <div className="text-2xl font-bold">
          ${riskMetrics.totalCapital.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Available: ${riskMetrics.availableCapital.toLocaleString()}
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Daily Risk</div>
        <div className="text-2xl font-bold">
          ${riskMetrics.dailyRiskUsed.toFixed(2)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          of ${riskMetrics.dailyRiskLimit} limit (
          {riskUsedPercentage.toFixed(0)}%)
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Open Positions</div>
        <div className="text-2xl font-bold">{riskMetrics.openPositions}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {riskMetrics.totalExposure.toFixed(2)}% exposure
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Allocated Capital</div>
        <div className="text-2xl font-bold">
          ${riskMetrics.allocatedCapital.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {(
            (riskMetrics.allocatedCapital / riskMetrics.totalCapital) *
            100
          ).toFixed(1)}
          % in use
        </div>
      </Card>
    </div>
  );
}
