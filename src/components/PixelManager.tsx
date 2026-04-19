import { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    ttq?: {
      load: (id: string) => void;
      page: () => void;
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

/** Call from anywhere to fire a Facebook Pixel event */
export function fbEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, data);
  }
}

/** Call from anywhere to fire a TikTok Pixel event */
export function ttEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.track(event, data);
  }
}

export function PixelManager() {
  const { settings } = useSettings();

  // ---- Facebook Pixel ----
  useEffect(() => {
    const id = settings.facebookPixelId;
    if (!id) return;
    if (document.getElementById("fb-pixel")) return; // already injected

    const script = document.createElement("script");
    script.id = "fb-pixel";
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${id}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    return () => {
      document.getElementById("fb-pixel")?.remove();
    };
  }, [settings.facebookPixelId]);

  // ---- TikTok Pixel ----
  useEffect(() => {
    const id = settings.tiktokPixelId;
    if (!id) return;
    if (document.getElementById("tt-pixel")) return;

    const script = document.createElement("script");
    script.id = "tt-pixel";
    script.innerHTML = `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
        ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],
        ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
        for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
        ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},
        ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
        ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
        n=document.createElement("script");n.type="text/javascript";n.async=!0;
        n.src=r+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a)};
        ttq.load('${id}');
        ttq.page();
      }(window, document, 'ttq');
    `;
    document.head.appendChild(script);

    return () => {
      document.getElementById("tt-pixel")?.remove();
    };
  }, [settings.tiktokPixelId]);

  return null;
}
