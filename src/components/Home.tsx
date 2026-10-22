import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, MousePointer2, Play } from "lucide-react";
import sketch from "@/assets/sketch.jpg";
import render from "@/assets/render.jpg";
import { PROCESS, STATS, waLink } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Home({ onTryNow }: { onTryNow: () => void }) {
  return (
    <>
      <Hero onTryNow={onTryNow} />
      <Transformation />
      <Process />
    </>
  );
}

/* ------------------------------------------------------------------- hero */

function Hero({ onTryNow }: { onTryNow: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-[74px]">
      <div className="absolute inset-0 grid-lines opacity-70" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 78% 12%, rgba(201,160,90,0.16), transparent 55%), radial-gradient(90% 70% at 8% 90%, rgba(127,178,255,0.10), transparent 60%)" }}
      />
      <motion.div className="pointer-events-none absolute inset-0 noise opacity-[0.05] mix-blend-overlay" style={{ y }} />

      <motion.div style={{ y, opacity: fade }} className="relative mx-auto grid max-w-[1500px] gap-10 px-5 pb-16 pt-10 sm:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease }}
            className="flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-live animate-pulse-ring" />
              <span className="relative h-2 w-2 rounded-full bg-live" />
            </span>
            <span className="label text-[0.58rem] text-paper/55">Studio open · Dhaka, Bangladesh</span>
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.7rem,7.4vw,5.6rem)] font-light leading-[0.95] tracking-tight">
            {["We sketch", "the heaven", "you live in."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={`block ${i === 1 ? "italic gold-text" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 1.05, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-paper/65"
          >
            Heaven Studio is a full-stack architecture &amp; engineering practice — from the first pencil line and RAJUK
            drawing to photoreal 3D, structural safety and on-site supervision. <span className="bn">আপনার স্বপ্নের বাড়ি, আমাদের নকশা।</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={onTryNow}
              className="group relative overflow-hidden rounded-full bg-paper px-7 py-4 text-xs font-semibold tracking-[0.2em] text-ink transition hover:bg-brasslite"
            >
              START YOUR PROJECT
              <ArrowUpRight className="ml-2 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#feed"
              className="group flex items-center gap-3 rounded-full border border-paper/20 px-6 py-4 text-xs tracking-[0.2em] text-paper/80 transition hover:border-brass/60 hover:text-brasslite"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brass/20 text-brass">
                <Play className="h-3 w-3 fill-current" />
              </span>
              WATCH LATEST DESIGN
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="px-2 text-xs tracking-[0.16em] text-paper/50 underline decoration-paper/20 underline-offset-8 hover:text-brasslite"
            >
              or WhatsApp {`01511 280698`}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 1 }}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-y-6 border-t border-paper/10 pt-7 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl text-brasslite">{s.value}</dt>
                <dd className="label mt-1 text-[0.52rem] text-paper/45">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* floating drafting card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateY: -12 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 1.3, ease }}
          style={{ perspective: 1200 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-paper/12 bg-ink2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <img src={render} alt="Heaven Studio 3D architectural render" className="h-full w-full object-cover transition duration-[1600ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <span>
                <span className="label block text-[0.5rem] text-brass">Project ID_1143</span>
                <span className="mt-1 block font-display text-xl">Classical Duplex Villa</span>
              </span>
              <span className="rounded-full border border-paper/20 bg-ink/60 px-3 py-1 font-mono text-[0.6rem] text-paper/70">3D · 2026</span>
            </div>
          </div>
          <motion.div
            className="absolute -bottom-8 -left-6 hidden w-48 rotate-[-6deg] rounded-lg border border-brass/25 bg-paper/95 p-2 shadow-2xl sm:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={sketch} alt="Pencil sketch study" className="w-full rounded" />
            <span className="mt-1 block text-center font-mono text-[0.55rem] tracking-[0.2em] text-ink/60">PENCIL STUDY</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative flex justify-center pb-8">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.3em] text-paper/40"
        >
          <MousePointer2 className="h-3 w-3" /> SCROLL — WATCH THE PENCIL BECOME A BUILDING
        </motion.span>
      </div>
    </section>
  );
}

/* ----------------------------------------------- sketch → render morph */

function Transformation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.0005 });

  const inset = useTransform(p, [0.1, 0.78], [100, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% 0% 0% 0%)`);
  const rotX = useTransform(p, [0, 0.5, 1], [16, 6, 0]);
  const scale = useTransform(p, [0, 1], [1.14, 1]);
  const gridOpacity = useTransform(p, [0, 0.45], [0.9, 0]);
  const sketchOpacity = useTransform(p, [0.55, 0.95], [1, 0.35]);
  const beamY = useTransform(inset, (v) => `${v}%`);

  const cap1 = useTransform(p, [0.02, 0.16, 0.34, 0.42], [1, 1, 1, 0]);
  const cap2 = useTransform(p, [0.38, 0.48, 0.62, 0.72], [0, 1, 1, 0]);
  const cap3 = useTransform(p, [0.7, 0.82], [0, 1]);
  const done = useTransform(p, [0.72, 0.9], [0, 1]);

  return (
    <section ref={ref} className="relative h-[300svh] bg-ink">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(80% 60% at 50% 40%, rgba(201,160,90,0.10), transparent 65%)" }}
        />
        <motion.div style={{ perspective: 1400 }} className="relative w-[min(1180px,92vw)]">
          {/* frame */}
          <motion.div
            style={{ rotateX: rotX, scale, transformStyle: "preserve-3d" }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-paper/15 bg-ink2 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)]"
          >
            {/* pencil drawing */}
            <motion.img
              src={sketch}
              alt="Pencil architectural drawing"
              style={{ opacity: sketchOpacity }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* blueprint grid overlay that dissolves */}
            <motion.div className="absolute inset-0 grid-lines opacity-70" style={{ opacity: gridOpacity }} />
            {/* final render revealed upward */}
            <motion.img
              src={render}
              alt="Photoreal 3D render of the same design"
              style={{ clipPath, scale: 1.02 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* reveal beam */}
            <motion.div
              style={{ top: beamY }}
              className="pointer-events-none absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-brasslite to-transparent shadow-[0_0_28px_6px_rgba(232,204,146,0.55)]"
            />
            {/* vignette + corner marks */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55))]" />
            {[
              "left-3 top-3 border-l border-t",
              "right-3 top-3 border-r border-t",
              "left-3 bottom-3 border-l border-b",
              "right-3 bottom-3 border-r border-b",
            ].map((c) => (
              <span key={c} className={`pointer-events-none absolute h-6 w-6 border-brass/70 ${c}`} />
            ))}

            {/* stage captions */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <motion.div style={{ opacity: cap1 }} className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
                <span className="label text-[0.55rem] text-brass">Stage 01</span>
                <p className="font-display text-2xl sm:text-4xl">Pencil study &amp; massing</p>
              </motion.div>
              <motion.div style={{ opacity: cap2 }} className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
                <span className="label text-[0.55rem] text-brass">Stage 02</span>
                <p className="font-display text-2xl sm:text-4xl">Material · light · landscape</p>
              </motion.div>
              <motion.div style={{ opacity: cap3 }} className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
                <span className="label text-[0.55rem] text-brass">Stage 03</span>
                <p className="font-display text-2xl sm:text-4xl">Photoreal 3D — approved &amp; buildable</p>
              </motion.div>
            </div>

            {/* dimension ticks on the right */}
            <motion.div style={{ opacity: done }} className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 sm:flex">
              <span className="h-16 w-px bg-brass/60" />
              <span className="font-mono text-[0.55rem] tracking-[0.3em] text-brass [writing-mode:vertical-rl]">4,850 SFT · G+1</span>
              <span className="h-16 w-px bg-brass/60" />
            </motion.div>
          </motion.div>

          {/* progress rail */}
          <div className="mt-6 flex items-center gap-4">
            <span className="label text-[0.5rem] text-paper/40">DRAWING</span>
            <div className="relative h-[3px] flex-1 bg-paper/10">
              <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-brass/50 to-brasslite" style={{ scaleX: p, transformOrigin: "left" }} />
            </div>
            <span className="label text-[0.5rem] text-brasslite">REALITY</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- process */

function Process() {
  return (
    <section className="relative border-y border-paper/10 bg-ink2/60 py-20">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="label text-[0.55rem] text-brass">How we work</span>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-light leading-tight sm:text-5xl">
              Four calm steps from <span className="italic text-brasslite">brief</span> to keys in hand.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-paper/55">
            Every stage is documented, drawn and costed — so nothing about your build is left to guesswork.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-paper/10 bg-paper/10 md:grid-cols-4">
          {PROCESS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease }}
              className="group relative bg-ink p-7 transition-colors hover:bg-smoke/60"
            >
              <span className="font-mono text-3xl text-brass/40 transition-colors group-hover:text-brass">{s.n}</span>
              <h3 className="mt-6 font-display text-2xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/55">{s.d}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-brass transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* marquee */}
        <div className="relative mt-16 overflow-hidden border-y border-paper/10 py-5">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {[0, 1].map((k) => (
              <div key={k} className="flex gap-10">
                {[
                  "🏛️ Architectural Design",
                  "📐 Structural Design",
                  "⚡ Electrical",
                  "🚰 Plumbing",
                  "🔥 Fire Safety",
                  "🖥️ 3D Animation",
                  "🛋️ Interior",
                  "🌳 Landscape",
                  "📋 RAJUK Approval",
                  "🧪 Soil Test",
                  "🏗️ Supervision",
                ].map((t) => (
                  <span key={t} className="font-display text-2xl text-paper/35 sm:text-3xl">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
