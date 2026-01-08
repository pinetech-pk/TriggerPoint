"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { SessionBadge } from "@/components/shared/session-badge";
import { DirectionBadge } from "@/components/shared/direction-badge";
import { ResultBadge } from "@/components/shared/result-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { formatDate, formatCurrency } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Trade, Account, Strategy } from "@/lib/types/database";

interface TradeWithRelations extends Trade {
  accounts?: { name: string } | null;
  strategies?: { name: string } | null;
}

const SESSION_OPTIONS = [
  { value: "", label: "All Sessions" },
  { value: "AS", label: "Asian" },
  { value: "LO", label: "London" },
  { value: "NY", label: "New York" },
  { value: "OTHER", label: "Other" },
];

const DIRECTION_OPTIONS = [
  { value: "", label: "All Directions" },
  { value: "LONG", label: "Long" },
  { value: "SHORT", label: "Short" },
];

const RESULT_OPTIONS = [
  { value: "", label: "All Results" },
  { value: "win", label: "Winners" },
  { value: "loss", label: "Losers" },
];

export default function TradesPage() {
  const [trades, setTrades] = useState<TradeWithRelations[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedResult, setSelectedResult] = useState("");

  const supabase = createClient();

  // Fetch filter options
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

  // Fetch trades
  useEffect(() => {
    async function fetchTrades() {
      setLoading(true);

      let query = supabase
        .from("trades")
        .select(`
          *,
          accounts(name),
          strategies(name)
        `)
        .order("entry_date", { ascending: false });

      // Apply filters
      if (selectedAccount) {
        query = query.eq("account_id", selectedAccount);
      }
      if (selectedStrategy) {
        query = query.eq("strategy_id", selectedStrategy);
      }
      if (selectedSession) {
        query = query.eq("session", selectedSession);
      }
      if (selectedDirection) {
        query = query.eq("direction", selectedDirection);
      }
      if (selectedResult === "win") {
        query = query.eq("is_winner", true);
      } else if (selectedResult === "loss") {
        query = query.eq("is_winner", false);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching trades:", error);
      } else {
        setTrades(data || []);
      }

      setLoading(false);
    }

    fetchTrades();
  }, [supabase, selectedAccount, selectedStrategy, selectedSession, selectedDirection, selectedResult]);

  // Client-side search filter
  const filteredTrades = trades.filter((trade) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      trade.title.toLowerCase().includes(searchLower) ||
      trade.security.toLowerCase().includes(searchLower) ||
      trade.strategies?.name?.toLowerCase().includes(searchLower) ||
      trade.accounts?.name?.toLowerCase().includes(searchLower)
    );
  });

  // Filter options
  const accountOptions = [
    { value: "", label: "All Accounts" },
    ...accounts.map((a) => ({ value: a.id, label: a.name })),
  ];

  const strategyOptions = [
    { value: "", label: "All Strategies" },
    ...strategies.map((s) => ({ value: s.id, label: s.name })),
  ];

  return (
    <div className="flex flex-col h-full">
      <Header title="Trade Journal" description="View and manage your trades" />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Filters Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search trades..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Link href="/trades/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Trade
              </Button>
            </Link>
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-3">
            <div className="w-40">
              <Select
                options={accountOptions}
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
              />
            </div>
            <div className="w-40">
              <Select
                options={strategyOptions}
                value={selectedStrategy}
                onChange={(e) => setSelectedStrategy(e.target.value)}
              />
            </div>
            <div className="w-36">
              <Select
                options={SESSION_OPTIONS}
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
              />
            </div>
            <div className="w-36">
              <Select
                options={DIRECTION_OPTIONS}
                value={selectedDirection}
                onChange={(e) => setSelectedDirection(e.target.value)}
              />
            </div>
            <div className="w-32">
              <Select
                options={RESULT_OPTIONS}
                value={selectedResult}
                onChange={(e) => setSelectedResult(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Trades Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredTrades.length === 0 ? (
              <div className="py-12">
                <EmptyState
                  title="No trades found"
                  description={
                    trades.length === 0
                      ? "Start logging your trades to build your journal."
                      : "Try adjusting your filters or search terms."
                  }
                  action={
                    trades.length === 0 ? (
                      <Link href="/trades/new">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Trade
                        </Button>
                      </Link>
                    ) : undefined
                  }
                />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Trade</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Strategy</TableHead>
                    <TableHead className="text-right">Risk %</TableHead>
                    <TableHead className="text-right">R:R</TableHead>
                    <TableHead className="text-right">P&L</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrades.map((trade) => (
                    <TableRow
                      key={trade.id}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell className="font-mono text-muted-foreground">
                        {formatDate(trade.entry_date, "MMM d")}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{trade.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {trade.security}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DirectionBadge direction={trade.direction} />
                      </TableCell>
                      <TableCell>
                        {trade.session ? (
                          <SessionBadge session={trade.session} />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {trade.strategies?.name ? (
                          <Badge variant="secondary">{trade.strategies.name}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {trade.risk_percent != null
                          ? `${trade.risk_percent.toFixed(2)}%`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {trade.risk_reward_actual != null
                          ? `${trade.risk_reward_actual.toFixed(1)}R`
                          : trade.risk_reward_planned != null
                          ? `${trade.risk_reward_planned.toFixed(1)}R`
                          : "-"}
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono font-medium ${
                          trade.pnl != null
                            ? trade.pnl >= 0
                              ? "text-green"
                              : "text-red"
                            : ""
                        }`}
                      >
                        {trade.pnl != null ? (
                          <>
                            {trade.pnl >= 0 ? "+" : ""}
                            {formatCurrency(trade.pnl)}
                          </>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {trade.is_winner != null ? (
                          <ResultBadge isWinner={trade.is_winner} />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Trade count */}
        {!loading && filteredTrades.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Showing {filteredTrades.length} of {trades.length} trades
          </div>
        )}
      </div>
    </div>
  );
}
