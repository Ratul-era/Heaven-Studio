import { motion } from "framer-motion";

type MarkProps = {
  className?: string;
  strokeWidth?: number;
};

/** Heaven Studio architectural mark: gothic gate arch + H monogram + spark. */
export function LogoMark({ className = "h-10 w-10", strokeWidth = 5 }: MarkProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter">
        <path d="M20 86V44L50 13L80 44V86" />
        <path d="M33 86V50L50 31L67 50V86" opacity="0.55" />
        <path d="M8 90h84" />
        <path d="M38 66h24" />
      </g>
      <path d="M50 2.5l4.2 4.5-4.2 4.5-4.2-4.5z" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-[1.32em] font-medium tracking-[0.06em]">HEAVEN</span>
      <span className="label mt-[0.35em] text-[0.5em] tracking-[0.62em] text-brass">STUDIO</span>
    </span>
  );
}

export function LogoLockup({ size = 38 }: { size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <span className="text-brass">
        <LogoMark className="drop-shadow-[0_0_12px_rgba(201,160,90,0.35)]" strokeWidth={6} />
      </span>
      <span style={{ fontSize: size / 3.2 }} className="text-paper">
        <Wordmark />
      </span>
    </span>
  );
}

/** Animated variant used by the preloader — draws the mark stroke by stroke. */
export function AnimatedLogoMark({ className = "h-40 w-40" }: { className?: string }) {
  const strokes = [
    { d: "M20 86V44L50 13L80 44V86", dur: 1.5, delay: 0.1 },
    { d: "M33 86V50L50 31L67 50V86", dur: 1.2, delay: 0.85 },
    { d: "M8 90h84", dur: 0.7, delay: 1.75 },
    { d: "M38 66h24", dur: 0.5, delay: 2.05 },
  ];
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hsGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a6a33" />
          <stop offset="45%" stopColor="#e8cc92" />
          <stop offset="100%" stopColor="#c9a05a" />
        </linearGradient>
        <filter id="hsGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="url(#hsGold)" strokeWidth={4.6} strokeLinecap="square" filter="url(#hsGlow)">
        {strokes.map((s, i) => (
          <motion.path
            key={i}
            d={s.d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: s.dur, delay: s.delay, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3, delay: s.delay } }}
          />
        ))}
      </g>
      <motion.path
        d="M50 2.5l4.2 4.5-4.2 4.5-4.2-4.5z"
        fill="url(#hsGold)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.45, duration: 0.6, ease: "backOut" }}
        style={{ transformOrigin: "50px 7px" }}
      />
    </svg>
  );
}
