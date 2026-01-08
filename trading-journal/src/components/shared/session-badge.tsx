import { Badge } from "@/components/ui/badge";

interface SessionBadgeProps {
  session: "AS" | "LO" | "NY" | "OTHER" | null;
}

const sessionConfig = {
  AS: { label: "Asian", variant: "purple" as const },
  LO: { label: "London", variant: "info" as const },
  NY: { label: "New York", variant: "success" as const },
  OTHER: { label: "Other", variant: "secondary" as const },
};

export function SessionBadge({ session }: SessionBadgeProps) {
  if (!session) return null;

  const config = sessionConfig[session];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
