import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { NAV } from "@/data/site";
import { LogoLockup } from "./Logo";

export default function Navbar({ onTryNow }: { onTryNow: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const mid = window.scrollY + window.innerHeight * 0.32;
      let cur = "home";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= mid) cur = n.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[200] transition-all duration-500 ${
          scrolled ? "border-b border-paper/10 bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-7">
          <button onClick={() => go("home")} className="shrink-0 transition hover:opacity-80" aria-label="Heaven Studio home">
            <LogoLockup size={34} />
          </button>

          {/* desktop tabs */}
          <nav className="hidden items-center gap-1 rounded-full border border-paper/10 bg-paper/[0.03] p-1.5 xl:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="relative rounded-full px-4 py-2 text-[0.8rem] tracking-wide transition-colors"
              >
                {active === n.id && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full border border-brass/40 bg-brass/12"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${active === n.id ? "text-brasslite" : "text-paper/70 hover:text-paper"}`}>
                  {n.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onTryNow}
              className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] bg-[length:220%_auto] px-6 py-3 text-[0.78rem] font-semibold tracking-[0.18em] text-ink shadow-[0_8px_28px_-8px_rgba(201,160,90,0.7)] transition-[background-position] duration-700 hover:bg-right sm:block"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" /> TRY NOW
              </span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-paper xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <motion.div className="h-[2px] origin-left bg-gradient-to-r from-brass/20 via-brasslite to-brass" style={{ scaleX: bar }} />
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[300] bg-ink/97 backdrop-blur-xl xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-[74px] items-center justify-between px-4 sm:px-7">
              <LogoLockup size={32} />
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid-lines absolute inset-0 -z-10 opacity-40" />
            <nav className="mt-6 flex flex-col px-6">
              {NAV.map((n, i) => (
                <motion.button
                  key={n.id}
                  onClick={() => go(n.id)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.08 }}
                  className="group flex items-center justify-between border-b border-paper/10 py-5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.65rem] text-brass/70">{n.num}</span>
                    <span className="font-display text-3xl font-light text-paper group-hover:text-brasslite">{n.label}</span>
                  </span>
                  <span className="text-brass/50">↗</span>
                </motion.button>
              ))}
            </nav>
            <div className="px-6 pt-8">
              <button
                onClick={() => {
                  setOpen(false);
                  onTryNow();
                }}
                className="w-full rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] py-4 text-sm font-semibold tracking-[0.2em] text-ink"
              >
                TRY NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
