"use client";

import { useState } from "react";
import { Plus, Target, MoreVertical, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PerformanceBar } from "@/components/charts/performance-bar";

const demoStrategies = [
  {
    id: "1",
    name: "CCM + Trix",
    description: "Combines CCM alignment with Trix indicator for entry confirmation",
    tags: ["scalping", "momentum"],
    trades: 45,
    winRate: 68,
    pnl: 9.80,
    avgRR: 2.3,
    isActive: true,
  },
  {
    id: "2",
    name: "Trix Ribbon Divergence",
    description: "Uses Trix ribbon divergence for reversal entries",
    tags: ["scalping", "divergence"],
    trades: 30,
    winRate: 58,
    pnl: 5.20,
    avgRR: 1.9,
    isActive: true,
  },
  {
    id: "3",
    name: "CCM + RSI Midpoints",
    description: "CCM with RSI midpoint levels for entries",
    tags: ["scalping"],
    trades: 25,
    winRate: 55,
    pnl: 4.50,
    avgRR: 2.1,
    isActive: true,
  },
  {
    id: "4",
    name: "Swing Setup",
    description: "Swing trading setup with grid bot integration",
    tags: ["swing", "grid"],
    trades: 10,
    winRate: 70,
    pnl: 3.25,
    avgRR: 3.5,
    isActive: false,
  },
];

export default function StrategiesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Strategies"
        description="Define and track your trading strategies"
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Strategy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Strategy</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Strategy Name</Label>
                  <Input id="name" placeholder="e.g., CCM + Trix" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your strategy..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" placeholder="scalping, momentum" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entry">Entry Criteria</Label>
                  <Textarea
                    id="entry"
                    placeholder="When do you enter a trade..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exit">Exit Criteria</Label>
                  <Textarea
                    id="exit"
                    placeholder="When do you exit a trade..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="risk">Risk Management</Label>
                  <Textarea
                    id="risk"
                    placeholder="How do you manage risk..."
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Strategy</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {demoStrategies.map((strategy) => (
            <Card key={strategy.id} className={!strategy.isActive ? "opacity-60" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-bg">
                      <Target className="h-5 w-5 text-purple" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{strategy.name}</CardTitle>
                        {!strategy.isActive && (
                          <Badge variant="secondary" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {strategy.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {strategy.description}
                </p>

                <PerformanceBar
                  label="Win Rate"
                  value={strategy.winRate}
                  maxValue={100}
                  trades={strategy.trades}
                  pnl={strategy.pnl}
                  color="bg-purple"
                />

                <div className="grid grid-cols-4 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Trades</p>
                    <p className="font-medium font-mono">{strategy.trades}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                    <p className="font-medium font-mono text-green">
                      {strategy.winRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg R:R</p>
                    <p className="font-medium font-mono">{strategy.avgRR}R</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">P&L</p>
                    <p
                      className={`font-medium font-mono ${
                        strategy.pnl >= 0 ? "text-green" : "text-red"
                      }`}
                    >
                      +${strategy.pnl.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
