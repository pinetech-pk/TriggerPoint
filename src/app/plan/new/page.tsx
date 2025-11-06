"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DailyPlan, Market, TradingMode } from "@/lib/oldtypes";
import { mockAssets } from "@/data/new-mock-data";
import { saveToStorage, KEYS } from "@/lib/storage";

export default function NewPlanPage() {
  const router = useRouter();
  const [planDate, setPlanDate] = useState<string>(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [keyNotes, setKeyNotes] = useState("");
  const [market, setMarket] = useState<Market>("crypto");
  const [mode, setMode] = useState<TradingMode>("day-trade");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [riskBudget, setRiskBudget] = useState("30.00");
  const [learningSession, setLearningSession] = useState("");
  const [reminderInput, setReminderInput] = useState("");
  const [reminders, setReminders] = useState<string[]>([]);

  // Filter assets by selected market
  const availableAssets = mockAssets.filter((asset) => asset.market === market);

  const toggleAsset = (symbol: string) => {
    setSelectedAssets((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  const addReminder = () => {
    if (reminderInput.trim()) {
      setReminders([...reminders, reminderInput.trim()]);
      setReminderInput("");
    }
  };

  const removeReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlan: DailyPlan = {
      id: `plan-${Date.now()}`,
      date: new Date(planDate),
      keyNotes,
      market,
      mode,
      assets: selectedAssets,
      riskBudget: parseFloat(riskBudget),
      learningSession: learningSession || undefined,
      criticalReminders: reminders,
    };

    // Save to localStorage (in a real app, this would be an API call)
    // For now, we'll just log it and redirect
    console.log("New Plan Created:", newPlan);

    // TODO: Implement actual storage logic
    // saveToStorage(KEYS.DAILY_PLANS, [...existingPlans, newPlan]);

    // Redirect back to dashboard
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Create New Plan</h1>
        <p className="text-muted-foreground">
          Plan your trading day with clear objectives and risk parameters
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          {/* Plan Date */}
          <div className="mb-4">
            <Label htmlFor="planDate">Plan Date</Label>
            <Input
              id="planDate"
              type="date"
              value={planDate}
              onChange={(e) => setPlanDate(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Key Notes */}
          <div className="mb-4">
            <Label htmlFor="keyNotes">Key Notes</Label>
            <Textarea
              id="keyNotes"
              placeholder="Describe your trading plan for the day..."
              value={keyNotes}
              onChange={(e) => setKeyNotes(e.target.value)}
              className="mt-1 min-h-[100px]"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Example: "Focus on 5m scalping setups, both directions. Looking
              for long opportunities in the evening."
            </p>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Trading Parameters</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Market Selection */}
            <div>
              <Label htmlFor="market">Market</Label>
              <Select
                value={market}
                onValueChange={(value) => setMarket(value as Market)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="commodities">Commodities</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="stocks">Stocks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Trading Mode */}
            <div>
              <Label htmlFor="mode">Trading Mode</Label>
              <Select
                value={mode}
                onValueChange={(value) => setMode(value as TradingMode)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scalping">Scalping</SelectItem>
                  <SelectItem value="day-trade">Day Trade</SelectItem>
                  <SelectItem value="swing">Swing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Asset Selection */}
          <div className="mb-4">
            <Label>Focus Assets / Symbols</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {availableAssets.map((asset) => (
                <Badge
                  key={asset.id}
                  variant={
                    selectedAssets.includes(asset.symbol)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer px-3 py-1.5 text-sm"
                  onClick={() => toggleAsset(asset.symbol)}
                >
                  {asset.symbol}
                </Badge>
              ))}
            </div>
            {selectedAssets.length === 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Select at least one asset to focus on
              </p>
            )}
          </div>

          {/* Risk Budget */}
          <div>
            <Label htmlFor="riskBudget">Risk Budget ($)</Label>
            <Input
              id="riskBudget"
              type="number"
              step="0.01"
              min="0"
              value={riskBudget}
              onChange={(e) => setRiskBudget(e.target.value)}
              className="mt-1"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Maximum amount you're willing to risk for this trading day
            </p>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Learning & Development</h2>

          <div>
            <Label htmlFor="learningSession">Learning Session (Optional)</Label>
            <Textarea
              id="learningSession"
              placeholder="e.g., '40 minutes - read spitter's pick articles' or 'backtest CCM + Trix v2 model'"
              value={learningSession}
              onChange={(e) => setLearningSession(e.target.value)}
              className="mt-1"
            />
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Critical Reminders</h2>

          <div className="mb-4">
            <Label htmlFor="reminderInput">Add Reminder</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="reminderInput"
                placeholder="e.g., 'LINK swing setup approaching at 2 PM'"
                value={reminderInput}
                onChange={(e) => setReminderInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addReminder();
                  }
                }}
              />
              <Button type="button" onClick={addReminder} variant="outline">
                Add
              </Button>
            </div>
          </div>

          {reminders.length > 0 && (
            <div className="space-y-2">
              {reminders.map((reminder, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg"
                >
                  <div className="flex items-start gap-2 flex-1">
                    <span>⚠️</span>
                    <p className="text-sm">{reminder}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReminder(index)}
                    className="h-6 w-6 p-0"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={selectedAssets.length === 0 || !keyNotes.trim()}
          >
            Create Plan
          </Button>
        </div>
      </form>
    </div>
  );
}
