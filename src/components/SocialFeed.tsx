import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, Radio, Settings2, ThumbsUp, Clock, Eye, X, KeyRound, ExternalLink } from "lucide-react";
import { Facebook, Instagram, Linkedin, Pinterest, Whatsapp, Youtube } from "./BrandIcons";
import { Mail } from "lucide-react";
import { SOCIALS, STUDIO } from "@/data/site";
import { compact, getFbToken, setFbToken, setYtKey, timeAgo, useLiveFeed, getYtKey } from "@/lib/feed";

const ease = [0.16, 1, 0.3, 1] as const;
type Tab = "yt" | "fb" | "timeline";

export default function SocialFeed() {
  const feed = useLiveFeed();
  const [tab, setTab] = useState<Tab>("yt");
  const [playing, setPlaying] = useState<string | null>(feed.videos[0]?.id ?? null);
  const [featured, setFeatured] = useState(0);
  const [settings, setSettings] = useState(false);

  const hero = feed.videos[featured] ?? feed.videos[0];
  const rest = useMemo(() => feed.videos.filter((_, i) => i !== featured), [feed.videos, featured]);

  const statusColor = feed.source === "live" ? "text-live" : feed.source === "cached" ? "text-sky" : "text-brass";
  const statusLabel =
    feed.source === "live" ? "LIVE SYNC" : feed.source === "cached" ? "CACHED FEED" : "STUDIO LIBRARY";

  return (
    <section id="feed" className="relative border-t border-paper/10 py-24 sm:py-28">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(90% 60% at 15% 0%, rgba(255,0,51,0.08), transparent 60%), radial-gradient(80% 60% at 90% 10%, rgba(24,119,242,0.10), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-7">
        {/* header */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label text-[0.55rem] text-brass">Live social feed · 05</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-tight">
              Fresh from the <span className="italic gold-text">drafting board</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-paper/55">
              Every new upload on our YouTube channel and Facebook page lands here automatically — the page re-syncs in
              the background every few minutes and whenever you come back to this tab.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2.5 rounded-full border border-paper/15 bg-paper/[0.03] px-4 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inset-0 rounded-full bg-current animate-pulse-ring ${statusColor}`} />
                <span className={`relative h-2 w-2 rounded-full bg-current ${statusColor}`} />
              </span>
              <span className={`label text-[0.52rem] ${statusColor}`}>{statusLabel}</span>
              <span className="h-3 w-px bg-paper/15" />
              <span className="font-mono text-[0.62rem] text-paper/45">
                {feed.lastSync ? `synced ${timeAgo(new Date(feed.lastSync).toISOString())}` : "syncing…"}
              </span>
            </span>
            <button
              onClick={feed.refresh}
              className="flex items-center gap-2 rounded-full border border-paper/15 px-4 py-2.5 text-[0.68rem] tracking-[0.16em] text-paper/70 transition hover:border-brass/50 hover:text-brasslite"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${feed.loading ? "animate-spin text-brass" : ""}`} /> REFRESH
            </button>
            <button
              onClick={() => setSettings(true)}
              className="flex items-center gap-2 rounded-full border border-paper/15 px-4 py-2.5 text-[0.68rem] tracking-[0.16em] text-paper/70 transition hover:border-brass/50 hover:text-brasslite"
            >
              <Settings2 className="h-3.5 w-3.5" /> FEED API
            </button>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {(
            [
              { k: "yt", l: `YouTube · ${feed.videos.length} videos`, i: Youtube },
              { k: "fb", l: `Facebook · ${feed.posts.length} posts`, i: Facebook },
              { k: "timeline", l: "FB live timeline", i: Radio },
            ] as { k: Tab; l: string; i: any }[]
          ).map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-3 text-[0.78rem] transition ${
                tab === t.k ? "text-ink" : "border border-paper/15 text-paper/65 hover:border-paper/35"
              }`}
            >
              {tab === t.k && (
                <motion.span layoutId="feedTab" className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e8cc92] to-[#c9a05a]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <t.i className="relative z-10 h-4 w-4" />
              <span className="relative z-10 font-medium">{t.l}</span>
            </button>
          ))}
          <a
            href={`${STUDIO.youtube}?sub_confirmation=1`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#FF0033] px-5 py-3 text-[0.78rem] font-medium text-white transition hover:brightness-110"
          >
            <Youtube className="h-4 w-4" /> SUBSCRIBE
          </a>
        </div>

        {/* panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease }}
            className="mt-8"
          >
            {tab === "yt" && (
              <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
                {/* featured player */}
                <div className="overflow-hidden rounded-2xl border border-paper/12 bg-ink2">
                  <div className="relative aspect-video w-full bg-black">
                    {hero && playing === hero.id ? (
                      <iframe
                        key={hero.id}
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${hero.id}?autoplay=1&rel=0&modestbranding=1`}
                        title={hero.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : hero ? (
                      <button onClick={() => setPlaying(hero.id)} className="group absolute inset-0">
                        <img src={hero.thumb} alt={hero.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                        <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF0033] text-white shadow-[0_0_40px_rgba(255,0,51,0.5)] transition group-hover:scale-110">
                          <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-white" />
                        </span>
                        <span className="absolute bottom-4 left-5 right-5 text-left">
                          <span className="label text-[0.5rem] text-brass">Featured · newest design film</span>
                          <span className="mt-2 line-clamp-2 block font-display text-xl leading-snug sm:text-2xl">{hero.title}</span>
                        </span>
                      </button>
                    ) : null}
                  </div>
                  {hero && (
                    <div className="flex flex-wrap items-center gap-4 px-5 py-4">
                      <span className="flex items-center gap-1.5 font-mono text-[0.62rem] text-paper/50">
                        <Clock className="h-3 w-3" /> {timeAgo(hero.date)}
                      </span>
                      {hero.views !== undefined && (
                        <span className="flex items-center gap-1.5 font-mono text-[0.62rem] text-paper/50">
                          <Eye className="h-3 w-3" /> {compact(hero.views)}
                        </span>
                      )}
                      <a href={hero.link} target="_blank" rel="noreferrer" className="ml-auto flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] text-brasslite hover:underline">
                        OPEN ON YOUTUBE <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* list */}
                <div className="max-h-[560px] space-y-3 overflow-y-auto rounded-2xl border border-paper/12 bg-paper/[0.02] p-3">
                  {rest.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setFeatured(feed.videos.findIndex((x) => x.id === v.id));
                        setPlaying(null);
                      }}
                      className="group flex w-full gap-3 rounded-xl border border-transparent p-2 text-left transition hover:border-paper/12 hover:bg-paper/[0.04]"
                    >
                      <span className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
                        <img src={v.thumb} alt="" loading="lazy" className="h-full w-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center bg-ink/45 opacity-0 transition group-hover:opacity-100">
                          <span className="block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 text-[0.82rem] leading-snug text-paper/85">{v.title}</span>
                        <span className="mt-1.5 flex items-center gap-3 font-mono text-[0.58rem] text-paper/40">
                          <span>{timeAgo(v.date)}</span>
                          {v.views !== undefined && <span>{compact(v.views)}</span>}
                        </span>
                      </span>
                    </button>
                  ))}
                  <a
                    href={STUDIO.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-paper/15 py-4 text-[0.7rem] tracking-[0.16em] text-paper/55 transition hover:border-[#FF0033]/50 hover:text-white"
                  >
                    <Youtube className="h-4 w-4" /> VIEW ALL ON {STUDIO.youtubeHandle}
                  </a>
                </div>
              </div>
            )}

            {tab === "fb" && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {feed.posts.map((p, i) => (
                  <motion.a
                    key={p.id}
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.6, ease }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-paper/12 bg-ink2 transition hover:border-[#1877F2]/50"
                  >
                    {p.image && (
                      <span className="relative block aspect-[16/10] overflow-hidden">
                        <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      </span>
                    )}
                    <span className="flex flex-1 flex-col p-5">
                      <span className="flex items-center gap-2 text-[0.68rem] text-[#4e93ff]">
                        <Facebook className="h-3.5 w-3.5" /> Heaven Studio · {timeAgo(p.date)}
                      </span>
                      <span className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-paper/75 line-clamp-6">{p.message}</span>
                      <span className="mt-4 flex items-center gap-4 text-[0.68rem] text-paper/40">
                        <span className="flex items-center gap-1.5">
                          <ThumbsUp className="h-3.5 w-3.5" /> Page post
                        </span>
                        <span className="ml-auto flex items-center gap-1.5 text-brasslite">
                          VIEW <ExternalLink className="h-3 w-3" />
                        </span>
                      </span>
                    </span>
                  </motion.a>
                ))}
                <a
                  href={STUDIO.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-paper/15 p-7 text-center transition hover:border-[#1877F2]/60"
                >
                  <Facebook className="h-6 w-6 text-[#4e93ff]" />
                  <span className="font-display text-2xl">Follow the studio</span>
                  <span className="text-[0.75rem] text-paper/45">/{STUDIO.facebookPage}</span>
                </a>
              </div>
            )}

            {tab === "timeline" && (
              <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
                <div className="overflow-hidden rounded-2xl border border-paper/12 bg-ink2 p-2">
                  <iframe
                    title="Heaven Studio Facebook page timeline"
                    className="h-[640px] w-full rounded-xl bg-white"
                    src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                      STUDIO.facebook
                    )}&tabs=timeline&width=500&height=640&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                    loading="lazy"
                    allow="encrypted-media"
                  />
                </div>
                <div className="rounded-2xl border border-paper/12 bg-paper/[0.02] p-7">
                  <span className="label text-[0.5rem] text-brass">How the live sync works</span>
                  <h3 className="mt-3 font-display text-3xl">Zero-touch publishing</h3>
                  <ol className="mt-6 space-y-5">
                    {[
                      ["You upload", "Post a video on YouTube or an update on the Facebook page, as you always do."],
                      ["We detect", "This page reads the channel feed / page feed on load, every 4 minutes, and each time the tab regains focus."],
                      ["It appears", "Newest items jump to the top instantly — no redeploy, no manual website edit."],
                      ["Bullet-proof", "Add an API key in FEED API to bypass browser CORS limits for guaranteed real-time sync."],
                    ].map(([t, d], i) => (
                      <li key={t} className="flex gap-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brass/40 font-mono text-[0.62rem] text-brass">
                          {i + 1}
                        </span>
                        <span>
                          <span className="block font-medium">{t}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-paper/55">{d}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href={STUDIO.youtube} target="_blank" rel="noreferrer" className="rounded-full border border-[#FF0033]/50 px-5 py-2.5 text-[0.7rem] tracking-[0.14em] text-white/90 hover:bg-[#FF0033]/15">
                      YOUTUBE CHANNEL
                    </a>
                    <a href={STUDIO.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-[#1877F2]/50 px-5 py-2.5 text-[0.7rem] tracking-[0.14em] text-white/90 hover:bg-[#1877F2]/15">
                      FACEBOOK PAGE
                    </a>
                    <button onClick={() => setSettings(true)} className="rounded-full border border-brass/50 px-5 py-2.5 text-[0.7rem] tracking-[0.14em] text-brasslite hover:bg-brass/10">
                      CONNECT KEYS
                    </button>
                  </div>
                  <p className="mt-5 text-[0.72rem] leading-relaxed text-paper/40">{feed.note}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* all socials */}
        <div className="mt-16">
          <span className="label text-[0.5rem] text-paper/40">All channels</span>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.6, ease }}
                className="group flex items-center gap-4 rounded-xl border border-paper/12 bg-paper/[0.02] p-4 transition hover:border-paper/30 hover:bg-paper/[0.05]"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-transform group-hover:scale-110"
                  style={{ background: `linear-gradient(140deg, ${s.color}, ${s.color}bb)` }}
                >
                  <SocialIcon label={s.label} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.85rem]">{s.label}</span>
                  <span className="block truncate font-mono text-[0.62rem] text-paper/40">{s.handle}</span>
                </span>
                <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-paper/30 transition group-hover:text-brasslite" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <FeedSettings open={settings} onClose={() => setSettings(false)} onSaved={feed.refresh} />
    </section>
  );
}

function SocialIcon({ label }: { label: string }) {
  const c = "h-4 w-4";
  if (label === "YouTube") return <Youtube className={c} />;
  if (label === "Facebook") return <Facebook className={c} />;
  if (label === "WhatsApp") return <Whatsapp className={c} />;
  if (label === "Instagram") return <Instagram className={c} />;
  if (label === "LinkedIn") return <Linkedin className={c} />;
  if (label === "Pinterest") return <Pinterest className={c} />;
  return <Mail className={c} />;
}

function FeedSettings({ open, onClose, onSaved }: { open: boolean; onClose: () => void; onSaved: () => void }) {
  const [yt, setYt] = useState(getYtKey());
  const [fb, setFb] = useState(getFbToken());
  const [saved, setSaved] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[520] flex items-center justify-center p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl border border-brass/25 bg-ink2 p-7"
          >
            <button onClick={onClose} className="absolute right-5 top-5 text-paper/50 hover:text-paper" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            <KeyRound className="h-6 w-6 text-brass" />
            <h3 className="mt-4 font-display text-2xl">Feed connection keys</h3>
            <p className="mt-2 text-sm leading-relaxed text-paper/55">
              Public RSS + page plugins already sync automatically. If your network or an ad-blocker blocks the proxy,
              paste your own keys — they are stored only in this browser (localStorage) and used for instant, direct API
              calls.
            </p>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="label mb-2 block text-[0.55rem] text-paper/45">YouTube Data API v3 key</span>
                <input value={yt} onChange={(e) => setYt(e.target.value)} placeholder="AIza…" className="input" />
                <span className="mt-1.5 block text-[0.68rem] text-paper/35">Channel ID: {STUDIO.youtubeChannelId}</span>
              </label>
              <label className="block">
                <span className="label mb-2 block text-[0.55rem] text-paper/45">Facebook Page access token</span>
                <input value={fb} onChange={(e) => setFb(e.target.value)} placeholder="EAAG…" className="input" />
                <span className="mt-1.5 block text-[0.68rem] text-paper/35">Page: /{STUDIO.facebookPage}</span>
              </label>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => {
                  setYtKey(yt);
                  setFbToken(fb);
                  setSaved(true);
                  onSaved();
                  setTimeout(onClose, 700);
                }}
                className="flex-1 rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] py-3.5 text-[0.72rem] font-semibold tracking-[0.16em] text-ink"
              >
                {saved ? "SAVED ✓" : "SAVE & RESYNC"}
              </button>
              <button
                onClick={() => {
                  setYtKey("");
                  setFbToken("");
                  setYt("");
                  setFb("");
                }}
                className="rounded-full border border-paper/15 px-5 text-[0.7rem] tracking-[0.14em] text-paper/60"
              >
                CLEAR
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
