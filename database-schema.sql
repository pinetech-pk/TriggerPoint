-- ============================================================
-- Trading Journal Pro - Database Schema
-- Supabase (PostgreSQL)
-- Version: 1.0.0
-- ============================================================

-- ============================================================
-- 1. PROFILES TABLE (extends Supabase Auth users)
-- ============================================================

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

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);


-- ============================================================
-- 2. ACCOUNTS TABLE
-- ============================================================

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
CREATE POLICY "Users can view own accounts" ON public.accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own accounts" ON public.accounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own accounts" ON public.accounts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own accounts" ON public.accounts
  FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- 3. STRATEGIES TABLE
-- ============================================================

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
CREATE INDEX idx_strategies_tags ON public.strategies USING GIN(tags);

-- Enable RLS
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own strategies" ON public.strategies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own strategies" ON public.strategies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own strategies" ON public.strategies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own strategies" ON public.strategies
  FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- 4. TRADES TABLE (Core Table)
-- ============================================================

CREATE TABLE public.trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_id UUID REFERENCES public.accounts(id) ON DELETE SET NULL,
  strategy_id UUID REFERENCES public.strategies(id) ON DELETE SET NULL,
  
  -- Trade Identification
  title TEXT NOT NULL,
  security TEXT NOT NULL,
  market TEXT CHECK (market IN ('crypto', 'forex', 'stocks', 'futures', 'options')) DEFAULT 'crypto',
  
  -- Trade Details
  direction TEXT CHECK (direction IN ('LONG', 'SHORT')) NOT NULL,
  entry_price DECIMAL(20, 8),
  exit_price DECIMAL(20, 8),
  quantity DECIMAL(20, 8),
  
  -- Timing
  entry_date TIMESTAMPTZ NOT NULL,
  exit_date TIMESTAMPTZ,
  timeframe TEXT,
  session TEXT CHECK (session IN ('AS', 'LO', 'NY', 'OTHER')),
  
  -- Risk Management
  stop_loss DECIMAL(20, 8),
  take_profit DECIMAL(20, 8),
  risk_percent DECIMAL(5, 2),
  risk_amount DECIMAL(15, 2),
  risk_reward_planned DECIMAL(5, 2),
  
  -- Results
  pnl DECIMAL(15, 2),
  pnl_percent DECIMAL(8, 4),
  risk_reward_actual DECIMAL(5, 2),
  is_winner BOOLEAN,
  
  -- Status
  status TEXT CHECK (status IN ('open', 'closed', 'cancelled')) DEFAULT 'closed',
  
  -- Notes & Learning
  setup_notes TEXT,
  execution_notes TEXT,
  review_notes TEXT,
  mistake TEXT,
  lesson TEXT,
  
  -- Media
  chart_url TEXT,
  images TEXT[] DEFAULT '{}',
  
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
CREATE INDEX idx_trades_direction ON public.trades(direction);
CREATE INDEX idx_trades_market ON public.trades(market);
CREATE INDEX idx_trades_tags ON public.trades USING GIN(tags);

-- Full-text search index
CREATE INDEX idx_trades_search ON public.trades 
  USING GIN (to_tsvector('english', 
    coalesce(title, '') || ' ' || 
    coalesce(security, '') || ' ' || 
    coalesce(setup_notes, '') || ' ' ||
    coalesce(mistake, '') || ' ' ||
    coalesce(lesson, '')
  ));

-- Enable RLS
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own trades" ON public.trades
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own trades" ON public.trades
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trades" ON public.trades
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trades" ON public.trades
  FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- 5. NOTES TABLE
-- ============================================================

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
CREATE INDEX idx_notes_is_pinned ON public.notes(is_pinned);

-- Enable RLS
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own notes" ON public.notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own notes" ON public.notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON public.notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON public.notes
  FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- 6. DAILY SUMMARIES TABLE (Cached/Computed)
-- ============================================================

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
CREATE POLICY "Users can view own summaries" ON public.daily_summaries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own summaries" ON public.daily_summaries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own summaries" ON public.daily_summaries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own summaries" ON public.daily_summaries
  FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- 7. TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_accounts_updated_at 
  BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_strategies_updated_at 
  BEFORE UPDATE ON public.strategies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_trades_updated_at 
  BEFORE UPDATE ON public.trades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_notes_updated_at 
  BEFORE UPDATE ON public.notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_daily_summaries_updated_at 
  BEFORE UPDATE ON public.daily_summaries
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

CREATE TRIGGER calculate_trade_winner 
  BEFORE INSERT OR UPDATE ON public.trades
  FOR EACH ROW EXECUTE FUNCTION calculate_is_winner();


