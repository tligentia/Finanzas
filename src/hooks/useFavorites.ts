import { useSyncExternalStore, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'app_user_favorites_list_v1';

// Global in-memory cache to guarantee referential stability for getSnapshot
let cachedFavorites: string[] = (() => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
})();

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error(e);
    }
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): string[] {
  return cachedFavorites;
}

function getServerSnapshot(): string[] {
  return [];
}

// Window storage listener for cross-tab or external storage changes
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e: StorageEvent) => {
    if (e.key === FAVORITES_STORAGE_KEY) {
      try {
        cachedFavorites = e.newValue ? JSON.parse(e.newValue) : [];
        emitChange();
      } catch {}
    }
  });
}

export function toggleFavoriteGlobal(name: string) {
  const current = cachedFavorites;
  const exists = current.includes(name);
  const next = exists ? current.filter(item => item !== name) : [...current, name];
  
  cachedFavorites = next;
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.error('Error saving favorites to localStorage', err);
  }

  // queueMicrotask ensures subscriber notifications happen outside of any active React render phase
  queueMicrotask(() => {
    emitChange();
  });
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleFavorite = useCallback((name: string) => {
    toggleFavoriteGlobal(name);
  }, []);

  const isFavorite = useCallback((name: string) => {
    return favorites.includes(name);
  }, [favorites]);

  const sortWithFavoritesFirst = useCallback(<T extends { name?: string; title?: string; t?: string; shortName?: string; defi?: string; instrument?: string; id?: string }>(
    items: T[], 
    customKeyFn?: (item: T) => string
  ): T[] => {
    return [...items].sort((a, b) => {
      const nameA = customKeyFn ? customKeyFn(a) : (a.name || a.title || a.t || a.shortName || a.defi || a.instrument || a.id || '');
      const nameB = customKeyFn ? customKeyFn(b) : (b.name || b.title || b.t || b.shortName || b.defi || b.instrument || b.id || '');
      const aFav = favorites.includes(nameA);
      const bFav = favorites.includes(nameB);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite, sortWithFavoritesFirst };
}
