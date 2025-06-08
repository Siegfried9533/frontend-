// components/ui/tabs.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsContextType {
  value: string;
  setValue: (val: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;

  const value = isControlled ? controlledValue! : internalValue;
  const setValue = isControlled && onValueChange ? onValueChange : setInternalValue;

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={twMerge("", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export function TabsList({ className, children }: TabsListProps) {
  return (
    <div
      className={twMerge(
        "inline-flex items-center justify-start space-x-2 border-b",
        className
      )}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");
  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.setValue(value)}
      className={twMerge(
        "px-4 py-2 font-medium border-b-2 transition-colors",
        isActive ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-blue-600",
        className
      )}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.value !== value) return null;

  return <div className={twMerge("mt-4", className)}>{children}</div>;
}
