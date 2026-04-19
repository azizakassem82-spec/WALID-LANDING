import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const QUESTIONS = [
  {
    q: "كيف يُستعمل زيت Rova؟",
    a: "يُطبَّق مباشرة بعد إزالة الشعر من الجذور (بالحلاوة أو الشمع) لمدة 3 أيام متتالية. يُدلَّك برفق على المنطقة المعالجة حتى يتشرّبه الجلد.",
  },
  {
    q: "متى تظهر النتائج؟",
    a: "تبدأ النتائج في الظهور ابتداءً من ثالث استعمال، وتختلف حسب طبيعة وكثافة الشعر. مع الاستعمال المنتظم يقل نمو الشعر تدريجياً ويصبح أفتح وأخف.",
  },
  {
    q: "ما هي مكونات Rova؟",
    a: "تركيبة Rova تجمع بين زيت السعد، الترمس المر، زيت اللوز، وزيت شجرة الشاي، مدعّمة بفيتامين E — كل المكونات طبيعية 100%.",
  },
  {
    q: "هل له آثار جانبية؟",
    a: "Rova مصنوع من مكونات طبيعية 100% ولا يسبب أي آثار جانبية. يُنصح بتجربته على مساحة صغيرة أولاً في حال وجود حساسية جلدية.",
  },
  {
    q: "ما الفوائد الإضافية للزيت؟",
    a: "يُهدّئ البشرة ويمنع التهيّج والحرقة بعد إزالة الشعر، يعالج مظهر جلد الأوزة، يمنح ترطيباً عميقاً، وبفضل قوامه الخفيف لا يترك أثراً دهنياً.",
  },
  {
    q: "كم تستغرق مدة التوصيل؟",
    a: "التوصيل يستغرق من 24 إلى 72 ساعة حسب الولاية. سيتم التواصل معك هاتفياً لتأكيد الطلب قبل الإرسال.",
  },
  {
    q: "ما هي طريقة الدفع؟",
    a: "الدفع يتم عند الاستلام (Cash on Delivery) — تدفع المبلغ كاملاً لعامل التوصيل عندما يصلك المنتج.",
  },
  {
    q: "هل يمكن إرجاع المنتج؟",
    a: "نعم، يمكن إرجاع المنتج خلال 7 أيام من الاستلام إذا كان معيباً أو غير مطابق للوصف.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-accent/30 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold sm:text-4xl">أسئلة و أجوبة</h2>
          <p className="mt-2 text-muted-foreground">كل ما تحتاج معرفته عن منتج Rova</p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {QUESTIONS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className="rounded-xl border bg-card px-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <AccordionTrigger className="text-right text-base font-bold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
