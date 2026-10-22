export const STUDIO = {
  name: "Heaven Studio",
  nameBn: "হেভেন স্টুডিও",
  tagline: "Architecture • Structure • Interior • Engineering • Visualization",
  city: "Dhaka, Bangladesh",
  whatsappLocal: "01511280698",
  whatsappIntl: "8801511280698",
  email: "heavenarchitectsstudio@gmail.com",
  hours: "Sat – Thu · 9:00 AM – 9:00 PM (BST)",
  youtube: "https://youtube.com/@heavenarchitects",
  youtubeChannelId: "UCpnU9f5UwOw8Jfa9iEKlqBQ",
  youtubeHandle: "@heavenarchitects",
  facebook: "https://www.facebook.com/heavenarchitectsstudio",
  facebookPage: "heavenarchitectsstudio",
  instagram: "https://www.instagram.com/heavenarchitectsstudio",
  linkedin: "https://www.linkedin.com/company/heavenarchitectsstudio",
  pinterest: "https://www.pinterest.com/heavenarchitectsstudio",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=90.3742%2C23.7286%2C90.4402%2C23.8050&layer=mapnik&marker=23.7668%2C90.4072",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Dhaka%2C+Bangladesh",
};

export const waLink = (text = "Hello Heaven Studio, I would like a design consultation.") =>
  `https://wa.me/${STUDIO.whatsappIntl}?text=${encodeURIComponent(text)}`;

