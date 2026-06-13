/**
 * LANDING V3 — "Behavioral SaaS" Design System
 *
 * Design language: Spacious, gradient-forward, emotionally-driven storytelling.
 * Deep navy canvas, emerald-green + sky-blue gradient accents, glowing borders,
 * generous whitespace. Feels like a polished modern SaaS product page.
 * Think: Stripe / Linear / Framer.
 *
 * Preview route: /landing-v3
 * Status: PREVIEW / TESTING ONLY — do not replace the live page
 */

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Brain,
  Target,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        background: "rgba(6, 9, 26, 0.85)",
        borderBottom: "1px solid rgba(99, 102, 241, 0.15)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo_Icon.png" alt="Tralytic" width={38} height={38} priority />
          <span className="text-lg font-black leading-none">
            <span className="text-white">Tra</span>
            <span style={{ color: "#38bdf8" }}>lytic</span>
          </span>
        </Link>

        {/* Preview badge */}
        <div
          className="hidden md:flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(16,185,129,0.15))",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#a5b4fc",
          }}
        >
          <Sparkles className="h-3 w-3" />
          PREVIEW · V3
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6366f1, #38bdf8)", color: "white" }}
          >
            Start Free Trial <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 text-center overflow-hidden"
      style={{ background: "#06091a" }}
    >
      {/* Background glow blobs */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-4xl">
        {/* Top badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            color: "#34d399",
          }}
        >
          <Brain className="h-3.5 w-3.5" />
          Behavioural Intelligence for Serious Traders
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
          <span className="text-white">Stop reviewing </span>
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #38bdf8, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            outcomes.
          </span>
          <br />
          <span className="text-white">Start fixing </span>
          <span
            style={{
              background: "linear-gradient(135deg, #10b981, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            behaviour.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
          Tralytic is the analytics layer that reveals the hidden behavioural
          patterns inside your trade data — session bias, overconfidence
          clusters, RRx decay — before your balance reflects them.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/signup"
            className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #6366f1, #38bdf8)",
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
            }}
          >
            Start 15-Day Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Explore Demo <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="text-xs text-slate-600 mb-16">
          No charge for 15 days · Cancel anytime · Card required
        </p>

        {/* Dashboard preview card */}
        <div
          className="mx-auto max-w-3xl rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(99, 102, 241, 0.2)",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 60px rgba(99, 102, 241, 0.15), 0 0 30px rgba(16, 185, 129, 0.08)",
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            <div className="ml-3 h-5 w-36 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px p-px" style={{ background: "rgba(255,255,255,0.04)" }}>
            {[
              { label: "Total RRx", value: "+53.5R", green: true },
              { label: "Win Rate", value: "34.6%", green: false },
              { label: "Total Trades", value: "153", green: false },
              { label: "Profit Factor", value: "1.33", green: true },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-start px-5 py-4"
                style={{ background: "#0b0f1e" }}
              >
                <p className="text-xs text-slate-500 mb-2">{s.label}</p>
                <p
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: s.green ? "#34d399" : "white" }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Chart bars */}
          <div className="flex items-end gap-1 px-5 py-5" aria-hidden="true">
            {[30, 55, 40, 75, 50, 88, 65, 92, 70, 100, 78, 95, 72, 85, 68].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all"
                style={{
                  height: `${h * 0.45}px`,
                  background: h > 70
                    ? "linear-gradient(to top, rgba(99,102,241,0.6), rgba(16,185,129,0.7))"
                    : "rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// RRx section
// ─────────────────────────────────────────────
function RRxSection() {
  return (
    <section className="px-6 py-28" style={{ background: "#06091a" }}>
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <div className="flex justify-center mb-4">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "rgba(99, 102, 241, 0.12)",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              color: "#a5b4fc",
            }}
          >
            Core Metric
          </span>
        </div>

        <h2 className="text-center text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4 text-white">
          RRx — the metric your chart{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            never shows you.
          </span>
        </h2>
        <p className="text-center text-slate-400 max-w-xl mx-auto mb-14">
          Planned RR is theoretical. RRx is what you actually earned after fees,
          spread, slippage, and execution errors. Tralytic tracks the gap and
          helps you close it.
        </p>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              What your chart shows
            </p>
            <p className="text-5xl font-black text-slate-600 mb-1">1 : 3.0R</p>
            <p className="text-xs text-slate-700">Planned risk-reward</p>
          </div>

          <div
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(56,189,248,0.06))",
              border: "1px solid rgba(16,185,129,0.25)",
              boxShadow: "0 0 40px rgba(16, 185, 129, 0.1)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#34d399" }}>
              What RRx reveals
            </p>
            <p className="text-5xl font-black mb-1" style={{ color: "#34d399" }}>1 : 2.1R</p>
            <p className="text-xs" style={{ color: "rgba(52,211,153,0.5)" }}>Realised risk-reward</p>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          The 0.9R gap is where fees, spread, and execution reality live.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Behavioural insights
// ─────────────────────────────────────────────
function InsightCard({
  icon: Icon,
  title,
  body,
  gradient,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  gradient: string;
}) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 transition-all hover:scale-[1.01]"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: gradient }}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-semibold text-white mb-2">{title}</p>
        <p className="text-sm leading-relaxed text-slate-400">{body}</p>
      </div>
    </div>
  );
}

