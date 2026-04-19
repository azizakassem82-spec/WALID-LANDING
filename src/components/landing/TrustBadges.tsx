import { ShieldCheck, Truck, Headphones, BadgeCheck } from "lucide-react";

export function TrustBadges() {
  const items = [
    { icon: Truck, title: "الدفع عند الاستلام", desc: "ادفع بعد ما يوصلك" },
    { icon: ShieldCheck, title: "ضمانة 100%", desc: "نتائج مضمونة" },
    { icon: BadgeCheck, title: "منتج أصلي", desc: "تركيبة طبيعية" },
    { icon: Headphones, title: "خدمة العملاء", desc: "متاحون 7/7" },
  ];
  return (
    <section className="border-y bg-card py-6">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{title}</p>
              <p className="truncate text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
