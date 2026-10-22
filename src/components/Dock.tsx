import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Check, Mail, MessageCircle, X, Phone, Send } from "lucide-react";
import { STUDIO, waLink } from "@/data/site";
import { Whatsapp } from "./BrandIcons";
import { LogoMark } from "./Logo";
import Assistant from "./Assistant";

const QUICK_MSGS = [
  "I need a house design (new project)",
  "Please share your fee structure",
  "I need RAJUK drawing & approval support",
  "I want 3D visualization / animation",
  "Interior design consultation",
];

export default function Dock() {
  const [panel, setPanel] = useState<null | "wa" | "mail">(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {/* bottom-left dock */}
      <div className="fixed bottom-5 left-5 z-[480] flex flex-col items-start gap-3">
        <AnimatePresence>
          {panel && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="w-[min(90vw,340px)] overflow-hidden rounded-2xl border border-brass/25 bg-ink2/97 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            >
              {/* header */}
              <div className="flex items-center gap-3 border-b border-paper/10 bg-gradient-to-r from-[#128C7E]/25 to-transparent px-4 py-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-brass">
                  <LogoMark className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block text-[0.9rem]">Heaven STUDIO</span>
                  <span className="bn block text-[0.68rem] text-paper/50">হেভেন স্টুডিও · অনলাইন</span>
                </span>
                <button onClick={() => setPanel(null)} className="text-paper/50 hover:text-paper" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {panel === "wa" ? (
                <div className="p-4">
                  <p className="text-[0.8rem] leading-relaxed text-paper/65">
                    📲 <span className="text-paper">Design Consultation</span> — pick a message and continue in WhatsApp.
                  </p>
                  <div className="mt-3 space-y-2">
                    {QUICK_MSGS.map((m) => (
                      <a
                        key={m}
                        href={waLink(m)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-paper/10 bg-paper/[0.03] px-3.5 py-3 text-[0.78rem] text-paper/75 transition hover:border-[#25D366]/50 hover:bg-[#25D366]/8"
                      >
                        <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#25D366]" /> {m}
                      </a>
                    ))}
                  </div>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-[0.74rem] font-semibold tracking-[0.14em] text-ink transition hover:brightness-110"
                  >
                    <Whatsapp className="h-4 w-4" /> START CHAT · {STUDIO.whatsappLocal}
                  </a>
                  <a href={`tel:+${STUDIO.whatsappIntl}`} className="mt-2 flex items-center justify-center gap-2 py-2 text-[0.7rem] text-paper/50 hover:text-brasslite">
                    <Phone className="h-3 w-3" /> or call the studio
                  </a>
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-[0.8rem] leading-relaxed text-paper/65">
                    Send drawings, plot papers or a brief by email — we reply within one working day.
                  </p>
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-paper/10 bg-paper/[0.03] p-3">
                    <Mail className="h-4 w-4 shrink-0 text-brass" />
                    <span className="min-w-0 flex-1 truncate text-[0.78rem] text-paper/80">{STUDIO.email}</span>
                    <button onClick={copy} className="text-paper/50 hover:text-brasslite" aria-label="Copy email">
                      {copied ? <Check className="h-4 w-4 text-live" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <a
                    href={`mailto:${STUDIO.email}?subject=${encodeURIComponent(
                      "Design enquiry — Heaven Studio"
                    )}&body=${encodeURIComponent("Plot size: \nLocation: \nRequirement: \nBudget: \n")}`}
                    className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] py-3.5 text-[0.74rem] font-semibold tracking-[0.14em] text-ink"
                  >
                    <Send className="h-3.5 w-3.5" /> COMPOSE EMAIL
                  </a>
                  <p className="mt-3 text-center text-[0.68rem] text-paper/40">{STUDIO.hours}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2.5">
          <button
            onClick={() => setPanel(panel === "wa" ? null : "wa")}
            className="group relative flex h-13 items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3.5 text-ink shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)] transition hover:brightness-110"
            aria-label="WhatsApp popup"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366]/50 animate-pulse-ring" />
            <Whatsapp className="relative h-5 w-5" />
            <span className="relative hidden text-[0.68rem] font-semibold tracking-[0.14em] sm:block">WHATSAPP</span>
          </button>
          <button
            onClick={() => setPanel(panel === "mail" ? null : "mail")}
            className="flex items-center gap-2.5 rounded-full border border-paper/18 bg-ink2/85 px-4 py-3.5 text-paper/80 backdrop-blur transition hover:border-brass/50 hover:text-brasslite"
            aria-label="Email popup"
          >
            <Mail className="h-5 w-5" />
            <span className="hidden text-[0.68rem] font-semibold tracking-[0.14em] sm:block">EMAIL</span>
          </button>
        </div>
      </div>

      <Assistant />
    </>
  );
}
