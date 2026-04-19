import { Star } from "lucide-react";

const REVIEW_IMAGES = [
  "/CLIENT.jpg",
  "/CLIENT (1).jpg",
  "/CLIENT (2).jpg",
  "/CLIENT (3).jpg",
];

export function Reviews() {
  return (
    <section id="reviews" className="py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl font-extrabold">آراء عملائنا</h2>
          <p className="mt-2 text-muted-foreground">تقييم 4.9/5 من أكثر من 2000 زبون راضي</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {REVIEW_IMAGES.map((src, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow">
              <img
                src={src}
                alt={`رأي الزبون ${idx + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
