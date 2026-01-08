"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EquityCurveData {
  trade: number;
  equity: number;
  pnl: number;
  date?: string;
}

interface EquityCurveProps {
  data: EquityCurveData[];
  title?: string;
}

export function EquityCurve({ data, title = "Equity Curve" }: EquityCurveProps) {
  const isPositive = data.length > 0 && data[data.length - 1].equity >= data[0].equity;
  const color = isPositive ? "#10b981" : "#ef4444";

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="trade"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                color: "#e2e8f0",
              }}
              formatter={(value) => {
                if (typeof value === "number") {
                  return [`$${value.toFixed(2)}`, "Equity"];
                }
                return [value, "Equity"];
              }}
              labelFormatter={(label) => `Trade #${label}`}
            />
            <Area
              type="monotone"
              dataKey="equity"
              stroke={color}
              fill="url(#equityGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
