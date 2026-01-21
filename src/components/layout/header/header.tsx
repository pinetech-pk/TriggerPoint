"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/layout/sidebar";
import { RoleBadge, type RoleType } from "./role-badge";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  description?: string;
  userEmail?: string;
  role?: RoleType;
  daysRemaining?: number;
}

export function Header({
  title,
  description,
  userEmail,
  role = "trial",
  daysRemaining,
}: HeaderProps) {
  const { open, isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-card px-4 lg:h-16 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={open}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Page title */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Mobile: Show app name */}
        {isMobile && (
          <span className="text-lg font-semibold">Tralytics</span>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search - Hidden on mobile and tablet */}
        <div className="relative hidden xl:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search trades, strategies..."
            className="w-64 pl-9"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {/* Notification badge */}
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User menu with role badge */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "gap-2 px-2 lg:px-3",
                isMobile && "p-2"
              )}
            >
              {/* Role badge - shown on tablet and desktop */}
              {!isMobile && (
                <RoleBadge
                  role={role}
                  daysRemaining={daysRemaining}
                  compact={false}
                />
              )}
              {/* User icon */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">My Account</p>
                {userEmail && (
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Show role badge in dropdown on mobile */}
            {isMobile && (
              <>
                <div className="px-2 py-1.5">
                  <RoleBadge
                    role={role}
                    daysRemaining={daysRemaining}
                    compact={false}
                  />
                </div>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* Upgrade CTA for trial/expired users */}
            {(role === "trial" || role === "expired") && (
              <>
                <DropdownMenuItem className="text-primary focus:text-primary">
                  Upgrade to Premium
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem className="text-red-500 focus:text-red-500">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
