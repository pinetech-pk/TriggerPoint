"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, Sidebar, useSidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { PermissionsProvider, usePermissionsContext } from "@/hooks";
import { Loader2 } from "lucide-react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isMobile, isCollapsed, isTablet } = useSidebar();
  const { isAdmin, loading } = usePermissionsContext();

  // Redirect non-admins to dashboard
  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [loading, isAdmin, router]);

  // Calculate main content margin based on sidebar state
  const sidebarWidth = isMobile
    ? "0px"
    : isCollapsed || isTablet
    ? "72px"
    : "256px";

  // Show loading state while checking permissions
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Don't render admin content for non-admins
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - always show admin nav for admin pages */}
      <Sidebar isAdmin={true} />

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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PermissionsProvider>
      <SidebarProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </SidebarProvider>
    </PermissionsProvider>
  );
}
