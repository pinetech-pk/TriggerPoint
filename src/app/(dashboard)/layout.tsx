"use client";

import { SidebarProvider, Sidebar, useSidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isMobile, isCollapsed, isTablet } = useSidebar();

  // Calculate main content margin based on sidebar state
  const sidebarWidth = isMobile
    ? "0px"
    : isCollapsed || isTablet
    ? "72px"
    : "256px";

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isAdmin={false} />

      {/* Main wrapper - properly offset from sidebar */}
      <div
        className="flex min-h-screen flex-col transition-[margin] duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Main content area - scrollable */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* Footer - inside main wrapper, never overlaps sidebar */}
        <Footer />
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
