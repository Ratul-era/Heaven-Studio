import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Navigation, Phone, ArrowUpRight } from "lucide-react";
import { STUDIO, waLink } from "@/data/site";
import { Facebook, Whatsapp } from "./BrandIcons";
import { LogoMark } from "./Logo";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-paper/10 bg-ink2/40 py-24 sm:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7">
        <div className="max-w-2xl">
          <span className="label text-[0.55rem] text-brass">Contact · 06</span>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-tight">
            ডিজাইন কনসালটেশন <span className="italic gold-text">শুরু করি?</span>
          </h2>
          <p className="mt-3 text-sm text-paper/55">
            Studio at Dhaka, Bangladesh — working nationwide. Send your plot size and requirement on WhatsApp and get a
            fee proposal the same day.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="relative overflow-hidden rounded-2xl border border-paper/12"
          >
            <iframe
              title="Heaven Studio location — Dhaka, Bangladesh"
              src={STUDIO.mapEmbed}
              className="h-[420px] w-full lg:h-full lg:min-h-[520px]"
              style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9) brightness(0.92)" }}
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_45%,rgba(8,9,11,0.55))]" />
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-paper/15 bg-ink/80 px-4 py-2 backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-brass" />
              <span className="label text-[0.5rem] text-paper/70">Dhaka · Bangladesh</span>
            </div>
            <a
              href={STUDIO.mapLink}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-[0.7rem] font-semibold tracking-[0.14em] text-ink transition hover:bg-brasslite"
            >
              <Navigation className="h-3.5 w-3.5" /> OPEN IN MAPS
            </a>
          </motion.div>

          {/* info */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="rounded-2xl border border-brass/30 bg-brass/[0.06] p-7"
            >
              <span className="label text-[0.5rem] text-brass">📲 Design Consultation</span>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center gap-4 rounded-xl border border-paper/10 bg-ink/60 p-4 transition hover:border-live/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-ink">
                  <Whatsapp className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[0.68rem] tracking-[0.16em] text-paper/45">WHATSAPP</span>
                  <span className="block font-display text-2xl tracking-wide">{STUDIO.whatsappLocal}</span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 text-live" />
              </a>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:+${STUDIO.whatsappIntl}`}
                  className="flex items-center gap-3 rounded-xl border border-paper/10 bg-ink/40 p-4 transition hover:border-brass/50"
                >
                  <Phone className="h-4 w-4 text-brass" />
                  <span className="text-[0.8rem] text-paper/75">Call the studio</span>
                </a>
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="flex items-center gap-3 rounded-xl border border-paper/10 bg-ink/40 p-4 transition hover:border-brass/50"
                >
                  <Mail className="h-4 w-4 text-brass" />
                  <span className="truncate text-[0.8rem] text-paper/75">Email us</span>
                </a>
              </div>

              <div className="mt-6 border-t border-paper/10 pt-5">
                <p className="font-display text-2xl leading-tight">
                  Heaven STUDIO <span className="bn text-brasslite">| হেভেন স্টুডিও</span>
                </p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-paper/60">{STUDIO.tagline}</p>
                <p className="mt-4 flex items-start gap-2 text-[0.82rem] text-paper/60">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" /> Dhaka, Bangladesh · site visits all 64 districts
                </p>
                <p className="mt-2 flex items-start gap-2 text-[0.82rem] text-paper/60">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brass" /> {STUDIO.hours}
                </p>
                <a
                  href={STUDIO.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[0.78rem] text-[#4e93ff] hover:underline"
                >
                  <Facebook className="h-4 w-4" /> facebook.com/{STUDIO.facebookPage}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease }}
              className="flex items-center gap-4 rounded-2xl border border-paper/12 bg-paper/[0.02] p-6"
            >
              <span className="text-brass">
                <LogoMark className="h-12 w-12" />
              </span>
              <p className="text-[0.82rem] leading-relaxed text-paper/60">
                Prefer talking to our AI assistant? Tap the gold chat bubble at the bottom-right — it knows our services,
                process, timelines and fees, in Bangla &amp; English.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
