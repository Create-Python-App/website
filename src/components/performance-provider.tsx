'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface PerformanceContextValue {
  performanceMode: boolean;
  togglePerformanceMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextValue | undefined>(undefined);

const STORAGE_KEY = 'cna:performanceMode';

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [performanceMode, setPerformanceMode] = useState(false);

  // Initialize from storage or prefers-reduced-motion
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setPerformanceMode(stored === 'true');
        return;
      }
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) setPerformanceMode(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(performanceMode));
    } catch {
      /* ignore */
    }
  }, [performanceMode]);

  const togglePerformanceMode = useCallback(() => {
    setPerformanceMode((p) => !p);
  }, []);

  const value = useMemo(() => ({ performanceMode, togglePerformanceMode }), [performanceMode, togglePerformanceMode]);

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
}

export function usePerformanceMode() {
  const ctx = useContext(PerformanceContext);
  if (!ctx) throw new Error('usePerformanceMode must be used within PerformanceProvider');
  return ctx;
}
