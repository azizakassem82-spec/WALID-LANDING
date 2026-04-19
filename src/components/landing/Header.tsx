import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Header() {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="group flex items-center gap-2.5">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg transition-transform group-hover:scale-105 overflow-hidden"
          >
            <img src="/LOGO .webp" alt="Rova Logo" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-extrabold tracking-tight">Rova</span>
            <span className="text-[10px] font-medium text-muted-foreground">زيت بديل الليزر</span>
          </div>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
          <a href="#features" className="text-muted-foreground transition-colors hover:text-primary">مميزات</a>
          <a href="#reviews" className="text-muted-foreground transition-colors hover:text-primary">مراجعات</a>
          <a href="#faq" className="text-muted-foreground transition-colors hover:text-primary">أسئلة و أجوبة</a>
          <a href="#footer" className="text-muted-foreground transition-colors hover:text-primary">تواصل معنا</a>
          <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">لوحة التحكم</Link>
        </nav>
        <Button
          onClick={scrollToForm}
          className="rounded-full px-5 font-bold text-primary-foreground shadow-md transition-all hover:scale-105 hover:shadow-lg"
          style={{ background: "var(--gradient-primary)" }}
        >
          اشتري الآن
        </Button>
      </div>
    </header>
  );
}