-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================================================
-- 8. DATABASE FUNCTIONS
-- ============================================================

-- Calculate Trade Statistics
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
    'total_pnl', ROUND(COALESCE(SUM(pnl), 0)::DECIMAL, 2),
    'avg_win', ROUND(COALESCE(AVG(pnl) FILTER (WHERE is_winner = true), 0)::DECIMAL, 2),
    'avg_loss', ROUND(COALESCE(AVG(pnl) FILTER (WHERE is_winner = false), 0)::DECIMAL, 2),
    'largest_win', ROUND(COALESCE(MAX(pnl), 0)::DECIMAL, 2),
    'largest_loss', ROUND(COALESCE(MIN(pnl), 0)::DECIMAL, 2),
    'avg_risk_reward', ROUND(COALESCE(AVG(risk_reward_actual) FILTER (WHERE risk_reward_actual > 0), 0)::DECIMAL, 2),
    'profit_factor', ROUND(
      CASE 
        WHEN COALESCE(SUM(pnl) FILTER (WHERE pnl < 0), 0) = 0 THEN 0
        ELSE ABS(COALESCE(SUM(pnl) FILTER (WHERE pnl > 0), 0) / NULLIF(SUM(pnl) FILTER (WHERE pnl < 0), 0))
      END::DECIMAL, 2
    ),
    'total_risk', ROUND(COALESCE(SUM(risk_amount), 0)::DECIMAL, 2),
    'avg_risk_percent', ROUND(COALESCE(AVG(risk_percent), 0)::DECIMAL, 2)
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


