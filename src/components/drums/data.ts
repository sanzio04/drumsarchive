import aicinefest from "@/assets/aicinefest.jpg.asset.json";
import hailuo from "@/assets/hailuo-ai.jpg.asset.json";
import huawei from "@/assets/huawei.jpg.asset.json";
import dreamina from "@/assets/dreamina.jpg.asset.json";
import introverse from "@/assets/introverse.jpg.asset.json";
import kalypso from "@/assets/kalypso.png.asset.json";
import fixnet from "@/assets/fixnet.png.asset.json";
import mbloc from "@/assets/mbloc.jpg.asset.json";
import drumsLogo from "@/assets/drums-logo-white-transparent.png.asset.json";

export const LOGOS = {
  drums: drumsLogo.url,
  aicinefest: aicinefest.url,
  hailuo: hailuo.url,
  huawei: huawei.url,
  dreamina: dreamina.url,
  introverse: introverse.url,
  kalypso: kalypso.url,
  fixnet: fixnet.url,
  mbloc: mbloc.url,
};

export const WHATSAPP_URL =
  "https://wa.me/6287760434653?text=Hi%20DRUMS%2C%20I%27d%20like%20to%20discuss%20an%20AI%20video%20project.";
export const INSTAGRAM_URL = "https://www.instagram.com/drums.archive/";
export const MAILTO = "mailto:archivedrums@gmail.com";
export const SHOWREEL_ID = "y1TQnVTZ09k";
export const HOMEBODY_ID = "S6Oi205lmVU";

export type Project = {
  index: string;
  title: string;
  category: string;
  description: string;
  href: string;
  cover: string;
  coverTone: "black" | "white";
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Hailuo AI — MiniMax H3",
    category: "AI Commercials & Campaigns",
    description:
      "Launch content highlighting MiniMax H3's top-tier quality and versatile reference capabilities.",
    href: "https://share.google/sOT53Zn60AvaxRzav",
    cover: LOGOS.hailuo,
    coverTone: "white",
  },
  {
    index: "02",
    title: "Huawei Indonesia",
    category: "AI Commercials & Campaigns",
    description:
      "An AI-generated visual campaign developed in collaboration with Huawei Indonesia.",
    href: "https://share.google/6eJF5RPooLmPsE463",
    cover: LOGOS.huawei,
    coverTone: "white",
  },
  {
    index: "03",
    title: "Dreamina — AI Avatar Generator",
    category: "AI Activation Reels",
    description:
      "An activation reel demonstrating realistic talking avatars created with Dreamina's AI avatar technology.",
    href: "https://share.google/ZxlPWeIdxHslAbopB",
    cover: LOGOS.dreamina,
    coverTone: "black",
  },
  {
    index: "04",
    title: "Introverse Project",
    category: "AI Music Videos & Visualizers",
    description:
      "An ongoing music-video series translating sound, rhythm, and emotion into original AI-generated visual worlds.",
    href: "https://www.instagram.com/introverse.project/",
    cover: LOGOS.introverse,
    coverTone: "black",
  },
  {
    index: "05",
    title: "Kalypso Perfume",
    category: "AI Product Visualizer",
    description:
      "A cinematic AI product visualizer transforming a fragrance identity into an atmospheric visual experience.",
    href: "https://drive.google.com/drive/folders/1XsdgMyWd0Vhypivu9bbgNrNF273XQp6U",
    cover: LOGOS.kalypso,
    coverTone: "white",
  },
];

export const SERVICES = [
  {
    index: "01",
    title: "AI Film Production",
    description:
      "End-to-end AI filmmaking—from concept development and visual direction to generation, editing, sound design, and final delivery.",
    ideal: "Short films, narrative content, and branded stories.",
  },
  {
    index: "02",
    title: "AI Commercials & Campaigns",
    description:
      "Cinematic campaign films that transform products, messages, and brand identities into distinctive visual experiences.",
    ideal: "Product launches, digital campaigns, and brand advertising.",
  },
  {
    index: "03",
    title: "AI Activation Reels",
    description:
      "Fast-moving, high-impact content designed to generate attention across social media and digital activations.",
    ideal: "Events, promotions, announcements, and social campaigns.",
  },
  {
    index: "04",
    title: "AI Music Videos & Visualizers",
    description:
      "Original AI-generated worlds developed around the identity, emotion, and rhythm of music.",
    ideal: "Artists, labels, singles, and album campaigns.",
  },
];

export const COLLABORATORS = [
  { name: "AI Cinefest", src: LOGOS.aicinefest },
  { name: "Hailuo AI", src: LOGOS.hailuo },
  { name: "Huawei", src: LOGOS.huawei },
  { name: "Fixnet", src: LOGOS.fixnet },
  { name: "Dreamina", src: LOGOS.dreamina },
  { name: "Introverse", src: LOGOS.introverse },
  { name: "M Bloc", src: LOGOS.mbloc },
  { name: "Kalypso Perfume", src: LOGOS.kalypso },
];

export const STATS = [
  { value: "849K+", label: "Content Views" },
  { value: "559K+", label: "Viewers Reached" },
  { value: "41K+", label: "Content Interactions" },
  { value: "2ND PLACE", label: "AI Cinefest Jakarta" },
];

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Recognition", href: "#recognition" },
  { label: "Contact", href: "#contact" },
];
