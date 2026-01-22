"use client";

import { SidebarProvider, Sidebar, useSidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { PermissionsProvider, usePermissionsContext } from "@/hooks";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { isMobile, isCollapsed, isTablet } = useSidebar();
  const { isAdmin } = usePermissionsContext();

  // Calculate main content margin based on sidebar state
  const sidebarWidth = isMobile
    ? "0px"
    : isCollapsed || isTablet
    ? "72px"
    : "256px";

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - pass isAdmin to show admin navigation */}
      <Sidebar isAdmin={isAdmin} />

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

export function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PermissionsProvider>
      <SidebarProvider>
        <DashboardLayoutInner>{children}</DashboardLayoutInner>
      </SidebarProvider>
    </PermissionsProvider>
  );
}
