"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

interface TabsProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function Tabs({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    defaultValue ?? ""
  );
  const value = controlledValue ?? uncontrolledValue;
  const setValue = onValueChange ?? setUncontrolledValue;

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a Tabs");
  }
  return context;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
  const { value: selectedValue, setValue } = useTabs();
  const isSelected = selectedValue === value;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected && "bg-background text-foreground shadow",
        className
      )}
      onClick={() => setValue(value)}
      {...props}
    />
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
  const { value: selectedValue } = useTabs();

  if (selectedValue !== value) return null;

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
