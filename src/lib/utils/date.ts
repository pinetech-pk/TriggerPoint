import { format, formatDistanceToNow, parseISO } from "date-fns";

export function formatDate(date: string | Date, formatStr = "MMM d, yyyy"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM d, yyyy HH:mm");
}

export function formatTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "HH:mm");
}

export function formatRelative(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function getSessionFromTime(date: Date): "AS" | "LO" | "NY" | "OTHER" {
  const hour = date.getUTCHours();

  // Asian Session: 00:00 - 08:00 UTC
  if (hour >= 0 && hour < 8) return "AS";
  // London Session: 08:00 - 13:00 UTC
  if (hour >= 8 && hour < 13) return "LO";
  // New York Session: 13:00 - 22:00 UTC
  if (hour >= 13 && hour < 22) return "NY";
  // Other
  return "OTHER";
}
