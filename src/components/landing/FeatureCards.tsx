import { Card, CardContent } from "@/components/ui/card";
import { Users, Wallet, MapPin } from "lucide-react";

export function FeatureCards() {
  const items = [
    {
      icon: Users,
      title: "أكثر من 2000 زبون راضي",
      desc: "آلاف العملاء جربوا Rova و حصلوا على بشرة نقية.",
    },
    {
      icon: Wallet,
      title: "الدفع عند الاستلام",
      desc: "ادفع فقط عندما يصلك المنتج، بدون أي مخاطرة.",
    },
    {
      icon: MapPin,
      title: "متوفر الآن في الجزائر",
      desc: "توصيل لكل ولايات الجزائر الـ 58 خلال 48 ساعة.",
    },
  ];
  return (
    <section id="features" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">لماذا Rova؟</h2>
          <p className="mt-2 text-muted-foreground">ثقة آلاف العملاء في الجزائر</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="group relative overflow-hidden border-primary/10 transition-all hover:-translate-y-1 hover:border-primary/40"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: "var(--gradient-primary)" }} />
              <CardContent className="flex flex-col items-center p-7 text-center">
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-primary-foreground transition-transform group-hover:scale-110"
                  style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-extrabold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
