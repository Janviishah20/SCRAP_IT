// Safe storage utility resilient to private browsing, Brave Shields,
// quota limits, and corrupted JSON values ('undefined', 'null').

const memoryStore = {};

export const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (err) {
      console.warn(`[safeStorage] localStorage.getItem failed for "${key}":`, err);
    }
    return memoryStore[key] ?? null;
  },

  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (err) {
      console.warn(`[safeStorage] localStorage.setItem failed for "${key}":`, err);
    }
    memoryStore[key] = String(value);
  },

  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (err) {
      console.warn(`[safeStorage] localStorage.removeItem failed for "${key}":`, err);
    }
    delete memoryStore[key];
  },

  clearAppKeys: () => {
    const appKeys = [
      'kc_view',
      'kc_auth',
      'kc_role',
      'kc_pickups',
      'kc_lots',
      'kc_citizen_stats',
      'kc_kabadiwala_inv',
      'kc_privacy_consent'
    ];
    appKeys.forEach((key) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } catch {}
      delete memoryStore[key];
    });
  },

  getJSON: (key, fallback) => {
    try {
      const raw = safeStorage.getItem(key);
      if (!raw || raw === 'undefined' || raw === 'null') {
        return fallback;
      }
      const parsed = JSON.parse(raw);
      return parsed !== undefined && parsed !== null ? parsed : fallback;
    } catch (err) {
      console.warn(`[safeStorage] Corrupted JSON for "${key}", reverting to fallback:`, err);
      safeStorage.removeItem(key);
      return fallback;
    }
  },

  setJSON: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      safeStorage.setItem(key, serialized);
    } catch (err) {
      console.warn(`[safeStorage] JSON serialization failed for "${key}":`, err);
    }
  }
};
