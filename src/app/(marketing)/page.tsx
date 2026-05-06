import Link from "next/link";
import {
  Calendar,
  BarChart2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";
import Image from "next/image";

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e293b]/60 bg-[#0a0e17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.svg" alt="Tralytic" width={44} height={44} priority />
          <span className="text-lg font-black leading-none">
            <span className="text-white">Tra</span>
            <span className="text-[#29a8f5]">lytic</span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// Hero mock stat tile
// ─────────────────────────────────────────────
function StatTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "green" | "muted";
}) {
  return (
    <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4 text-left">
      <p className="mb-2 text-xs font-medium text-[#64748b]">{label}</p>
      <p
        className={`text-2xl font-bold tracking-tight ${
          accent === "green" ? "text-[#10b981]" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-16 text-center">
      <div className="mx-auto w-full max-w-4xl">
        {/* Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5">
          <Zap className="h-3 w-3 text-[#10b981]" />
          <span className="text-xs font-medium text-[#10b981]">
            Behavioral Intelligence for Serious Traders
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
          Your PnL lies to you.
          <br />
          <span className="text-[#10b981]">Your RRx doesn&apos;t.</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#64748b] md:text-xl">
          Tralytic reveals the trading patterns and behavioral signals hidden
          inside your data — before your account balance reflects them.
        </p>

        {/* CTAs */}
        <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Start 15-Day Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="inline-flex h-12 items-center rounded-lg border border-[#334155] bg-transparent px-6 text-sm font-semibold text-foreground transition-colors hover:bg-[#111827]"
          >
            Explore Demo Data
          </Link>
        </div>

        {/* Trust line */}
        <p className="mb-16 text-xs text-[#475569]">
          No charge for 15 days · Cancel anytime · Card required
        </p>

        {/* Mock dashboard preview */}
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#1e293b] bg-[#0d1117] p-6 shadow-2xl">
          {/* Fake top bar */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#334155]" />
            <div className="h-3 w-3 rounded-full bg-[#334155]" />
            <div className="h-3 w-3 rounded-full bg-[#334155]" />
            <div className="ml-2 h-3 w-32 rounded-full bg-[#1e293b]" />
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatTile label="Total RRx" value="+53.5R" accent="green" />
            <StatTile label="Win Rate" value="34.6%" />
            <StatTile label="Total Trades" value="153" />
            <StatTile label="Profit Factor" value="1.33" accent="green" />
          </div>

          {/* Fake mini chart bar */}
          <div className="mt-4 flex items-end gap-1 px-1" aria-hidden="true">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100, 80, 70, 88].map(
              (h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h * 0.5}px`,
                    backgroundColor:
                      h > 75 ? "rgba(16,185,129,0.5)" : "rgba(30,41,59,0.8)",
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Problem
// ─────────────────────────────────────────────
function InsightCard({
  icon: Icon,
  label,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-[#1e293b] bg-[#111827] px-5 py-4">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#10b981]/10">
        <Icon className="h-4 w-4 text-[#10b981]" />
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-foreground">{label}</p>
        <p className="text-sm text-[#64748b]">{description}</p>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left */}
        <div>
          <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
            Most journals store data.{" "}
            <span className="text-[#10b981]">Tralytic decodes it.</span>
          </h2>
          <div className="space-y-5 text-[#94a3b8]">
            <p className="leading-relaxed">
              Experienced traders who journal consistently still stagnate —
              not because they lack data, but because they cannot see their
              own behavioral patterns buried inside it.
            </p>
            <p className="leading-relaxed">
              The real problem is rarely strategy. Almost every trader who
              journals already knows what to do. The failure is in execution
              and psychology, compounded session after session without
              detection.
            </p>
            <p className="leading-relaxed">
              Without a system that surfaces hidden patterns —
              time-of-day bias, session-specific RRx decay, post-win
              overtrading — true improvement is nearly impossible. You&apos;re
              reviewing outcomes, not causes.
            </p>
          </div>
        </div>

        {/* Right — insight cards */}
        <div className="space-y-3">
          <InsightCard
            icon={Calendar}
            label="Win rate drops every Tuesday"
            description="Your data shows a 14% lower win rate on Tuesdays across 6 months — linked to post-weekend execution drift."
          />
          <InsightCard
            icon={BarChart2}
            label="London session RRx is 2× your New York RRx"
            description="You achieve 2.1R average in London opens but only 1.0R in New York — your edge is session-specific."
          />
          <InsightCard
            icon={AlertTriangle}
            label="Losses cluster after 3 consecutive wins"
            description="Following any 3-win streak, your next trade has a 68% loss rate — a detectable overconfidence signal."
          />
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
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#10b981]/20 bg-[#111827]">
        <div className="border-b border-[#1e293b] px-8 py-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-3 py-1 text-xs font-medium text-[#10b981]">
            Core Metric
          </div>
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground md:text-3xl">
            Meet RRx — the metric that predicted profitability
            <br className="hidden md:block" /> before PnL did.
          </h2>
        </div>

        <div className="px-8 py-6">
          <p className="mb-8 max-w-xl leading-relaxed text-[#94a3b8]">
            RRx is your realised risk-reward ratio — not the planned one. It
            accounts for fees, spread, slippage, and execution reality. A
            strategy with a 1:3 planned RR that consistently delivers 1:1.8
            RRx is silently underperforming. Tralytic tracks the gap so you
            can close it.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#1e293b] bg-[#0a0e17] p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#475569]">
                What your chart shows
              </p>
              <p className="text-3xl font-bold text-[#475569]">1 : 3.0R</p>
              <p className="mt-1 text-xs text-[#334155]">Planned RR</p>
            </div>
            <div className="rounded-xl border border-[#10b981]/30 bg-[#10b981]/5 p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#10b981]/70">
                What RRx reveals
              </p>
              <p className="text-3xl font-bold text-[#10b981]">1 : 2.1R</p>
              <p className="mt-1 text-xs text-[#10b981]/50">Realised RRx</p>
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-[#475569]">
            The gap is where fees, spread, and execution reality live.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Who It's For
// ─────────────────────────────────────────────
function WhoItIsFor() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Built for traders who already know how to trade.
        </h2>
        <p className="mb-14 text-[#64748b]">
          Tralytic is not a course. It&apos;s not a signal service. It&apos;s a
          diagnostic tool.
        </p>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: "You've been trading 1–5 years.",
              body: "You understand risk management, have a tested strategy, and a real track record — good or bad.",
            },
            {
              title: "Your strategy works — inconsistently.",
              body: "Your backtest says one thing. Your live account says another. The gap is what Tralytic finds.",
            },
            {
              title: "You suspect the problem is you, not the market.",
              body: "Overtrading after losses, hesitating on valid setups, chasing — you've noticed the patterns but can't measure them.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-[#1e293b] bg-[#111827] px-6 py-7 text-left"
            >
              <p className="mb-3 text-base font-semibold text-foreground">
                {card.title}
              </p>
              <p className="text-sm leading-relaxed text-[#64748b]">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#475569]">
          If you&apos;re a beginner looking for signals or strategies, Tralytic
          is not for you.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Pricing
// ─────────────────────────────────────────────
const FEATURES = [
  "Full analytics suite",
  "RRx tracking",
  "Behavioral insights",
  "Session analysis",
  "Strategy breakdown",
  "Up to 30 trades in trial",
];

function PricingCard({
  plan,
  price,
  period,
  badge,
  highlighted,
}: {
  plan: string;
  price: string;
  period: string;
  badge?: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 ${
        highlighted
          ? "border-[#10b981]/50 bg-[#10b981]/5"
          : "border-[#1e293b] bg-[#111827]"
      }`}
    >
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-[#10b981] px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <p className="mb-1 text-sm font-medium text-[#64748b]">{plan}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          <span className="text-sm text-[#64748b]">/{period}</span>
        </div>
      </div>

      <ul className="mb-8 space-y-3">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-[#94a3b8]">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10b981]" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/signup"
        className={`mt-auto inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 ${
          highlighted
            ? "bg-[#10b981] text-white"
            : "bg-primary text-white"
        }`}
      >
        Start Free Trial
      </Link>
    </div>
  );
}

function Pricing() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          One plan. Everything included.
        </h2>
        <p className="mb-16 text-[#64748b]">
          Choose monthly or annual — same features, same access.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <PricingCard plan="Monthly" price="$39" period="month" />
          <PricingCard
            plan="Annual"
            price="$249"
            period="year"
            badge="Save 47%"
            highlighted
          />
        </div>

        <p className="mt-8 text-xs text-[#475569]">
          15-day free trial on both plans · No refunds after billing date ·
          Card required to start
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
    <footer className="border-t border-[#1e293b] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.svg" alt="Tralytic" width={36} height={36} />
          <span className="text-sm font-black leading-none">
            <span className="text-white">Tra</span>
            <span className="text-[#29a8f5]">lytic</span>
          </span>
        </Link>

        <div className="flex items-center gap-6 text-xs text-[#475569]">
          <Link href="#" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground">
            Terms of Service
          </Link>
        </div>

        <p className="text-xs text-[#475569]">
          © 2025 Tralytic. Built for serious traders.
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-foreground">
      <Navbar />
      <Hero />
      <Problem />
      <RRxSection />
      <WhoItIsFor />
      <Pricing />
      <Footer />
    </div>
  );
}
