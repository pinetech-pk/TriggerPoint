"use client";

import { useState } from "react";
import { Plus, Wallet, TrendingUp, MoreVertical } from "lucide-react";
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
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const demoAccounts = [
  {
    id: "1",
    name: "Personal (a)",
    accountType: "personal",
    initialCapital: 100,
    currentBalance: 119.50,
    currency: "USD",
    riskLevel: "low",
    trades: 65,
    winRate: 64,
    pnl: 19.50,
    isActive: true,
  },
  {
    id: "2",
    name: "Personal (b)",
    accountType: "personal",
    initialCapital: 200,
    currentBalance: 215.25,
    currency: "USD",
    riskLevel: "high",
    trades: 25,
    winRate: 58,
    pnl: 15.25,
    isActive: true,
  },
  {
    id: "3",
    name: "Funded (FTMO)",
    accountType: "funded",
    initialCapital: 1000,
    currentBalance: 1045.00,
    currency: "USD",
    riskLevel: "medium",
    broker: "FTMO",
    trades: 10,
    winRate: 70,
    pnl: 45.00,
    isActive: true,
  },
];

const accountTypeOptions = [
  { value: "personal", label: "Personal" },
  { value: "funded", label: "Funded" },
  { value: "demo", label: "Demo" },
  { value: "backtest", label: "Backtest" },
];

const riskLevelOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function AccountsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Accounts"
        description="Manage your trading accounts"
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Account</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Account Name</Label>
                  <Input id="name" placeholder="My Trading Account" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Account Type</Label>
                    <Select
                      id="type"
                      options={accountTypeOptions}
                      defaultValue="personal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="risk">Risk Level</Label>
                    <Select
                      id="risk"
                      options={riskLevelOptions}
                      defaultValue="medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capital">Initial Capital ($)</Label>
                  <Input
                    id="capital"
                    type="number"
                    placeholder="1000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="broker">Broker (Optional)</Label>
                  <Input id="broker" placeholder="e.g., FTMO, Interactive Brokers" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Notes about this account..."
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
                  <Button type="submit">Create Account</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoAccounts.map((account) => (
            <Card key={account.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-bg">
                      <Wallet className="h-5 w-5 text-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{account.name}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {account.accountType}
                        </Badge>
                        <Badge
                          variant={
                            account.riskLevel === "low"
                              ? "success"
                              : account.riskLevel === "high"
                              ? "danger"
                              : "warning"
                          }
                          className="text-xs"
                        >
                          {account.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono">
                    ${account.currentBalance.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      account.pnl >= 0 ? "text-green" : "text-red"
                    }`}
                  >
                    {account.pnl >= 0 ? "+" : ""}
                    {((account.pnl / account.initialCapital) * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Trades</p>
                    <p className="font-medium font-mono">{account.trades}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                    <p className="font-medium font-mono text-green">
                      {account.winRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">P&L</p>
                    <p
                      className={`font-medium font-mono ${
                        account.pnl >= 0 ? "text-green" : "text-red"
                      }`}
                    >
                      {account.pnl >= 0 ? "+" : ""}${account.pnl.toFixed(2)}
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
