import { useState, useRef, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { CheckCircle2, ShoppingCart, Loader2, AlertTriangle } from "lucide-react";
import { WILAYAS } from "./wilayas";
import { Countdown } from "./Countdown";
import { useSettings } from "@/hooks/useSettings";
import { fbEvent, ttEvent } from "@/components/PixelManager";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// ─── Validation helpers ──────────────────────────────────────────────────────

/** Algerian mobile: starts with 05/06/07, exactly 10 digits */
const PHONE_RE = /^(05|06|07)\d{8}$/;

/** Detect obviously fake phones: all same digit or perfectly sequential */
function isFakePhone(phone: string): boolean {
  if (/^(\d)\1{9}$/.test(phone)) return true; // 0555555555
  const digits = phone.split("").map(Number);
  const allSeq = digits.every((d, i) => i === 0 || d === digits[i - 1] + 1);
  const allRevSeq = digits.every((d, i) => i === 0 || d === digits[i - 1] - 1);
  return allSeq || allRevSeq;
}

/** Name must be ≥ 5 chars, no digits, at least one space (first + last name) */
function validateName(name: string): string | null {
  const cleaned = name.trim();
  if (cleaned.length < 5) return "الاسم قصير جداً، الرجاء كتابة الاسم الكامل";
  if (/\d/.test(cleaned)) return "الاسم لا يمكن أن يحتوي على أرقام";
  if (!cleaned.includes(" ")) return "الرجاء إدخال الاسم واللقب (مثال: فاطمة الزهراء)";
  return null;
}

function validatePhone(phone: string): string | null {
  const cleaned = phone.replace(/\s/g, "");
  if (!PHONE_RE.test(cleaned)) return "رقم الهاتف غير صحيح (يجب أن يبدأ بـ 05/06/07 ويحتوي 10 أرقام)";
  if (isFakePhone(cleaned)) return "رقم الهاتف يبدو غير حقيقي، الرجاء إدخال رقم صحيح";
  return null;
}

/** Session-level duplicate check */
const SENT_KEY = "rova_sent_phones";
function wasAlreadySent(phone: string): boolean {
  try {
    const raw = sessionStorage.getItem(SENT_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return list.includes(phone);
  } catch { return false; }
}
function markAsSent(phone: string) {
  try {
    const raw = sessionStorage.getItem(SENT_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(phone)) {
      list.push(phone);
      sessionStorage.setItem(SENT_KEY, JSON.stringify(list));
    }
  } catch {}
}

/** Send data to a Google Apps Script webhook (no-cors fire-and-forget) */
async function sendToSheet(url: string, data: Record<string, string | number>) {
  if (!url) return;
  const params = new URLSearchParams();
  Object.entries(data).forEach(([k, v]) => params.append(k, String(v)));
  try {
    await fetch(`${url}?${params.toString()}`, { method: "GET", mode: "no-cors" });
  } catch (err) {
    console.error("Sheet send failed:", err);
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

const getDeliveryPrice = (wilaya: string, overrides: Record<string, { stop: number | null; dom: number; note?: string }>) => {
  if (!wilaya) return null;
  
  // Use custom override from dashboard if it exists
  if (overrides && overrides[wilaya]) {
    return overrides[wilaya];
  }

  const match = wilaya.split(" - ")[1] || wilaya;
  switch (match.trim()) {
    case "الطارف": return { stop: 520, dom: 800 };
    case "تيسمسيلت": return { stop: 450, dom: 800 };
    case "الوادي": return { stop: 670, dom: 950 };
    case "خنشلة": return { stop: 520, dom: 800 };
    case "سوق أهراس": return { stop: 520, dom: 750 };
    case "تيبازة": return { stop: 520, dom: 750, note: "مكتب التوصيل: القليعة، تيبازة مدينة" };
    case "ميلة": return { stop: 520, dom: 700 };
    case "عين الدفلى": return { stop: 520, dom: 750 };
    case "النعامة": return { stop: 670, dom: 1100 };
    case "عين تموشنت": return { stop: 520, dom: 800 };
    case "غرداية": return { stop: 620, dom: 950 };
    case "غليزان": return { stop: 520, dom: 800 };
    case "تيميمون": return { stop: 970, dom: 1100 };
    case "أولاد جلال": return { stop: 520, dom: 900 };
    case "بني عباس": return { stop: 970, dom: 1400 };
    case "عين صالح": return { stop: 1120, dom: 1600 };
    case "عين قزام": return { stop: null, dom: 1600 };
    case "touggourt": 
    case "تقرت": return { stop: 670, dom: 950 };
    case "المغير": return { stop: 620, dom: 950 };
    case "المنيعة": return { stop: 670, dom: 1000 };
    case "تمنراست": return { stop: 1120, dom: 1600 };
    case "تبسة": return { stop: 520, dom: 850 };
    case "تلمسان": return { stop: 570, dom: 900 };
    case "تيارت": return { stop: 520, dom: 800 };
    case "تيزي وزو": return { stop: 520, dom: 750 };
    case "الجزائر": return { stop: 470, dom: 600, note: "مكاتب: بئر خادم، رغاية، قبة، براقي، بئر توتة، أولاد فايت، الجمهورية، ليدو" };
    case "الجلفة": return { stop: 520, dom: 950 };
    case "جيجل": return { stop: 520, dom: 750, note: "مكاتب: الطاهير، جيجل وسط" };
    case "سطيف": return { stop: 370, dom: 500, note: "مكاتب: العلمة، سطيف وسط" };
    case "سعيدة": return { stop: 520, dom: 800 };
    case "سكيكدة": return { stop: 520, dom: 750 };
    case "سيدي بلعباس": return { stop: 520, dom: 800 };
    case "عنابة": return { stop: 520, dom: 800, note: "مكاتب: عنابة وسط، البوني" };
    case "قالمة": return { stop: 520, dom: 800 };
    case "قسنطينة": return { stop: 520, dom: 750, note: "مكاتب: زواغي، بيل في، قسنطينة وسط" };
    case "المدية": return { stop: 520, dom: 800 };
    case "مستغانم": return { stop: 520, dom: 800 };
    case "المسيلة": return { stop: 570, dom: 850, note: "مكاتب: بوسعادة، المسيلة وسط" };
    case "معسكر": return { stop: 520, dom: 800 };
    default: return { stop: 500, dom: 800 }; // Default fallback
  }
};

export function OrderForm() {
  const { settings } = useSettings();
  const [submitted, setSubmitted] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [deliveryType, setDeliveryType] = useState<"dom" | "desk">("dom");
  const [checkoutFired, setCheckoutFired] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Convex mutations
  const convexCreateOrder = useMutation(api.orders.createOrder);
  const convexCreateLead = useMutation(api.orders.createNotEndedLead);

  // Time-gate: track when user first interacted with the form
  const formFocusedAt = useRef<number | null>(null);
  // Track if we already sent this phone to the "not-ended" sheet
  const notEndedSentRef = useRef(false);

  const unit = settings.unitPrice;
  const oldUnit = settings.oldUnitPrice;
  const deliveryPrice = getDeliveryPrice(selectedWilaya, settings.deliveryPrices || {});
  const deliveryCost = selectedWilaya ? (deliveryType === "desk" ? (deliveryPrice?.stop || 0) : (deliveryPrice?.dom || 0)) : 0;
  const totalAmount = (unit * qty) + deliveryCost;

  // ── "Not Ended" capture: fires instantly when valid 10 digits are typed ────
  const triggerLeadCapture = useCallback(
    async (phoneVal: string) => {
      const phone = phoneVal.replace(/\s/g, "");
      if (!phone || notEndedSentRef.current) return;
      if (phone.length !== 10) return; // wait until they finish typing 10 digits
      if (!PHONE_RE.test(phone) || isFakePhone(phone)) return;

      notEndedSentRef.current = true;
      const nameEl = formRef.current?.querySelector<HTMLInputElement>('[name="name"]');
      const name = nameEl?.value?.trim() || "—";

      if (settings.googleSheetNotEndedUrl) {
        sendToSheet(settings.googleSheetNotEndedUrl, {
          التاريخ: new Date().toLocaleString("ar-DZ"),
          الاسم: name,
          الهاتف: phone,
          الحالة: "لم يُكمل الطلب",
        }).catch(console.error);
      }
      // Save lead to Convex
      convexCreateLead({ name, phone }).catch(console.error);
    },
    [settings.googleSheetNotEndedUrl, convexCreateLead]
  );

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // ① Honeypot
    const honeypot = form.get("website") as string;
    if (honeypot) { setSubmitted(true); return; }

    const name    = (form.get("name")    as string).trim();
    const phone   = (form.get("phone")   as string).replace(/\s/g, "");
    const wilaya  =  form.get("wilaya")  as string;
    const address = (form.get("address") as string).trim();

    // ② Required fields
    if (!name || !phone || !wilaya) {
      toast.error("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    // ③ Validate name
    const nameError = validateName(name);
    if (nameError) {
      setFieldErrors((p) => ({ ...p, name: nameError }));
      toast.error(nameError);
      return;
    }

    // ④ Validate phone
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setFieldErrors((p) => ({ ...p, phone: phoneError }));
      toast.error(phoneError);
      return;
    }

    // ⑤ Duplicate
    if (wasAlreadySent(phone)) {
      toast.error("لقد أرسلت طلباً بهذا الرقم مسبقاً. تواصل معنا إذا أردت تعديله.");
      return;
    }

    // ⑥ Time-gate
    const elapsed = formFocusedAt.current ? Date.now() - formFocusedAt.current : 99999;
    if (elapsed < 4000) { setSubmitted(true); return; }

    // ── ✅ Validation passed — show success INSTANTLY (no network wait) ───────
    setFieldErrors({});
    markAsSent(phone);
    setSubmitted(true);
    toast.success("تم استلام طلبك بنجاح، سنتصل بك قريباً ✅");

    // Pixel events — in-memory, instant
    fbEvent("Purchase", { value: unit * qty, currency: "DZD", content_name: "Rova Oil" });
    ttEvent("CompletePayment", { value: unit * qty, currency: "DZD" });

    // ── Fire network sends IN THE BACKGROUND — customer never waits ───────────
    const formattedAddress = address ? `${address} (${deliveryType === "desk" ? "توصيل للمكتب" : "توصيل للمنزل"})` : (deliveryType === "desk" ? "توصيل للمكتب" : "توصيل للمنزل");
    const sheetData = {
      name, phone, wilaya,
      address: formattedAddress,
      qty:   String(qty),
      total: `${totalAmount.toLocaleString()} دج`,
    };

    sendToSheet(settings.googleSheetUrl, sheetData).catch(console.error);

    convexCreateOrder({
      name, phone, wilaya,
      address: formattedAddress,
      qty,
      total: totalAmount,
    }).catch(console.error);
  };

  const clearError = (field: string) =>
    setFieldErrors((p) => { const n = { ...p }; delete n[field]; return n; });

  return (
    <section id="order-form" className="bg-accent/40 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div
          className="rounded-3xl border bg-card p-5 sm:p-8"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="mb-5 flex flex-col items-center gap-3 text-center">
            <span
              className="rounded-full px-4 py-1.5 text-xs font-extrabold text-primary-foreground"
              style={{ background: "var(--gradient-cta)" }}
            >
              ⚡ عرض محدود
            </span>
            <Countdown />
          </div>

          <h2 className="mb-1 text-center text-2xl font-extrabold sm:text-3xl">
            Rova - زيت بديل الليزر
          </h2>
          <p className="mb-5 text-center text-sm text-muted-foreground">30مل</p>

          <div className="mb-6 flex items-center justify-center gap-3 rounded-2xl bg-primary/5 py-4 flex-wrap">
            <span
              className="text-3xl font-black sm:text-4xl"
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {totalAmount.toLocaleString()} دج
            </span>
            <span className="text-lg text-muted-foreground line-through">{((oldUnit * qty) + deliveryCost).toLocaleString()} دج</span>
            <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-bold text-destructive">
              -{Math.round((1 - unit / oldUnit) * 100)}%
            </span>
            {selectedWilaya && (
              <span className="w-full text-center text-[11px] font-bold text-primary mt-1">المبلغ يشمل سعر التوصيل 🚚</span>
            )}
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-primary/10 p-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">شكرا لطلبك!</h3>
              <p className="text-sm text-muted-foreground">
                سيتواصل معك فريقنا خلال 24 ساعة لتأكيد الطلب.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
              onFocus={() => {
                // Record first interaction time for time-gate
                if (!formFocusedAt.current) formFocusedAt.current = Date.now();
                // Pixel event
                if (!checkoutFired) {
                  setCheckoutFired(true);
                  fbEvent("InitiateCheckout", { content_name: "Rova Oil" });
                  ttEvent("InitiateCheckout", { content_name: "Rova Oil" });
                }
              }}
            >
              {/* ── Honeypot (hidden from real users, bots fill it) ── */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <h3 className="text-center text-lg font-bold">
                للطلب، الرجاء إدخال التفاصيل
              </h3>

              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name">الاسم الكامل <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="الاسم واللقب (مثال: فاطمة الزهراء)"
                  required
                  onChange={() => clearError("name")}
                  className={fieldErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {fieldErrors.name && (
                  <p className="flex items-center gap-1 text-xs text-destructive font-medium">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />{fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">رقم الهاتف <span className="text-destructive">*</span></Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="05xxxxxxxx / 06xxxxxxxx / 07xxxxxxxx"
                  required
                  maxLength={10}
                  onBlur={(e) => triggerLeadCapture(e.target.value)}
                  onChange={(e) => {
                    clearError("phone");
                    triggerLeadCapture(e.target.value);
                  }}
                  className={fieldErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {fieldErrors.phone && (
                  <p className="flex items-center gap-1 text-xs text-destructive font-medium">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />{fieldErrors.phone}
                  </p>
                )}
                <p className="text-[11px] text-muted-foreground">يجب أن يبدأ بـ 05 أو 06 أو 07 ويحتوي 10 أرقام</p>
              </div>

              <div className="space-y-1.5 mt-2">
                <Label htmlFor="wilaya">الولاية <span className="text-destructive">*</span></Label>
                <Select name="wilaya" required value={selectedWilaya} onValueChange={(v) => { 
                  setSelectedWilaya(v); 
                  clearError("wilaya"); 
                  const dp = getDeliveryPrice(v, settings.deliveryPrices || {});
                  if (!dp?.stop) setDeliveryType("dom");
                }}>
                  <SelectTrigger id="wilaya">
                    <SelectValue placeholder="اختر الولاية" />
                  </SelectTrigger>
                  <SelectContent>
                    {WILAYAS.map((w) => (
                      <SelectItem key={w} value={w}>{w}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedWilaya && deliveryPrice && (
                  <div className="mt-3 space-y-2">
                    <Label className="text-xs text-muted-foreground">نوع التوصيل</Label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType("dom")}
                        className={`flex-1 rounded-xl border p-3 flex flex-col items-center justify-center text-center text-sm font-bold transition-all ${deliveryType === "dom" ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card hover:bg-muted/50"}`}
                      >
                        حتى باب المنزل
                        <span className={`block text-xs font-semibold mt-0.5 ${deliveryType === "dom" ? "text-primary-foreground/90" : "text-primary"}`}>{deliveryPrice.dom} دج</span>
                      </button>
                      <button
                        type="button"
                        disabled={!deliveryPrice.stop}
                        onClick={() => setDeliveryType("desk")}
                        className={`flex-1 rounded-xl border p-3 flex flex-col items-center justify-center text-center text-sm font-bold transition-all ${deliveryType === "desk" ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card hover:bg-muted/50"} disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        نقطة استلام (Stopdesk)
                        {deliveryPrice.stop ? (
                          <span className={`block text-xs font-semibold mt-0.5 ${deliveryType === "desk" ? "text-primary-foreground/90" : "text-primary"}`}>{deliveryPrice.stop} دج</span>
                        ) : (
                          <span className="block text-xs font-semibold mt-0.5 text-muted-foreground">غير متاح</span>
                        )}
                      </button>
                    </div>
                    {deliveryType === "desk" && deliveryPrice.note && (
                      <div className="text-[11.5px] text-primary/90 font-medium px-1 mt-1 text-center bg-primary/5 rounded-lg py-1.5">
                        {deliveryPrice.note}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <Label htmlFor="address">البلدية / العنوان</Label>
                <Input id="address" name="address" placeholder="البلدية والعنوان الكامل" />
              </div>

              {/* Qty */}
              <div className="space-y-1.5">
                <Label htmlFor="qty">الكمية</Label>
                <Select value={String(qty)} onValueChange={(v) => setQty(Number(v))}>
                  <SelectTrigger id="qty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Accordion type="single" collapsible className="rounded-md border bg-background mt-4">
                <AccordionItem value="shipping" className="border-b">
                  <AccordionTrigger className="px-4">التوصيل</AccordionTrigger>
                  <AccordionContent className="px-4 text-sm text-muted-foreground leading-relaxed">
                    التوصيل متوفر إلى جميع ولايات الجزائر الـ 58. يحدد السعر بدقة حسب اختيارك (للمنزل أو نقطة الاستلام - تو سطوب ديسك). تظهر تسعيرة التوصيل بمجرد اختيار ولايتك.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="instructions" className="border-0">
                  <AccordionTrigger className="px-4">تعليمات</AccordionTrigger>
                  <AccordionContent className="px-4 text-sm text-muted-foreground">
                    تأكد من صحة المعلومات قبل تأكيد الطلب. سيتم الاتصال بك قبل إرسال الطلبية
                    لتأكيد العنوان والكمية.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Order Summary Receipt */}
              {selectedWilaya && deliveryPrice && (
                <div className="rounded-2xl border bg-card p-4 shadow-sm space-y-3 mt-4">
                  <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5 mb-1">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                    تفاصيل الفاتورة
                  </h4>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>ثمن المنتج ({qty}x)</span>
                    <span className="font-semibold text-foreground">{(unit * qty).toLocaleString()} دج</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>سعر التوصيل ({deliveryType === "desk" ? "مكتب" : "منزل"})</span>
                    <span className="font-semibold text-foreground">+{deliveryCost.toLocaleString()} دج</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between items-center">
                    <span className="font-extrabold text-foreground">المبلغ الإجمالي</span>
                    <span className="text-xl font-black text-primary">{totalAmount.toLocaleString()} دج</span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="h-16 mt-2 w-full rounded-full text-[17px] font-black text-primary-foreground transition-all hover:scale-[1.01]"
                style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-elegant)" }}
              >
                <ShoppingCart className="ml-2 h-5 w-5" />
                تأكيد الطلب - الدفع عند الاستلام
              </Button>
            </form>
          )}
        </div>

        {/* Warning image below form */}
        <div className="mx-auto mt-5 max-w-2xl px-4">
          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/WARNING.webp"
                alt="تحذير هام"
                loading="lazy"
                className="w-full cursor-pointer rounded-2xl border shadow-sm transition-transform hover:scale-[1.01] object-contain"
              />
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-1 bg-transparent border-none shadow-none [&>button]:text-white">
              <img src="/WARNING.webp" alt="تحذير" className="w-full rounded-xl" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
