"use client";

import { useEffect, useState } from "react";
import { Plus, Wallet, MoreVertical, Loader2 } from "lucide-react";
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
import { EmptyState } from "@/components/shared/empty-state";
import { createClient } from "@/lib/supabase/client";
import type { Account } from "@/lib/types/database";

interface AccountWithStats extends Account {
  trades_count?: number;
  win_rate?: number;
  total_pnl?: number;
}

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
  const [accounts, setAccounts] = useState<AccountWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    account_type: "personal",
    risk_level: "medium",
    initial_capital: "",
    broker: "",
    description: "",
  });

  const supabase = createClient();

  // Fetch accounts with stats
  const fetchAccounts = async () => {
    setLoading(true);

    const { data: accountsData, error: accountsError } = await supabase
      .from("accounts")
      .select("*")
      .order("created_at", { ascending: false }) as { data: Account[] | null; error: any };

    if (accountsError) {
      console.error("Error fetching accounts:", accountsError);
      setLoading(false);
      return;
    }

    // Fetch trade stats for each account
    const accountsWithStats: AccountWithStats[] = await Promise.all(
      (accountsData || []).map(async (account: Account) => {
        const { data: trades } = await supabase
          .from("trades")
          .select("pnl, is_winner")
          .eq("account_id", account.id)
          .eq("status", "closed") as { data: { pnl: number | null; is_winner: boolean | null }[] | null };

        const tradesCount = trades?.length || 0;
        const winningTrades = trades?.filter((t) => t.is_winner)?.length || 0;
        const winRate = tradesCount > 0 ? (winningTrades / tradesCount) * 100 : 0;
        const totalPnl = trades?.reduce((sum, t) => sum + (t.pnl || 0), 0) || 0;

        return {
          ...account,
          trades_count: tradesCount,
          win_rate: winRate,
          total_pnl: totalPnl,
        };
      })
    );

    setAccounts(accountsWithStats);
    setLoading(false);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("accounts").insert({
      user_id: user.id,
      name: formData.name,
      account_type: formData.account_type,
      risk_level: formData.risk_level,
      initial_capital: parseFloat(formData.initial_capital) || 0,
      current_balance: parseFloat(formData.initial_capital) || 0,
      broker: formData.broker || null,
      description: formData.description || null,
    } as any);

    if (error) {
      console.error("Error creating account:", error);
    } else {
      // Reset form and close dialog
      setFormData({
        name: "",
        account_type: "personal",
        risk_level: "medium",
        initial_capital: "",
        broker: "",
        description: "",
      });
      setDialogOpen(false);
      // Refresh accounts list
      fetchAccounts();
    }

    setSubmitting(false);
  };

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
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Account Name</Label>
                  <Input
                    id="name"
                    placeholder="My Trading Account"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Account Type</Label>
                    <Select
                      id="type"
                      options={accountTypeOptions}
                      value={formData.account_type}
                      onChange={(e) => setFormData({ ...formData, account_type: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="risk">Risk Level</Label>
                    <Select
                      id="risk"
                      options={riskLevelOptions}
                      value={formData.risk_level}
                      onChange={(e) => setFormData({ ...formData, risk_level: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capital">Initial Capital ($)</Label>
                  <Input
                    id="capital"
                    type="number"
                    placeholder="1000"
                    value={formData.initial_capital}
                    onChange={(e) => setFormData({ ...formData, initial_capital: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="broker">Broker (Optional)</Label>
                  <Input
                    id="broker"
                    placeholder="e.g., FTMO, Interactive Brokers"
                    value={formData.broker}
                    onChange={(e) => setFormData({ ...formData, broker: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Notes about this account..."
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : accounts.length === 0 ? (
          <EmptyState
            title="No accounts yet"
            description="Create your first trading account to start tracking your performance."
            action={
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Account
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
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
                            {account.account_type}
                          </Badge>
                          <Badge
                            variant={
                              account.risk_level === "low"
                                ? "success"
                                : account.risk_level === "high"
                                ? "danger"
                                : "warning"
                            }
                            className="text-xs"
                          >
                            {account.risk_level} risk
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
                      ${account.current_balance.toFixed(2)}
                    </span>
                    {account.initial_capital > 0 && (
                      <span
                        className={`text-sm font-medium ${
                          (account.total_pnl || 0) >= 0 ? "text-green" : "text-red"
                        }`}
                      >
                        {(account.total_pnl || 0) >= 0 ? "+" : ""}
                        {(((account.total_pnl || 0) / account.initial_capital) * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>

                  {account.broker && (
                    <p className="text-xs text-muted-foreground">
                      Broker: {account.broker}
                    </p>
                  )}

                  <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Trades</p>
                      <p className="font-medium font-mono">{account.trades_count || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                      <p className={`font-medium font-mono ${(account.win_rate || 0) >= 50 ? "text-green" : "text-red"}`}>
                        {(account.win_rate || 0).toFixed(0)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">P&L</p>
                      <p
                        className={`font-medium font-mono ${
                          (account.total_pnl || 0) >= 0 ? "text-green" : "text-red"
                        }`}
                      >
                        {(account.total_pnl || 0) >= 0 ? "+" : ""}${(account.total_pnl || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
