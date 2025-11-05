import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TradingSetup } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface UpcomingSetupsProps {
  setups: TradingSetup[];
}

export function UpcomingSetups({ setups }: UpcomingSetupsProps) {
  const getStateColor = (state: TradingSetup['state']) => {
    switch (state) {
      case 'active':
        return 'bg-green-500';
      case 'approaching':
        return 'bg-yellow-500';
      case 'dormant':
        return 'bg-gray-500';
    }
  };

  const getStateIcon = (state: TradingSetup['state']) => {
    switch (state) {
      case 'active':
        return '🟢';
      case 'approaching':
        return '🟡';
      case 'dormant':
        return '⚫';
    }
  };

  const activeSetups = setups.filter(s => s.state === 'active');
  const approachingSetups = setups.filter(s => s.state === 'approaching');

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Setups</h2>

      {activeSetups.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Active Now ({activeSetups.length})
          </h3>
          <div className="space-y-3">
            {activeSetups.map((setup) => (
              <SetupCard key={setup.id} setup={setup} />
            ))}
          </div>
        </div>
      )}

      {approachingSetups.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Approaching ({approachingSetups.length})
          </h3>
          <div className="space-y-3">
            {approachingSetups.map((setup) => (
              <SetupCard key={setup.id} setup={setup} />
            ))}
          </div>
        </div>
      )}

      {setups.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No setups tracked. Add your first setup to get started.
        </p>
      )}
    </Card>
  );
}

function SetupCard({ setup }: { setup: TradingSetup }) {
  const getStateColor = (state: TradingSetup['state']) => {
    switch (state) {
      case 'active':
        return 'bg-green-500';
      case 'approaching':
        return 'bg-yellow-500';
      case 'dormant':
        return 'bg-gray-500';
    }
  };

  const getStateIcon = (state: TradingSetup['state']) => {
    switch (state) {
      case 'active':
        return '🟢';
      case 'approaching':
        return '🟡';
      case 'dormant':
        return '⚫';
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getStateIcon(setup.state)}</span>
          <div>
            <div className="font-semibold">
              {setup.asset.symbol} - {setup.timeframe}
            </div>
            <div className="text-xs text-muted-foreground">{setup.model}</div>
          </div>
        </div>
        <Badge variant="outline">
          Confidence: {setup.confidence}/10
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm mb-2">
        <div>
          <span className="text-muted-foreground">Entry:</span> ${setup.entryPrice}
        </div>
        <div>
          <span className="text-muted-foreground">SL:</span> ${setup.stopLoss}
        </div>
        <div>
          <span className="text-muted-foreground">TP:</span> ${setup.targetPrice}
        </div>
      </div>

      {setup.expectedTriggerTime && (
        <div className="text-xs text-muted-foreground mb-2">
          Expected in {formatDistanceToNow(setup.expectedTriggerTime)}
        </div>
      )}

      <p className="text-sm text-muted-foreground">{setup.notes}</p>

      <div className="flex items-center gap-2 mt-2">
        <Badge variant="secondary" className="text-xs">
          Risk: {setup.riskPercentage}%
        </Badge>
        {setup.alertActive && (
          <Badge variant="outline" className="text-xs">
            🔔 Alert Active
          </Badge>
        )}
      </div>
    </div>
  );
}
