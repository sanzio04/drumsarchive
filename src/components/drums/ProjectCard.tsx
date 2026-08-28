import { cn } from "@/lib/utils";
import type { Project } from "./data";
import { useInView } from "./ui";

export function ProjectCard({ project }: { project: Project }) {
  const { ref, visible } = useInView<HTMLAnchorElement>({ threshold: 0.2 });

  return (
    <a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
      data-visible={visible}
      className="group block focus-visible:outline-offset-4"
    >
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden border border-line",
          project.coverTone === "white" ? "bg-white" : "bg-black",
        )}
      >
        <img
          src={project.cover}
          alt={`${project.title} logo`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-10 transition-[transform,filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] sm:p-14 md:grayscale md:group-hover:grayscale-0 md:group-focus-visible:grayscale-0"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-foreground/0 transition-colors duration-500 group-hover:border-foreground/40 group-focus-visible:border-foreground/40"
        />
      </div>
      <div className="relative flex items-start justify-between gap-4 py-5">
        <div className="fade-up" data-visible={visible}>
          <h3 className="display text-lg sm:text-xl">{project.title}</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {project.category}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-foreground/70 transition-colors duration-500 group-hover:text-foreground">
            View Project
            <span
              aria-hidden
              className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
        <span className="eyebrow shrink-0 pt-1">{project.index}</span>
        <span
          aria-hidden
          data-visible={visible}
          className="line-grow absolute inset-x-0 bottom-0 h-px bg-line"
        />
      </div>
    </a>
  );
}
