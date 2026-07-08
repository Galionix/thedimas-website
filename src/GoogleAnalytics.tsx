import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  GA_MEASUREMENT_ID,
  isGoogleAnalyticsEnabled,
  pageview,
} from "../utils/google_analytics";

export const GoogleAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isGoogleAnalyticsEnabled()) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer?.push(arguments);
      };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname + window.location.search,
    });

    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (!isGoogleAnalyticsEnabled()) {
    return null;
  }

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
};
