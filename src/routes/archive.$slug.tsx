import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ARCHIVE_PIECES, archiveInquiryUrl, getArchivePiece } from "@/components/drums/archive";
import { LOGOS, MAILTO } from "@/components/drums/data";
import { Reveal, SectionLabel, SolidButton } from "@/components/drums/ui";

export const Route = createFileRoute("/archive/$slug")({
  loader: ({ params }) => {
    const piece = getArchivePiece(params.slug);
    if (!piece) throw notFound();
    return { piece };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Archive piece unavailable — DRUMS" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.piece.title} — DRUMS Archive`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.piece.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.piece.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ArchiveNotFound,
  component: ArchivePiecePage,
});

function ArchiveHeader() {
  return (
    <header className="border-b border-line px-5 py-5 sm:px-8">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between">
        <Link to="/" aria-label="DRUMS home">
          <img src={LOGOS.drums} alt="DRUMS" className="h-7 w-auto object-contain" />
        </Link>
        <Link
          to="/"
          hash="archive"
          className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to Archive
        </Link>
      </div>
    </header>
  );
}

function ArchiveNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ArchiveHeader />
      <main className="mx-auto max-w-[1500px] px-5 py-32 sm:px-8">
        <h1 className="display text-5xl">Piece not found</h1>
        <p className="mt-6 text-sm text-muted-foreground">
          This archive piece is unavailable or has been retired.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            hash="archive"
            className="text-sm uppercase tracking-[0.18em] underline underline-offset-4"
          >
            Return to the archive
          </Link>
        </div>
      </main>
    </div>
  );
}

function ArchivePiecePage() {
  const { piece } = Route.useLoaderData();
  const others = ARCHIVE_PIECES.filter((item) => item.slug !== piece.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ArchiveHeader />

      <main>
        <section className="px-5 pb-16 pt-20 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-[1500px]">
            <SectionLabel>DRUMS Archive · {piece.year}</SectionLabel>
            <h1 className="display mt-8 text-[13vw] leading-[0.9] sm:text-6xl lg:text-7xl">
              {piece.title}
            </h1>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {piece.category}
            </p>
            <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
              <p className="display text-2xl leading-snug sm:text-3xl">{piece.summary}</p>
              <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
                {piece.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {piece.clips.length > 0 && (
          <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-[1500px]">
              <SectionLabel>Moving Frames</SectionLabel>
              <ul className="mt-12 grid gap-10 sm:grid-cols-2">
                {piece.clips.map((clip, i) => (
                  <Reveal as="li" key={clip.title} delay={(i % 2) * 90}>
                    <div className="aspect-video w-full overflow-hidden border border-line bg-black">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      >
                        <source src={clip.src} type="video/mp4" />
                      </video>
                    </div>
                    <div className="border-b border-line py-5">
                      <h2 className="display text-lg sm:text-xl">{clip.title}</h2>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}

        {piece.stills.length > 0 && (
          <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-[1500px]">
              <SectionLabel>Stills</SectionLabel>
              <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {piece.stills.map((still, i) => (
                  <Reveal as="li" key={still.title} delay={(i % 3) * 80}>
                    <figure>
                      <div className="aspect-[4/3] w-full overflow-hidden border border-line bg-black">
                        <img
                          src={still.src}
                          alt={`${still.title} — DRUMS archive still`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                        />
                      </div>
                      <figcaption className="border-b border-line py-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {still.title}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}

        {piece.clips.length === 0 && piece.stills.length === 0 && (
          <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-[1500px]">
              <SectionLabel>In Preparation</SectionLabel>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((n) => (
                  <div
                    key={n}
                    className="flex aspect-video items-center justify-center border border-dashed border-line text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground"
                  >
                    Frame Pending
                  </div>
                ))}
              </div>
              <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                This volume is being graded and selected. Pieces appear here as soon as they are
                approved — reach out below to be notified or to request early access.
              </p>
            </div>
          </section>
        )}

        <section className="border-t border-line px-5 py-24 text-center sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="display text-[10vw] leading-[0.95] sm:text-5xl">
              Reference this piece in your inquiry.
            </h2>
            <p className="mt-6 text-sm text-muted-foreground">
              Mention &ldquo;{piece.title}&rdquo; and we will build a production around it.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SolidButton
                href={archiveInquiryUrl(piece.title)}
                target="_blank"
                rel="noreferrer noopener"
                className="px-8 py-4"
              >
                Inquire on WhatsApp
              </SolidButton>
              <Link
                to="/"
                hash="contact"
                className="border border-foreground/60 px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-foreground hover:text-background"
              >
                Use the Contact Form
              </Link>
            </div>
            <a
              href={MAILTO}
              className="mt-8 inline-block text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              archivedrums@gmail.com
            </a>
          </div>
        </section>

        {others.length > 0 && (
          <section className="border-t border-line px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-[1500px]">
              <SectionLabel>More from the Archive</SectionLabel>
              <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link to="/archive/$slug" params={{ slug: item.slug }} className="group block">
                      <div className="aspect-video w-full overflow-hidden border border-line bg-black">
                        <img
                          src={item.cover}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <h3 className="display border-b border-line py-4 text-lg">{item.title}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
