import {
  Asset,
  CapitalAllocation,
  TradingSetup,
  TodaysPlan,
  RiskMetrics,
} from "@/lib/oldtypes";

// Mock Assets
export const mockAssets: Asset[] = [
  // Primary Crypto Group
  {
    id: "1",
    symbol: "BTC",
    name: "Bitcoin",
    market: "crypto",
    group: "primary",
  },
  {
    id: "2",
    symbol: "ETH",
    name: "Ethereum",
    market: "crypto",
    group: "primary",
  },
  {
    id: "3",
    symbol: "SOL",
    name: "Solana",
    market: "crypto",
    group: "primary",
  },
  {
    id: "4",
    symbol: "LINK",
    name: "Chainlink",
    market: "crypto",
    group: "secondary",
  },

  // Commodities
  {
    id: "5",
    symbol: "XAUUSD",
    name: "Gold",
    market: "commodities",
    group: "swing",
  },
  {
    id: "6",
    symbol: "XAGUSD",
    name: "Silver",
    market: "commodities",
    group: "swing",
  },
];

// Mock Capital Allocation
export const mockCapitalAllocation: CapitalAllocation[] = [
  {
    market: "crypto",
    total: 4000,
    allocated: 1200,
    available: 2800,
    subAllocations: [
      { name: "Spot (Swing)", amount: 2500 },
      { name: "Perpetual (Day)", amount: 1500 },
    ],
  },
  {
    market: "commodities",
    total: 2500,
    allocated: 500,
    available: 2000,
    subAllocations: [
      { name: "Gold", amount: 1500 },
      { name: "Others", amount: 1000 },
    ],
  },
  {
    market: "stocks",
    total: 3000,
    allocated: 0,
    available: 3000,
    subAllocations: [
      { name: "US Market", amount: 1000 },
      { name: "PSE", amount: 1000 },
      { name: "Tadawul", amount: 1000 },
    ],
  },
  {
    market: "forex",
    total: 1000,
    allocated: 0,
    available: 1000,
  },
];

// Mock Trading Setups
export const mockSetups: TradingSetup[] = [
  {
    id: "s1",
    asset: mockAssets[0], // BTC
    timeframe: "15m",
    state: "active",
    confidence: 8,
    model: "Breakout Retest",
    riskPercentage: 1,
    entryPrice: 68500,
    stopLoss: 68200,
    targetPrice: 69200,
    notes: "Strong support holding, volume increasing",
    createdAt: new Date(),
    alertActive: true,
  },
  {
    id: "s2",
    asset: mockAssets[3], // LINK
    timeframe: "4h",
    state: "approaching",
    confidence: 7,
    model: "Swing Support",
    riskPercentage: 2,
    entryPrice: 14.5,
    stopLoss: 13.8,
    targetPrice: 16.2,
    notes: "Approaching key support zone, expected in 3 hours",
    createdAt: new Date(),
    expectedTriggerTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
    alertActive: false,
  },
  {
    id: "s3",
    asset: mockAssets[4], // Gold
    timeframe: "1h",
    state: "approaching",
    confidence: 9,
    model: "Range Breakout",
    riskPercentage: 1.5,
    entryPrice: 2650,
    stopLoss: 2635,
    targetPrice: 2680,
    notes: "Consolidating near resistance, breakout expected tomorrow 3 AM",
    createdAt: new Date(),
    expectedTriggerTime: new Date(Date.now() + 15 * 60 * 60 * 1000), // 15 hours from now
    alertActive: false,
  },
];

// Mock Today's Plan
export const mockTodaysPlan: TodaysPlan = {
  tradingMode: "day-trade",
  focusAssets: ["1", "2", "3"], // BTC, ETH, SOL
  riskBudget: 105, // 1% of $10,500
  marketConditions: "Bullish momentum, increased volatility expected",
  criticalReminders: [
    "LINK swing setup approaching at 2 PM",
    "Gold setup expected at 3 AM tomorrow - consider early sleep",
    "Review BTC 15m setup before market open",
  ],
  upcomingSetups: mockSetups,
};

// Mock Risk Metrics
export const mockRiskMetrics: RiskMetrics = {
  totalCapital: 10500,
  allocatedCapital: 1700,
  availableCapital: 8800,
  dailyRiskUsed: 52.5, // 0.5% used
  dailyRiskLimit: 105, // 1% daily limit
  openPositions: 2,
  totalExposure: 16.19, // percentage
};
