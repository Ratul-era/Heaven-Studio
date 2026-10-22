import { motion } from "framer-motion";
import { Award, Compass, DraftingCompass, HardHat, ShieldCheck } from "lucide-react";
const blueprint = "https://images.pexels.com/photos/9617369/pexels-photo-9617369.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800";
const interior = "https://images.pexels.com/photos/8134752/pexels-photo-8134752.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600";

const ease = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  { icon: DraftingCompass, t: "Design first", d: "Every plan starts on paper — proportion, light and movement before software." },
  { icon: ShieldCheck, t: "Engineer checked", d: "Structural, electrical, plumbing and fire drawings signed by licensed engineers." },
  { icon: HardHat, t: "Site honest", d: "We supervise what we draw, with stage-wise photo reports to the owner." },
  { icon: Compass, t: "RAJUK ready", d: "Approval drawings, soil report annexure and follow-up handled end to end." },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-7">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          {/* visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-paper/12">
              <img src={blueprint} alt="Heaven Studio drafting" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="label text-[0.5rem] text-brass">Since 2014</span>
                <p className="mt-2 font-display text-2xl leading-snug">হেভেন স্টুডিও — নকশা, কাঠামো ও বাস্তবায়ন এক ছাদের নিচে।</p>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 bottom-16 w-40 overflow-hidden rounded-xl border border-brass/30 bg-ink2 p-2 shadow-2xl sm:-right-8 sm:w-52"
            >
              <img src={interior} alt="Interior detail" className="h-28 w-full rounded-lg object-cover sm:h-32" />
              <span className="label mt-2 block text-center text-[0.45rem] text-paper/50">Detail · 1:50</span>
            </motion.div>
            <div className="absolute -left-3 -top-3 h-16 w-16 border-l border-t border-brass/50" />
          </motion.div>

          {/* copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="label text-[0.55rem] text-brass"
            >
              About us · আমাদের সম্পর্কে
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.9, ease }}
              className="mt-4 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.05]"
            >
              A studio that draws like <span className="italic gold-text">architects</span> and counts like{" "}
              <span className="italic gold-text">engineers</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1 }}
              className="mt-6 max-w-2xl leading-relaxed text-paper/65"
            >
              Heaven Studio is a Dhaka-based multidisciplinary design practice. Architects, civil &amp; structural
              engineers, electrical and plumbing designers, 3D artists and site supervisors work under one roof — so your
              drawing, your budget and your build never contradict each other. From a ২ কাঠা tin-shed home to a G+7
              apartment block, the same detailing discipline applies.
            </motion.p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-paper/10 bg-paper/10 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, duration: 0.7, ease }}
                  className="group bg-ink p-6 transition-colors hover:bg-smoke/70"
                >
                  <p.icon className="h-5 w-5 text-brass transition-transform duration-500 group-hover:-translate-y-0.5" />
                  <h3 className="mt-4 font-display text-xl">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/55">{p.d}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {["BNBC aligned", "RAJUK submission set", "Licensed engineers", "1,140+ design IDs"].map((b) => (
                <span key={b} className="flex items-center gap-2 rounded-full border border-brass/30 bg-brass/8 px-4 py-2 text-[0.72rem] text-brasslite">
                  <Award className="h-3.5 w-3.5" /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
