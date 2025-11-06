'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PerformanceMetrics } from '@/lib/types';
import { saveToStorage, loadFromStorage, KEYS } from '@/lib/storage';
import { mockPerformance } from '@/data/new-mock-data';

export default function PerformancePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  // Individual state for each metric
  const [todayPnL, setTodayPnL] = useState('');
  const [todayRRx, setTodayRRx] = useState('');
  
  const [yesterdayPnL, setYesterdayPnL] = useState('');
  const [yesterdayRRx, setYesterdayRRx] = useState('');
  
  const [weekPnL, setWeekPnL] = useState('');
  const [weekRRx, setWeekRRx] = useState('');
  
  const [monthPnL, setMonthPnL] = useState('');
  const [monthRRx, setMonthRRx] = useState('');

  useEffect(() => {
    setMounted(true);
    
    // Load existing performance data or use mock data
    const savedPerformance = loadFromStorage<PerformanceMetrics>(
      KEYS.PERFORMANCE,
      mockPerformance
    );

    // Set initial values
    setTodayPnL(savedPerformance.todayPnL.toString());
    setTodayRRx(savedPerformance.todayRRx.toString());
    setYesterdayPnL(savedPerformance.yesterdayPnL.toString());
    setYesterdayRRx(savedPerformance.yesterdayRRx.toString());
    setWeekPnL(savedPerformance.weekPnL.toString());
    setWeekRRx(savedPerformance.weekRRx.toString());
    setMonthPnL(savedPerformance.monthPnL.toString());
    setMonthRRx(savedPerformance.monthRRx.toString());
  }, []);

  const showSuccessMessage = (message: string) => {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleSaveToday = () => {
    const currentData = loadFromStorage<PerformanceMetrics>(
      KEYS.PERFORMANCE,
      mockPerformance
    );

    const updatedData: PerformanceMetrics = {
      ...currentData,
      todayPnL: parseFloat(todayPnL) || 0,
      todayRRx: parseFloat(todayRRx) || 0,
    };

    saveToStorage(KEYS.PERFORMANCE, updatedData);
    showSuccessMessage("Today's performance saved successfully!");
  };

  const handleSaveYesterday = () => {
    const currentData = loadFromStorage<PerformanceMetrics>(
      KEYS.PERFORMANCE,
      mockPerformance
    );

    const updatedData: PerformanceMetrics = {
      ...currentData,
      yesterdayPnL: parseFloat(yesterdayPnL) || 0,
      yesterdayRRx: parseFloat(yesterdayRRx) || 0,
    };

    saveToStorage(KEYS.PERFORMANCE, updatedData);
    showSuccessMessage("Yesterday's performance saved successfully!");
  };

  const handleSaveWeek = () => {
    const currentData = loadFromStorage<PerformanceMetrics>(
      KEYS.PERFORMANCE,
      mockPerformance
    );

    const updatedData: PerformanceMetrics = {
      ...currentData,
      weekPnL: parseFloat(weekPnL) || 0,
      weekRRx: parseFloat(weekRRx) || 0,
    };

    saveToStorage(KEYS.PERFORMANCE, updatedData);
    showSuccessMessage("This week's performance saved successfully!");
  };

  const handleSaveMonth = () => {
    const currentData = loadFromStorage<PerformanceMetrics>(
      KEYS.PERFORMANCE,
      mockPerformance
    );

    const updatedData: PerformanceMetrics = {
      ...currentData,
      monthPnL: parseFloat(monthPnL) || 0,
      monthRRx: parseFloat(monthRRx) || 0,
    };

    saveToStorage(KEYS.PERFORMANCE, updatedData);
    showSuccessMessage("This month's performance saved successfully!");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Performance Summary</h1>
            <p className="text-muted-foreground">
              Update your trading performance metrics from Notion
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push('/')}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <p className="text-sm text-green-600 dark:text-green-400">{showSuccess}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Today's P&L */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Today's P&L</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="todayPnL">P&L Amount ($)</Label>
              <Input
                id="todayPnL"
                type="number"
                step="0.01"
                placeholder="e.g., 13.50 or -22.50"
                value={todayPnL}
                onChange={(e) => setTodayPnL(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="todayRRx">RRx</Label>
              <Input
                id="todayRRx"
                type="number"
                step="0.01"
                placeholder="e.g., 1.2 or -0.5"
                value={todayRRx}
                onChange={(e) => setTodayRRx(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={handleSaveToday} className="mt-4">
            Save Today's Performance
          </Button>
        </Card>

        {/* Yesterday's P&L */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Yesterday's P&L</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yesterdayPnL">P&L Amount ($)</Label>
              <Input
                id="yesterdayPnL"
                type="number"
                step="0.01"
                placeholder="e.g., 13.50 or -22.50"
                value={yesterdayPnL}
                onChange={(e) => setYesterdayPnL(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="yesterdayRRx">RRx</Label>
              <Input
                id="yesterdayRRx"
                type="number"
                step="0.01"
                placeholder="e.g., 1.2 or -0.5"
                value={yesterdayRRx}
                onChange={(e) => setYesterdayRRx(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={handleSaveYesterday} className="mt-4">
            Save Yesterday's Performance
          </Button>
        </Card>

        {/* This Week P&L */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">This Week P&L</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weekPnL">P&L Amount ($)</Label>
              <Input
                id="weekPnL"
                type="number"
                step="0.01"
                placeholder="e.g., 74.00 or -45.00"
                value={weekPnL}
                onChange={(e) => setWeekPnL(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="weekRRx">RRx</Label>
              <Input
                id="weekRRx"
                type="number"
                step="0.01"
                placeholder="e.g., 3.35 or -1.7"
                value={weekRRx}
                onChange={(e) => setWeekRRx(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={handleSaveWeek} className="mt-4">
            Save This Week's Performance
          </Button>
        </Card>

        {/* This Month P&L */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">This Month P&L</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="monthPnL">P&L Amount ($)</Label>
              <Input
                id="monthPnL"
                type="number"
                step="0.01"
                placeholder="e.g., 185.73 or -120.00"
                value={monthPnL}
                onChange={(e) => setMonthPnL(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="monthRRx">RRx</Label>
              <Input
                id="monthRRx"
                type="number"
                step="0.01"
                placeholder="e.g., 8.5 or -2.3"
                value={monthRRx}
                onChange={(e) => setMonthRRx(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={handleSaveMonth} className="mt-4">
            Save This Month's Performance
          </Button>
        </Card>
      </div>
    </div>
  );
}
