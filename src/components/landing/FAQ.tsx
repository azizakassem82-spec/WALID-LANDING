import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const QUESTIONS = [
  {
    q: "هل الصور مطابقة للمنتج الحقيقي؟",
    a: "نعم، جميع صورنا حقيقية ومطابقة 100% للمنتجات التي ستصلك. نضمن لكِ الجودة العالية والتطابق التام.",
  },
  {
    q: "ما هي المقاسات المتوفرة؟",
    a: "نوفر مقاسات متعددة تناسب الجميع (Standard, ML, XL) ويمكنكِ التأكد من المقاس المناسب لكِ عند تواصل فريقنا معكِ لتأكيد الطلب.",
  },
  {
    q: "ما نوع القماش المستخدم في أزيائكم؟",
    a: "نستخدم أفضل وأرقى أنواع الأقمشة لضمان راحتكِ وأناقتكِ، ومناسبة لجميع الفصول والمناسبات.",
  },
  {
    q: "هل يمكنني معاينة المنتج قبل الدفع؟",
    a: "نعم، من حقكِ معاينة الطلبية عند استلامها من عامل التوصيل قبل دفع المبلغ المالي، لضمان رضاكِ التام.",
  },
  {
    q: "ما هي تكلفة التوصيل؟",
    a: "تكلفة التوصيل تختلف حسب الولاية وتبدأ من 400 دج. يتم إعلامكِ بالتكلفة الدقيقة أثناء مكالمة تأكيد الطلب.",
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
          <p className="mt-2 text-muted-foreground">كل ما تحتاجين معرفته عن Bae Chic Collection</p>
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
