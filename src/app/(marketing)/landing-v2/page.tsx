/**
 * LANDING V2 — "Terminal Pro" Design System
 *
 * Design language: Dense, data-terminal aesthetic. Electric cyan on near-black.
 * Monospace numbers, border-grid layouts, zero visual noise. Feels like a
 * professional trading desk tool — Bloomberg meets Linear.
 *
 * Preview route: /landing-v2
 * Status: PREVIEW / TESTING ONLY — do not replace the live page
 */

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Terminal,
  Shield,
  Activity,
  Clock,
  TrendingUp,
  ChevronRight,
  Minus,
} from "lucide-react";

// ─────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────
const C = {
  bg: "#04070f",
  bgCard: "#080d18",
  bgRow: "#0b1020",
  border: "#1a2540",
  borderAccent: "#00c6ff33",
  cyan: "#00c6ff",
  cyanDim: "#00c6ff99",
  green: "#00e5a0",
  greenDim: "#00e5a066",
  muted: "#4a5a78",
  text: "#dce8ff",
  textDim: "#8899bb",
};

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      style={{ background: `${C.bg}ee`, borderBottom: `1px solid ${C.border}` }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo_Icon.png" alt="Tralytic" width={34} height={34} priority />
          <span className="font-black text-base leading-none">
            <span style={{ color: C.text }}>Tra</span>
            <span style={{ color: C.cyan }}>lytic</span>
          </span>
        </Link>

        {/* Status pill */}
        <div
          className="hidden md:flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono"
          style={{ background: `${C.green}14`, border: `1px solid ${C.greenDim}`, color: C.green }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.green }} />
          PREVIEW BUILD · V2
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-mono transition-colors"
            style={{ color: C.muted }}
          >
            SIGN_IN
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-mono font-semibold transition-opacity hover:opacity-80"
            style={{ background: C.cyan, color: C.bg }}
          >
            START_FREE <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// Metric row (terminal-style)
