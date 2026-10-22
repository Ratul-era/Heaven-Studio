import { useCallback, useEffect, useRef, useState } from "react";
import { STUDIO, FB_SEED, YT_SEED } from "@/data/site";

export type VideoItem = {
  kind: "video";
  id: string;
  title: string;
  date: string;
  views?: number;
  thumb: string;
  link: string;
};
export type PostItem = {
  kind: "post";
  id: string;
  message: string;
  date: string;
  image?: string;
  link: string;
};
export type FeedItem = VideoItem | PostItem;

type Cache = { videos: VideoItem[]; posts: PostItem[]; ts: number };

const CACHE_KEY = "hs.feed.v3";
const YT_KEY_STORE = "hs.yt.apikey";
const FB_KEY_STORE = "hs.fb.token";
const REFRESH_MS = 4 * 60 * 1000;

/* ------------------------------------------------------------------ storage */

export const getYtKey = () => {
  try {
    return localStorage.getItem(YT_KEY_STORE) || "";
  } catch {
    return "";
  }
};
export const getFbToken = () => {
  try {
    return localStorage.getItem(FB_KEY_STORE) || "";
  } catch {
    return "";
  }
};
export const setYtKey = (v: string) => {
  try {
    v ? localStorage.setItem(YT_KEY_STORE, v.trim()) : localStorage.removeItem(YT_KEY_STORE);
  } catch {
    /* ignore */
  }
};
export const setFbToken = (v: string) => {
  try {
    v ? localStorage.setItem(FB_KEY_STORE, v.trim()) : localStorage.removeItem(FB_KEY_STORE);
  } catch {
    /* ignore */
  }
};

const readCache = (): Cache | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Cache;
    if (!p?.videos?.length) return null;
    return p;
  } catch {
    return null;
  }
};
const writeCache = (c: Cache) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
};

/* --------------------------------------------------------------- networking */

const PROXIES: ((u: string) => string)[] = [
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  (u) => `https://api.cors.lol/?url=${encodeURIComponent(u)}`,
  (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
];

async function timedFetch(url: string, ms = 9000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: "follow" });
    if (!res.ok) throw new Error(String(res.status));
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

async function fetchViaProxy(target: string): Promise<string | null> {
  for (const wrap of PROXIES) {
    try {
      let body = await timedFetch(wrap(target));
      // allorigins /get wraps the payload in JSON
      if (body && body.trim().startsWith("{") && body.includes('"contents"')) {
        try {
          const inner = JSON.parse(body)?.contents;
          if (typeof inner === "string") body = inner;
        } catch {
          /* keep as-is */
        }
      }
      if (body && body.length > 200) return body;
    } catch {
      /* try next proxy */
    }
  }
  return null;
}

/** rss2json style JSON payload (used as a last resort for the YouTube feed). */
function parseRssJson(body: string): VideoItem[] {
  if (!body.trim().startsWith("{")) return [];
  try {
    const data = JSON.parse(body);
    const items = data?.items || data?.entries || [];
    return (items as any[])
      .map((it) => {
        const link: string = it.link || it.url || "";
        const id = it.videoId || it.id || (link.match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{6,})/)?.[1] ?? "");
        if (!id) return null;
        return {
          kind: "video",
          id,
          title: (it.title || "").trim(),
          date: it.pubDate || it.published || it.publishedAt || new Date().toISOString(),
          views: undefined,
          thumb: it.thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          link: `https://www.youtube.com/watch?v=${id}`,
        } as VideoItem;
      })
      .filter(Boolean) as VideoItem[];
  } catch {
    return [];
  }
}

/* -------------------------------------------------------------- youtube xml */

function parseYouTubeFeed(xml: string): VideoItem[] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) return [];
  const entries = Array.from(doc.getElementsByTagName("entry"));
  const out: VideoItem[] = [];
  for (const e of entries) {
    const get = (tag: string) => e.getElementsByTagName(tag)[0]?.textContent?.trim() || "";
    const id = get("yt:videoId") || get("videoId");
    if (!id) continue;
    const viewsRaw = e.getElementsByTagName("media:statistics")[0]?.getAttribute("views");
    const thumb =
      e.getElementsByTagName("media:thumbnail")[0]?.getAttribute("url") ||
      `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    out.push({
      kind: "video",
      id,
      title: get("media:title") || get("title"),
      date: get("published"),
      views: viewsRaw ? Number(viewsRaw) : undefined,
      thumb,
      link: `https://www.youtube.com/watch?v=${id}`,
    });
  }
  return out;
}

