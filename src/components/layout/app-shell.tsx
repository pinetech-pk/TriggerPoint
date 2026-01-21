"use client";

import { type ReactNode } from "react";
import { SidebarProvider, useSidebar, Sidebar } from "./sidebar";
import { Header, type RoleType } from "./header";
import { Footer } from "./footer";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
  userEmail?: string;
  role?: RoleType;
  daysRemaining?: number;
  isAdmin?: boolean;
  showFooter?: boolean;
}

function AppShellContent({
  children,
  pageTitle,
  pageDescription,
  userEmail,
  role = "trial",
  daysRemaining,
  isAdmin = false,
  showFooter = true,
}: AppShellProps) {
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
      <Sidebar isAdmin={isAdmin} />

      {/* Main wrapper */}
      <div
        className="flex min-h-screen flex-col transition-[margin] duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Header */}
        <Header
          title={pageTitle}
          description={pageDescription}
          userEmail={userEmail}
          role={role}
          daysRemaining={daysRemaining}
        />

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
    <SidebarProvider>
      <AppShellContent {...props} />
    </SidebarProvider>
  );
}

// Export a simpler version for pages that manage their own state
interface SimpleAppShellProps {
  children: ReactNode;
  isAdmin?: boolean;
  showFooter?: boolean;
}

export function SimpleAppShell({
  children,
  isAdmin = false,
  showFooter = true,
}: SimpleAppShellProps) {
  const { isMobile, isCollapsed, isTablet } = useSidebar();

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
