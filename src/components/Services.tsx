import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, MessageCircle } from "lucide-react";
import { SERVICES, waLink } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const [pick, setPick] = useState("");

  const requestService = (title: string) =>
    window.open(waLink(`Hello Heaven Studio, I need *${title}* service. Please share the process & cost.`), "_blank");

  return (
    <section id="services" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label text-[0.55rem] text-brass">Services · 03</span>
            <h2 className="bn mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-tight">
              🏗️ আমাদের সেবাসমূহ
            </h2>
            <p className="mt-3 max-w-xl text-sm text-paper/55">
              Eleven design &amp; engineering services, one accountable team. Tap a button to open the drop-down and see
              exactly what you receive.
            </p>
          </div>

          {/* dropdown selector */}
          <div className="relative w-full max-w-sm">
            <span className="label mb-2 block text-[0.5rem] text-paper/45">Jump to a service</span>
            <div className="relative">
              <select
                value={pick}
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  setPick(e.target.value);
                  setOpen(idx);
                  setTimeout(() => document.getElementById(`svc-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
                }}
                className="input appearance-none pr-12"
              >
                <option value="">Select a service…</option>
                {SERVICES.map((s, i) => (
                  <option key={s.title} value={i} className="bg-ink2">
                    {s.emoji} {s.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brass" />
            </div>
          </div>
        </div>

        {/* accordion buttons */}
        <div className="mt-12 grid gap-3 lg:grid-cols-2">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={s.title}
                id={`svc-${i}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 2) * 0.05, duration: 0.7, ease }}
                className={`group overflow-hidden rounded-2xl border transition-colors duration-500 ${
                  isOpen ? "border-brass/45 bg-brass/[0.06]" : "border-paper/12 bg-paper/[0.02] hover:border-paper/25"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-2xl leading-none transition-transform duration-500 group-hover:scale-110">{s.emoji}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-xl sm:text-[1.35rem]">{s.title}</span>
                    <span className="bn block truncate text-[0.8rem] text-paper/45">{s.titleBn}</span>
                  </span>
                  <span className="hidden font-mono text-[0.6rem] tracking-[0.2em] text-brass/50 sm:block">{s.code}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35 }} className="text-brass">
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-brass/20 px-5 py-5 sm:px-6">
                        <p className="text-sm leading-relaxed text-paper/70">{s.desc}</p>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {s.points.map((p) => (
                            <li key={p} className="flex items-start gap-2 text-[0.82rem] text-paper/60">
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" /> {p}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => requestService(s.title)}
                            className="flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.14em] text-ink transition hover:bg-brasslite"
                          >
                            <MessageCircle className="h-3.5 w-3.5" /> REQUEST THIS SERVICE
                          </button>
                          <span className="font-mono text-[0.62rem] tracking-[0.16em] text-paper/35">DELIVERY 5–15 DAYS</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
