// Performance monitoring utilities

export const measurePageLoad = () => {
  if (typeof window === 'undefined') return;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  const metrics = {
    // Core Web Vitals
    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
    largestContentfulPaint: 0, // Will be measured separately
    firstInputDelay: 0, // Will be measured separately
    cumulativeLayoutShift: 0, // Will be measured separately
    
    // Navigation timing
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    timeToFirstByte: navigation.responseStart - navigation.requestStart,
    
    // Resource timing
    resourceCount: performance.getEntriesByType('resource').length,
  };

  console.log('Performance Metrics:', metrics);
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // gtag('event', 'page_load_metrics', metrics);
  }
};

// Measure Largest Contentful Paint (LCP)
export const observeLCP = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.warn('LCP observation not supported');
  }
};

// Measure First Input Delay (FID)
export const observeFID = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      const fidEntry = entry as PerformanceEventTiming;
      console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
    });
  });

  try {
    observer.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    console.warn('FID observation not supported');
  }
};

// Measure Cumulative Layout Shift (CLS)
export const observeCLS = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  let clsValue = 0;
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      const clsEntry = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
      if (!clsEntry.hadRecentInput) {
        clsValue += clsEntry.value;
      }
    });
    console.log('CLS:', clsValue);
  });

  try {
    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.warn('CLS observation not supported');
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Measure initial page load
  window.addEventListener('load', () => {
    setTimeout(measurePageLoad, 0);
  });

  // Observe Core Web Vitals
  observeLCP();
  observeFID();
  observeCLS();

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.warn('Long task detected:', entry.duration, 'ms');
      });
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long task observation not supported');
    }
  }
};

// Memory usage monitoring (development only)
export const checkMemoryUsage = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  if ('memory' in performance) {
    const memory = (performance as Performance & { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
    console.log('Memory Usage:', {
      used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
      total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
      limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
    });
  }
};
