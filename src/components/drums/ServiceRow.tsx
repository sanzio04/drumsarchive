import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCanHover } from "./ui";

export type Service = {
  index: string;
  title: string;
  description: string;
  ideal: string;
};

export function ServiceRow({
  service,
  expanded,
  anyExpanded,
  onToggle,
}: {
  service: Service;
  expanded: boolean;
  anyExpanded?: boolean;
  onToggle: () => void;
}) {
  const canHover = useCanHover();
  const [hovered, setHovered] = useState(false);
  const hoverOpen = canHover && hovered && !anyExpanded;
  const open = hoverOpen || expanded;

  return (
    <div
      className="group border-t border-line last:border-b"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={onToggle}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-expanded={open}
        className="flex w-full items-center gap-6 py-8 text-left transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:gap-10 sm:py-10"
      >
        <span className="eyebrow shrink-0">{service.index}</span>
        <h3 className="display flex-1 text-[8vw] leading-none sm:text-4xl">{service.title}</h3>
        <span aria-hidden className="relative h-4 w-4 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-foreground" />
          <span
            className={cn(
              "absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-foreground transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
              open ? "scale-y-0" : "scale-y-100",
            )}
          />
        </span>
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="max-w-2xl pb-8 pl-0 text-sm leading-relaxed text-muted-foreground sm:pb-10 sm:pl-[calc(2rem+2.5rem)]">
            <p>{service.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-foreground/80">
              Ideal for: {service.ideal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
