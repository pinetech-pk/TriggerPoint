import { TradingModel } from '@/lib/types';

export const tradingModels: TradingModel[] = [
  {
    id: 'ccm-trix-v1',
    name: 'CCM + Trix v1.0',
    explanation: 'A momentum-based strategy combining Consecutive Candle Momentum (CCM) with the TRIX oscillator. This model identifies strong directional moves when multiple candles align in the same direction while TRIX confirms the trend strength. Best used on lower timeframes (5m-15m) for day trading.',
    rules: [
      'Wait for 3+ consecutive candles in the same direction (bullish or bearish)',
      'TRIX line must cross above signal line for long, below for short',
      'Volume should be above 20-period average',
      'Enter on the close of confirmation candle',
      'Stop loss: Below/above the lowest/highest of the CCM candles',
      'Take profit: 2:1 risk-reward ratio minimum'
    ],
    sampleImageUrl: 'https://tradingview.com/x/example-ccm-trix/',
    defaultConfidence: 8
  },
  {
    id: 'ccm-trix-v2',
    name: 'CCM + Trix v2.0',
    explanation: 'An enhanced version of v1.0 with additional HTF (Higher Timeframe) alignment filter. This model requires the higher timeframe trend to be in the same direction as the setup, significantly improving win rate. Ideal for 5m-15m entries with 1h-4h trend confirmation.',
    rules: [
      'Check HTF (1h for 5m trades, 4h for 15m trades) for trend direction',
      'Wait for 3+ consecutive candles in direction of HTF trend',
      'TRIX line must cross above signal line for long, below for short',
      'TRIX histogram must be expanding (increasing momentum)',
      'Entry only if price is above/below 50 EMA on entry timeframe',
      'Volume confirmation: Current volume > 1.5x average volume',
      'Stop loss: Below/above recent swing low/high',
      'Take profit: Trail with 15 EMA on entry timeframe'
    ],
    sampleImageUrl: 'https://tradingview.com/x/example-ccm-trix-v2/',
    defaultConfidence: 9
  },
  {
    id: 'ct-strategy-v3',
    name: 'CT Strategy v3',
    explanation: 'A comprehensive trend-following strategy (Consolidated Trend) that combines multiple timeframe analysis with support/resistance zones. This model excels at catching swing trades and works best on 1h-4h timeframes for multi-day holds.',
    rules: [
      'Identify key support/resistance zone on daily timeframe',
      'Wait for price to approach the zone on 4h timeframe',
      'Look for rejection candle pattern (pin bar, engulfing)',
      'RSI should be oversold (<30) for longs or overbought (>70) for shorts',
      'Volume spike on rejection candle (>2x average)',
      'Enter on break of rejection candle high/low',
      'Stop loss: Beyond the zone (20-30 pips)',
      'First target: Previous swing high/low',
      'Second target: Next major S/R level',
      'Trail remaining position with daily 20 EMA'
    ],
    sampleImageUrl: 'https://tradingview.com/x/example-ct-strategy/',
    defaultConfidence: 7
  },
  {
    id: 'breakout-retest',
    name: 'Breakout Retest',
    explanation: 'A classic breakout strategy that waits for a retest of broken structure before entering. This patient approach filters out false breakouts and provides better risk-reward entries. Works across all timeframes but particularly effective on 15m-1h for intraday setups.',
    rules: [
      'Identify clear horizontal support/resistance level with multiple touches',
      'Wait for decisive break with strong volume (>3x average)',
      'Price must close beyond the level, not just wick through',
      'Wait for pullback to retest the broken level',
      'Look for rejection from the level (now acting as support/resistance)',
      'Enter on bullish/bearish confirmation candle after retest',
      'Stop loss: 10-15 pips beyond the retested level',
      'Target: Measured move (distance from consolidation to breakout)',
      'Exit 50% at 1:1, trail remainder with structure'
    ],
    sampleImageUrl: 'https://tradingview.com/x/example-breakout-retest/',
    defaultConfidence: 8
  }
];

// Helper function to get model by ID
export function getModelById(id: string): TradingModel | undefined {
  return tradingModels.find(model => model.id === id);
}

// Helper function to get model name by ID
export function getModelName(id: string): string {
  const model = getModelById(id);
  return model ? model.name : 'Unknown Model';
}
