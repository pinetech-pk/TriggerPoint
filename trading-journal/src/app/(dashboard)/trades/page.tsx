"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { formatDate, formatCurrency } from "@/lib/utils";

// Demo trades data
const demoTrades = [
  {
    id: "1",
    title: "SOL/USDT (1m)",
    security: "SOL/USDT",
    direction: "LONG" as const,
    session: "NY" as const,
    strategy: "CCM + Trix",
    riskPercent: 0.1,
    riskReward: 2.5,
    pnl: 0.25,
    isWinner: true,
    entryDate: "2025-12-25T19:39:00",
    status: "closed" as const,
  },
  {
    id: "2",
    title: "BTC/USDT (5m)",
    security: "BTC/USDT",
    direction: "SHORT" as const,
    session: "LO" as const,
    strategy: "Trix Ribbon Divergence",
    riskPercent: 0.1,
    riskReward: 1.8,
    pnl: -0.10,
    isWinner: false,
    entryDate: "2025-12-24T10:15:00",
    status: "closed" as const,
  },
  {
    id: "3",
    title: "ETH/USDT (15m)",
    security: "ETH/USDT",
    direction: "LONG" as const,
    session: "AS" as const,
    strategy: "CCM + RSI Midpoints",
    riskPercent: 0.15,
    riskReward: 3.2,
    pnl: 0.48,
    isWinner: true,
    entryDate: "2025-12-23T03:20:00",
    status: "closed" as const,
  },
  {
    id: "4",
    title: "SOL/USDT (1m)",
    security: "SOL/USDT",
    direction: "LONG" as const,
    session: "NY" as const,
    strategy: "CCM + Trix",
    riskPercent: 0.1,
    riskReward: 2.0,
    pnl: 0.20,
    isWinner: true,
    entryDate: "2025-12-22T14:45:00",
    status: "closed" as const,
  },
  {
    id: "5",
    title: "BTC/USDT (1m)",
    security: "BTC/USDT",
    direction: "SHORT" as const,
    session: "NY" as const,
    strategy: "CCM + Trix",
    riskPercent: 0.1,
    riskReward: 1.5,
    pnl: 0.15,
    isWinner: true,
    entryDate: "2025-12-21T16:30:00",
    status: "closed" as const,
  },
];

export default function TradesPage() {
  const [search, setSearch] = useState("");

  const filteredTrades = demoTrades.filter(
    (trade) =>
      trade.title.toLowerCase().includes(search.toLowerCase()) ||
      trade.security.toLowerCase().includes(search.toLowerCase()) ||
      trade.strategy.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <Header title="Trade Journal" description="View and manage your trades" />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search trades..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Link href="/trades/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Trade
            </Button>
          </Link>
        </div>

        {/* Trades Table */}
        <Card>
          <CardContent className="p-0">
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
                  <TableRow key={trade.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-muted-foreground">
                      {formatDate(trade.entryDate, "MMM d")}
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
                      <SessionBadge session={trade.session} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{trade.strategy}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {trade.riskPercent.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {trade.riskReward.toFixed(1)}R
                    </TableCell>
                    <TableCell
                      className={`text-right font-mono font-medium ${
                        trade.pnl >= 0 ? "text-green" : "text-red"
                      }`}
                    >
                      {trade.pnl >= 0 ? "+" : ""}
                      {formatCurrency(trade.pnl)}
                    </TableCell>
                    <TableCell>
                      <ResultBadge isWinner={trade.isWinner} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
