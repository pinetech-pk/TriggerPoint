"use client";

import { cn } from "@/lib/utils";
import { Crown, Shield, Star, Clock, AlertTriangle } from "lucide-react";

export type RoleType = "super_admin" | "web_admin" | "premium" | "trial" | "expired";

interface RoleBadgeProps {
  role: RoleType;
  daysRemaining?: number;
  className?: string;
  compact?: boolean;
}

const roleConfig = {
  super_admin: {
    label: "Super Admin",
    shortLabel: "SA",
    icon: Crown,
    className: "bg-gradient-to-r from-purple-500 to-amber-500 text-white",
  },
  web_admin: {
    label: "Admin",
    shortLabel: "Admin",
    icon: Shield,
    className: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  },
  premium: {
    label: "Premium",
    shortLabel: "Pro",
    icon: Star,
    className: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  },
  trial: {
    label: "Trial",
    shortLabel: "Trial",
    icon: Clock,
    className: "bg-muted text-muted-foreground border border-border",
  },
  expired: {
    label: "Upgrade",
    shortLabel: "Upgrade",
    icon: AlertTriangle,
    className: "bg-red-500/20 text-red-400 border border-red-500/30",
  },
};

export function RoleBadge({
  role,
  daysRemaining,
  className,
  compact = false,
}: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  const label =
    role === "trial" && daysRemaining !== undefined
      ? `${config.label} · ${daysRemaining}d`
      : compact
      ? config.shortLabel
      : config.label;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}
