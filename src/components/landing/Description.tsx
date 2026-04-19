import { Leaf, Droplets, Sparkles, Zap } from "lucide-react";


const INGREDIENTS = [
  { icon: Droplets, name: "زيت السعد", desc: "يضعف بصيلات الشعر ويقلل من نموه تدريجياً" },
  { icon: Leaf, name: "الترمس المر", desc: "يبطئ نمو الشعر الزائد بشكل ملحوظ" },
  { icon: Droplets, name: "زيت اللوز", desc: "يرطب ويغذي البشرة بعمق بعد إزالة الشعر" },
  { icon: Leaf, name: "زيت شجرة الشاي", desc: "يهدئ البشرة ويمنع التهاب المسام والتهيّج" },
  { icon: Sparkles, name: "فيتامين E", desc: "يغذي البشرة ويحافظ على مرونتها وحيويتها" },
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
            <strong className="text-primary">Rova</strong> تركيبة فعّالة تجمع بين زيت السعد،
            الترمس المر، زيت اللوز، وزيت شجرة الشاي، مدعّمة بفيتامين E لتمنحك حلاً طبيعياً
            ومتكاملاً للعناية بالبشرة بعد إزالة الشعر.
          </p>
          <p>
            يعمل هذا الزيت على تهدئة البشرة ومنع التهيّج، مع المساعدة على التخلص من مظهر جلد
            الأوزة ومنح الجلد نعومة واضحة. كما يوفر ترطيباً عميقاً يغذي البشرة ويعيد لها
            حيويتها.
          </p>
          <p>
            بفضل قوامه الخفيف وتقنية الامتصاص السريع، يتغلغل بسهولة دون ترك أثر دهني، مما
            يسمح بفعالية أفضل في إبطاء نمو الشعر وتقليل كثافته مع الاستعمال المنتظم.
          </p>
        </div>

        {/* Result highlight */}
        <div
          className="mx-auto mt-8 max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 text-center"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Zap className="mx-auto mb-2 h-7 w-7 text-primary" />
          <p className="text-base font-extrabold text-primary">✨ النتيجة من أول استعمال:</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">
            بشرة أنعم، أكثر راحة، ومظهر موحّد يزداد جمالاً مع الوقت.
          </p>
        </div>

        {/* Usage instructions */}
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border bg-card px-6 py-5">
          <h3 className="mb-3 text-center text-lg font-extrabold">طريقة الاستعمال</h3>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">1</span>
              أزِل الشعر من الجذور (بالحلاوة أو الشمع).
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">2</span>
              طبّق زيت Rova مباشرة على المنطقة مع تدليك خفيف.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">3</span>
              كرّر ذلك لمدة <strong>3 أيام متتالية</strong> بعد كل عملية إزالة للشعر.
            </li>
          </ul>
          <p className="mt-3 rounded-lg bg-primary/5 px-4 py-2 text-center text-xs font-semibold text-primary">
            تبدأ النتائج في الظهور ابتداءً من ثالث استعمال، وتختلف حسب طبيعة وكثافة الشعر.
          </p>
        </div>



        {/* Ingredients */}
        <div className="mt-10">
          <h3 className="mb-5 text-center text-xl font-extrabold">المكونات الرئيسية</h3>
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