export const NAV = [
  { id: "home", label: "Home", num: "01" },
  { id: "about", label: "About us", num: "02" },
  { id: "services", label: "Services", num: "03" },
  { id: "projects", label: "Projects", num: "04" },
  { id: "feed", label: "Live social feed", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];

export type Service = {
  emoji: string;
  title: string;
  titleBn: string;
  code: string;
  desc: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    emoji: "🏛️",
    title: "Architectural Design",
    titleBn: "স্থাপত্য ডিজাইন",
    code: "ARC",
    desc: "Concept to working drawing — space planning, façade language, ventilation, daylight and by-laws compliant plans for homes, apartments, commercial and industrial buildings.",
    points: ["Concept & mood boards", "Floor plans, elevations, sections", "Site & setback analysis", "Working drawing set"],
  },
  {
    emoji: "📐",
    title: "Structural Design",
    titleBn: "কাঠামোগত ডিজাইন",
    code: "STR",
    desc: "BNBC / BDS code compliant RCC & steel structure designed by experienced engineers for seismic zone-2 wind loads, with bar bending schedules and safe economical detailing.",
    points: ["Foundation & column layout", "Beam, slab, stair detailing", "BBS & bar cutting list", "Load & stability calculation"],
  },
  {
    emoji: "⚡",
    title: "Electrical Design",
    titleBn: "ইলেকট্রিক্যাল ডিজাইন",
    code: "ELE",
    desc: "Complete single line diagram, load calculation, wiring layout, earthing, lightning protection and DB schedule for safe, future-ready power distribution.",
    points: ["Load calculation & SLD", "Wiring & lighting layout", "Earthing & LPS design", "DB schedule & BOQ"],
  },
  {
    emoji: "🚰",
    title: "Plumbing & Sanitary Design",
    titleBn: "প্লাম্বিং ও স্যানিটারি ডিজাইন",
    code: "PLB",
    desc: "Water supply, drainage, rainwater and sewerage systems laid out with correct slope, trap and vent logic — plus water tank, pump and septic planning.",
    points: ["Water supply scheme", "Drainage & soil line layout", "RWH & septic tank design", "Fixture BOQ"],
  },
  {
    emoji: "🔥",
    title: "Fire Safety Design",
    titleBn: "ফায়ার সেফটি ডিজাইন",
    code: "FIR",
    desc: "Fire detection, alarm, hydrant, sprinkler, escape route and compartmentation drawings prepared to meet RAJUK & Bangladesh Fire Service requirements.",
    points: ["Escape & smoke management", "Detector & alarm layout", "Hydrant / sprinkler system", "Fire license drawing set"],
  },
  {
    emoji: "🖥️",
    title: "3D Visualization & Animation",
    titleBn: "থ্রিডি ভিজ্যুয়ালাইজেশন ও অ্যানিমেশন",
    code: "3DX",
    desc: "Photoreal exterior & interior rendering, drone-matched composites, walkthrough animation and VR-ready scenes so you see the building before a single brick is cast.",
    points: ["Exterior / interior stills", "Cinematic walkthrough film", "Day & night lighting study", "360° VR panorama"],
  },
  {
    emoji: "🛋️",
    title: "Interior & Exterior Design",
    titleBn: "ইন্টেরিয়র ও এক্সটেরিয়র ডিজাইন",
    code: "INT",
    desc: "Material board, false ceiling, lighting scene, custom furniture and turnkey execution drawings for apartments, offices, showrooms and restaurants.",
    points: ["3D interior views", "False ceiling & lighting", "Material & furniture BOQ", "Site supervision"],
  },
  {
    emoji: "🌳",
    title: "Landscape Design",
    titleBn: "ল্যান্ডস্কেপ ডিজাইন",
    code: "LND",
    desc: "Roof garden, courtyard, lawn and hardscape design with irrigation, drainage and plant scheduling tuned for the Bangladeshi climate.",
    points: ["Master landscape plan", "Roof garden detailing", "Planting & irrigation plan", "Hardscape material palette"],
  },
  {
    emoji: "📋",
    title: "RAJUK Drawing & Approval Support",
    titleBn: "রাজউক ড্রয়িং ও অনুমোদন সহায়তা",
    code: "RAJ",
    desc: "Full RAJUK (and CDA / KDA / local authority) submission set — land use, authorized plan, soil report annexure, structural certificate — prepared and followed up for you.",
    points: ["Land use & clearance docs", "Submission drawing set", "Owner affidavit support", "Follow-up until approval"],
  },
  {
    emoji: "🧪",
    title: "Soil Test & Site Survey",
    titleBn: "সয়েল টেস্ট ও সাইট সার্ভে",
    code: "SOI",
    desc: "Boring, SPT, triaxial and proctor testing with signed engineer-stamped report, plus contour & total-station survey to lock your foundation design on facts.",
    points: ["SPT / boring test", "Bearing capacity report", "Contour & layout survey", "Report stamped by engineer"],
  },
  {
    emoji: "🏗️",
    title: "Construction Consultation & Supervision",
    titleBn: "নির্মাণ পরামর্শ ও সুপারভিশন",
    code: "CON",
    desc: "Realistic estimate, vendor & material specification, stage-wise inspection, quality photo reports and handover documentation — budget under control, quality on record.",
    points: ["Detailed cost estimate", "Stage-wise site visit", "Quality & safety audit", "As-built & handover docs"],
  },
];

export type Project = {
  name: string;
  nameBn?: string;
  location: string;
  type: string;
  area: string;
  year: string;
  image: string;
  tags: string[];
  progress?: number;
};

const P = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

export const ONGOING: Project[] = [
  {
    name: "Heaven Villa — Classical Duplex",
    nameBn: "ক্লাসিক্যাল ডুপ্লেক্স ভিলা",
    location: "Uttara Sector 12, Dhaka",
    type: "Residential · 5 Bed Duplex",
    area: "4,850 sft",
    year: "2026",
    image: P(34378030),
    tags: ["Architecture", "Structure", "Interior"],
    progress: 72,
  },
  {
    name: "Green Crest Apartment Block",
    location: "Bashundhara R/A, Dhaka",
    type: "Residential · G+7",
    area: "11,200 sft",
    year: "2026",
    image: P(10135453),
    tags: ["RAJUK", "Structure", "Fire Safety"],
    progress: 45,
  },
  {
    name: "Tin Shed Rural Home Series",
    nameBn: "গ্রামীণ টিনশেড বাড়ি",
    location: "Manikganj",
    type: "Affordable Housing · 4 Bed",
    area: "1,320 sft",
    year: "2026",
    image: P(740587),
    tags: ["Low cost", "3D Animation"],
    progress: 88,
  },
  {
    name: "Aurora Corporate Interior",
    location: "Gulshan Avenue, Dhaka",
    type: "Office Interior · 2 Floors",
    area: "6,400 sft",
    year: "2026",
    image: P(12441654),
    tags: ["Interior", "Electrical", "HVAC"],
    progress: 34,
  },
];

