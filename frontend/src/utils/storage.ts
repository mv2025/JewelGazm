/**
 * Safe local storage utility wrapper
 */
export const storage = {
  get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch (err) {
      console.error(`Error parsing LocalStorage key "${key}":`, err);
      return null;
    }
  },

  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error writing to LocalStorage key "${key}":`, err);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing LocalStorage key "${key}":`, err);
    }
  },
};
