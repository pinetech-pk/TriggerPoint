# Trading Journal Pro - Technical Specification Document

## Project Overview

**Project Name:** Trading Journal Pro  
**Version:** 1.0.0  
**Document Created:** January 8, 2026  
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase (PostgreSQL)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technical Architecture](#2-technical-architecture)
3. [Database Schema](#3-database-schema)
4. [API Endpoints](#4-api-endpoints)
5. [Feature Specifications](#5-feature-specifications)
6. [UI/UX Components](#6-uiux-components)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Data Import/Export](#8-data-importexport)
9. [Charts & Analytics](#9-charts--analytics)
10. [Implementation Roadmap](#10-implementation-roadmap)
11. [File Structure](#11-file-structure)
12. [Environment Variables](#12-environment-variables)
13. [Sample Data](#13-sample-data)

---

## 1. Executive Summary

### 1.1 Purpose

Trading Journal Pro is a comprehensive web application for traders to log, track, and analyze their trading performance. The application provides detailed analytics, visualizations, and insights to help traders improve their strategies and decision-making.

### 1.2 Key Features

- Multi-account trade logging and management
- Real-time performance analytics and metrics
- Interactive charts (equity curve, P&L distribution, win/loss ratios)
- Strategy and session performance tracking
- Mistake/lesson documentation for continuous improvement
- CSV import from existing journals (Notion, Excel, etc.)
- Responsive dark-mode trading terminal aesthetic

### 1.3 Target Users

- Cryptocurrency traders (primary)
- Forex traders
- Stock market day traders
- Prop firm traders with funded accounts

---

## 2. Technical Architecture

### 2.1 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 14 (App Router) | React framework with SSR/SSG |
| Styling | Tailwind CSS + shadcn/ui | Utility-first CSS with pre-built components |
| State | React Query (TanStack Query) | Server state management & caching |
| Forms | React Hook Form + Zod | Form handling and validation |
| Charts | Recharts | Data visualization |
| Database | Supabase (PostgreSQL) | Backend-as-a-Service with real-time |
| Auth | Supabase Auth | Authentication with OAuth support |
| Hosting | Vercel | Deployment and edge functions |

### 2.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Next.js App Router                     │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │    │
│  │  │Dashboard │  │  Trades  │  │Analytics │  │ Settings │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │    │
│  │                                                           │    │
│  │  ┌─────────────────────────────────────────────────────┐ │    │
│  │  │              shadcn/ui Components                    │ │    │
│  │  │  (Cards, Tables, Charts, Forms, Dialogs, etc.)      │ │    │
│  │  └─────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SUPABASE                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Auth       │  │  PostgreSQL  │  │   Storage (optional) │  │
│  │  - Email     │  │  - Users     │  │   - Trade images     │  │
│  │  - OAuth     │  │  - Accounts  │  │   - Chart screenshots│  │
│  │  - Magic Link│  │  - Trades    │  │                      │  │
│  │              │  │  - Strategies│  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema

### 3.1 Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   users     │       │  accounts   │       │   trades    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │──┐    │ id (PK)     │──┐    │ id (PK)     │
│ email       │  │    │ user_id(FK) │◄─┘    │ user_id(FK) │
│ created_at  │  │    │ name        │  ┌───►│ account_id  │
│ updated_at  │  │    │ initial_cap │  │    │ strategy_id │
└─────────────┘  │    │ account_size│  │    │ title       │
                 │    │ risk_level  │  │    │ date        │
                 │    │ description │  │    │ direction   │
                 │    │ is_active   │  │    │ entry_price │
                 │    │ created_at  │  │    │ exit_price  │
                 │    └─────────────┘  │    │ pnl         │
                 │                     │    │ ...         │
                 │    ┌─────────────┐  │    └─────────────┘
                 │    │ strategies  │  │           │
                 │    ├─────────────┤  │           │
                 └───►│ id (PK)     │◄─┼───────────┘
                      │ user_id(FK) │  │
                      │ name        │  │
                      │ description │  │
                      │ tags        │  │
                      │ is_active   │  │
                      └─────────────┘  │
                                       │
                      ┌─────────────┐  │
                      │   notes     │  │
                      ├─────────────┤  │
                      │ id (PK)     │  │
                      │ user_id(FK) │◄─┘
                      │ trade_id(FK)│
                      │ title       │
                      │ content     │
                      │ type        │
                      │ created_at  │
                      └─────────────┘
```

### 3.2 Table Definitions

#### 3.2.1 `users` Table (Managed by Supabase Auth)

```sql
-- This table is automatically created by Supabase Auth
-- We extend it with a profiles table for additional user data

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  timezone TEXT DEFAULT 'UTC',
  default_currency TEXT DEFAULT 'USD',
  theme TEXT DEFAULT 'dark',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

#### 3.2.2 `accounts` Table

```sql
CREATE TABLE public.accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  initial_capital DECIMAL(15, 2) NOT NULL DEFAULT 0,
  current_balance DECIMAL(15, 2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')) DEFAULT 'medium',
  account_type TEXT CHECK (account_type IN ('personal', 'funded', 'demo', 'backtest')) DEFAULT 'personal',
  broker TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_accounts_user_id ON public.accounts(user_id);
CREATE INDEX idx_accounts_is_active ON public.accounts(is_active);

-- Enable RLS
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can CRUD own accounts" ON public.accounts
  FOR ALL USING (auth.uid() = user_id);
```

#### 3.2.3 `strategies` Table

```sql
CREATE TABLE public.strategies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  rules TEXT,
  entry_criteria TEXT,
  exit_criteria TEXT,
  risk_management TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_strategies_user_id ON public.strategies(user_id);
CREATE INDEX idx_strategies_name ON public.strategies(name);

-- Enable RLS
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can CRUD own strategies" ON public.strategies
  FOR ALL USING (auth.uid() = user_id);
```

#### 3.2.4 `trades` Table (Core Table)

```sql
CREATE TABLE public.trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_id UUID REFERENCES public.accounts(id) ON DELETE SET NULL,
  strategy_id UUID REFERENCES public.strategies(id) ON DELETE SET NULL,
  
  -- Trade Identification
  title TEXT NOT NULL,
  security TEXT NOT NULL,  -- e.g., 'SOL/USDT', 'BTC/USD'
  market TEXT CHECK (market IN ('crypto', 'forex', 'stocks', 'futures', 'options')) DEFAULT 'crypto',
  
  -- Trade Details
  direction TEXT CHECK (direction IN ('LONG', 'SHORT')) NOT NULL,
  entry_price DECIMAL(20, 8),
  exit_price DECIMAL(20, 8),
  quantity DECIMAL(20, 8),
  
  -- Timing
  entry_date TIMESTAMPTZ NOT NULL,
  exit_date TIMESTAMPTZ,
  timeframe TEXT,  -- e.g., '1m', '5m', '15m', '1h', '4h', '1d'
  session TEXT CHECK (session IN ('AS', 'LO', 'NY', 'OTHER')),  -- Asian, London, New York
  
  -- Risk Management
  stop_loss DECIMAL(20, 8),
  take_profit DECIMAL(20, 8),
  risk_percent DECIMAL(5, 2),  -- Risk as % of account
  risk_amount DECIMAL(15, 2), -- Risk in USD
  risk_reward_planned DECIMAL(5, 2),  -- Planned R:R
  
  -- Results
  pnl DECIMAL(15, 2),  -- Profit/Loss in USD
  pnl_percent DECIMAL(8, 4),  -- P&L as % of account
  risk_reward_actual DECIMAL(5, 2),  -- Actual R:R achieved
  is_winner BOOLEAN,
  
  -- Status
  status TEXT CHECK (status IN ('open', 'closed', 'cancelled')) DEFAULT 'closed',
  
  -- Notes & Learning
  setup_notes TEXT,  -- Pre-trade analysis
  execution_notes TEXT,  -- During trade notes
  review_notes TEXT,  -- Post-trade review
  mistake TEXT,  -- What went wrong
  lesson TEXT,  -- What was learned
  
  -- Media
  chart_url TEXT,  -- TradingView screenshot URL
  images TEXT[] DEFAULT '{}',  -- Array of image URLs
  
  -- Tags
  tags TEXT[] DEFAULT '{}',
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_trades_user_id ON public.trades(user_id);
CREATE INDEX idx_trades_account_id ON public.trades(account_id);
CREATE INDEX idx_trades_strategy_id ON public.trades(strategy_id);
CREATE INDEX idx_trades_entry_date ON public.trades(entry_date DESC);
CREATE INDEX idx_trades_security ON public.trades(security);
CREATE INDEX idx_trades_is_winner ON public.trades(is_winner);
CREATE INDEX idx_trades_session ON public.trades(session);
CREATE INDEX idx_trades_status ON public.trades(status);

-- Full-text search index
CREATE INDEX idx_trades_search ON public.trades 
  USING GIN (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(security, '') || ' ' || coalesce(setup_notes, '')));

-- Enable RLS
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can CRUD own trades" ON public.trades
  FOR ALL USING (auth.uid() = user_id);
```

#### 3.2.5 `notes` Table

```sql
CREATE TABLE public.notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  trade_id UUID REFERENCES public.trades(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  type TEXT CHECK (type IN ('general', 'mistake', 'lesson', 'insight', 'routine')) DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notes_user_id ON public.notes(user_id);
CREATE INDEX idx_notes_trade_id ON public.notes(trade_id);
CREATE INDEX idx_notes_type ON public.notes(type);

-- Enable RLS
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can CRUD own notes" ON public.notes
  FOR ALL USING (auth.uid() = user_id);
```

#### 3.2.6 `daily_summaries` Table (Computed/Cached)

```sql
CREATE TABLE public.daily_summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_trades INTEGER DEFAULT 0,
  winning_trades INTEGER DEFAULT 0,
  losing_trades INTEGER DEFAULT 0,
  total_pnl DECIMAL(15, 2) DEFAULT 0,
  total_risk DECIMAL(15, 2) DEFAULT 0,
  avg_risk_reward DECIMAL(5, 2),
  equity DECIMAL(15, 2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, account_id, date)
);

-- Indexes
CREATE INDEX idx_daily_summaries_user_date ON public.daily_summaries(user_id, date DESC);
CREATE INDEX idx_daily_summaries_account ON public.daily_summaries(account_id);

-- Enable RLS
ALTER TABLE public.daily_summaries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can CRUD own summaries" ON public.daily_summaries
  FOR ALL USING (auth.uid() = user_id);
```

### 3.3 Database Functions

#### 3.3.1 Calculate Trade Statistics

```sql
CREATE OR REPLACE FUNCTION calculate_trade_stats(
  p_user_id UUID,
  p_account_id UUID DEFAULT NULL,
  p_strategy_id UUID DEFAULT NULL,
  p_start_date TIMESTAMPTZ DEFAULT NULL,
  p_end_date TIMESTAMPTZ DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_trades', COUNT(*),
    'winning_trades', COUNT(*) FILTER (WHERE is_winner = true),
    'losing_trades', COUNT(*) FILTER (WHERE is_winner = false),
    'win_rate', ROUND(
      (COUNT(*) FILTER (WHERE is_winner = true)::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 
      2
    ),
    'total_pnl', COALESCE(SUM(pnl), 0),
    'avg_win', COALESCE(AVG(pnl) FILTER (WHERE is_winner = true), 0),
    'avg_loss', COALESCE(AVG(pnl) FILTER (WHERE is_winner = false), 0),
    'largest_win', COALESCE(MAX(pnl), 0),
    'largest_loss', COALESCE(MIN(pnl), 0),
    'avg_risk_reward', COALESCE(AVG(risk_reward_actual) FILTER (WHERE risk_reward_actual > 0), 0),
    'profit_factor', CASE 
      WHEN COALESCE(SUM(pnl) FILTER (WHERE pnl < 0), 0) = 0 THEN NULL
      ELSE ABS(COALESCE(SUM(pnl) FILTER (WHERE pnl > 0), 0) / NULLIF(SUM(pnl) FILTER (WHERE pnl < 0), 0))
    END
  ) INTO result
  FROM public.trades
  WHERE user_id = p_user_id
    AND status = 'closed'
    AND (p_account_id IS NULL OR account_id = p_account_id)
    AND (p_strategy_id IS NULL OR strategy_id = p_strategy_id)
    AND (p_start_date IS NULL OR entry_date >= p_start_date)
    AND (p_end_date IS NULL OR entry_date <= p_end_date);
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### 3.3.2 Get Equity Curve Data

```sql
CREATE OR REPLACE FUNCTION get_equity_curve(
  p_user_id UUID,
  p_account_id UUID DEFAULT NULL,
  p_start_date TIMESTAMPTZ DEFAULT NULL
)
RETURNS TABLE (
  trade_number BIGINT,
  date TIMESTAMPTZ,
  pnl DECIMAL,
  cumulative_pnl DECIMAL,
  equity DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  WITH base_data AS (
    SELECT 
      t.entry_date,
      t.pnl,
      a.initial_capital
    FROM public.trades t
    LEFT JOIN public.accounts a ON t.account_id = a.id
    WHERE t.user_id = p_user_id
      AND t.status = 'closed'
      AND (p_account_id IS NULL OR t.account_id = p_account_id)
      AND (p_start_date IS NULL OR t.entry_date >= p_start_date)
    ORDER BY t.entry_date
  )
  SELECT 
    ROW_NUMBER() OVER (ORDER BY entry_date) as trade_number,
    entry_date as date,
    bd.pnl,
    SUM(bd.pnl) OVER (ORDER BY entry_date) as cumulative_pnl,
    COALESCE(bd.initial_capital, 100) + SUM(bd.pnl) OVER (ORDER BY entry_date) as equity
  FROM base_data bd;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### 3.3.3 Get Performance by Period

```sql
CREATE OR REPLACE FUNCTION get_performance_by_period(
  p_user_id UUID,
  p_period TEXT DEFAULT 'day',  -- 'day', 'week', 'month'
  p_account_id UUID DEFAULT NULL
)
RETURNS TABLE (
  period TEXT,
  total_trades BIGINT,
  winning_trades BIGINT,
  win_rate DECIMAL,
  total_pnl DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE p_period
      WHEN 'day' THEN to_char(entry_date, 'YYYY-MM-DD')
      WHEN 'week' THEN to_char(date_trunc('week', entry_date), 'YYYY-MM-DD')
      WHEN 'month' THEN to_char(entry_date, 'YYYY-MM')
    END as period,
    COUNT(*)::BIGINT as total_trades,
    COUNT(*) FILTER (WHERE is_winner = true)::BIGINT as winning_trades,
    ROUND((COUNT(*) FILTER (WHERE is_winner = true)::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 2) as win_rate,
    COALESCE(SUM(pnl), 0) as total_pnl
  FROM public.trades
  WHERE user_id = p_user_id
    AND status = 'closed'
    AND (p_account_id IS NULL OR account_id = p_account_id)
  GROUP BY 1
  ORDER BY 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3.4 Triggers

```sql
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_strategies_updated_at BEFORE UPDATE ON public.strategies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_trades_updated_at BEFORE UPDATE ON public.trades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON public.notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-calculate is_winner based on pnl
CREATE OR REPLACE FUNCTION calculate_is_winner()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.pnl IS NOT NULL THEN
    NEW.is_winner = NEW.pnl > 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_trade_winner BEFORE INSERT OR UPDATE ON public.trades
  FOR EACH ROW EXECUTE FUNCTION calculate_is_winner();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

## 4. API Endpoints

### 4.1 API Structure

All API routes are implemented as Next.js App Router API routes under `/app/api/`.

### 4.2 Endpoint Reference

#### 4.2.1 Trades

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trades` | List trades with filters & pagination |
| GET | `/api/trades/[id]` | Get single trade |
| POST | `/api/trades` | Create new trade |
| PUT | `/api/trades/[id]` | Update trade |
| DELETE | `/api/trades/[id]` | Delete trade |
| POST | `/api/trades/import` | Bulk import trades from CSV |

**GET `/api/trades` Query Parameters:**

```typescript
interface TradeQueryParams {
  page?: number;           // Default: 1
  limit?: number;          // Default: 50, Max: 100
  account_id?: string;     // Filter by account
  strategy_id?: string;    // Filter by strategy
  session?: 'AS' | 'LO' | 'NY';  // Filter by session
  direction?: 'LONG' | 'SHORT';
  is_winner?: boolean;
  security?: string;       // e.g., 'SOL/USDT'
  start_date?: string;     // ISO date
  end_date?: string;       // ISO date
  sort_by?: 'entry_date' | 'pnl' | 'created_at';
  sort_order?: 'asc' | 'desc';
  search?: string;         // Full-text search
}
```

**POST `/api/trades` Request Body:**

```typescript
interface CreateTradeDTO {
  title: string;
  security: string;
  market?: 'crypto' | 'forex' | 'stocks' | 'futures' | 'options';
  direction: 'LONG' | 'SHORT';
  entry_date: string;       // ISO datetime
  exit_date?: string;
  entry_price?: number;
  exit_price?: number;
  quantity?: number;
  stop_loss?: number;
  take_profit?: number;
  risk_percent?: number;
  risk_amount?: number;
  pnl?: number;
  pnl_percent?: number;
  risk_reward_actual?: number;
  timeframe?: string;
  session?: 'AS' | 'LO' | 'NY' | 'OTHER';
  account_id?: string;
  strategy_id?: string;
  setup_notes?: string;
  execution_notes?: string;
  review_notes?: string;
  mistake?: string;
  lesson?: string;
  chart_url?: string;
  tags?: string[];
  status?: 'open' | 'closed' | 'cancelled';
}
```

#### 4.2.2 Accounts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/accounts` | List user accounts |
| GET | `/api/accounts/[id]` | Get single account with stats |
| POST | `/api/accounts` | Create new account |
| PUT | `/api/accounts/[id]` | Update account |
| DELETE | `/api/accounts/[id]` | Delete account |

#### 4.2.3 Strategies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/strategies` | List user strategies |
| GET | `/api/strategies/[id]` | Get strategy with performance stats |
| POST | `/api/strategies` | Create new strategy |
| PUT | `/api/strategies/[id]` | Update strategy |
| DELETE | `/api/strategies/[id]` | Delete strategy |

#### 4.2.4 Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/stats` | Get overall trading statistics |
| GET | `/api/analytics/equity-curve` | Get equity curve data |
| GET | `/api/analytics/daily-pnl` | Get daily P&L data |
| GET | `/api/analytics/by-strategy` | Performance breakdown by strategy |
| GET | `/api/analytics/by-session` | Performance breakdown by session |
| GET | `/api/analytics/by-direction` | Performance breakdown by direction |
| GET | `/api/analytics/monthly` | Monthly performance summary |
| GET | `/api/analytics/calendar` | Calendar heatmap data |

**GET `/api/analytics/stats` Response:**

```typescript
interface TradingStats {
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
  win_rate: number;
  total_pnl: number;
  avg_win: number;
  avg_loss: number;
  largest_win: number;
  largest_loss: number;
  avg_risk_reward: number;
  profit_factor: number;
  best_trade: Trade;
  worst_trade: Trade;
  current_streak: number;
  longest_win_streak: number;
  longest_loss_streak: number;
}
```

#### 4.2.5 Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | List notes with filters |
| GET | `/api/notes/[id]` | Get single note |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/[id]` | Update note |
| DELETE | `/api/notes/[id]` | Delete note |

#### 4.2.6 Import/Export

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/import/csv` | Import trades from CSV |
| POST | `/api/import/notion` | Import from Notion export |
| GET | `/api/export/csv` | Export trades as CSV |
| GET | `/api/export/json` | Export trades as JSON |

---

## 5. Feature Specifications

### 5.1 Dashboard

**Purpose:** Provide at-a-glance overview of trading performance.

**Components:**
1. **Stats Cards Row**
   - Total Trades (with W/L breakdown)
   - Win Rate (%)
   - Total P&L ($)
   - Average Win ($)
   - Average Loss ($)
   - Profit Factor

2. **Equity Curve Chart**
   - Line/Area chart showing account equity over time
   - Starting from initial capital
   - Tooltips showing trade details on hover

3. **Daily P&L Bar Chart**
   - Vertical bars for each trading day
   - Green for profit, red for loss
   - X-axis: dates, Y-axis: P&L amount

4. **Win/Loss Pie Chart**
   - Donut chart with wins vs losses
   - Center shows win rate percentage

5. **Strategy Performance**
   - Horizontal progress bars
   - Shows win rate per strategy
   - Includes trade count and P&L

6. **Session Performance**
   - Similar to strategy but grouped by AS/LO/NY
   - Color-coded badges

7. **Quick Insights Cards**
   - Best Trade
   - Worst Trade
   - Average R:R

### 5.2 Trade Log

**Purpose:** Complete list of all trades with filtering and sorting.

**Features:**
1. **Filters Panel**
   - Date range picker
   - Account dropdown
   - Strategy dropdown
   - Session filter
   - Direction filter (Long/Short)
   - Result filter (Win/Loss)
   - Security search
   - Full-text search

2. **Trade Table**
   - Columns: Date, Title, Direction, Session, Strategy, Risk%, R:R, P&L, Result
   - Sortable columns
   - Pagination (50 per page)
   - Row click opens trade detail modal

3. **Bulk Actions**
   - Select multiple trades
   - Bulk delete
   - Bulk update (strategy, tags)
   - Export selected

4. **Quick Add Button**
   - Floating action button to add new trade
   - Opens trade form modal

### 5.3 Trade Entry Form

**Purpose:** Create and edit trades with all relevant details.

**Form Sections:**
1. **Basic Info**
   - Title (text)
   - Security/Symbol (autocomplete with recent)
   - Market (dropdown)
   - Direction (toggle: Long/Short)
   - Account (dropdown)
   - Strategy (dropdown)

2. **Timing**
   - Entry Date/Time (datetime picker)
   - Exit Date/Time (datetime picker)
   - Session (auto-detect or manual)
   - Timeframe (dropdown)

3. **Prices & Position**
   - Entry Price
   - Exit Price
   - Quantity
   - Stop Loss
   - Take Profit

4. **Risk Management**
   - Risk % of account
   - Risk Amount ($)
   - Planned R:R (auto-calculate)

5. **Results**
   - P&L $ (auto-calculate if prices provided)
   - P&L % (auto-calculate)
   - Actual R:R (auto-calculate)

6. **Notes & Media**
   - Setup Notes (textarea)
   - Execution Notes (textarea)
   - Review Notes (textarea)
   - Mistake (textarea)
   - Lesson (textarea)
   - Chart URL (TradingView link)
   - Tags (tag input)

### 5.4 Analytics Page

**Purpose:** Deep-dive into trading performance with advanced charts.

**Sections:**
1. **Monthly Performance Chart**
   - Composite chart: bars for P&L, line for trade count
   - Dual Y-axis

2. **Performance by Time**
   - Heatmap calendar showing daily P&L
   - Color intensity based on P&L amount

3. **Direction Analysis**
   - Long vs Short comparison
   - Win rate, P&L, trade count for each

4. **Strategy Comparison**
   - Horizontal bar chart comparing strategies
   - Sortable by win rate, P&L, or trade count

5. **Risk Analysis**
   - Distribution of risk per trade
   - R:R distribution histogram
   - Average risk by outcome

6. **Mistakes & Lessons**
   - List of trades with documented mistakes
   - Filterable and searchable
   - Categorized by type

### 5.5 Accounts Management

**Purpose:** Manage multiple trading accounts.

**Features:**
1. **Account List**
   - Card for each account
   - Shows: name, type, balance, P&L, trade count

2. **Account Detail**
   - Full stats for selected account
   - Performance charts scoped to account
   - Trade history filtered to account

3. **Account Form**
   - Name
   - Account type (personal, funded, demo, backtest)
   - Initial capital
   - Currency
   - Risk level
   - Broker
   - Description

### 5.6 Strategies Management

**Purpose:** Define and track trading strategies.

**Features:**
1. **Strategy List**
   - Card for each strategy
   - Shows: name, tags, win rate, P&L, trade count

2. **Strategy Detail**
   - Full description and rules
   - Performance stats
   - List of trades using this strategy

3. **Strategy Form**
   - Name
   - Description
   - Tags (e.g., Scalping, Swing)
   - Entry criteria
   - Exit criteria
   - Risk management rules

### 5.7 Import/Export

**Purpose:** Data portability and migration.

**Import Features:**
1. **CSV Import Wizard**
   - Step 1: Upload file
   - Step 2: Map columns to fields
   - Step 3: Preview data
   - Step 4: Confirm and import
   - Handle duplicates (skip, update, create new)

2. **Notion Import**
   - Accept Notion CSV/MD export
   - Auto-detect Notion format
   - Parse links and relations

**Export Features:**
1. **CSV Export**
   - All trades or filtered selection
   - Choose columns to include

2. **JSON Export**
   - Full data backup
   - Include related data (accounts, strategies)

### 5.8 Settings

**Purpose:** User preferences and configuration.

**Sections:**
1. **Profile**
   - Name
   - Email
   - Avatar
   - Timezone

2. **Preferences**
   - Default currency
   - Default account
   - Theme (dark/light)
   - Dashboard layout

3. **Notifications**
   - Email notifications
   - Daily summary
   - Weekly report

4. **Data Management**
   - Export all data
   - Delete all data
   - Account deletion

---

## 6. UI/UX Components

### 6.1 Design System

**Theme:** Dark trading terminal aesthetic

**Color Palette:**
```css
:root {
  /* Background */
  --bg-primary: #0a0e17;
  --bg-card: #111827;
  --bg-card-hover: #1a2234;
  
  /* Borders */
  --border: #1e293b;
  --border-accent: #334155;
  
  /* Text */
  --text-primary: #e2e8f0;
  --text-muted: #64748b;
  --text-dim: #475569;
  
  /* Semantic Colors */
  --green: #10b981;
  --green-bg: rgba(16, 185, 129, 0.1);
  --red: #ef4444;
  --red-bg: rgba(239, 68, 68, 0.1);
  --blue: #3b82f6;
  --blue-bg: rgba(59, 130, 246, 0.1);
  --purple: #8b5cf6;
  --yellow: #f59e0b;
  --cyan: #06b6d4;
}
```

**Typography:**
- Headings: Inter (600, 700)
- Body: Inter (400, 500)
- Monospace/Numbers: JetBrains Mono

### 6.2 shadcn/ui Components to Install

```bash
npx shadcn-ui@latest init

# Core components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add table
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add popover
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add form
npx shadcn-ui@latest add command
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add progress
```

### 6.3 Custom Components to Build

1. **StatCard** - Stat display with icon, label, value, subtext
2. **TradeCard** - Compact trade summary card
3. **PerformanceBar** - Horizontal progress bar with stats
4. **SessionBadge** - Colored badge for AS/LO/NY
5. **DirectionBadge** - LONG/SHORT badge
6. **ResultBadge** - WIN/LOSS badge
7. **EquityCurve** - Recharts area chart component
8. **DailyPnLChart** - Recharts bar chart component
9. **WinLossPie** - Recharts donut chart
10. **CalendarHeatmap** - Trading calendar with P&L colors
11. **TradeForm** - Complete trade entry form
12. **FilterPanel** - Collapsible filter sidebar
13. **ImportWizard** - Multi-step import dialog
14. **EmptyState** - Placeholder for empty data

---

## 7. Authentication & Authorization

### 7.1 Auth Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │────▶│  Supabase   │────▶│   App       │
│             │◀────│    Auth     │◀────│             │
└─────────────┘     └─────────────┘     └─────────────┘
     │                                        │
     │  1. Sign up/Login                      │
     │     - Email/Password                   │
     │     - Google OAuth                     │
     │     - Magic Link                       │
     │                                        │
     ▼                                        ▼
┌─────────────────────────────────────────────────┐
│                Session Management               │
│  - JWT tokens stored in cookies                 │
│  - Auto-refresh on expiry                       │
│  - Server-side session validation               │
└─────────────────────────────────────────────────┘
```

### 7.2 Implementation

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete({ name, ...options })
        },
      },
    }
  )
}
```

### 7.3 Protected Routes

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.delete({ name, ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect unauthenticated users to login
  if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Redirect authenticated users away from auth pages
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}
```

---

## 8. Data Import/Export

### 8.1 CSV Import Mapping

**Expected columns from Notion export:**

| Notion Column | Database Field | Type | Transform |
|---------------|----------------|------|-----------|
| Trade Title | title | string | trim |
| Account Size | (lookup account) | - | match by name |
| Accounts | account_id | uuid | lookup or create |
| Date | entry_date | datetime | parse multiple formats |
| Direction | direction | enum | uppercase |
| Entry Price | entry_price | decimal | parse |
| Exit Price | exit_price | decimal | parse |
| Market | market | enum | lowercase |
| Mistake - Lesson | mistake | string | - |
| Model | strategy_id | uuid | lookup or create |
| PnL | pnl | decimal | parse (remove $) |
| PnL (%) | pnl_percent | decimal | parse (remove %) |
| RRx | risk_reward_actual | decimal | parse |
| Risk (%) | risk_percent | decimal | parse |
| Risk (USD) | risk_amount | decimal | parse (remove $) |
| Security | security | string | uppercase |
| Session | session | enum | map AS/LO/NY |
| Status | status | enum | lowercase |
| TF | timeframe | string | - |
| Win | is_winner | boolean | Yes/No -> true/false |
| Summary | setup_notes | string | - |
| Chart HTF | chart_url | string | - |
| Chart LTF | (secondary chart) | string | - |

### 8.2 Import Logic

```typescript
// lib/import/csv-parser.ts
interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{ row: number; error: string }>;
  created_accounts: string[];
  created_strategies: string[];
}

async function importTrades(
  userId: string,
  csvData: string,
  columnMapping: Record<string, string>,
  options: {
    duplicateHandling: 'skip' | 'update' | 'create';
    createMissingAccounts: boolean;
    createMissingStrategies: boolean;
  }
): Promise<ImportResult> {
  // 1. Parse CSV
  // 2. Validate required fields
  // 3. Transform data types
  // 4. Create missing accounts/strategies if enabled
  // 5. Check for duplicates
  // 6. Insert trades
  // 7. Return summary
}
```

---

## 9. Charts & Analytics

### 9.1 Recharts Implementation

**Install:**
```bash
npm install recharts
```

**Equity Curve Component:**
```tsx
// components/charts/equity-curve.tsx
'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface EquityCurveProps {
  data: Array<{
    trade: number;
    equity: number;
    pnl: number;
    date: string;
  }>;
}

export function EquityCurve({ data }: EquityCurveProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis 
          dataKey="trade" 
          stroke="#64748b" 
          fontSize={12}
        />
        <YAxis 
          stroke="#64748b" 
          fontSize={12}
          domain={['dataMin - 5', 'dataMax + 5']}
        />
        <Tooltip
          contentStyle={{
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: 8,
          }}
        />
        <Area
          type="monotone"
          dataKey="equity"
          stroke="#3b82f6"
          fill="url(#equityGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
```

### 9.2 Analytics Calculations

All analytics calculations should be performed server-side using PostgreSQL functions for performance. Client-side should only handle rendering.

Key metrics to calculate:
1. **Win Rate** = Wins / Total Trades × 100
2. **Profit Factor** = Gross Profit / Gross Loss
3. **Average R:R** = Average of (Actual R:R) for winning trades
4. **Expectancy** = (Win Rate × Avg Win) - (Loss Rate × Avg Loss)
5. **Max Drawdown** = Largest peak-to-trough decline in equity
6. **Sharpe Ratio** = (Avg Return - Risk Free Rate) / Std Dev of Returns

---

## 10. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Project setup (Next.js, Tailwind, shadcn/ui)
- [ ] Supabase project creation and configuration
- [ ] Database schema implementation
- [ ] Authentication implementation
- [ ] Basic layouts and navigation

### Phase 2: Core Features (Week 3-4)

- [ ] Trade CRUD operations
- [ ] Trade list with pagination
- [ ] Trade form with validation
- [ ] Account management
- [ ] Strategy management

### Phase 3: Analytics (Week 5-6)

- [ ] Dashboard stats cards
- [ ] Equity curve chart
- [ ] Daily P&L chart
- [ ] Win/Loss distribution
- [ ] Strategy performance
- [ ] Session performance

### Phase 4: Import/Export (Week 7)

- [ ] CSV import wizard
- [ ] Column mapping interface
- [ ] Data validation
- [ ] CSV/JSON export

### Phase 5: Polish (Week 8)

- [ ] Loading states and skeletons
- [ ] Error handling
- [ ] Empty states
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Testing

---

## 11. File Structure

```
trading-journal/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── trades/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   ├── accounts/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── strategies/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── import/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── trades/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   ├── import/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── accounts/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── strategies/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── analytics/
│   │   │   ├── stats/
│   │   │   │   └── route.ts
│   │   │   ├── equity-curve/
│   │   │   │   └── route.ts
│   │   │   ├── daily-pnl/
│   │   │   │   └── route.ts
│   │   │   └── ...
│   │   └── export/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── charts/
│   │   ├── equity-curve.tsx
│   │   ├── daily-pnl-chart.tsx
│   │   ├── win-loss-pie.tsx
│   │   ├── performance-bar.tsx
│   │   └── calendar-heatmap.tsx
│   ├── trades/
│   │   ├── trade-form.tsx
│   │   ├── trade-card.tsx
│   │   ├── trade-table.tsx
│   │   └── trade-filters.tsx
│   ├── dashboard/
│   │   ├── stat-card.tsx
│   │   ├── stats-grid.tsx
│   │   ├── strategy-perf.tsx
│   │   └── session-perf.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── mobile-nav.tsx
│   │   └── user-menu.tsx
│   ├── import/
│   │   ├── import-wizard.tsx
│   │   ├── column-mapper.tsx
│   │   └── import-preview.tsx
│   └── shared/
│       ├── loading.tsx
│       ├── empty-state.tsx
│       ├── error-boundary.tsx
│       ├── session-badge.tsx
│       ├── direction-badge.tsx
│       └── result-badge.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── hooks/
│   │   ├── use-trades.ts
│   │   ├── use-accounts.ts
│   │   ├── use-strategies.ts
│   │   └── use-analytics.ts
│   ├── utils/
│   │   ├── format.ts
│   │   ├── date.ts
│   │   ├── calculations.ts
│   │   └── csv-parser.ts
│   ├── validators/
│   │   ├── trade.ts
│   │   ├── account.ts
│   │   └── strategy.ts
│   └── types/
│       ├── database.ts        # Supabase generated types
│       ├── trade.ts
│       ├── account.ts
│       └── analytics.ts
├── public/
│   └── ...
├── styles/
│   └── globals.css
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## 12. Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Trading Journal Pro"

# Optional: Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## 13. Sample Data

### 13.1 Sample Accounts

```json
[
  {
    "name": "Personal (a)",
    "account_type": "personal",
    "initial_capital": 100,
    "currency": "USD",
    "risk_level": "low"
  },
  {
    "name": "Personal (b)",
    "account_type": "personal",
    "initial_capital": 200,
    "currency": "USD",
    "risk_level": "high"
  },
  {
    "name": "Funded (a)",
    "account_type": "funded",
    "initial_capital": 1000,
    "currency": "USD",
    "risk_level": "medium",
    "broker": "FTMO"
  }
]
```

### 13.2 Sample Strategies

```json
[
  {
    "name": "CCM + Trix",
    "tags": ["scalping", "momentum"],
    "description": "Combines CCM alignment with Trix indicator for entry confirmation"
  },
  {
    "name": "Trix Ribbon Divergence",
    "tags": ["scalping", "divergence"],
    "description": "Uses Trix ribbon divergence for reversal entries"
  },
  {
    "name": "CCM + RSI Midpoints",
    "tags": ["scalping"],
    "description": "CCM with RSI midpoint levels for entries"
  },
  {
    "name": "Swing Setup",
    "tags": ["swing", "grid"],
    "description": "Swing trading setup with grid bot integration"
  }
]
```

### 13.3 Sample Trade (for reference)

```json
{
  "title": "SOL/USDT (1m)",
  "security": "SOL/USDT",
  "market": "crypto",
  "direction": "LONG",
  "entry_date": "2025-12-25T19:39:00+05:00",
  "timeframe": "m1",
  "session": "NY",
  "risk_percent": 0.1,
  "risk_amount": 0.10,
  "pnl": 0.25,
  "pnl_percent": 0.25,
  "risk_reward_actual": 2.5,
  "is_winner": true,
  "status": "closed",
  "account_id": "uuid-of-personal-a",
  "strategy_id": "uuid-of-ccm-trix"
}
```

---

## Appendix A: Reference Implementation

The working HTML prototype with all 100 trades is included in the project files. Use it as a visual reference for:
- UI layout and styling
- Chart configurations
- Color scheme
- Component structure

---

## Appendix B: Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Recharts Documentation](https://recharts.org)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)
- [TanStack Query](https://tanstack.com/query)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-08 | Claude | Initial specification |

---

**End of Specification Document**
