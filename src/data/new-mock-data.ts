import { Asset, TradingSetup, DailyPlan, PerformanceMetrics } from '@/lib/types';

// Mock Assets
export const mockAssets: Asset[] = [
  // Primary Crypto Group
  { id: '1', symbol: 'BTC', name: 'Bitcoin', market: 'crypto', group: 'primary' },
  { id: '2', symbol: 'ETH', name: 'Ethereum', market: 'crypto', group: 'primary' },
  { id: '3', symbol: 'SOL', name: 'Solana', market: 'crypto', group: 'primary' },
  { id: '4', symbol: 'LINK', name: 'Chainlink', market: 'crypto', group: 'secondary' },
  { id: '5', symbol: 'XAUUSD', name: 'Gold', market: 'commodities', group: 'swing' },
  { id: '6', symbol: 'XAGUSD', name: 'Silver', market: 'commodities', group: 'swing' },
];

// Mock Performance Metrics
export const mockPerformance: PerformanceMetrics = {
  todayPnL: 13.50,
  yesterdayPnL: -22.50,
  weekPnL: 74.00,
  monthPnL: 185.73
};

// Mock Today's Plan
export const mockTodaysPlan: DailyPlan = {
  id: 'plan-today',
  date: new Date(),
  keyNotes: 'I am free to work on in to 5m Scalping Setups, 1m in both directions and 5m most likely to go for a Long lift tonight.',
  market: 'crypto',
  mode: 'scalping',
  assets: ['BTC', 'ETH', 'SOL'],
  riskBudget: 30.00,
  learningSession: '40 minutes - read spitter\'s pick articles',
  criticalReminders: [
    'LINK swing setup approaching at 2 PM',
    'Gold setup expected at 3 AM tomorrow - consider early sleep',
    'Review BTC 15m setup before market open'
  ]
};

// Mock Next Day Plan (optional - can be null if not created)
export const mockNextDayPlan: DailyPlan | null = {
  id: 'plan-tomorrow',
  date: new Date(Date.now() + 24 * 60 * 60 * 1000),
  keyNotes: '***',
  market: 'stocks',
  mode: 'swing',
  assets: ['***'],
  riskBudget: 30.00,
  learningSession: 'backtest model CCM + Trix v2 - 40 minutes',
  criticalReminders: []
};

// Mock Active Setups
export const mockActiveSetups: TradingSetup[] = [
  {
    id: 's1',
    asset: mockAssets[2], // SOL
    timeframe: '5m',
    state: 'active',
    direction: 'short',
    confidence: 8,
    modelId: 'ccm-trix-v1',
    riskBudget: 10,
    notes: 'though selling on 5m not aligned with the HTF , but i am looking for a correction phase which must be approaching before tonight',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tvAlertStatus: 'active',
    notificationThreshold: 70
  },
  {
    id: 's2',
    asset: mockAssets[1], // ETH
    timeframe: '15m',
    state: 'active',
    direction: 'long',
    confidence: 9,
    modelId: 'ccm-trix-v2',
    riskBudget: 15,
    notes: 'completely align with the HTF like 1h and 2h market structure',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    tvAlertStatus: 'active',
    notificationThreshold: 70
  }
];

// Mock Approaching Setups
export const mockApproachingSetups: TradingSetup[] = [
  {
    id: 's3',
    asset: mockAssets[5], // XAUUSD (Gold)
    timeframe: '1h',
    state: 'approaching',
    direction: 'short',
    confidence: 7,
    modelId: 'ct-strategy-v3',
    riskBudget: 10,
    notes: '****',
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    expectedTriggerTime: new Date(Date.now() + 13 * 60 * 60 * 1000), // 13 hours from now
    tvAlertStatus: 'generated-inactive',
    notificationThreshold: 70
  },
  {
    id: 's4',
    asset: mockAssets[3], // LINK
    timeframe: '4h',
    state: 'approaching',
    direction: 'short',
    confidence: 7,
    modelId: 'ct-strategy-v3',
    riskBudget: 10,
    notes: '****',
    createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
    expectedTriggerTime: new Date(Date.now() + 26 * 60 * 60 * 1000), // 26 hours (1 day 2 hours) from now
    tvAlertStatus: 'not-generated',
    notificationThreshold: 70
  }
];

// Helper function to calculate progress percentage for approaching setups
export function calculateProgress(setup: TradingSetup): number {
  if (!setup.expectedTriggerTime) return 0;
  
  const totalTime = setup.expectedTriggerTime.getTime() - setup.createdAt.getTime();
  const elapsedTime = Date.now() - setup.createdAt.getTime();
  const progress = (elapsedTime / totalTime) * 100;
  
  return Math.min(Math.max(progress, 0), 100); // Clamp between 0-100
}

// Helper function to check if notification should be triggered
export function shouldTriggerNotification(setup: TradingSetup): boolean {
  const progress = calculateProgress(setup);
  return progress >= setup.notificationThreshold;
}
