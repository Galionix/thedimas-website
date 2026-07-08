export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: AnalyticsEventParams
    ) => void;
  }
}

export const isGoogleAnalyticsEnabled = () => Boolean(GA_MEASUREMENT_ID);

export const pageview = (url: string) => {
  if (!isGoogleAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const gaEvent = (
  action: string,
  params: AnalyticsEventParams = {}
) => {
  if (!isGoogleAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", action, params);
};
