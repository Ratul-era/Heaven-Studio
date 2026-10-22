import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { SERVICES, STUDIO, waLink } from "@/data/site";

type Action = { label: string; href?: string; scroll?: string };
type Msg = { from: "ai" | "me"; text: string; actions?: Action[] };

const isBn = (s: string) => /[\u0980-\u09FF]/.test(s);

type Rule = {
  keys: string[];
  bnKeys?: string[];
  en: string;
  bn: string;
  actions?: Action[];
};

const RULES: Rule[] = [
  {
    keys: ["hello", "hi", "hey", "assalam", "salam", "good morning", "good evening"],
    bnKeys: ["হ্যালো", "আসসালাম", "কেমন আছেন", "হাই"],
    en: "Hello and welcome to Heaven Studio 👋 I'm the studio's AI assistant. I can explain our 11 services, fee range, RAJUK approval, timelines — or connect you to an architect on WhatsApp right away.",
    bn: "আসসালামু আলাইকুম এবং স্বাগতম! 👋 আমি হেভেন স্টুডিওর AI সহকারী। আমাদের ১১টি সেবা, খরচ, রাজউক অনুমোদন ও সময়সীমা নিয়ে বলতে পারি — অথবা সরাসরি আর্কিটেক্টের সাথে WhatsApp-এ যুক্ত করে দিতে পারি।",
    actions: [
      { label: "See services", scroll: "services" },
      { label: "WhatsApp us", href: waLink() },
    ],
  },
  {
    keys: ["price", "cost", "fee", "charge", "how much", "budget", "rate", "quotation"],
    bnKeys: ["দাম", "খরচ", "ফি", "মূল্য", "কত", "বাজেট", "কোটেশন"],
    en: "Typical fee guide (residential):\n• Architectural design + 3D — ৳12–25 /sft\n• Structural design — ৳8–14 /sft\n• Full MEP (electrical + plumbing + fire) — ৳10–18 /sft\n• Interior design — ৳15–45 /sft\n• RAJUK drawing & approval support — package based\n• Soil test — ৳18,000–45,000 per boring\nExact fee depends on plot, floors and scope — send your plot size and we'll quote the same day.",
    bn: "আনুমানিক ফি (আবাসিক):\n• স্থাপত্য ডিজাইন + 3D — ৳১২–২৫ /বর্গফুট\n• কাঠামো ডিজাইন — ৳৮–১৪ /বর্গফুট\n• ইলেকট্রিক্যাল + প্লাম্বিং + ফায়ার — ৳১০–১৮ /বর্গফুট\n• ইন্টেরিয়র — ৳১৫–৪৫ /বর্গফুট\n• রাজউক ড্রয়িং ও অনুমোদন — প্যাকেজভিত্তিক\n• সয়েল টেস্ট — ৳১৮,০০০–৪৫,০০০ প্রতি বোরিং\nপ্লটের মাপ পাঠালে একই দিনে সঠিক কোটেশন দেওয়া যাবে।",
    actions: [
      { label: "Get exact quote", href: waLink("Hello Heaven Studio, my plot is ___ . Please share a fee quotation.") },
      { label: "Contact page", scroll: "contact" },
    ],
  },
  {
    keys: ["rajuk", "approval", "permit", "plan passing", "authority", "mutation"],
    bnKeys: ["রাজউক", "অনুমোদন", "পাসিং", "কর্তৃপক্ষ"],
    en: "Yes — we prepare the complete RAJUK / CDA / KDA submission set: land use & clearance documents, architectural + structural drawings, soil report annexure and engineer's certificate, then follow up until the plan is approved. Typical cycle: 4–10 weeks depending on the authority.",
    bn: "হ্যাঁ, আমরা সম্পূর্ণ রাজউক / সিডিএ / কেডিএ সাবমিশন সেট তৈরি করি — ল্যান্ড ইউজ ও ক্লিয়ারেন্স কাগজ, স্থাপত্য ও কাঠামো ড্রয়িং, সয়েল রিপোর্ট এনেক্সার এবং ইঞ্জিনিয়ার সার্টিফিকেট; এরপর অনুমোদন পর্যন্ত ফলো-আপ করি। সাধারণত ৪–১০ সপ্তাহ।",
    actions: [{ label: "RAJUK service", scroll: "services" }],
  },
  {
    keys: ["service", "offer", "what do you do", "list"],
    bnKeys: ["সেবা", "সার্ভিস", "কী করেন", "কি কি"],
    en: `We offer 11 services: ${SERVICES.map((s) => s.emoji + " " + s.title).join(", ")}. Open the Services section to see deliverables of each.`,
    bn: `আমাদের ১১টি সেবা: ${SERVICES.map((s) => s.titleBn).join(", ")} — বিস্তারিত জানতে Services সেকশনে যান।`,
    actions: [{ label: "Open services", scroll: "services" }],
  },
  {
    keys: ["3d", "render", "animation", "walkthrough", "view"],
    bnKeys: ["থ্রিডি", "থ্রি ডি", "রেন্ডার", "অ্যানিমেশন"],
    en: "We deliver photoreal exterior & interior stills, day/night lighting studies, 360° VR panoramas and a cinematic walkthrough animation — perfect for approvals, bank files and marketing before construction starts.",
    bn: "আমরা ফটোরিয়াল এক্সটেরিয়র ও ইন্টেরিয়র স্টিল, দিন/রাত লাইটিং স্টাডি, ৩৬০° VR প্যানোরামা এবং সিনেম্যাটিক ওয়াকথ্রু অ্যানিমেশন তৈরি করি — অনুমোদন, ব্যাংক ফাইল ও মার্কেটিংয়ের জন্য দুর্দান্ত।",
    actions: [{ label: "Watch latest 3D", scroll: "feed" }],
  },
  {
    keys: ["time", "duration", "how long", "days", "deadline", "delivery"],
    bnKeys: ["সময়", "কত দিন", "ডেলিভারি", "কতদিন"],
    en: "Typical delivery: concept & floor plan 5–7 days, full working drawing set 10–15 days, 3D views 4–8 days, walkthrough film 7–12 days. Rush delivery is possible for an urgent fee.",
    bn: "সাধারণ সময়: কনসেপ্ট ও ফ্লোর প্ল্যান ৫–৭ দিন, সম্পূর্ণ ওয়ার্কিং ড্রয়িং ১০–১৫ দিন, 3D ভিউ ৪–৮ দিন, ওয়াকথ্রু ফিল্ম ৭–১২ দিন। জরুরি প্রয়োজনে দ্রুত ডেলিভারি সম্ভব।",
  },
  {
    keys: ["soil", "test", "survey", "boring", "spt"],
    bnKeys: ["সয়েল", "মাটি পরীক্ষা", "সার্ভে", "বোরিং"],
    en: "Soil investigation (SPT / boring, triaxial, proctor) with an engineer-stamped bearing capacity report, plus contour and total-station site survey. We mobilise anywhere in Bangladesh.",
    bn: "SPT / বোরিং, ট্রায়াক্সিয়াল ও প্রক্টর টেস্ট — ইঞ্জিনিয়ার স্ট্যাম্পড বেয়ারিং ক্যাপাসিটি রিপোর্টসহ, এবং কনট্যুর ও টোটাল স্টেশন সার্ভে। সারাদেশে সেবা দেওয়া হয়।",
  },
  {
    keys: ["interior", "furniture", "ceiling", "kitchen", "wardrobe"],
    bnKeys: ["ইন্টেরিয়র", "ফার্নিচার", "সিলিং", "কিচেন"],
    en: "Interior design covers mood board & material palette, false ceiling and lighting scenes, custom furniture drawings, BOQ and turnkey execution supervision for apartments, offices, showrooms and restaurants.",
    bn: "ইন্টেরিয়র ডিজাইনে থাকে মুড বোর্ড ও ম্যাটেরিয়াল প্যালেট, ফলস সিলিং ও লাইটিং সিন, কাস্টম ফার্নিচার ড্রয়িং, BOQ এবং টার্নকি বাস্তবায়ন সুপারভিশন।",
  },
  {
    keys: ["where", "location", "address", "office", "map"],
    bnKeys: ["কোথায়", "ঠিকানা", "অফিস", "লোকেশন"],
    en: "Our studio is in Dhaka, Bangladesh — consultations online nationwide and site visits in all 64 districts. See the map in the Contact section.",
    bn: "আমাদের স্টুডিও ঢাকা, বাংলাদেশে। অনলাইনে সারাদেশে কনসালটেশন এবং ৬৪ জেলায় সাইট ভিজিট করা হয়। Contact সেকশনে ম্যাপ আছে।",
    actions: [{ label: "Open map", scroll: "contact" }],
  },
  {
    keys: ["whatsapp", "phone", "call", "number", "contact", "email", "mail"],
    bnKeys: ["হোয়াটসঅ্যাপ", "ফোন", "নাম্বার", "যোগাযোগ", "ইমেইল"],
    en: `WhatsApp / call: ${STUDIO.whatsappLocal}\nEmail: ${STUDIO.email}\nHours: ${STUDIO.hours}`,
    bn: `WhatsApp / কল: ${STUDIO.whatsappLocal}\nইমেইল: ${STUDIO.email}\nসময়: শনি–বৃহস্পতি, সকাল ৯টি–রাত ৯টি`,
    actions: [
      { label: "Chat on WhatsApp", href: waLink() },
      { label: "Contact section", scroll: "contact" },
    ],
  },
  {
    keys: ["project", "portfolio", "ongoing", "delivered", "previous", "sample", "design id"],
    bnKeys: ["প্রজেক্ট", "নমুনা", "কাজ", "আগের কাজ"],
    en: "You can browse our ongoing and delivered work in the Projects section, and every design film on the Live feed. Tell me your plot size and I'll point you to a similar design ID.",
    bn: "Projects সেকশনে চলমান ও সম্পন্ন কাজ দেখতে পারবেন, আর সব ডিজাইন ভিডিও Live feed-এ। প্লটের মাপ বললে মিলিয়ে ডিজাইন আইডি দেখাতে পারি।",
    actions: [
      { label: "Projects", scroll: "projects" },
      { label: "Live feed", scroll: "feed" },
    ],
  },
  {
    keys: ["start", "hire", "begin", "order", "process", "how to"],
    bnKeys: ["শুরু", "কাজ দিতে", "অর্ডার", "নিয়োগ", "প্রসেস"],
    en: "Starting is easy: 1) share plot size, facing and requirement on WhatsApp 2) we send concept options + fee proposal 3) 50% advance, drawing begins 4) 3D, approval drawings and construction support follow.",
    bn: "শুরু করা সহজ: ১) WhatsApp-এ প্লটের মাপ ও চাহিদা পাঠান ২) আমরা কনসেপ্ট অপশন ও ফি প্রপোজাল পাঠাই ৩) ৫০% অ্যাডভান্সে ড্রয়িং শুরু ৪) এরপর 3D, অনুমোদন ড্রয়িং ও নির্মাণ সহায়তা।",
    actions: [{ label: "Start now", href: waLink("Hello Heaven Studio, I want to start a project.") }],
  },
  {
    keys: ["thank", "thanks", "great", "nice", "awesome"],
    bnKeys: ["ধন্যবাদ", "ভালো", "সুন্দর"],
    en: "Anytime! 🙏 May your dream home be everything you sketched it to be.",
    bn: "স্বাগতম! 🙏 আপনার স্বপ্নের বাড়ি হোক ঠিক নকশার মতোই সুন্দর।",
  },
];

