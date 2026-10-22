import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, Ruler, ArrowUpRight } from "lucide-react";
import { DELIVERED, ONGOING, type Project, waLink } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

type TabKey = "ongoing" | "delivered";

const TABS: { key: TabKey; label: string; bn: string; count: number }[] = [
  { key: "ongoing", label: "Ongoing projects", bn: "চলমান প্রজেক্ট", count: ONGOING.length },
  { key: "delivered", label: "Delivered projects", bn: "সম্পন্ন প্রজেক্ট", count: DELIVERED.length },
];

export default function Projects() {
  const [tab, setTab] = useState<TabKey>("ongoing");
  const [open, setOpen] = useState(true);
  const list = useMemo<Project[]>(() => (tab === "ongoing" ? ONGOING : DELIVERED), [tab]);

  return (
    <section id="projects" className="relative border-t border-paper/10 bg-ink2/40 py-24 sm:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label text-[0.55rem] text-brass">Projects · 04</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-tight">
              Built, being built, <span className="italic gold-text">believed in.</span>
            </h2>
          </div>

          {/* drop-down box */}
          <div className="relative w-full max-w-md">
            <span className="label mb-2 block text-[0.5rem] text-paper/45">Project list</span>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-paper/15 bg-paper/[0.03] px-5 py-4 text-left transition hover:border-brass/40"
            >
              <span>
                <span className="block font-display text-xl">{TABS.find((t) => t.key === tab)?.label}</span>
                <span className="bn block text-[0.78rem] text-paper/45">{TABS.find((t) => t.key === tab)?.bn}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="rounded-full border border-brass/40 px-3 py-1 font-mono text-[0.6rem] text-brasslite">
                  {TABS.find((t) => t.key === tab)?.count}
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.35 }} className="text-brass">
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="relative z-20 mt-2 overflow-hidden rounded-2xl border border-paper/15 bg-ink/95 backdrop-blur-xl"
                >
                  {TABS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => {
                        setTab(t.key);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between border-b border-paper/8 px-5 py-4 text-left transition last:border-0 ${
                        tab === t.key ? "bg-brass/12 text-brasslite" : "hover:bg-paper/5"
                      }`}
                    >
                      <span>
                        <span className="block text-[0.95rem]">{t.label}</span>
                        <span className="bn block text-[0.75rem] text-paper/45">{t.bn}</span>
                      </span>
                      <span className="font-mono text-[0.6rem] tracking-[0.2em] text-paper/40">{t.count} ITEMS</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.7, ease }}
                className="group relative overflow-hidden rounded-2xl border border-paper/12 bg-ink"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[0.35] transition duration-[1200ms] group-hover:scale-[1.07] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-paper/25 bg-ink/70 px-3 py-1 font-mono text-[0.58rem] tracking-[0.18em] text-paper/75 backdrop-blur">
                    {tab === "ongoing" ? "ON SITE" : "DELIVERED"}
                  </span>
                  <span className="absolute right-4 top-4 font-mono text-[0.6rem] text-brasslite">{p.year}</span>
                  {tab === "ongoing" && typeof p.progress === "number" && (
                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                      <div className="mb-1.5 flex justify-between font-mono text-[0.55rem] tracking-[0.2em] text-paper/70">
                        <span>PROGRESS</span>
                        <span>{p.progress}%</span>
                      </div>
                      <div className="h-[3px] w-full bg-paper/15">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.2, ease }}
                          className="h-full bg-gradient-to-r from-brass to-brasslite"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-display text-2xl leading-tight">{p.name}</h3>
                  {p.nameBn && <p className="bn mt-1 text-[0.8rem] text-paper/45">{p.nameBn}</p>}
                  <p className="mt-3 flex items-center gap-2 text-[0.8rem] text-paper/55">
                    <MapPin className="h-3.5 w-3.5 text-brass" /> {p.location}
                  </p>
                  <p className="mt-1.5 flex items-center gap-2 text-[0.8rem] text-paper/55">
                    <Ruler className="h-3.5 w-3.5 text-brass" /> {p.area} · {p.type}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-paper/12 px-3 py-1 text-[0.65rem] text-paper/55">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={waLink(`Hello Heaven Studio, please share details of the project "${p.name}".`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.16em] text-brasslite transition hover:gap-3"
                  >
                    ASK ABOUT THIS PROJECT <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}

            {/* CTA tile */}
            <motion.a
              href={waLink("Hello Heaven Studio, I want to start a new project.")}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: list.length * 0.06, duration: 0.7, ease }}
              className="group flex min-h-[240px] flex-col justify-between rounded-2xl border border-dashed border-brass/40 bg-brass/[0.05] p-7 transition hover:bg-brass/10"
            >
              <span className="label text-[0.5rem] text-brass">Your project here</span>
              <span>
                <span className="block font-display text-3xl leading-tight">Let's draw yours next</span>
                <span className="bn mt-2 block text-sm text-paper/60">প্লটের মাপ পাঠান — ফ্রি কনসালটেশন নিন।</span>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.16em] text-brasslite">
                  START ON WHATSAPP <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
