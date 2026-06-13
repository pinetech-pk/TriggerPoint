// Canonical list of journal fields a CSV column can be mapped to.
// `strategy` resolves to a strategy name (matched/created at import time).
// `account` and `market` are chosen for the whole batch in the wizard, so they
// are intentionally NOT per-row mappable fields here.

export type FieldType =
  | "text"
  | "number"
  | "date"
  | "direction"
  | "session"
  | "winloss"
  | "strategy"
  | "market";

export type FieldKey =
  | "title"
  | "security"
  | "direction"
  | "entry_date"
  | "exit_date"
  | "entry_price"
  | "exit_price"
  | "stop_loss"
  | "take_profit"
  | "pnl"
  | "pnl_percent"
  | "risk_percent"
  | "risk_amount"
  | "risk_reward_actual"
  | "session"
  | "timeframe"
  | "strategy"
  | "market"
  | "setup_notes"
  | "execution_notes"
  | "review_notes"
  | "mistake"
  | "lesson"
  | "chart_url"
  | "is_winner";

export interface JournalField {
  key: FieldKey;
  label: string;
  type: FieldType;
  /** Hard-required to produce a valid row (security, entry_date). */
  required?: boolean;
  /** Header aliases (already normalized via normalizeHeader). */
  aliases: string[];
}

export const FIELDS: JournalField[] = [
  { key: "title", label: "Trade Title", type: "text", aliases: ["title", "tradetitle", "trade", "name"] },
  { key: "security", label: "Security/Symbol", type: "text", required: true, aliases: ["security", "symbol", "ticker", "pair", "asset", "instrument"] },
  { key: "direction", label: "Direction", type: "direction", aliases: ["direction", "side", "longshort", "position", "bias"] },
  { key: "entry_date", label: "Entry Date", type: "date", required: true, aliases: ["entrydate", "date", "datetime", "opendate", "entry", "opentime", "entrytime", "openedat"] },
  { key: "exit_date", label: "Exit Date", type: "date", aliases: ["exitdate", "closedate", "closetime", "exittime", "closedat"] },
  { key: "entry_price", label: "Entry Price", type: "number", aliases: ["entryprice", "openprice"] },
  { key: "exit_price", label: "Exit Price", type: "number", aliases: ["exitprice", "closeprice"] },
  { key: "stop_loss", label: "Stop Loss", type: "number", aliases: ["stoploss", "sl", "stop"] },
  { key: "take_profit", label: "Take Profit", type: "number", aliases: ["takeprofit", "tp", "target"] },
  { key: "pnl", label: "P&L", type: "number", aliases: ["pnl", "profit", "pl", "netpnl", "profitloss", "realizedpnl", "gainloss", "pnldollar", "pnlusd"] },
  { key: "pnl_percent", label: "P&L %", type: "number", aliases: ["pnlpercent", "plpercent", "returnpercent", "profitpercent", "pnlpct"] },
  { key: "risk_percent", label: "Risk %", type: "number", aliases: ["riskpercent", "riskpct"] },
  { key: "risk_amount", label: "Risk Amount", type: "number", aliases: ["riskamount", "risk", "riskusd", "riskdollar", "amountrisked"] },
  { key: "risk_reward_actual", label: "RRx (R:R)", type: "number", aliases: ["rrx", "rr", "riskreward", "riskrewardactual", "rmultiple", "rmult", "actualrr", "rratio"] },
  { key: "session", label: "Session", type: "session", aliases: ["session"] },
  { key: "timeframe", label: "Timeframe", type: "text", aliases: ["timeframe", "tf", "interval"] },
  { key: "strategy", label: "Strategy", type: "strategy", aliases: ["strategy", "model", "system", "playbook"] },
  { key: "market", label: "Market", type: "market", aliases: ["market", "assetclass", "instrumenttype"] },
  { key: "setup_notes", label: "Setup Notes", type: "text", aliases: ["setupnotes", "setup", "notes", "analysis"] },
  { key: "execution_notes", label: "Execution Notes", type: "text", aliases: ["executionnotes", "execution"] },
  { key: "review_notes", label: "Review Notes", type: "text", aliases: ["reviewnotes", "review"] },
  { key: "mistake", label: "Mistake", type: "text", aliases: ["mistake", "mistakes", "mistakelesson", "error"] },
  { key: "lesson", label: "Lesson", type: "text", aliases: ["lesson", "lessons", "learning", "takeaway"] },
  { key: "chart_url", label: "Chart URL", type: "text", aliases: ["charturl", "chart", "tradingview", "tradingviewurl", "link"] },
  { key: "is_winner", label: "Win/Loss", type: "winloss", aliases: ["win", "iswinner", "winloss", "result", "outcome", "won"] },
];

/** Options for the mapping <Select>, with a leading "skip" choice. */
export const FIELD_OPTIONS = [
  { value: "", label: "-- Skip --" },
  ...FIELDS.map((f) => ({ value: f.key, label: f.label })),
];

/** Normalize a header for alias matching: lowercase, % -> percent, drop non-alphanumerics. */
export function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .replace(/%/g, "percent")
    .replace(/[^a-z0-9]/g, "");
}
