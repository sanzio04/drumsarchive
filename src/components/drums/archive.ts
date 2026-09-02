import videoProject6 from "@/assets/archive-video-project-6.mp4.asset.json";
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
      { title: "Project 6", src: videoProject6.url },
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
    status: "in-preparation",
    summary:
      "The second volume of the DRUMS Archive — sequences and frames currently being selected, graded, and prepared for release.",
    description: [
      "Vol. 02 is in preparation. The page is live so pieces can be published the moment they are approved.",
      "Expect the same working material as Vol. 01: atmosphere tests, character studies, and camera language explorations produced in-house.",
      "Looking for something specific before the volume opens? Ask and we will share the relevant frames directly.",
    ],
    clips: [],
    stills: [],
  },
  {
    slug: "vol-03",
    title: "Archive Vol. 03",
    category: "AI Film Fragments & Stills",
    year: "2026",
    status: "in-preparation",
    summary:
      "The third volume of the DRUMS Archive — reserved for the next batch of fragments and cinematic stills from the studio pipeline.",
    description: [
      "Vol. 03 is in preparation and will open once the next batch of material is finished.",
      "Each volume stays in the same format: moving frames first, stills second, every piece referenced by name.",
      "Reach out if you want early access to what is being built for this volume.",
    ],
    clips: [],
    stills: [],
  },
];

export const getArchivePiece = (slug: string) =>
  ARCHIVE_PIECES.find((piece) => piece.slug === slug);

export const archiveInquiryUrl = (title: string) =>
  `https://wa.me/6287760434653?text=${encodeURIComponent(
    `Hi DRUMS, I'd like to discuss the archive piece "${title}".`,
  )}`;