// ─────────────────────────────────────────────
function MetricRow({
  label,
  value,
  delta,
  accent = "cyan",
}: {
  label: string;
  value: string;
  delta?: string;
  accent?: "cyan" | "green" | "muted";
}) {
  const color =
    accent === "cyan" ? C.cyan : accent === "green" ? C.green : C.muted;
  return (
    <div
      className="flex items-center justify-between px-4 py-3 font-mono text-sm"
      style={{ borderBottom: `1px solid ${C.border}` }}
    >
      <span style={{ color: C.muted }}>{label}</span>
      <div className="flex items-center gap-3">
        {delta && (
          <span className="text-xs" style={{ color: C.green }}>
            {delta}
          </span>
        )}
        <span className="font-bold" style={{ color }}>
          {value}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="min-h-screen flex items-center pt-14 px-6"
      style={{ background: C.bg }}
    >
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
        {/* Left — copy */}
        <div>
          {/* System tag */}
          <div
            className="inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-mono mb-8"
            style={{ background: `${C.cyan}10`, border: `1px solid ${C.borderAccent}`, color: C.cyanDim }}
          >
            <Terminal className="h-3 w-3" />
            TRALYTIC_OS · BUILD 2.0
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6"
            style={{ color: C.text }}
          >
            Your edge is real.
            <br />
            <span style={{ color: C.cyan }}>Your execution</span>
            <br />
            is leaking it.
          </h1>

          <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: C.textDim }}>
            Tralytic is a behavioural trading analytics engine. It dissects
            every trade you log and surfaces the patterns that erode your
            edge — before your balance confirms them.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-bold rounded transition-opacity hover:opacity-85"
              style={{ background: C.cyan, color: C.bg }}
            >
              DEPLOY FREE TRIAL
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-semibold rounded transition-colors"
              style={{ border: `1px solid ${C.border}`, color: C.textDim }}
            >
              VIEW DEMO DATA <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-5 font-mono text-xs" style={{ color: C.muted }}>
            // 15-day trial · no charge · card required
          </p>
        </div>

        {/* Right — terminal panel */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: `1px solid ${C.border}`, background: C.bgCard }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ borderBottom: `1px solid ${C.border}`, background: `${C.cyan}06` }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: C.cyan }}
              >
                tralytic
              </span>
              <span className="font-mono text-xs" style={{ color: C.muted }}>
                / account_snapshot.json
              </span>
            </div>
            <span className="font-mono text-xs" style={{ color: C.muted }}>
              LIVE
            </span>
          </div>

          {/* Metrics */}
          <MetricRow label="total_rrx" value="+53.5R" delta="+2.1R today" accent="green" />
          <MetricRow label="win_rate" value="34.6%" accent="cyan" />
          <MetricRow label="profit_factor" value="1.33" accent="cyan" />
          <MetricRow label="total_trades" value="153" accent="muted" />
          <MetricRow label="avg_rrx_per_trade" value="+0.35R" accent="green" />
          <MetricRow label="planned_rr" value="1 : 3.0" accent="muted" />
          <MetricRow label="realised_rrx" value="1 : 2.1" accent="cyan" />

          {/* Separator */}
          <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${C.border}` }}>
            <Minus className="h-3 w-3" style={{ color: C.muted }} />
            <span className="font-mono text-xs" style={{ color: C.muted }}>
              BEHAVIOURAL FLAGS
            </span>
          </div>

          <MetricRow label="post_win_loss_rate" value="68%" accent="cyan" />
          <MetricRow label="tuesday_win_rate_drop" value="-14%" accent="cyan" />
          <MetricRow label="london_vs_ny_rrx" value="2.1x" accent="green" />

          {/* Footer */}
          <div
            className="px-4 py-3 font-mono text-xs"
            style={{ color: C.muted, borderTop: `1px solid ${C.border}` }}
          >
            last_sync: 2 min ago · source: manual_import
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// RRx breakdown section
// ─────────────────────────────────────────────
function RRxBreakdown() {
  return (
    <section style={{ background: C.bg, borderTop: `1px solid ${C.border}` }} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <div className="flex items-center gap-3 mb-10">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{ background: `${C.cyan}18`, color: C.cyan, border: `1px solid ${C.borderAccent}` }}
          >
            CORE_METRIC
          </span>
          <div className="flex-1 h-px" style={{ background: C.border }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2
              className="text-4xl font-black leading-tight tracking-tight mb-5"
              style={{ color: C.text }}
            >
              RRx: The number
              <br />
              <span style={{ color: C.cyan }}>your broker doesn't show you.</span>
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: C.textDim }}>
              Planned RR is fiction. RRx — realised risk-reward — accounts
              for every pip of slippage, every dollar of commission, every
              early exit. It is the only number that tells you whether your
              edge is actually edge.
            </p>
            <p className="leading-relaxed" style={{ color: C.textDim }}>
              Tralytic computes RRx for every trade, every session,
              every strategy, and every day of the week. If your RRx
              is decaying, you'll see it weeks before your balance does.
            </p>
          </div>

          {/* Comparison block */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: `1px solid ${C.border}` }}
          >
            <div
              className="grid grid-cols-2"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <div
                className="p-6"
                style={{ borderRight: `1px solid ${C.border}`, background: C.bgRow }}
              >
                <p className="font-mono text-xs mb-4" style={{ color: C.muted }}>
                  WHAT_YOUR_CHART_SAYS
                </p>
                <p className="font-mono text-4xl font-black" style={{ color: C.muted }}>
                  1:3.0<span className="text-lg">R</span>
                </p>
                <p className="font-mono text-xs mt-2" style={{ color: C.border }}>
                  planned_rr
                </p>
              </div>
              <div className="p-6" style={{ background: `${C.green}06` }}>
                <p className="font-mono text-xs mb-4" style={{ color: `${C.green}aa` }}>
                  WHAT_RRX_REVEALS
                </p>
                <p className="font-mono text-4xl font-black" style={{ color: C.green }}>
                  1:2.1<span className="text-lg">R</span>
                </p>
                <p className="font-mono text-xs mt-2" style={{ color: `${C.green}66` }}>
                  realised_rrx
                </p>
              </div>
            </div>
            <div
              className="px-6 py-4 font-mono text-xs text-center"
              style={{ color: C.muted, background: C.bgCard }}
            >
              // delta of 0.9R per trade · compounded over 153 trades
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Signals section
// ─────────────────────────────────────────────
function SignalRow({
  id,
  title,
  body,
  icon: Icon,
}: {
  id: string;
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <div
      className="grid grid-cols-[auto_1fr] gap-6 p-6"
      style={{ borderBottom: `1px solid ${C.border}` }}
    >
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex h-10 w-10 items-center justify-center rounded"
          style={{ background: `${C.cyan}12`, border: `1px solid ${C.borderAccent}` }}
        >
          <Icon className="h-4 w-4" style={{ color: C.cyan }} />
        </div>
        <span className="font-mono text-xs" style={{ color: C.muted }}>
          {id}
        </span>
      </div>
      <div>
        <p className="font-semibold mb-2" style={{ color: C.text }}>
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: C.textDim }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function Signals() {
  return (
    <section style={{ background: C.bg, borderTop: `1px solid ${C.border}` }} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-10">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{ background: `${C.cyan}18`, color: C.cyan, border: `1px solid ${C.borderAccent}` }}
          >
            SIGNAL_LIBRARY
          </span>
          <div className="flex-1 h-px" style={{ background: C.border }} />
        </div>

        <h2
          className="text-4xl font-black leading-tight tracking-tight mb-4"
          style={{ color: C.text }}
        >
          Tralytic finds what you can&apos;t see
          <br />
          <span style={{ color: C.cyan }}>inside your own data.</span>
        </h2>
        <p className="mb-12 max-w-xl" style={{ color: C.textDim }}>
          Every signal below was derived from real trader data. Most journals
          show you these numbers — Tralytic connects them into patterns.
        </p>

        <div
          className="rounded-lg overflow-hidden"
          style={{ border: `1px solid ${C.border}`, background: C.bgCard }}
        >
          <SignalRow
            id="SIG_001"
            title="Win rate drops every Tuesday"
            body="Your data shows a 14% lower win rate on Tuesdays across 6 months — linked to post-weekend execution drift. Tralytic detects day-of-week bias automatically."
            icon={Clock}
          />
          <SignalRow
            id="SIG_002"
            title="London session RRx is 2× your New York RRx"
            body="You achieve 2.1R average in London opens but only 1.0R in New York — your edge is session-specific. Trading both sessions is costing you R."
            icon={Activity}
          />
          <SignalRow
            id="SIG_003"
            title="Post-win overconfidence cluster"
            body="Following any 3-win streak, your next trade has a 68% loss rate. This is a quantifiable overconfidence signal — not a feeling, a number."
            icon={TrendingUp}
          />
          <SignalRow
            id="SIG_004"
            title="Strategy-specific RRx decay"
            body="One of your strategies delivers 1.8R average RRx, another delivers 0.3R. You trade them with equal frequency. Tralytic shows you which to cut."
            icon={Shield}
          />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Pricing
// ─────────────────────────────────────────────
const FEATURES = [
  "Full RRx analytics engine",
  "Behavioural signal detection",
  "Session & day-of-week analysis",
  "Strategy breakdown by RRx",
  "Trade import (CSV / manual)",
  "Up to 30 trades in trial",
];

function Pricing() {
  return (
    <section style={{ background: C.bg, borderTop: `1px solid ${C.border}` }} className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-10">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{ background: `${C.cyan}18`, color: C.cyan, border: `1px solid ${C.borderAccent}` }}
          >
            PRICING_TABLE
          </span>
          <div className="flex-1 h-px" style={{ background: C.border }} />
        </div>

        <h2
          className="text-4xl font-black leading-tight tracking-tight mb-3"
          style={{ color: C.text }}
        >
          One plan. Full access.
          <br />
          <span style={{ color: C.cyan }}>No feature tiers.</span>
        </h2>
        <p className="mb-12" style={{ color: C.textDim }}>
          Monthly or annual — same tools, same insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Monthly */}
          <div
            className="rounded-lg p-6"
            style={{ border: `1px solid ${C.border}`, background: C.bgCard }}
          >
            <p className="font-mono text-xs mb-4" style={{ color: C.muted }}>
              MONTHLY
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-mono text-5xl font-black" style={{ color: C.text }}>
                $39
              </span>
              <span className="font-mono text-sm" style={{ color: C.muted }}>
                /mo
              </span>
            </div>
            <ul className="space-y-2.5 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-mono" style={{ color: C.textDim }}>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: C.cyan }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block w-full text-center py-2.5 rounded font-mono text-sm font-bold transition-opacity hover:opacity-85"
              style={{ background: C.bgRow, color: C.text, border: `1px solid ${C.border}` }}
            >
              START_FREE_TRIAL
            </Link>
          </div>

          {/* Annual */}
          <div
            className="rounded-lg p-6 relative"
            style={{ border: `1px solid ${C.cyan}44`, background: `${C.cyan}06` }}
          >
            <div
              className="absolute -top-3 left-6 px-3 py-0.5 rounded font-mono text-xs font-bold"
              style={{ background: C.cyan, color: C.bg }}
            >
              SAVE_47%
            </div>
            <p className="font-mono text-xs mb-4" style={{ color: C.cyanDim }}>
              ANNUAL
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-mono text-5xl font-black" style={{ color: C.cyan }}>
                $249
              </span>
              <span className="font-mono text-sm" style={{ color: C.cyanDim }}>
                /yr
              </span>
            </div>
            <ul className="space-y-2.5 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-mono" style={{ color: C.textDim }}>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: C.cyan }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block w-full text-center py-2.5 rounded font-mono text-sm font-bold transition-opacity hover:opacity-85"
              style={{ background: C.cyan, color: C.bg }}
            >
              START_FREE_TRIAL
            </Link>
          </div>
        </div>

        <p className="mt-6 font-mono text-xs text-center" style={{ color: C.muted }}>
          // 15-day trial on both plans · no refunds after billing date · card required
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}
      className="px-6 py-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo_Icon.png" alt="Tralytic" width={30} height={30} />
          <span className="font-black text-sm leading-none">
            <span style={{ color: C.text }}>Tra</span>
            <span style={{ color: C.cyan }}>lytic</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 font-mono text-xs" style={{ color: C.muted }}>
          <Link href="#" className="hover:text-white transition-colors">privacy_policy</Link>
          <Link href="#" className="hover:text-white transition-colors">terms_of_service</Link>
        </div>
        <p className="font-mono text-xs" style={{ color: C.muted }}>
          © 2025 Tralytic
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function LandingV2() {
  return (
    <div style={{ background: C.bg, color: C.text }}>
      <Navbar />
      <Hero />
      <RRxBreakdown />
      <Signals />
      <Pricing />
      <Footer />
    </div>
  );
}