const QUICK = ["Services & price", "RAJUK approval", "Delivery time", "Soil test", "Talk to architect"];

function answer(qRaw: string): Msg {
  const q = qRaw.toLowerCase();
  const bn = isBn(qRaw);
  let best: Rule | null = null;
  let bestScore = 0;
  for (const r of RULES) {
    let score = 0;
    for (const k of r.keys) if (q.includes(k)) score += k.length;
    for (const k of r.bnKeys || []) if (qRaw.includes(k)) score += k.length + 2;
    if (score > bestScore) {
      bestScore = score;
      best = r;
    }
  }
  if (!best || bestScore < 3)
    return {
      from: "ai",
      text: bn
        ? "এই বিষয়ে নিশ্চিত হতে আমাদের আর্কিটেক্টের সাথে কথা বলা ভালো। আপনি সেবা, খরচ, রাজউক অনুমোদন, সময়সীমা বা পোর্টফোলিও নিয়ে জিজ্ঞেস করতে পারেন — অথবা সরাসরি WhatsApp-এ লিখুন।"
        : "I'd rather have a human architect answer that precisely. Ask me about services, fees, RAJUK approval, timelines or portfolio — or message the studio directly on WhatsApp.",
      actions: [
        { label: "WhatsApp an architect", href: waLink("Hello Heaven Studio, I have a question: " + qRaw) },
        { label: "Services", scroll: "services" },
      ],
    };
  return { from: "ai", text: bn ? best.bn : best.en, actions: best.actions };
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [val, setVal] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "ai",
      text: "Hi 👋 I'm the Heaven Studio AI assistant. Ask me anything about our design, engineering or approval services — Bangla or English.",
      actions: [{ label: "See services", scroll: "services" }, { label: "Fees", scroll: "contact" }],
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setVal("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, answer(t)]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  const act = (a: Action) => {
    if (a.href) window.open(a.href, "_blank");
    else if (a.scroll) {
      setOpen(false);
      document.getElementById(a.scroll)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.4, type: "spring", stiffness: 220, damping: 18 }}
        className="group fixed bottom-5 right-5 z-[480] flex h-14 items-center gap-3 rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] bg-[length:220%_auto] px-5 text-ink shadow-[0_14px_40px_-10px_rgba(201,160,90,0.8)] transition-[background-position] duration-700 hover:bg-right"
        aria-label="Open AI assistant"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-brass/40 animate-pulse-ring" />
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        <span className="hidden text-[0.72rem] font-semibold tracking-[0.16em] sm:block">
          {open ? "CLOSE" : "ASK HEAVEN AI"}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-[5.5rem] right-4 z-[490] flex h-[min(78vh,600px)] w-[min(94vw,400px)] flex-col overflow-hidden rounded-2xl border border-brass/25 bg-ink2/97 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-paper/10 px-4 py-3.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brass/15 text-brass">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-[0.9rem]">Heaven Studio AI</span>
                <span className="flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.14em] text-live">
                  <span className="h-1.5 w-1.5 rounded-full bg-live" /> ONLINE · বাংলা / EN
                </span>
              </span>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-paper/15 px-3 py-1.5 text-[0.6rem] tracking-[0.12em] text-paper/60 hover:border-live/50 hover:text-live"
              >
                HUMAN
              </a>
            </div>

            {/* messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] whitespace-pre-line rounded-2xl px-4 py-3 text-[0.83rem] leading-relaxed ${
                      m.from === "me"
                        ? "rounded-br-sm bg-paper/10 text-paper"
                        : "rounded-bl-sm border border-brass/20 bg-brass/[0.07] text-paper/85"
                    }`}
                  >
                    {m.text}
                    {m.actions && (
                      <span className="mt-3 flex flex-wrap gap-2">
                        {m.actions.map((a) => (
                          <button
                            key={a.label}
                            onClick={() => act(a)}
                            className="rounded-full border border-brass/40 bg-brass/10 px-3 py-1.5 text-[0.66rem] tracking-[0.08em] text-brasslite transition hover:bg-brass/20"
                          >
                            {a.label}
                          </button>
                        ))}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-1.5 px-2">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-brass/60"
                      animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* quick chips */}
            <div className="flex gap-2 overflow-x-auto border-t border-paper/10 px-4 py-2.5">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-paper/12 px-3 py-1.5 text-[0.66rem] text-paper/60 transition hover:border-brass/40 hover:text-brasslite"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(val);
              }}
              className="flex items-center gap-2 border-t border-paper/10 p-3"
            >
              <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder="আপনার প্রশ্ন লিখুন… / Ask anything"
                className="input py-2.5"
              />
              <button type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brass text-ink transition hover:bg-brasslite" aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
