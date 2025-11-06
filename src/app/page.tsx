"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  mockTodaysPlan,
  mockNextDayPlan,
  mockActiveSetups,
  mockApproachingSetups,
  calculateProgress,
  shouldTriggerNotification,
  mockPerformance,
} from "@/data/new-mock-data";
import { getModelName } from "@/data/trading-models";
import { formatDistanceToNow, format } from "date-fns";
import { loadFromStorage, KEYS } from "@/lib/storage";
import { PerformanceMetrics } from "@/lib/types";
import Link from "next/link";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [performance, setPerformance] =
    useState<PerformanceMetrics>(mockPerformance);

  useEffect(() => {
    setMounted(true);
    // Load performance data from storage
    const savedPerformance = loadFromStorage<PerformanceMetrics>(
      KEYS.PERFORMANCE,
      mockPerformance
    );
    setPerformance(savedPerformance);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Today's P&L</div>
          <div
            className={`text-2xl font-bold ${
              performance.todayPnL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${performance.todayPnL >= 0 ? "+" : ""}
            {performance.todayPnL.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            RRx: {performance.todayRRx >= 0 ? "+" : ""}
            {performance.todayRRx.toFixed(2)}x
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">
            Yesterday's P&L
          </div>
          <div
            className={`text-2xl font-bold ${
              performance.yesterdayPnL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${performance.yesterdayPnL >= 0 ? "+" : ""}
            {performance.yesterdayPnL.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            RRx: {performance.yesterdayRRx >= 0 ? "+" : ""}
            {performance.yesterdayRRx.toFixed(2)}x
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">
            This Week P&L
          </div>
          <div
            className={`text-2xl font-bold ${
              performance.weekPnL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${performance.weekPnL >= 0 ? "+" : ""}
            {performance.weekPnL.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            RRx: {performance.weekRRx >= 0 ? "+" : ""}
            {performance.weekRRx.toFixed(2)}x
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">
            This Month P&L
          </div>
          <div
            className={`text-2xl font-bold ${
              performance.monthPnL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${performance.monthPnL >= 0 ? "+" : ""}
            {performance.monthPnL.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            RRx: {performance.monthRRx >= 0 ? "+" : ""}
            {performance.monthRRx.toFixed(2)}x
          </div>
        </Card>
      </div>

      {/* Update Performance Button */}
      <Link href="/performance">
        <Button className="w-full" size="lg" variant="outline">
          📊 Update Performance
        </Button>
      </Link>

      {/* Main Content: Today's Plan + Critical Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Plan - Takes 2 columns */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Today's Plan</h2>
            <div className="text-sm text-muted-foreground">
              {format(mockTodaysPlan.date, "EEEE, MMMM d, yyyy")}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Key Notes
              </div>
              <p className="text-sm">{mockTodaysPlan.keyNotes}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Market</div>
                <div className="font-medium capitalize">
                  {mockTodaysPlan.market}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Mode</div>
                <div className="font-medium capitalize">
                  {mockTodaysPlan.mode}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Assets</div>
                <div className="font-medium">
                  {mockTodaysPlan.assets.join(" | ")}
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">
                Risk Budget
              </div>
              <div className="text-2xl font-bold">
                ${mockTodaysPlan.riskBudget.toFixed(2)}
              </div>
            </div>

            {mockTodaysPlan.learningSession && (
              <div>
                <div className="text-sm text-muted-foreground">
                  Learning Session
                </div>
                <div className="text-sm">{mockTodaysPlan.learningSession}</div>
              </div>
            )}

            <Button variant="ghost" size="sm" className="mt-2">
              ✏️ edit
            </Button>
          </div>
        </Card>

        {/* Critical Reminders - Takes 1 column */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Critical Reminders</h2>
          <div className="space-y-3">
            {mockTodaysPlan.criticalReminders.map((reminder, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg"
              >
                <span className="text-lg">⚠️</span>
                <p className="text-sm flex-1">{reminder}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Next Day Plan or New Plan Button */}
      {mockNextDayPlan ? (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Next Day Plan</h3>
            <Button variant="ghost" size="sm">
              ✏️ edit
            </Button>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Key Notes: </span>
              <span className="text-sm">{mockNextDayPlan.keyNotes}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Market: </span>
                <span className="capitalize">{mockNextDayPlan.market}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Mode: </span>
                <span className="capitalize">{mockNextDayPlan.mode}</span>
              </div>
              <div>
                <span className="text-muted-foreground">
                  Assets / Symbols:{" "}
                </span>
                <span>{mockNextDayPlan.assets.join(", ")}</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Risk Budget:{" "}
              </span>
              <span className="text-sm font-semibold">
                ${mockNextDayPlan.riskBudget.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Learning Session:{" "}
              </span>
              <span className="text-sm">{mockNextDayPlan.learningSession}</span>
            </div>
          </div>
        </Card>
      ) : (
        <Link href="/plan/new">
          <Button className="w-full" size="lg" variant="outline">
            + New Plan
          </Button>
        </Link>
      )}

      {/* Calendar Button */}
      <Button className="w-full" size="lg" variant="outline">
        <span className="mr-2">📅</span> Calendar
      </Button>

      {/* Active Setups */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Active Setups ({mockActiveSetups.length})
        </h2>
        <div className="space-y-4">
          {mockActiveSetups.map((setup) => (
            <Card key={setup.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xl font-bold">
                    {setup.asset.symbol} {setup.timeframe}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  ✏️
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Alert Status
                  </div>
                  <Badge className="bg-green-500 mt-1">
                    {setup.tvAlertStatus === "active"
                      ? "Active"
                      : setup.tvAlertStatus === "generated-inactive"
                      ? "Generated (Inactive)"
                      : "Not Generated"}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Direction</div>
                  <Badge
                    className={
                      setup.direction === "long"
                        ? "bg-green-500 mt-1"
                        : "bg-red-500 mt-1"
                    }
                  >
                    {setup.direction === "long" ? "Buy" : "Sell"}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Model</div>
                  <Link
                    href={`/models/${setup.modelId}`}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {getModelName(setup.modelId)}
                  </Link>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Risk Budget
                  </div>
                  <div className="font-medium">${setup.riskBudget}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-1">
                  Confidence
                </div>
                <div className="font-bold">{setup.confidence}/10</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">NOTES</div>
                <p className="text-sm">{setup.notes}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Approaching Setups */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Approaching Setups ({mockApproachingSetups.length})
        </h2>
        <div className="space-y-4">
          {mockApproachingSetups.map((setup) => {
            const progress = calculateProgress(setup);
            const shouldNotify = shouldTriggerNotification(setup);

            return (
              <Card key={setup.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xl font-bold">
                      {setup.asset.symbol} {setup.timeframe}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    ✏️
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-purple-500 to-purple-300 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">→</span>
                  </div>
                  <div className="text-lg font-bold">
                    approaching in -{" "}
                    {setup.expectedTriggerTime &&
                      formatDistanceToNow(setup.expectedTriggerTime)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      TV Alert Status
                    </div>
                    <Badge
                      className={
                        setup.tvAlertStatus === "not-generated"
                          ? "bg-orange-500 mt-1"
                          : setup.tvAlertStatus === "generated-inactive"
                          ? "bg-yellow-500 mt-1"
                          : "bg-green-500 mt-1"
                      }
                    >
                      {setup.tvAlertStatus === "not-generated"
                        ? "Not Generated"
                        : setup.tvAlertStatus === "generated-inactive"
                        ? "Generated (Not Active)"
                        : "Active"}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Direction
                    </div>
                    <Badge
                      className={
                        setup.direction === "long"
                          ? "bg-green-500 mt-1"
                          : "bg-red-500 mt-1"
                      }
                    >
                      {setup.direction === "long" ? "Buy" : "Sell"}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Model</div>
                    <Link
                      href={`/models/${setup.modelId}`}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {getModelName(setup.modelId)}
                    </Link>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Risk Budget
                    </div>
                    <div className="font-medium">${setup.riskBudget}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Confidence
                  </div>
                  <div className="font-bold">{setup.confidence}/10</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    NOTES
                  </div>
                  <p className="text-sm">{setup.notes}</p>
                </div>

                {shouldNotify && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      🚨 Alert: This setup has reached{" "}
                      {setup.notificationThreshold}% of expected time
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
