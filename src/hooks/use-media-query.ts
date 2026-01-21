"use client";

import { useState, useEffect } from "react";

/**
 * Hook to check if a media query matches
 * Returns false during SSR and initial render to prevent hydration mismatches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if window is available (client-side only)
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [query]);

  // Return false during SSR to prevent hydration mismatch
  if (!mounted) return false;

  return matches;
}

/**
 * Hook to get current breakpoint
 * Returns desktop values during SSR to prevent layout shift
 */
export function useBreakpoint() {
  const [mounted, setMounted] = useState(false);

  const isMinMd = useMediaQuery("(min-width: 768px)");
  const isMinLg = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR/initial render, assume desktop to prevent layout shift
  if (!mounted) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  }

  return {
    isMobile: !isMinMd,
    isTablet: isMinMd && !isMinLg,
    isDesktop: isMinLg,
  };
}
