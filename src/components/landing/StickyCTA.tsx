import { ShoppingCart, Sparkles } from "lucide-react";

export function StickyCTA() {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Mobile: full-width bar at bottom ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* subtle glow layer behind the bar */}
        <div
          className="absolute inset-x-0 -top-6 h-10 blur-2xl opacity-60 pointer-events-none"
          style={{ background: "var(--gradient-cta)" }}
        />
        <div className="relative border-t border-white/10 bg-background/90 px-3 py-3 backdrop-blur-xl shadow-2xl">
          <button
            onClick={scrollToForm}
            className="cta-pulse relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full text-base font-extrabold text-white"
            style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-elegant)" }}
          >
            {/* shimmer sweep */}
            <span className="cta-shimmer pointer-events-none absolute inset-0 rounded-full" />
            <ShoppingCart className="h-5 w-5 shrink-0" />
            اشتري الآن — الدفع عند الاستلام
          </button>
        </div>
      </div>

      {/* ── Desktop: floating pill bottom-right ── */}
      <div className="fixed bottom-8 left-6 z-50 hidden md:block">
        <button
          onClick={scrollToForm}
          className="cta-pulse relative flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-sm font-extrabold text-white shadow-2xl"
          style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-elegant)" }}
        >
          <span className="cta-shimmer pointer-events-none absolute inset-0 rounded-full" />
          <Sparkles className="h-4 w-4 shrink-0" />
          اطلب الآن — الدفع عند الاستلام
        </button>
      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        /* Breathe: scale up and down to grab attention */
        @keyframes cta-breathe {
          0%, 100% { transform: scale(1);    box-shadow: var(--shadow-elegant); }
          50%       { transform: scale(1.06); box-shadow: 0 0 40px color-mix(in oklab, oklch(0.65 0.16 145) 55%, transparent); }
        }
        .cta-pulse {
          animation: cta-breathe 2.2s ease-in-out infinite;
          will-change: transform;
        }
        .cta-pulse:hover {
          animation-play-state: paused;
          transform: scale(1.04);
        }
        .cta-pulse:active {
          transform: scale(0.97);
          animation-play-state: paused;
        }

        /* Shimmer sweep across the button */
        @keyframes cta-shimmer {
          0%   { transform: translateX(-120%) skewX(-20deg); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translateX(220%)  skewX(-20deg); opacity: 0; }
        }
        .cta-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.35) 50%,
            transparent 100%
          );
          animation: cta-shimmer 2.8s ease-in-out infinite;
          animation-delay: 0.4s;
        }
      `}</style>
    </>
  );
}
