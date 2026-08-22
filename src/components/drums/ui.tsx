import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  as: As = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = As as "div";
  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300";

export function SolidButton({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { children: ReactNode }) {
  return (
    <a
      {...props}
      className={cn(base, "bg-foreground text-background hover:bg-muted-foreground", className)}
    >
      {children}
    </a>
  );
}

export function OutlineButton({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { children: ReactNode }) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        base,
        "border border-foreground/40 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="eyebrow">{children}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
