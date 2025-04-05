// src/pages/_app.tsx
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Define the GoatCounter type without extending Window interface
type GoatCounter = {
  count: (opts: { path: string }) => void;
};

// Type guard to check if window has goatcounter
function hasGoatCounter(win: Window): win is Window & { goatcounter: GoatCounter } {
  return 'goatcounter' in win && win.goatcounter !== undefined;
}
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Count initial page view
    if (typeof window !== 'undefined' && hasGoatCounter(window)) {
      window.goatcounter.count({
        path: router.asPath,
      });
    }

    const handleRouteChange = (url: string) => {
      if (hasGoatCounter(window)) {
        window.goatcounter.count({
          path: new URL(url).pathname,
        });
      }
    };

    // Listen for route changes and track the new page
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener on component unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, router.asPath]);

  return (
    <>
      <Head>
        {/* GoatCounter script for traffic tracking */}
        <script
          data-goatcounter="https://joshuadanpeterson.goatcounter.com/count"
          async
          src="https://gc.zgo.at/count.js"
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
