"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePermissions, type UserPermissions } from "./use-permissions";

const PermissionsContext = createContext<UserPermissions | undefined>(undefined);

export function PermissionsProvider({ children }: { children: ReactNode }) {
  const permissions = usePermissions();

  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissionsContext(): UserPermissions {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error("usePermissionsContext must be used within a PermissionsProvider");
  }
  return context;
}
