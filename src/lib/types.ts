// Core Trading Types

export type Market = 'crypto' | 'commodities' | 'forex' | 'stocks';

export type TradingMode = 'scalping' | 'day-trade' | 'swing';

export type SetupState = 'active' | 'approaching' | 'dormant';

export type Direction = 'long' | 'short';

export type TVAlertStatus = 'not-generated' | 'generated-inactive' | 'active';

export type Timeframe = 
  | '1m' | '5m' | '15m' // Day trading
  | '30m' | '1h' | '2h' // Short-term
  | '4h' | '6h' | '1d'; // Swing

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  market: Market;
  group: 'primary' | 'secondary' | 'swing';
}

export interface TradingModel {
  id: string;
  name: string;
  explanation: string;
  rules: string[];
  sampleImageUrl: string; // TradingView chart image
  defaultConfidence: number; // 1-10
}

export interface TradingSetup {
  id: string;
  asset: Asset;
  timeframe: Timeframe;
  state: SetupState;
  direction: Direction;
  confidence: number; // 1-10
  modelId: string; // Reference to TradingModel
  riskBudget: number; // Dollar amount
  entryPrice?: number;
  stopLoss?: number;
  targetPrice?: number;
  notes: string;
  createdAt: Date;
  expectedTriggerTime?: Date; // For approaching setups
  tvAlertStatus: TVAlertStatus;
  notificationThreshold: number; // Percentage (e.g., 70 for 70%)
}

export interface DailyPlan {
  id: string;
  date: Date;
  keyNotes: string;
  market: Market;
  mode: TradingMode;
  assets: string[]; // Asset symbols
  riskBudget: number;
  learningSession?: string;
  criticalReminders: string[];
}

export interface Position {
  id: string;
  asset: Asset;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  stopLoss: number;
  targetPrice: number;
  pnl: number;
  pnlPercentage: number;
  openedAt: Date;
}

export interface PerformanceMetrics {
  todayPnL: number;
  todayRRx: number;
  yesterdayPnL: number;
  yesterdayRRx: number;
  weekPnL: number;
  weekRRx: number;
  monthPnL: number;
  monthRRx: number;
}