export const DELIVERED: Project[] = [
  {
    name: "Skyline Courtyard House",
    location: "Dhanmondi, Dhaka",
    type: "Residential Duplex",
    area: "3,900 sft",
    year: "2025",
    image: P(8134750),
    tags: ["Architecture", "Landscape"],
  },
  {
    name: "White Canvas Residence",
    location: "Purbachal, Dhaka",
    type: "Private Villa",
    area: "5,600 sft",
    year: "2025",
    image: P(10610733),
    tags: ["Architecture", "3D", "RAJUK"],
  },
  {
    name: "Terrace House Marbella Style",
    location: "Chattogram",
    type: "Residential · G+4",
    area: "7,150 sft",
    year: "2024",
    image: P(34188660),
    tags: ["Structure", "Supervision"],
  },
  {
    name: "Lagoon Edge Villa",
    location: "Cox's Bazar",
    type: "Resort Villa",
    area: "2,780 sft",
    year: "2024",
    image: P(16573669),
    tags: ["Architecture", "Landscape", "3D"],
  },
  {
    name: "Hillside Retreat",
    location: "Sajek, Rangamati",
    type: "Boutique Resort",
    area: "9,300 sft",
    year: "2024",
    image: P(7031606),
    tags: ["Architecture", "Soil Test"],
  },
  {
    name: "Gallery Loft Interior",
    location: "Banani, Dhaka",
    type: "Apartment Interior",
    area: "2,250 sft",
    year: "2023",
    image: P(8134752),
    tags: ["Interior", "Furniture"],
  },
  {
    name: "Monochrome Family Flat",
    location: "Mirpur DOHS, Dhaka",
    type: "Apartment Interior",
    area: "1,850 sft",
    year: "2023",
    image: P(6283973),
    tags: ["Interior", "Electrical"],
  },
  {
    name: "Amber Suite Residence",
    location: "Uttara, Dhaka",
    type: "Duplex Interior",
    area: "3,120 sft",
    year: "2022",
    image: P(23916869),
    tags: ["Interior", "Landscape"],
  },
];

export const STATS = [
  { value: "1,140+", label: "Design IDs delivered" },
  { value: "12 yrs", label: "Studio practice" },
  { value: "64", label: "Districts served" },
  { value: "4.9★", label: "Client rating" },
];

export const PROCESS = [
  { n: "01", t: "Consult & Brief", d: "Free WhatsApp / call consultation — plot size, facing, budget, family needs and dream references." },
  { n: "02", t: "Concept & Plan", d: "Multiple floor plan options with area statement, setback check and cost indication." },
  { n: "03", t: "3D & Approval", d: "Photoreal 3D views + walkthrough, then RAJUK / authority drawing set and submission." },
  { n: "04", t: "Build & Handover", d: "Structural & MEP detail, estimate, stage-wise supervision until keys are in your hand." },
];