async function fetchYouTubeRss(): Promise<VideoItem[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${STUDIO.youtubeChannelId}`;
  const body = await fetchViaProxy(url);
  if (!body) return [];
  const xml = parseYouTubeFeed(body);
  if (xml.length) return xml;
  return parseRssJson(body);
}

async function fetchYouTubeApi(key: string): Promise<VideoItem[]> {
  const base = "https://www.googleapis.com/youtube/v3";
  const searchUrl = `${base}/search?key=${key}&channelId=${STUDIO.youtubeChannelId}&part=snippet&order=date&type=video&maxResults=12`;
  const raw = await timedFetch(searchUrl);
  const data = JSON.parse(raw);
  const ids: string[] = (data.items || []).map((i: any) => i.id?.videoId).filter(Boolean);
  if (!ids.length) return [];
  let stats: Record<string, any> = {};
  try {
    const sRaw = await timedFetch(`${base}/videos?key=${key}&part=statistics&id=${ids.join(",")}`);
    for (const v of JSON.parse(sRaw).items || []) stats[v.id] = v.statistics;
  } catch {
    /* stats optional */
  }
  return (data.items || []).map((i: any) => ({
    kind: "video",
    id: i.id.videoId,
    title: i.snippet.title,
    date: i.snippet.publishedAt,
    thumb: i.snippet.thumbnails?.high?.url || `https://i.ytimg.com/vi/${i.id.videoId}/hqdefault.jpg`,
    views: stats[i.id.videoId] ? Number(stats[i.id.videoId].viewCount) : undefined,
    link: `https://www.youtube.com/watch?v=${i.id.videoId}`,
  })) as VideoItem[];
}

/* ---------------------------------------------------------------- facebook */

async function fetchFacebook(token: string): Promise<PostItem[]> {
  const fields = "id,message,created_time,full_picture,permalink_url";
  const url = `https://graph.facebook.com/v21.0/${STUDIO.facebookPage}/posts?fields=${fields}&limit=12&access_token=${encodeURIComponent(
    token
  )}`;
  const raw = await timedFetch(url);
  const data = JSON.parse(raw);
  if (!data?.data) return [];
  return (data.data as any[])
    .filter((p) => p.message || p.full_picture)
    .map((p) => ({
      kind: "post",
      id: p.id,
      message: p.message || "",
      date: p.created_time,
      image: p.full_picture,
      link: p.permalink_url || STUDIO.facebook,
    })) as PostItem[];
}

/* ------------------------------------------------------------------- hook */

const fallbackVideos = (): VideoItem[] =>
  YT_SEED.map((v) => ({
    kind: "video",
    id: v.id,
    title: v.title,
    date: v.date,
    views: v.views,
    thumb: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    link: `https://www.youtube.com/watch?v=${v.id}`,
  }));

const fallbackPosts = (): PostItem[] =>
  FB_SEED.map((p) => ({ kind: "post", id: p.id, message: p.message, date: p.date, image: p.image, link: STUDIO.facebook }));

export type FeedState = {
  videos: VideoItem[];
  posts: PostItem[];
  source: "live" | "cached" | "showroom";
  lastSync: number | null;
  loading: boolean;
  note: string;
  refresh: () => void;
};

export function useLiveFeed(): FeedState {
  const cached = useRef<Cache | null>(typeof window === "undefined" ? null : readCache());
  const [videos, setVideos] = useState<VideoItem[]>(cached.current?.videos || fallbackVideos());
  const [posts, setPosts] = useState<PostItem[]>(cached.current?.posts || fallbackPosts());
  const [source, setSource] = useState<FeedState["source"]>(cached.current ? "cached" : "showroom");
  const [lastSync, setLastSync] = useState<number | null>(cached.current?.ts ?? null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const busy = useRef(false);

  const refresh = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    let gotLive = false;
    let msgs: string[] = [];

    let keepVideos = videos;
    let keepPosts = posts;

    try {
      const key = getYtKey();
      let vids = key ? await fetchYouTubeApi(key) : [];
      if (vids.length) {
        msgs.push("YouTube Data API");
      } else {
        vids = await fetchYouTubeRss();
        if (vids.length) msgs.push("YouTube feed");
      }
      if (vids.length) {
        setVideos(vids);
        keepVideos = vids;
        gotLive = true;
      }
    } catch {
      /* keep previous */
    }

    try {
      const fb = getFbToken();
      if (fb) {
        const p = await fetchFacebook(fb);
        if (p.length) {
          setPosts(p);
          keepPosts = p;
          gotLive = true;
          msgs.push("Facebook Graph API");
        }
      }
    } catch {
      /* keep previous */
    }

    if (gotLive) {
      const ts = Date.now();
      setLastSync(ts);
      setSource("live");
      setNote(`Synced via ${msgs.join(" + ")}`);
      writeCache({ videos: keepVideos, posts: keepPosts, ts });
    } else {
      setNote("Direct sync blocked by the browser — showing cached / studio library. Add an API key in Feed settings for guaranteed instant sync.");
      if (!cached.current) setSource("showroom");
    }
    setLoading(false);
    busy.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refresh();
    const iv = setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, REFRESH_MS);
    const onFocus = () => {
      if (document.visibilityState === "visible" && (!lastSync || Date.now() - lastSync > 60000)) refresh();
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onFocus);
    return () => {
      clearInterval(iv);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { videos, posts, source, lastSync, loading, note, refresh };
}

/* ---------------------------------------------------------------- helpers */

export const timeAgo = (iso: string) => {
  const t = new Date(iso).getTime();
  if (!t || Number.isNaN(t)) return "";
  const s = Math.max(1, Math.round((Date.now() - t) / 1000));
  const units: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [604800, "w"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [sec, lbl] of units) {
    if (s >= sec) return `${Math.floor(s / sec)}${lbl} ago`;
  }
  return `${s}s ago`;
};

export const compact = (n?: number) => {
  if (!n && n !== 0) return "";
  if (n < 1000) return `${n} views`;
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}K views`;
  return `${(n / 1_000_000).toFixed(1)}M views`;
};
