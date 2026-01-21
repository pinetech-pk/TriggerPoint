"use client";

import { type ReactNode } from "react";
import { SidebarProvider, useSidebar, Sidebar } from "./sidebar";
import { Header } from "./header";
import { Footer } from "./footer";
import { PermissionsProvider, usePermissionsContext } from "@/hooks";

interface AppShellProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
  showFooter?: boolean;
}

function AppShellContent({
  children,
  pageTitle,
  pageDescription,
  showFooter = true,
}: AppShellProps) {
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
      {/* Sidebar */}
      <Sidebar isAdmin={isAdmin} />

      {/* Main wrapper */}
      <div
        className="flex min-h-screen flex-col transition-[margin] duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Header - gets role from permissions context automatically */}
        <Header title={pageTitle} description={pageDescription} />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>

        {/* Footer */}
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

export function AppShell(props: AppShellProps) {
  return (
    <PermissionsProvider>
      <SidebarProvider>
        <AppShellContent {...props} />
      </SidebarProvider>
    </PermissionsProvider>
  );
}

// Export a simpler version for pages that manage their own state
interface SimpleAppShellProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function SimpleAppShell({
  children,
  showFooter = true,
}: SimpleAppShellProps) {
  const { isMobile, isCollapsed, isTablet } = useSidebar();
  const { isAdmin } = usePermissionsContext();

  const sidebarWidth = isMobile
    ? "0px"
    : isCollapsed || isTablet
    ? "72px"
    : "256px";

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isAdmin={isAdmin} />
      <div
        className="flex min-h-screen flex-col transition-[margin] duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {children}
        {showFooter && <Footer />}
      </div>
    </div>
  );
}
