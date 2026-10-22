import { ArrowUp } from "lucide-react";
import { NAV, SERVICES, STUDIO, waLink } from "@/data/site";
import { Facebook, Youtube } from "./BrandIcons";
import { LogoMark, Wordmark } from "./Logo";

export default function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink pt-16">
      <div className="absolute inset-0 grid-lines opacity-25" />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,160,90,0.7), transparent)" }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-7">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-brass">
                <LogoMark className="h-11 w-11" />
              </span>
              <span className="text-paper">
                <Wordmark className="text-[1.5rem]" />
              </span>
            </div>
            <p className="bn mt-5 max-w-sm text-sm leading-relaxed text-paper/55">
              {STUDIO.tagline} — ঢাকা, বাংলাদেশ থেকে সারাদেশে।
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={STUDIO.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition hover:border-[#FF0033] hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={STUDIO.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition hover:border-[#1877F2] hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brass/40 px-5 text-[0.68rem] leading-10 tracking-[0.16em] text-brasslite transition hover:bg-brass/10"
              >
                {STUDIO.whatsappLocal}
              </a>
            </div>
          </div>

          <div>
            <span className="label text-[0.5rem] text-brass">Navigate</span>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => go(n.id)} className="text-sm text-paper/60 transition hover:text-brasslite">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label text-[0.5rem] text-brass">Services</span>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.title}>
                  <button onClick={() => go("services")} className="text-left text-[0.82rem] text-paper/55 transition hover:text-brasslite">
                    {s.emoji} {s.title}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => go("services")} className="text-[0.78rem] text-brasslite hover:underline">
                  + 4 more services
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="label text-[0.5rem] text-brass">Reach us</span>
            <ul className="mt-5 space-y-3 text-[0.85rem] text-paper/60">
              <li>
                <a href={`mailto:${STUDIO.email}`} className="break-all transition hover:text-brasslite">
                  {STUDIO.email}
                </a>
              </li>
              <li>
                <a href={`tel:+${STUDIO.whatsappIntl}`} className="transition hover:text-brasslite">
                  +{STUDIO.whatsappIntl}
                </a>
              </li>
              <li>{STUDIO.city}</li>
              <li className="text-paper/40">{STUDIO.hours}</li>
            </ul>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-6 flex items-center gap-2 rounded-full border border-paper/15 px-4 py-2.5 text-[0.66rem] tracking-[0.16em] text-paper/60 transition hover:border-brass/50 hover:text-brasslite"
            >
              <ArrowUp className="h-3.5 w-3.5" /> BACK TO TOP
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-paper/10 py-7 sm:flex-row">
          <p className="font-mono text-[0.62rem] tracking-[0.14em] text-paper/35">
            © {new Date().getFullYear()} HEAVEN STUDIO · ALL DRAWINGS COPYRIGHT PROTECTED
          </p>
          <p className="font-mono text-[0.62rem] tracking-[0.14em] text-paper/35">
            DESIGNED &amp; DRAFTED IN DHAKA 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
