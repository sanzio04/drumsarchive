import v1VerticalFragment from "@/assets/archive-vol01-new-clip.mp4.asset.json";
import aiCinema from "@/assets/archive-ai-cinema.mp4.asset.json";
import dontAskMe from "@/assets/archive-dont-ask-me.mp4.asset.json";
import gracias from "@/assets/archive-gracias.mp4.asset.json";
import stillLawn from "@/assets/archive-still-lawn.png.asset.json";
import stillStorm from "@/assets/archive-still-storm.png.asset.json";
import stillAntagonist from "@/assets/archive-still-antagonist.png.asset.json";
import stillPoster from "@/assets/archive-still-poster.jpg.asset.json";
import v2Grok from "@/assets/archive-v02-grok.mp4.asset.json";
import v2Steady from "@/assets/archive-v02-steady.mp4.asset.json";
import v2StillCam from "@/assets/archive-v02-still-cam.mp4.asset.json";
import v2P1244 from "@/assets/archive-v02-prompt-1244.mp4.asset.json";
import v2P1114 from "@/assets/archive-v02-prompt-1114.mp4.asset.json";
import v2P1109 from "@/assets/archive-v02-prompt-1109.mp4.asset.json";
import v2GridA from "@/assets/archive-v02-grid-a.jpeg.asset.json";
import v2GridB from "@/assets/archive-v02-grid-b.jpeg.asset.json";
import v2GridC from "@/assets/archive-v02-grid-c.jpeg.asset.json";
import v2GridD from "@/assets/archive-v02-grid-d.jpeg.asset.json";
import v3JanReels from "@/assets/archive-v03-jan-reels.mp4.asset.json";
import v3MonsterPet from "@/assets/archive-v03-monster-pet.mp4.asset.json";
import v3Primo from "@/assets/archive-v03-portrait-primo.png.asset.json";
import v3TeeA from "@/assets/archive-v03-tee-a.jpeg.asset.json";
import v3TeeB from "@/assets/archive-v03-tee-b.jpeg.asset.json";
import v3TeeC from "@/assets/archive-v03-tee-c.jpeg.asset.json";
import v3TeeD from "@/assets/archive-v03-tee-d.jpeg.asset.json";
import v3AnalogCar from "@/assets/archive-v03-analog-car.png.asset.json";
import v3Storm from "@/assets/archive-v03-storm-figure.png.asset.json";
import v3FireSuit from "@/assets/archive-v03-fire-suit.png.asset.json";

export type ArchiveClip = { title: string; src: string };
export type ArchiveStill = { title: string; src: string };

export type ArchivePiece = {
  slug: string;
  title: string;
  category: string;
  year: string;
  status: "published" | "in-preparation";
  summary: string;
  description: string[];
  cover?: string;
  clips: ArchiveClip[];
  stills: ArchiveStill[];
};

export const ARCHIVE_PIECES: ArchivePiece[] = [
  {
    slug: "vol-01",
    title: "Archive Vol. 01",
    category: "AI Film Fragments & Stills",
    year: "2026",
    status: "published",
    summary:
      "An open archive of DRUMS film fragments, tests, and cinematic stills — the raw material behind our finished productions.",
    description: [
      "Vol. 01 collects unreleased sequences and frames produced inside the DRUMS pipeline: atmosphere tests, character studies, and camera language explorations.",
      "Every piece here is generated and graded in-house. Nothing is stock, and nothing is final — this is the working surface of the studio.",
      "If a fragment fits a campaign, film, or music project you are developing, reference it by name and we will build from it.",
    ],
    cover: stillPoster.url,
    clips: [
      { title: "You Call It AI Cinema", src: aiCinema.url },
      { title: "Don't Ask Me", src: dontAskMe.url },
      { title: "Gracias", src: gracias.url },
      { title: "Vertical Fragment", src: v1VerticalFragment.url },
    ],
    stills: [
      { title: "I Hate That You're Happy Without Me", src: stillPoster.url },
      { title: "Rest Field", src: stillLawn.url },
      { title: "Storm Bearer", src: stillStorm.url },
      { title: "The Antagonist", src: stillAntagonist.url },
    ],
  },
  {
    slug: "vol-02",
    title: "Archive Vol. 02",
    category: "AI Film Fragments & Stills",
    year: "2026",
    status: "published",
    summary:
      "A coastal architecture and lifestyle study — still-camera sequences and sunlit frame grids built inside the DRUMS pipeline.",
    description: [
      "Vol. 02 turns to quiet space: concrete volumes on a headland, soft daylight, and a single presence moving through the frame.",
      "The moving pieces are locked-off and steady-camera studies. The stills are full frame grids from the same visual world, shot across golden hour and midday light.",
      "Reference any sequence or grid by name and we will develop it into a campaign, film, or brand world.",
    ],
    cover: v2GridC.url,
    clips: [
      { title: "Headland Study", src: v2Grok.url },
      { title: "Steady Frame 1080p", src: v2Steady.url },
      { title: "Still Camera 1080p", src: v2StillCam.url },
      { title: "Visual Prompt I", src: v2P1109.url },
      { title: "Visual Prompt II", src: v2P1114.url },
      { title: "Visual Prompt III", src: v2P1244.url },
    ],
    stills: [
      { title: "Golden Hour Grid I", src: v2GridA.url },
      { title: "Golden Hour Grid II", src: v2GridB.url },
      { title: "Daylight Grid I", src: v2GridC.url },
      { title: "Daylight Grid II", src: v2GridD.url },
    ],
  },
  {
    slug: "vol-03",
    title: "Archive Vol. 03",
    category: "AI Film Fragments & Stills",
    year: "2026",
    status: "published",
    summary:
      "Character, portrait, and brand-world studies — analog-leaning frames, DRUMS wardrobe portraits, and two moving fragments built in-house.",
    description: [
      "Vol. 03 moves closer to people: lens-driven portraits, film-stock grain, and the DRUMS identity worn in real space.",
      "The moving pieces sit at opposite ends of the studio range — a reels-format cut and a creature study graded for scale.",
      "Reference any frame or fragment by name and we will develop it into a campaign, film, or brand world.",
    ],
    cover: v3Primo.url,
    clips: [
      { title: "Jan Reels VIII", src: v3JanReels.url },
      { title: "The Monster Pet", src: v3MonsterPet.url },
    ],
    stills: [
      { title: "Primo Portrait", src: v3Primo.url },
      { title: "Superia Drive", src: v3AnalogCar.url },
      { title: "Storm Figure", src: v3Storm.url },
      { title: "Ceremony Suit", src: v3FireSuit.url },
      { title: "DRUMS Wardrobe I", src: v3TeeA.url },
      { title: "DRUMS Wardrobe II", src: v3TeeB.url },
      { title: "DRUMS Wardrobe III", src: v3TeeC.url },
      { title: "DRUMS Wardrobe IV", src: v3TeeD.url },
    ],
  },
];

export const getArchivePiece = (slug: string) =>
  ARCHIVE_PIECES.find((piece) => piece.slug === slug);

export const archiveInquiryUrl = (title: string) =>
  `https://wa.me/6287760434653?text=${encodeURIComponent(
    `Hi DRUMS, I'd like to discuss the archive piece "${title}".`,
  )}`;
