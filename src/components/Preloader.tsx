import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedLogoMark } from "./Logo";
import { STUDIO } from "@/data/site";

const LINES = ["ARCHITECTURE", "STRUCTURE", "INTERIOR", "ENGINEERING", "VISUALIZATION"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const total = 3050;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      // ease-out so it feels like a real asset loader
      setPct(Math.round((1 - Math.pow(1 - p, 2.1)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        setTimeout(onDone, 1150);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden bg-ink" onClick={() => !leaving && setLeaving(true)}>
      {/* blueprint backdrop */}
      <div className="absolute inset-0 grid-lines opacity-[0.55]" />
      <motion.div
        className="absolute inset-0 noise opacity-[0.06] mix-blend-overlay"
        animate={{ opacity: [0.03, 0.09, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* sweeping gold beam */}
      <motion.div
        className="absolute -top-1/2 left-1/2 h-[200%] w-[45vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(201,160,90,0.10),transparent)]"
        animate={{ rotate: [-18, 18, -18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* corner ticks */}
      {[
        "left-6 top-6 border-l border-t",
        "right-6 top-6 border-r border-t",
        "left-6 bottom-6 border-l border-b",
        "right-6 bottom-6 border-r border-b",
      ].map((c, i) => (
        <motion.span
          key={c}
          className={`absolute h-10 w-10 border-brass/40 ${c}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
        />
      ))}

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        {/* rotating dashed orbit */}
        <motion.div
          className="absolute h-[22rem] w-[22rem] rounded-full border border-dashed border-brass/15 sm:h-[26rem] sm:w-[26rem]"
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-[15rem] w-[15rem] rounded-full border border-brass/10 sm:h-[18rem] sm:w-[18rem]"
          animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        />

        <AnimatedLogoMark className="relative h-36 w-36 sm:h-44 sm:w-44" />

        <motion.div
          className="relative mt-8 text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-4xl font-light tracking-[0.28em] sm:text-6xl">
            <span className="gold-text">HEAVEN</span>
          </h1>
          <p className="label mt-3 text-[0.6rem] tracking-[0.75em] text-paper/60">S T U D I O</p>
          <p className="bn mt-4 text-sm text-paper/45">
            {STUDIO.nameBn} · {STUDIO.city}
          </p>
        </motion.div>

        {/* progress */}
        <motion.span
          className="label absolute bottom-7 right-7 text-[0.5rem] text-paper/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          TAP TO SKIP
        </motion.span>

        <motion.div
          className="relative mt-10 w-[min(30rem,80vw)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-end justify-between">
            <span className="label text-[0.6rem] text-paper/40">Drafting experience</span>
            <span className="font-mono text-2xl text-brass">{String(pct).padStart(3, "0")}%</span>
          </div>
          <div className="mt-3 h-[2px] w-full overflow-hidden bg-paper/10">
            <div
              className="h-full bg-gradient-to-r from-brass/40 via-brasslite to-brass shadow-[0_0_14px_rgba(201,160,90,0.8)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1">
            {LINES.map((l, i) => (
              <motion.span
                key={l}
                className="font-mono text-[0.55rem] tracking-[0.3em]"
                animate={{ color: pct > (i + 1) * (100 / (LINES.length + 1)) ? "rgba(244,240,232,0.75)" : "rgba(244,240,232,0.2)" }}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* curtain exit */}
      <div className="pointer-events-none absolute inset-0 flex">
        <motion.div
          className="h-full w-1/2 border-r border-brass/10 bg-ink"
          animate={leaving ? { y: "-101%" } : { y: 0 }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="h-full w-1/2 bg-ink"
          animate={leaving ? { y: "101%" } : { y: 0 }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
      <AnimatePresence>
        {leaving && (
          <motion.div
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,160,90,0.35), transparent 65%)" }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 12, opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
