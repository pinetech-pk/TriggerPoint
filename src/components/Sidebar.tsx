"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Trade Journal", href: "/trade-journal", icon: "📖" },
  { name: "Planner", href: "/planner", icon: "📅" },
  { name: "Setups Manager", href: "/setups", icon: "⚙️" },
  { name: "Reminders", href: "/reminders", icon: "🔔" },
  { name: "Notifications", href: "/notifications", icon: "📬" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">TRIGGERPOINT</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
