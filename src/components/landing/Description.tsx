import { Leaf, Droplets, Sparkles, Zap } from "lucide-react";


const INGREDIENTS = [
  { icon: Sparkles, name: "تصميم أنيق", desc: "أزياء عصرية بلمسات تقليدية ساحرة" },
  { icon: Leaf, name: "جودة عالية", desc: "أقمشة فاخرة مختارة بعناية لتناسب كل الأذواق" },
  { icon: Droplets, name: "تفاصيل متقنة", desc: "تطريز دقيق وحرفية عالية في كل قطعة" },
];

export function Description() {
  return (
    <section className="bg-accent/30 py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            تركيبة طبيعية 100%
          </span>
          <h2 className="text-3xl font-extrabold sm:text-4xl">وصف المنتج</h2>
        </div>

        {/* Product Description Image */}
        <div className="mb-10 mx-auto max-w-4xl">
          <img 
            src="/DESCREPTION OF PRODUCT .PNG" 
            alt="وصف المنتج" 
            className="w-full h-auto rounded-3xl shadow-xl border border-white/20"
            loading="lazy"
          />
        </div>

        {/* Main description */}
        <div className="mx-auto max-w-3xl space-y-4 text-base leading-loose text-foreground/90">
          <p>
            <strong className="text-primary">Bae Chic Collection</strong> تقدم لكم أرقى التصاميم للأزياء التقليدية والعصرية.
            مجموعتنا متميزة بألوانها الزاهية وتفاصيلها الدقيقة لتجعلكِ تتألقين في كل مناسباتك.
          </p>
          <p>
            تم تصميم كل قطعة لتبرز جمالك وأنوثتك مع الحفاظ على روح الأصالة. نستخدم أجود أنواع الأقمشة لضمان راحتكِ وأناقتكِ، لتكوني محط الأنظار أينما ذهبتِ.
          </p>
          <p>
            سواء كنتِ تبحثين عن إطلالة فخمة للأعراس أو طلة أنيقة للمناسبات الخاصة، لدينا الخيار الأمثل لكِ.
          </p>
        </div>

        {/* Result highlight */}
        <div
          className="mx-auto mt-8 max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 text-center"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Zap className="mx-auto mb-2 h-7 w-7 text-primary" />
          <p className="text-base font-extrabold text-primary">✨ تألقي بأبهى حلة:</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">
            إطلالة ملكية تبرز جمالك وتجعلكِ نجمة الحفل.
          </p>
        </div>

        {/* Usage instructions */}
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border bg-card px-6 py-5">
          <h3 className="mb-3 text-center text-lg font-extrabold">كيفية الطلب</h3>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">1</span>
              اختاري الموديل المفضل لديكِ.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">2</span>
              أدخلي معلوماتك في استمارة الطلب (الاسم، العنوان، رقم الهاتف).
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">3</span>
               سنتصل بكِ لتأكيد الطلب وشحن المنتج ليصلك إلى باب منزلك، والدفع عند الاستلام!
            </li>
          </ul>
        </div>



        {/* Ingredients */}
        <div className="mt-10">
          <h3 className="mb-5 text-center text-xl font-extrabold">مميزات التشكيلة</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INGREDIENTS.map(({ icon: Icon, name, desc }) => (
              <div
                key={name}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold">{name}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
