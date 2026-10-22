import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Check, Loader2, MessageCircle, Ruler, X } from "lucide-react";
import { SERVICES, STUDIO, waLink } from "@/data/site";
import { LogoMark } from "./Logo";

const BUDGETS = ["Under 5 lakh", "5 – 15 lakh", "15 – 40 lakh", "40 lakh +"];
const TYPES = ["Residential house", "Duplex / Villa", "Apartment block", "Commercial / Office", "Interior only", "3D only"];

export default function TryNowModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: TYPES[0],
    service: SERVICES[0].title,
    plot: "",
    budget: BUDGETS[1],
    notes: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    setBusy(true);
    const msg =
      `*New project enquiry — Heaven Studio*\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nProject type: ${form.type}\n` +
      `Service needed: ${form.service}\nPlot / area: ${form.plot}\nBudget: ${form.budget}\n` +
      (form.notes ? `Notes: ${form.notes}\n` : "") +
      `\nPlease share a design consultation & quotation.`;
    setTimeout(() => {
      setBusy(false);
      setStep(1);
      window.open(waLink(msg), "_blank");
    }, 900);
  };

  const reset = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setBusy(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={reset} />
          <motion.div
            initial={{ y: 60, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-brass/25 bg-ink2 sm:rounded-3xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-paper/10 bg-ink2/95 px-6 py-4 backdrop-blur">
              <span className="flex items-center gap-3">
                <span className="text-brass">
                  <LogoMark className="h-8 w-8" />
                </span>
                <span>
                  <span className="block font-display text-xl">Start your project</span>
                  <span className="label text-[0.55rem] text-paper/50">Free design consultation</span>
                </span>
              </span>
              <button onClick={reset} className="rounded-full border border-paper/15 p-2 text-paper/70 hover:text-paper" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            {step === 0 ? (
              <div className="space-y-4 px-6 py-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name">
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Rafiq Hasan"
                      className="input"
                    />
                  </Field>
                  <Field label="WhatsApp number">
                    <input
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="input"
                    />
                  </Field>
                </div>
                <Field label="Project type">
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map((t) => (
                      <Chip key={t} on={form.type === t} onClick={() => set("type", t)}>
                        {t}
                      </Chip>
                    ))}
                  </div>
                </Field>
                <Field label="Service needed">
                  <select value={form.service} onChange={(e) => set("service", e.target.value)} className="input">
                    {SERVICES.map((s) => (
                      <option key={s.title} value={s.title} className="bg-ink2">
                        {s.emoji} {s.title}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Plot size / area">
                    <div className="relative">
                      <Ruler className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brass/60" />
                      <input value={form.plot} onChange={(e) => set("plot", e.target.value)} placeholder="e.g. 3 katha, 40×60 ft" className="input pr-10" />
                    </div>
                  </Field>
                  <Field label="Approx. budget">
                    <select value={form.budget} onChange={(e) => set("budget", e.target.value)} className="input">
                      {BUDGETS.map((b) => (
                        <option key={b} value={b} className="bg-ink2">
                          ৳ {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Anything else?">
                  <textarea
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={3}
                    placeholder="Facing, floor count, dream style, deadline…"
                    className="input resize-none"
                  />
                </Field>

                <button
                  onClick={submit}
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] py-4 text-sm font-semibold tracking-[0.16em] text-ink disabled:opacity-70"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                  {busy ? "Preparing…" : "SEND ON WHATSAPP"}
                </button>
                <p className="text-center text-[0.7rem] text-paper/40">
                  Your brief opens in WhatsApp to <span className="text-brass">{STUDIO.whatsappLocal}</span> — our architects reply within working hours.
                </p>
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-live/15 text-live"
                >
                  <Check className="h-8 w-8" />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl">Brief received</h3>
                <p className="bn mt-2 text-paper/60">ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করব।</p>
                <p className="mx-auto mt-4 max-w-sm text-sm text-paper/50">
                  If WhatsApp did not open, call or message us directly at{" "}
                  <a href={waLink()} className="text-brass underline decoration-brass/40" target="_blank" rel="noreferrer">
                    {STUDIO.whatsappLocal}
                  </a>
                  .
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-brass/40 px-6 py-3 text-xs tracking-[0.16em] text-brasslite hover:bg-brass/10"
                  >
                    OPEN WHATSAPP
                  </a>
                  <button onClick={reset} className="rounded-full border border-paper/15 px-6 py-3 text-xs tracking-[0.16em] text-paper/70">
                    CLOSE
                  </button>
                </div>
                <Building2 className="mx-auto mt-8 h-5 w-5 text-brass/40" />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label mb-2 block text-[0.55rem] text-paper/45">{label}</span>
      {children}
    </label>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-xs transition ${
        on ? "border-brass bg-brass/15 text-brasslite" : "border-paper/15 text-paper/60 hover:border-paper/35"
      }`}
    >
      {children}
    </button>
  );
}
