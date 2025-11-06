// Local Storage Utilities

const STORAGE_KEYS = {
  TODAYS_PLAN: 'triggerpoint_todays_plan',
  SETUPS: 'triggerpoint_setups',
  CAPITAL: 'triggerpoint_capital',
  POSITIONS: 'triggerpoint_positions',
  PERFORMANCE: 'triggerpoint_performance',
} as const;

export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

export const KEYS = STORAGE_KEYS;
