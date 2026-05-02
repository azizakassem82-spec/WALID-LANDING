import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const HERO_IMG_1 = "/PRODUCT PICS (1).jpg";
const HERO_IMG_2 = "/PRODUCT PICS (2).jpg";

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 flex flex-col items-center"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="relative mx-auto w-full max-w-5xl px-4 flex flex-col items-center justify-center gap-8 text-center">
        {/* ── Product Name ── */}
        <div className="flex flex-col items-center gap-1 select-none">
          {/* Product name – French */}
          <h1
            className="leading-none tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-brand-fr)",
              fontSize: "clamp(2.8rem, 9vw, 6rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, oklch(0.30 0.10 145) 0%, oklch(0.55 0.20 145) 50%, oklch(0.40 0.14 145) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.12em",
            }}
          >
            Robe Chic
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full max-w-xs my-0.5">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, oklch(0.65 0.16 145))" }} />
            <span style={{ color: "oklch(0.65 0.16 145)", fontSize: "1rem" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, oklch(0.65 0.16 145))" }} />
          </div>

          {/* Product name – Arabic */}
          <p
            className="leading-none"
            dir="rtl"
            style={{
              fontFamily: "var(--font-brand-ar)",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 700,
              background: "linear-gradient(135deg, oklch(0.55 0.20 145) 0%, oklch(0.30 0.10 145) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.04em",
            }}
          >
            روب شيك
          </p>

          {/* Website brand subtitle */}
          <p className="text-xs font-semibold text-muted-foreground mt-1 tracking-wide uppercase">
            by Bae Chic Collection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/40 bg-white/30 p-2 backdrop-blur shadow-xl transition-transform hover:scale-[1.01]">
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={HERO_IMG_1}
                  alt="Bae Chic Collection - الصفحة الرئيسية"
                  className="h-auto w-full rounded-[1.5rem] object-cover cursor-pointer"
                  loading="eager"
                />
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none text-white [&>button]:text-white">
                <img
                  src={HERO_IMG_1}
                  alt="Bae Chic Collection"
                  className="h-auto w-full rounded-lg object-contain"
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/40 bg-white/30 p-2 backdrop-blur shadow-xl transition-transform hover:scale-[1.01]">
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={HERO_IMG_2}
                  alt="Bae Chic Collection - معرض"
                  className="h-auto w-full rounded-[1.5rem] object-cover cursor-pointer"
                  loading="eager"
                />
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none text-white [&>button]:text-white">
                <img
                  src={HERO_IMG_2}
                  alt="Bae Chic Collection"
                  className="h-auto w-full rounded-lg object-contain"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Button
          onClick={scrollToForm}
          className="h-16 w-full max-w-sm rounded-full px-8 text-lg font-extrabold text-primary-foreground transition-all hover:scale-[1.03]"
          style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-elegant)" }}
        >
          اطلب الآن - الدفع عند الاستلام
        </Button>
        
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-5 w-5 text-primary" />
            ضمان الجودة
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="h-5 w-5 text-primary" />
            توصيل لكل الولايات
          </span>
        </div>
      </div>
    </section>
  );
}