-- Get Equity Curve Data
CREATE OR REPLACE FUNCTION get_equity_curve(
  p_user_id UUID,
  p_account_id UUID DEFAULT NULL,
  p_initial_capital DECIMAL DEFAULT 100
)
RETURNS TABLE (
  trade_number BIGINT,
  trade_date TIMESTAMPTZ,
  trade_pnl DECIMAL,
  cumulative_pnl DECIMAL,
  equity DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (ORDER BY t.entry_date) as trade_number,
    t.entry_date as trade_date,
    t.pnl as trade_pnl,
    SUM(t.pnl) OVER (ORDER BY t.entry_date) as cumulative_pnl,
    p_initial_capital + SUM(t.pnl) OVER (ORDER BY t.entry_date) as equity
  FROM public.trades t
  WHERE t.user_id = p_user_id
    AND t.status = 'closed'
    AND (p_account_id IS NULL OR t.account_id = p_account_id)
  ORDER BY t.entry_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Get Daily P&L
CREATE OR REPLACE FUNCTION get_daily_pnl(
  p_user_id UUID,
  p_account_id UUID DEFAULT NULL,
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL
)
RETURNS TABLE (
  date DATE,
  total_pnl DECIMAL,
  trade_count BIGINT,
  winning_trades BIGINT,
  win_rate DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    DATE(t.entry_date) as date,
    ROUND(SUM(t.pnl)::DECIMAL, 2) as total_pnl,
    COUNT(*) as trade_count,
    COUNT(*) FILTER (WHERE t.is_winner = true) as winning_trades,
    ROUND((COUNT(*) FILTER (WHERE t.is_winner = true)::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 2) as win_rate
  FROM public.trades t
  WHERE t.user_id = p_user_id
    AND t.status = 'closed'
    AND (p_account_id IS NULL OR t.account_id = p_account_id)
    AND (p_start_date IS NULL OR DATE(t.entry_date) >= p_start_date)
    AND (p_end_date IS NULL OR DATE(t.entry_date) <= p_end_date)
  GROUP BY DATE(t.entry_date)
  ORDER BY DATE(t.entry_date);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Get Performance by Strategy
CREATE OR REPLACE FUNCTION get_performance_by_strategy(
  p_user_id UUID,
  p_account_id UUID DEFAULT NULL
)
RETURNS TABLE (
  strategy_id UUID,
  strategy_name TEXT,
  total_trades BIGINT,
  winning_trades BIGINT,
  win_rate DECIMAL,
  total_pnl DECIMAL,
  avg_pnl DECIMAL,
  avg_risk_reward DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id as strategy_id,
    COALESCE(s.name, 'No Strategy') as strategy_name,
    COUNT(t.*) as total_trades,
    COUNT(*) FILTER (WHERE t.is_winner = true) as winning_trades,
    ROUND((COUNT(*) FILTER (WHERE t.is_winner = true)::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 2) as win_rate,
    ROUND(SUM(t.pnl)::DECIMAL, 2) as total_pnl,
    ROUND(AVG(t.pnl)::DECIMAL, 2) as avg_pnl,
    ROUND(AVG(t.risk_reward_actual) FILTER (WHERE t.risk_reward_actual > 0)::DECIMAL, 2) as avg_risk_reward
  FROM public.trades t
  LEFT JOIN public.strategies s ON t.strategy_id = s.id
  WHERE t.user_id = p_user_id
    AND t.status = 'closed'
    AND (p_account_id IS NULL OR t.account_id = p_account_id)
  GROUP BY s.id, s.name
  ORDER BY total_pnl DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Get Performance by Session
CREATE OR REPLACE FUNCTION get_performance_by_session(
  p_user_id UUID,
  p_account_id UUID DEFAULT NULL
)
RETURNS TABLE (
  session TEXT,
  session_name TEXT,
  total_trades BIGINT,
  winning_trades BIGINT,
  win_rate DECIMAL,
  total_pnl DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.session,
    CASE t.session
      WHEN 'AS' THEN 'Asian'
      WHEN 'LO' THEN 'London'
      WHEN 'NY' THEN 'New York'
      ELSE 'Other'
    END as session_name,
    COUNT(*) as total_trades,
    COUNT(*) FILTER (WHERE t.is_winner = true) as winning_trades,
    ROUND((COUNT(*) FILTER (WHERE t.is_winner = true)::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 2) as win_rate,
    ROUND(SUM(t.pnl)::DECIMAL, 2) as total_pnl
  FROM public.trades t
  WHERE t.user_id = p_user_id
    AND t.status = 'closed'
    AND t.session IS NOT NULL
    AND (p_account_id IS NULL OR t.account_id = p_account_id)
  GROUP BY t.session
  ORDER BY total_pnl DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Get Performance by Direction
CREATE OR REPLACE FUNCTION get_performance_by_direction(
  p_user_id UUID,
  p_account_id UUID DEFAULT NULL
)
RETURNS TABLE (
  direction TEXT,
  total_trades BIGINT,
  winning_trades BIGINT,
  win_rate DECIMAL,
  total_pnl DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.direction,
    COUNT(*) as total_trades,
    COUNT(*) FILTER (WHERE t.is_winner = true) as winning_trades,
    ROUND((COUNT(*) FILTER (WHERE t.is_winner = true)::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 2) as win_rate,
    ROUND(SUM(t.pnl)::DECIMAL, 2) as total_pnl
  FROM public.trades t
  WHERE t.user_id = p_user_id
    AND t.status = 'closed'
    AND (p_account_id IS NULL OR t.account_id = p_account_id)
  GROUP BY t.direction
  ORDER BY total_pnl DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Get Monthly Performance
CREATE OR REPLACE FUNCTION get_monthly_performance(
  p_user_id UUID,
  p_account_id UUID DEFAULT NULL
)
RETURNS TABLE (
  month TEXT,
  total_trades BIGINT,
  winning_trades BIGINT,
  win_rate DECIMAL,
  total_pnl DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(t.entry_date, 'YYYY-MM') as month,
    COUNT(*) as total_trades,
    COUNT(*) FILTER (WHERE t.is_winner = true) as winning_trades,
    ROUND((COUNT(*) FILTER (WHERE t.is_winner = true)::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 2) as win_rate,
    ROUND(SUM(t.pnl)::DECIMAL, 2) as total_pnl
  FROM public.trades t
  WHERE t.user_id = p_user_id
    AND t.status = 'closed'
    AND (p_account_id IS NULL OR t.account_id = p_account_id)
  GROUP BY TO_CHAR(t.entry_date, 'YYYY-MM')
  ORDER BY month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================================
-- 9. GRANT PERMISSIONS
-- ============================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant access to tables
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.accounts TO authenticated;
GRANT ALL ON public.strategies TO authenticated;
GRANT ALL ON public.trades TO authenticated;
GRANT ALL ON public.notes TO authenticated;
GRANT ALL ON public.daily_summaries TO authenticated;

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION calculate_trade_stats TO authenticated;
GRANT EXECUTE ON FUNCTION get_equity_curve TO authenticated;
GRANT EXECUTE ON FUNCTION get_daily_pnl TO authenticated;
GRANT EXECUTE ON FUNCTION get_performance_by_strategy TO authenticated;
GRANT EXECUTE ON FUNCTION get_performance_by_session TO authenticated;
GRANT EXECUTE ON FUNCTION get_performance_by_direction TO authenticated;
GRANT EXECUTE ON FUNCTION get_monthly_performance TO authenticated;
