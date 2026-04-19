import { WILAYAS } from "./wilayas";
import { useSettings } from "@/hooks/useSettings";

export function InfiniteBanner() {
  const { settings } = useSettings();

  if (!settings.bannerEnabled) return null;

  const message = settings.bannerMessage || "التوصيل متوفر إلى";

  // Three copies so the cycle point is always hidden off-screen
  const items = [...WILAYAS, ...WILAYAS, ...WILAYAS];

  return (
    <div
      className="overflow-hidden border-y py-3 select-none"
      style={{
        background: "var(--gradient-primary)",
        borderColor: "oklch(0.55 0.18 145 / 50%)",
      }}
    >
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: "rova-marquee 150s linear infinite",
          willChange: "transform",
          width: "max-content",
        }}
      >
        {items.map((wilaya, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-sm font-bold text-white shrink-0"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-white/50 shrink-0" />
            🚚 {message} {wilaya}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes rova-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
      `}</style>
    </div>
  );
}