function BehaviouralInsights() {
  return (
    <section
      className="px-6 py-28"
      style={{
        background: "linear-gradient(180deg, #06091a 0%, #08102a 50%, #06091a 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center mb-4">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#34d399",
            }}
          >
            Pattern Detection
          </span>
        </div>

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4 text-white">
            The patterns that destroy accounts
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              live in plain sight.
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Most journals collect your data. Tralytic interprets it — surfacing
            the behavioural signals that precede drawdowns, weeks before they arrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InsightCard
            icon={Clock}
            title="Tuesday RRx drops 14%"
            body="Day-of-week bias is real and measurable. Tralytic calculates your win rate and RRx for every day of the week."
            gradient="linear-gradient(135deg, rgba(99,102,241,0.6), rgba(56,189,248,0.6))"
          />
          <InsightCard
            icon={TrendingUp}
            title="London edge 2× New York"
            body="Your strategy may only work in specific market sessions. Tralytic detects session-specific RRx so you stop trading outside your edge."
            gradient="linear-gradient(135deg, rgba(16,185,129,0.6), rgba(56,189,248,0.6))"
          />
          <InsightCard
            icon={Brain}
            title="Post-win loss clusters"
            body="After 3 consecutive wins, your next trade loses 68% of the time. Overconfidence is a number. Tralytic measures it."
            gradient="linear-gradient(135deg, rgba(245,158,11,0.6), rgba(239,68,68,0.5))"
          />
          <InsightCard
            icon={Target}
            title="Strategy RRx divergence"
            body="Not all your strategies deserve equal screen time. Tralytic ranks them by realised RRx so you know what to cut."
            gradient="linear-gradient(135deg, rgba(168,85,247,0.6), rgba(99,102,241,0.6))"
          />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Who it's for
// ─────────────────────────────────────────────
function WhoItsFor() {
  return (
    <section className="px-6 py-28" style={{ background: "#06091a" }}>
      <div className="mx-auto max-w-5xl text-center">
        <div className="flex justify-center mb-4">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              color: "#38bdf8",
            }}
          >
            Built For
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-3">
          Built for traders who{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            already know how to trade.
          </span>
        </h2>
        <p className="text-slate-400 mb-14 max-w-xl mx-auto">
          Tralytic is a diagnostic tool, not a course. Not a signal service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              title: "You've been trading 1–5 years.",
              body: "You understand risk management, have a tested strategy, and a real track record — good or bad.",
              gradient: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(56,189,248,0.1))",
              border: "rgba(99,102,241,0.2)",
            },
            {
              title: "Your strategy works — inconsistently.",
              body: "Your backtest says one thing. Your live account says another. The gap is what Tralytic finds.",
              gradient: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(56,189,248,0.08))",
              border: "rgba(16,185,129,0.2)",
            },
            {
              title: "You suspect the problem is you.",
              body: "Overtrading after losses, hesitating on valid setups, revenge trading — you've noticed but can't measure it.",
              gradient: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(99,102,241,0.08))",
              border: "rgba(168,85,247,0.2)",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl p-6 text-left"
              style={{ background: c.gradient, border: `1px solid ${c.border}` }}
            >
              <p className="font-bold text-white mb-3">{c.title}</p>
              <p className="text-sm leading-relaxed text-slate-400">{c.body}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-600">
          If you&apos;re a beginner looking for signals or strategies, Tralytic is not for you.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Pricing
// ─────────────────────────────────────────────
const FEATURES = [
  "Full RRx analytics engine",
  "Behavioural pattern detection",
  "Session & day-of-week breakdown",
  "Strategy performance ranking",
  "Trade import (CSV / manual)",
  "Up to 30 trades in trial",
];

function Pricing() {
  return (
    <section className="px-6 py-28" style={{ background: "#06091a" }}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex justify-center mb-4">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "rgba(99, 102, 241, 0.12)",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              color: "#a5b4fc",
            }}
          >
            Pricing
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-3">
          One plan.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #38bdf8, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Everything included.
          </span>
        </h2>
        <p className="text-slate-400 mb-16">
          Choose monthly or annual — same features, same access.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly */}
          <div
            className="rounded-2xl p-8 text-left"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-sm text-slate-400 mb-2">Monthly</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-black text-white">$39</span>
              <span className="text-slate-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#6366f1" }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block w-full text-center rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ border: "1px solid rgba(99,102,241,0.4)", background: "rgba(99,102,241,0.1)" }}
            >
              Start Free Trial
            </Link>
          </div>

          {/* Annual */}
          <div
            className="rounded-2xl p-8 text-left relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(16,185,129,0.08))",
              border: "1px solid rgba(99,102,241,0.35)",
              boxShadow: "0 0 50px rgba(99, 102, 241, 0.15)",
            }}
          >
            <div
              className="absolute -top-px left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-b-lg text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #6366f1, #38bdf8)",
                color: "white",
              }}
            >
              Save 47%
            </div>
            <p className="text-sm text-slate-400 mb-2">Annual</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-black text-white">$249</span>
              <span className="text-slate-400">/year</span>
            </div>
            <ul className="space-y-3 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#34d399" }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block w-full text-center rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #38bdf8)" }}
            >
              Start Free Trial
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-600">
          15-day free trial on both plans · No refunds after billing date · Card required
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
      className="px-6 py-10"
      style={{ background: "#06091a", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo_Icon.png" alt="Tralytic" width={32} height={32} />
          <span className="font-black text-sm leading-none">
            <span className="text-white">Tra</span>
            <span style={{ color: "#38bdf8" }}>lytic</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
        <p className="text-xs text-slate-600">© 2025 Tralytic. Built for serious traders.</p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function LandingV3() {
  return (
    <div style={{ background: "#06091a", color: "white" }}>
      <Navbar />
      <Hero />
      <RRxSection />
      <BehaviouralInsights />
      <WhoItsFor />
      <Pricing />
      <Footer />
    </div>
  );
}
