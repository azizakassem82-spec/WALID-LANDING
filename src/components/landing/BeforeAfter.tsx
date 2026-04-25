import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const IMAGES = [
  "/BEFORE.AFTER (1).webp",
  "/BEFORE.AFTER (2).webp",
  "/BEFORE.AFTER (3).webp",
  "/BEFORE.AFTER (4).webp",
  "/BEFORE.AFTER (5).webp",
  "/BEFORE.AFTER (6).webp",
];

export function BeforeAfter() {
  return (
    <section id="results" className="py-12 bg-background">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">أحدث التصاميم</h2>
          <p className="text-sm text-muted-foreground mt-2">تشكيلة مميزة من الأزياء الراقية</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {IMAGES.map((src, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <img
                  src={src}
                  alt={`Bae Chic Collection result ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-2xl border bg-card object-cover transition-transform hover:scale-[1.02] cursor-pointer shadow-sm"
                />
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-1 bg-transparent border-none shadow-none text-white [&>button]:text-white">
                <img
                  src={src}
                  alt={`Bae Chic Collection result ${i + 1} expanded`}
                  className="h-auto w-full rounded-xl object-contain"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
