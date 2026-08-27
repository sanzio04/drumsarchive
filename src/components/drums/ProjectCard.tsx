import { cn } from "@/lib/utils";
import type { Project } from "./data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
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
          className="h-full w-full object-contain p-10 transition-transform duration-700 group-hover:scale-[1.03] sm:p-14"
        />
      </div>
      <div className="flex items-start justify-between gap-4 border-b border-line py-5">
        <div>
          <h3 className="display text-lg sm:text-xl">{project.title}</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {project.category}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        <span className="eyebrow shrink-0 pt-1">{project.index}</span>
      </div>
    </a>
  );
}
