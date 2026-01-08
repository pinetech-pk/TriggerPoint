export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}

export function formatPnL(value: number): string {
  const formatted = formatCurrency(Math.abs(value));
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

export function formatRiskReward(value: number): string {
  return `${value.toFixed(1)}R`;
}
