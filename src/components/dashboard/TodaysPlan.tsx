import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TodaysPlan as TodaysPlanType } from "@/lib/oldtypes";

interface TodaysPlanProps {
  plan: TodaysPlanType;
}

export function TodaysPlan({ plan }: TodaysPlanProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Critical Reminders</h2>

      {plan.criticalReminders.length > 0 ? (
        <div className="space-y-2">
          {plan.criticalReminders.map((reminder, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg"
            >
              <span className="text-lg">⚠️</span>
              <p className="text-sm flex-1">{reminder}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No critical reminders for today.
        </p>
      )}

      <Separator className="my-6" />

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Risk Budget
        </h3>
        <div className="text-2xl font-bold">${plan.riskBudget.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground mt-1">
          Available for today's trades
        </p>
      </div>
    </Card>
  );
}
