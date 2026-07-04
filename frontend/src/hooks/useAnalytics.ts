import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to manage event logging and marketing conversion triggers.
 * Sends events to virtual console outputs in development and prepares hooks for external pixels.
 */
export const useAnalytics = () => {
  const location = useLocation();

  // Log page views on route changes
  useEffect(() => {
    const pagePath = location.pathname + location.search;
    console.log(`[Analytics] PageView: ${pagePath}`);
  }, [location]);

  // Log custom actions (e.g., booking wizard triggers, cart additions)
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    console.log(`[Analytics] Event: ${eventName}`, properties || {});
    
    // In production, trigger standard tag managers:
    // window.gtag?.('event', eventName, properties);
    // window.fbq?.('track', eventName, properties);
  };

  return { trackEvent };
};

export default useAnalytics;
