"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  BarChart3,
  Award,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { EquityCurve } from "@/components/charts/equity-curve";
import { DailyPnLChart } from "@/components/charts/daily-pnl-chart";
import { WinLossPie } from "@/components/charts/win-loss-pie";
import { PerformanceBar } from "@/components/charts/performance-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

// Demo data for showcase
const demoEquityData = [
  { trade: 1, equity: 100, pnl: 0.25 },
  { trade: 2, equity: 100.25, pnl: 0.15 },
  { trade: 3, equity: 100.40, pnl: -0.10 },
  { trade: 4, equity: 100.30, pnl: 0.35 },
  { trade: 5, equity: 100.65, pnl: 0.20 },
  { trade: 6, equity: 100.85, pnl: -0.15 },
  { trade: 7, equity: 100.70, pnl: 0.40 },
  { trade: 8, equity: 101.10, pnl: 0.25 },
  { trade: 9, equity: 101.35, pnl: 0.30 },
  { trade: 10, equity: 101.65, pnl: -0.20 },
  { trade: 11, equity: 101.45, pnl: 0.55 },
  { trade: 12, equity: 102.00, pnl: 0.35 },
];

const demoDailyPnL = [
  { date: "Dec 20", pnl: 0.45, trades: 3 },
  { date: "Dec 21", pnl: -0.15, trades: 2 },
  { date: "Dec 22", pnl: 0.65, trades: 4 },
  { date: "Dec 23", pnl: 0.30, trades: 2 },
  { date: "Dec 24", pnl: 0.55, trades: 3 },
  { date: "Dec 25", pnl: -0.10, trades: 1 },
  { date: "Dec 26", pnl: 0.40, trades: 2 },
];

const demoStats = {
  totalTrades: 100,
  winningTrades: 62,
  losingTrades: 38,
  winRate: 62,
  totalPnL: 15.75,
  avgWin: 0.42,
  avgLoss: -0.28,
  profitFactor: 1.85,
};

const demoStrategies = [
  { name: "CCM + Trix", winRate: 68, trades: 45, pnl: 8.50 },
  { name: "Trix Ribbon Divergence", winRate: 58, trades: 30, pnl: 4.20 },
  { name: "CCM + RSI Midpoints", winRate: 55, trades: 25, pnl: 3.05 },
];

const demoSessions = [
  { name: "New York", winRate: 65, trades: 50, pnl: 9.50, color: "bg-green" },
  { name: "London", winRate: 60, trades: 35, pnl: 4.25, color: "bg-blue" },
  { name: "Asian", winRate: 53, trades: 15, pnl: 2.00, color: "bg-purple" },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" description="Overview of your trading performance" />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="Total Trades"
            value={demoStats.totalTrades}
            subValue={`${demoStats.winningTrades}W / ${demoStats.losingTrades}L`}
            icon={BarChart3}
          />
          <StatCard
            title="Win Rate"
            value={`${demoStats.winRate}%`}
            subValue="Last 30 days"
            icon={Target}
            trend="up"
          />
          <StatCard
            title="Total P&L"
            value={`$${demoStats.totalPnL.toFixed(2)}`}
            subValue="+15.75% return"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Avg Win"
            value={`$${demoStats.avgWin.toFixed(2)}`}
            icon={TrendingUp}
            trend="up"
          />
          <StatCard
            title="Avg Loss"
            value={`$${Math.abs(demoStats.avgLoss).toFixed(2)}`}
            icon={TrendingDown}
            trend="down"
          />
          <StatCard
            title="Profit Factor"
            value={demoStats.profitFactor.toFixed(2)}
            icon={Award}
            trend="up"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EquityCurve data={demoEquityData} />
          <DailyPnLChart data={demoDailyPnL} />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WinLossPie
            wins={demoStats.winningTrades}
            losses={demoStats.losingTrades}
          />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Strategy Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {demoStrategies.map((strategy) => (
                <PerformanceBar
                  key={strategy.name}
                  label={strategy.name}
                  value={strategy.winRate}
                  maxValue={100}
                  trades={strategy.trades}
                  pnl={strategy.pnl}
                  color="bg-blue"
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Session Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {demoSessions.map((session) => (
                <PerformanceBar
                  key={session.name}
                  label={session.name}
                  value={session.winRate}
                  maxValue={100}
                  trades={session.trades}
                  pnl={session.pnl}
                  color={session.color}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
