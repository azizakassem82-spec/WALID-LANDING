import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { OrderForm } from "@/components/landing/OrderForm";
import { TrustBadges } from "@/components/landing/TrustBadges";
import { Reviews } from "@/components/landing/Reviews";
import { Description } from "@/components/landing/Description";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { InfiniteBanner } from "@/components/landing/InfiniteBanner";
import { Toaster } from "@/components/ui/sonner";
import { PixelManager } from "@/components/PixelManager";
import { BeforeAfter } from "@/components/landing/BeforeAfter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden">
      <PixelManager />
      <Header />
      <main>
        <Hero />
        <OrderForm />
        <FeatureCards />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}