/** Real videos from the channel — used as instant content + offline fallback while the live feed syncs. */
export const YT_SEED = [
  {
    id: "C91fcIvX64o",
    title: "ক্লাসিক্যাল ডুপ্লেক্স বাড়ির ডিজাইন | 5 Bedroom Classical Duplex House | Heaven STUDIO | ID_1143",
    date: "2026-10-21T08:34:48+00:00",
    views: 1,
  },
  {
    id: "kW_AWMrwCvU",
    title: "৪ বেডরুমের আধুনিক টিন শেড বাড়ির ডিজাইন | 4 Bedroom Tin Shed House Design | Heaven STUDIO | ID_1141",
    date: "2026-10-20T18:59:18+00:00",
    views: 14,
  },
  {
    id: "fJUz9wiXL84",
    title: "৫ বেডরুমের ডুপ্লেক্স বাড়ির ডিজাইন | ছাদে BBQ জোন | Duplex House Design | Heaven STUDIO | ID_1140",
    date: "2026-10-19T05:07:46+00:00",
    views: 179,
  },
  {
    id: "73wao6wCtp4",
    title: "২৩×২১ ফুটে ২ বেডরুমের একতলা বাড়ির ডিজাইন | 2 Bedroom Small House Design | Heaven STUDIO | ID_1140",
    date: "2026-10-17T17:23:36+00:00",
    views: 303,
  },
  {
    id: "ESAY3JRJ9_I",
    title: "গ্রামের জন্য পারফেক্ট ৩ বেডরুম টিনশেড বাড়ির ডিজাইন | 3 Bedroom TinShed House | Heaven Architects",
    date: "2026-04-04T13:47:12+00:00",
    views: 156,
  },
  {
    id: "2F6CZYf2meE",
    title: "২ রুমের টিনশেড বাড়ির ডিজাইন ও খরচ | Low Cost Modern Tin Shed House | Heaven Architects",
    date: "2026-03-28T15:33:39+00:00",
    views: 189,
  },
  {
    id: "DR_ZcxaAg9A",
    title: "Low Cost Duplex House Design | Best Duplex Home in America | Heaven Architects",
    date: "2026-03-26T07:48:06+00:00",
    views: 164,
  },
  {
    id: "8r4gPus5hqw",
    title: "নান্দনিক ১ তলা বাড়ি | ৫ রুমের বাড়ির ডিজাইন | Bangladesh House Design | Heaven Architects | ID_1137",
    date: "2026-03-25T16:04:19+00:00",
    views: 100,
  },
];

export const FB_SEED = [
  {
    id: "seed-fb-1",
    message:
      "🏛️ নতুন প্রজেক্ট: ৫ বেডরুমের ক্লাসিক্যাল ডুপ্লেক্স — সামনে রিফ্লেক্টিং পুল, ছাদে BBQ জোন। সম্পূর্ণ ড্রয়িং সেট ও 3D অ্যানিমেশন Heaven Studio থেকে।",
    date: "2026-10-21T09:12:00+00:00",
    image: P(34378030),
  },
  {
    id: "seed-fb-2",
    message:
      "📐 কাঠামোগত ডিজাইন টিপস: কলামের স্পেসিং ঠিক রাখলে খরচ ৮–১২% কমে যায়। আপনার প্লটের ফাউন্ডেশন প্ল্যান ফ্রি রিভিউ করতে মেসেজ করুন।",
    date: "2026-10-18T14:05:00+00:00",
    image: P(4458205),
  },
  {
    id: "seed-fb-3",
    message:
      "🛋️ ইন্টেরিয়র হ্যান্ডওভার — গুলশানে ৬,৪০০ বর্গফুট কর্পোরেট অফিস। ম্যাটেরিয়াল বোর্ড থেকে ফার্নিচার BOQ পর্যন্ত টার্নকি।",
    date: "2026-10-12T10:40:00+00:00",
    image: P(12441654),
  },
];

export const SOCIALS = [
  { label: "YouTube", handle: STUDIO.youtubeHandle, url: STUDIO.youtube, color: "#FF0033" },
  { label: "Facebook", handle: "/" + STUDIO.facebookPage, url: STUDIO.facebook, color: "#1877F2" },
  { label: "WhatsApp", handle: STUDIO.whatsappLocal, url: waLink(), color: "#25D366" },
  { label: "Instagram", handle: "@" + STUDIO.facebookPage, url: STUDIO.instagram, color: "#E1306C" },
  { label: "LinkedIn", handle: "/" + STUDIO.facebookPage, url: STUDIO.linkedin, color: "#0A66C2" },
  { label: "Pinterest", handle: "/" + STUDIO.facebookPage, url: STUDIO.pinterest, color: "#E60023" },
  { label: "Email", handle: STUDIO.email, url: `mailto:${STUDIO.email}`, color: "#C9A05A" },
];
