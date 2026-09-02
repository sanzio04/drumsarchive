import videoProject6 from "@/assets/archive-video-project-6.mp4.asset.json";
import aiCinema from "@/assets/archive-ai-cinema.mp4.asset.json";
import dontAskMe from "@/assets/archive-dont-ask-me.mp4.asset.json";
import gracias from "@/assets/archive-gracias.mp4.asset.json";
import stillLawn from "@/assets/archive-still-lawn.png.asset.json";
import stillStorm from "@/assets/archive-still-storm.png.asset.json";
import stillAntagonist from "@/assets/archive-still-antagonist.png.asset.json";
import stillPoster from "@/assets/archive-still-poster.jpg.asset.json";

export type ArchiveClip = { title: string; src: string };
export type ArchiveStill = { title: string; src: string };

export type ArchivePiece = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string[];
  cover: string;
  clips: ArchiveClip[];
  stills: ArchiveStill[];
};

export const ARCHIVE_PIECES: ArchivePiece[] = [
  {
    slug: "vol-01",
    title: "Archive Vol. 01",
    category: "AI Film Fragments & Stills",
    year: "2026",
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
];

export const getArchivePiece = (slug: string) =>
  ARCHIVE_PIECES.find((piece) => piece.slug === slug);

export const archiveInquiryUrl = (title: string) =>
  `https://wa.me/6287760434653?text=${encodeURIComponent(
    `Hi DRUMS, I'd like to discuss the archive piece "${title}".`,
  )}`;
