import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import showreelAsset from "@/assets/showreel.mp4.asset.json";
import { Nav } from "@/components/drums/Nav";
import { ProjectCard } from "@/components/drums/ProjectCard";
import { VideoModal } from "@/components/drums/VideoModal";
import { OutlineButton, Reveal, SectionLabel, SolidButton } from "@/components/drums/ui";
import {
  COLLABORATORS,
  HOMEBODY_ID,
  INSTAGRAM_URL,
  LOGOS,
  MAILTO,
  PROJECTS,
  PROVEN_IMPACT,
  SERVICES,
  STATS,
  WHATSAPP_URL,
} from "@/components/drums/data";


const TITLE = "DRUMS — Advanced AI Video Generation Agency";
const DESCRIPTION =
  "DRUMS is an advanced AI video generation agency from Indonesia creating cinematic films, campaigns, activation reels, music videos, and visual experiences.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "DRUMS",
          description: DESCRIPTION,
          url: "/",
          areaServed: "Indonesia",
          sameAs: [INSTAGRAM_URL],
        }),
      },
    ],
  }),
});

function Index() {
  const [video, setVideo] = useState<{ id: string; title: string } | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const el = heroVideoRef.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    if (!next) {
      el.volume = 1;
      void el.play();
    }
    setMuted(next);
  };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Nav />

      <main>
        {/* HERO */}
        <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-14 pt-32 sm:px-8">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          >
            <source src={showreelAsset.url} type="video/mp4" />
          </video>
          <div
            aria-hidden
            className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/45 to-background/10"
          />
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Turn showreel sound on" : "Turn showreel sound off"}
            aria-pressed={!muted}
            className="absolute right-5 top-24 z-20 flex items-center gap-2 border border-foreground/40 bg-background/40 px-4 py-2 text-[0.6875rem] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background sm:right-8"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {muted ? "Sound On" : "Sound Off"}
          </button>


          <div className="relative z-10 mx-auto w-full max-w-[1500px]">
            <img
              src={LOGOS.drums}
              alt="DRUMS"
              width={220}
              height={60}
              className="h-8 w-auto object-contain sm:h-10"
            />
            <h1 className="display mt-8 text-[17vw] leading-[0.85] sm:text-[13vw] lg:text-[11.5vw]">
              Visualize
              <br />
              Impossible
            </h1>
            <div className="mt-10 grid gap-10 border-t border-line/60 pt-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
              <p className="max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                Advanced AI films, campaigns, and visual worlds created beyond the limits of
                traditional production.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <SolidButton href={WHATSAPP_URL} target="_blank" rel="noreferrer noopener">
                  Start an AI Production
                </SolidButton>
              </div>
            </div>
          </div>
        </section>


        {/* ABOUT */}
        <section id="about" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1500px]">
            <SectionLabel>About DRUMS</SectionLabel>
            <Reveal className="mt-12 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
              <h2 className="display text-[7vw] leading-[0.95] sm:text-5xl lg:text-6xl">
                DRUMS is a pioneering advanced AI video generation agency from Indonesia, built by a
                team of filmmakers, visual artists, and AI creators.
              </h2>
              <div className="space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  We combine cinematic storytelling with emerging technology to transform ambitious
                  ideas into films, activation reels, and high-impact visual experiences—without the
                  traditional limits of production.
                </p>
                <p>
                  Our work is created for growing businesses, established companies, and visionary
                  brands ready to move beyond conventional content.
                </p>
                <p className="text-foreground">
                  This is more than a new production method. It is a new creative movement.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* RECOGNITION */}
        <section id="recognition" className="border-t border-line bg-foreground text-background">
          <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24">
            <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-background/60">
              Recognition &amp; Results
            </p>
            <dl className="mt-12 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 80}
                  className="border-t border-background/20 pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:first:border-l-0 sm:first:pl-0 lg:pl-8"
                >
                  <dt className="display text-[11vw] leading-none sm:text-5xl lg:text-6xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-3 text-xs uppercase tracking-[0.2em] text-background/70">
                    {stat.label}
                  </dd>
                </Reveal>
              ))}
            </dl>
            <p className="mt-12 text-xs text-background/60">
              Digital performance recorded over the last 90 days.
            </p>
          </div>
        </section>

        {/* FEATURED PROJECT */}
        <section id="work" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1500px]">
            <SectionLabel>Festival</SectionLabel>
            <Reveal className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
              <div className="relative aspect-video w-full overflow-hidden border border-line bg-black">
                <img
                  src={LOGOS.homebody}
                  alt="Homebody — AI short film still"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="display text-[13vw] leading-none sm:text-6xl">Homebody</h2>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  AI Short Film
                </p>
                <p className="mt-6 border-t border-line pt-6 text-sm uppercase tracking-[0.14em]">
                  2nd Place Winner — AI Cinefest Jakarta
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Created in collaboration with Telkomsel through AI Cinefest Indonesia.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  An award-winning AI short film demonstrating DRUMS&rsquo; approach to cinematic
                  storytelling through advanced generative production.
                </p>
                <div className="mt-8">
                  <OutlineButton
                    onClick={() => setVideo({ id: HOMEBODY_ID, title: "Homebody — AI Short Film" })}
                  >
                    Watch Film
                  </OutlineButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1500px]">
            <h2 className="display text-[13vw] leading-none sm:text-6xl lg:text-7xl">
              Selected Work
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              AI-generated films, campaigns, and visual experiences created across technology, music,
              products, and culture.
            </p>
            <ul className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:gap-x-12">
              {PROJECTS.map((project, i) => (
                <Reveal as="li" key={project.title} delay={(i % 2) * 90}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* PROVEN IMPACT */}
        <section id="impact" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1500px]">
            <SectionLabel>Proven Impact</SectionLabel>
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
              <Reveal>
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-black">
                  <img
                    src={PROVEN_IMPACT.thumbnail}
                    alt={PROVEN_IMPACT.thumbnailAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Verified results from a single DRUMS campaign
                </p>
              </Reveal>
              <div className="flex flex-col justify-center">
                <Reveal>
                  <h2 className="display text-[13vw] leading-none sm:text-6xl lg:text-7xl">
                    {PROVEN_IMPACT.headline}
                  </h2>
                </Reveal>
                <dl className="mt-10 grid grid-cols-2 gap-px">
                  {PROVEN_IMPACT.stats.map((stat, i) => (
                    <Reveal
                      key={stat.label}
                      delay={i * 80}
                      className="border-t border-line py-6 first:border-t-0 sm:py-8"
                    >
                      <dt className="display text-[8vw] leading-none sm:text-4xl lg:text-5xl">
                        {stat.value}
                      </dt>
                      <dd className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {stat.label}
                      </dd>
                    </Reveal>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-[1500px]">
            <SectionLabel>Services</SectionLabel>
            <h2 className="display mt-10 max-w-4xl text-[11vw] leading-[0.95] sm:text-6xl lg:text-7xl">
              Ideas Without Production Limits
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              As audiences demand more distinctive visual experiences, DRUMS enables brands and
              businesses to create advanced AI film campaigns with greater creative freedom, faster
              execution, and cinematic impact.
            </p>
            <ul className="mt-16">
              {SERVICES.map((service) => (
                <Reveal as="li" key={service.index} className="group border-t border-line last:border-b">
                  <div className="grid gap-4 py-8 transition-transform duration-500 group-hover:translate-x-2 sm:grid-cols-[auto_1fr_1fr] sm:gap-10 sm:py-10">
                    <span className="eyebrow pt-2">{service.index}</span>
                    <h3 className="display text-[8vw] leading-none sm:text-4xl">{service.title}</h3>
                    <div className="text-sm leading-relaxed text-muted-foreground">
                      <p>{service.description}</p>
                      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-foreground/80">
                        Ideal for: {service.ideal}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* COLLABORATIONS */}
        <section className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
            <h2 className="display max-w-4xl text-[8vw] leading-[1] sm:text-4xl lg:text-5xl">
              Selected Collaborations, Platforms &amp; Screenings
            </h2>
          </div>
          <div className="mt-14 overflow-hidden border-y border-line py-10">
            <div className="marquee-track flex w-max items-center gap-16 px-8 sm:gap-24">
              {[...COLLABORATORS, ...COLLABORATORS].map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="flex h-16 w-32 shrink-0 items-center justify-center sm:h-20 sm:w-44"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className={`max-h-full max-w-full object-contain opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 ${
                      logo.invert ? "invert" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          id="contact"
          className="grain relative overflow-hidden border-t border-line px-5 py-28 text-center sm:px-8 sm:py-36"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="display text-[11vw] leading-[0.95] sm:text-6xl lg:text-7xl">
              Your vision doesn&rsquo;t need to be filmable.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground">It needs to be unforgettable.</p>
            <div className="mt-12 flex flex-col items-center gap-6">
              <SolidButton
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="px-10 py-5"
              >
                Create the Unfilmable
              </SolidButton>
              <a
                href={MAILTO}
                className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                archivedrums@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <img
            src={LOGOS.drums}
            alt="DRUMS"
            width={160}
            height={44}
            loading="lazy"
            className="h-7 w-auto object-contain"
          />
          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm sm:items-end">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram — @drums.archive
            </a>
            <a
              href={MAILTO}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Email
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              WhatsApp
            </a>
            <a href="#top" className="text-muted-foreground transition-colors hover:text-foreground">
              Back to top
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-10 max-w-[1500px] border-t border-line pt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          © 2026 DRUMS
        </p>
      </footer>

      <VideoModal
        videoId={video?.id ?? null}
        title={video?.title ?? "Video"}
        onClose={() => setVideo(null)}
      />
    </div>
  );
}
