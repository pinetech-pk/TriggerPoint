"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import type { Account, Strategy } from "@/lib/types/database";

interface TradeStats {
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
  win_rate: number;
  total_pnl: number;
  avg_win: number;
  avg_loss: number;
  profit_factor: number;
}

interface EquityPoint {
  trade_number: number;
  trade_date: string;
  trade_pnl: number;
  cumulative_pnl: number;
  equity: number;
}

interface DailyPnL {
  date: string;
  total_pnl: number;
  trade_count: number;
  winning_trades: number;
  win_rate: number;
}

interface StrategyPerformance {
  strategy_id: string;
  strategy_name: string;
  total_trades: number;
  winning_trades: number;
  win_rate: number;
  total_pnl: number;
  avg_pnl: number;
  avg_risk_reward: number;
}

interface SessionPerformance {
  session: string;
  session_name: string;
  total_trades: number;
  winning_trades: number;
  win_rate: number;
  total_pnl: number;
}

const SESSION_OPTIONS = [
  { value: "", label: "All Sessions" },
  { value: "AS", label: "Asian" },
  { value: "LO", label: "London" },
  { value: "NY", label: "New York" },
  { value: "OTHER", label: "Other" },
];

const SESSION_COLORS: Record<string, string> = {
  NY: "bg-green",
  LO: "bg-blue",
  AS: "bg-purple",
  OTHER: "bg-gray-500",
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  // Filter states
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  // Data states
  const [stats, setStats] = useState<TradeStats | null>(null);
  const [equityData, setEquityData] = useState<EquityPoint[]>([]);
  const [dailyPnL, setDailyPnL] = useState<DailyPnL[]>([]);
  const [strategyPerformance, setStrategyPerformance] = useState<StrategyPerformance[]>([]);
  const [sessionPerformance, setSessionPerformance] = useState<SessionPerformance[]>([]);

  const supabase = createClient();

  // Fetch accounts and strategies for filters
  useEffect(() => {
    async function fetchFilters() {
      const [accountsRes, strategiesRes] = await Promise.all([
        supabase.from("accounts").select("*").eq("is_active", true).order("name"),
        supabase.from("strategies").select("*").eq("is_active", true).order("name"),
      ]);

      if (accountsRes.data) setAccounts(accountsRes.data);
      if (strategiesRes.data) setStrategies(strategiesRes.data);
    }

    fetchFilters();
  }, [supabase]);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const accountId = selectedAccount || undefined;
      const strategyId = selectedStrategy || undefined;

      // Fetch all data in parallel using untyped RPC calls
      const rpc = supabase.rpc.bind(supabase) as any;
      const [statsRes, equityRes, dailyRes, strategyRes, sessionRes] = await Promise.all([
        rpc("calculate_trade_stats", {
          p_user_id: user.id,
          p_account_id: accountId,
          p_strategy_id: strategyId,
        }),
        rpc("get_equity_curve", {
          p_user_id: user.id,
          p_account_id: accountId,
          p_initial_capital: 100,
        }),
        rpc("get_daily_pnl", {
          p_user_id: user.id,
          p_account_id: accountId,
        }),
        rpc("get_performance_by_strategy", {
          p_user_id: user.id,
          p_account_id: accountId,
        }),
        rpc("get_performance_by_session", {
          p_user_id: user.id,
          p_account_id: accountId,
        }),
      ]);

      if (statsRes.data) {
        const s = statsRes.data as TradeStats;
        setStats(s);
      }

      if (equityRes.data) {
        setEquityData(equityRes.data as EquityPoint[]);
      }

      if (dailyRes.data) {
        setDailyPnL(dailyRes.data as DailyPnL[]);
      }

      if (strategyRes.data) {
        let strategyData = strategyRes.data as StrategyPerformance[];
        // Filter by selected strategy if set
        if (selectedStrategy) {
          strategyData = strategyData.filter(s => s.strategy_id === selectedStrategy);
        }
        setStrategyPerformance(strategyData);
      }

      if (sessionRes.data) {
        let sessionData = sessionRes.data as SessionPerformance[];
        // Filter by selected session if set
        if (selectedSession) {
          sessionData = sessionData.filter(s => s.session === selectedSession);
        }
        setSessionPerformance(sessionData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase, selectedAccount, selectedStrategy, selectedSession]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Transform data for charts
  const chartEquityData = equityData.map((point, index) => ({
    trade: point.trade_number || index + 1,
    equity: point.equity,
    pnl: point.trade_pnl,
  }));

  const chartDailyData = dailyPnL.slice(-30).map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    pnl: day.total_pnl,
    trades: day.trade_count,
  }));

  // Account and Strategy filter options
  const accountOptions = [
    { value: "", label: "All Accounts" },
    ...accounts.map((a) => ({ value: a.id, label: a.name })),
  ];

  const strategyOptions = [
    { value: "", label: "All Strategies" },
    ...strategies.map((s) => ({ value: s.id, label: s.name })),
  ];

  // Show empty state when no data
  const hasData = stats && stats.total_trades > 0;

  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" description="Overview of your trading performance" />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Filters Row */}
        <div className="flex flex-wrap gap-4">
          <div className="w-48">
            <Select
              options={accountOptions}
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            />
          </div>
          <div className="w-48">
            <Select
              options={strategyOptions}
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e.target.value)}
            />
          </div>
          <div className="w-48">
            <Select
              options={SESSION_OPTIONS}
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          // Loading skeleton
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
        ) : !hasData ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20">
            <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No trades yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Start logging your trades to see your performance analytics here.
              Your equity curve, win rate, and other metrics will appear once you add trades.
            </p>
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <StatCard
                title="Total Trades"
                value={stats.total_trades}
                subValue={`${stats.winning_trades}W / ${stats.losing_trades}L`}
                icon={BarChart3}
              />
              <StatCard
                title="Win Rate"
                value={`${stats.win_rate.toFixed(1)}%`}
                subValue="Overall"
                icon={Target}
                trend={stats.win_rate >= 50 ? "up" : "down"}
              />
              <StatCard
                title="Total P&L"
                value={`$${stats.total_pnl.toFixed(2)}`}
                subValue={stats.total_pnl >= 0 ? "Profit" : "Loss"}
                icon={DollarSign}
                trend={stats.total_pnl >= 0 ? "up" : "down"}
              />
              <StatCard
                title="Avg Win"
                value={`$${stats.avg_win.toFixed(2)}`}
                icon={TrendingUp}
                trend="up"
              />
              <StatCard
                title="Avg Loss"
                value={`$${Math.abs(stats.avg_loss).toFixed(2)}`}
                icon={TrendingDown}
                trend="down"
              />
              <StatCard
                title="Profit Factor"
                value={stats.profit_factor.toFixed(2)}
                icon={Award}
                trend={stats.profit_factor >= 1 ? "up" : "down"}
              />
            </div>

            {/* Equity Curve - Full Width */}
            <EquityCurve data={chartEquityData} />

            {/* Daily P&L - Full Width */}
            <DailyPnLChart data={chartDailyData} />

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <WinLossPie
                wins={stats.winning_trades}
                losses={stats.losing_trades}
              />

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Strategy Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {strategyPerformance.length > 0 ? (
                    strategyPerformance.map((strategy) => (
                      <PerformanceBar
                        key={strategy.strategy_id}
                        label={strategy.strategy_name}
                        value={strategy.win_rate}
                        maxValue={100}
                        trades={strategy.total_trades}
                        pnl={strategy.total_pnl}
                        color="bg-blue"
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No strategy data available</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Session Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessionPerformance.length > 0 ? (
                    sessionPerformance.map((session) => (
                      <PerformanceBar
                        key={session.session}
                        label={session.session_name}
                        value={session.win_rate}
                        maxValue={100}
                        trades={session.total_trades}
                        pnl={session.total_pnl}
                        color={SESSION_COLORS[session.session] || "bg-gray-500"}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No session data available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
