import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return canHover;
}

/** Observes an element once and reports when it first enters the viewport. */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...options },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}

export function Reveal({
  children,
  className,
  as: As = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "dl";
  delay?: number;
}) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.12 });

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

/** Reveals children (one per line) with a masked upward move and stagger. */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  stagger = 130,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <span ref={ref} data-visible={visible} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className={cn("mask-line", lineClassName)}>
          <span className="mask-line-inner" style={{ transitionDelay: `${i * stagger}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Thin divider that draws itself horizontally when scrolled into view. */
export function AnimatedDivider({ className }: { className?: string }) {
  const { ref, visible } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  return (
    <span
      ref={ref}
      data-visible={visible}
      aria-hidden
      className={cn("line-grow block h-px w-full bg-line", className)}
    />
  );
}

/** Restrained magnetic pointer follow, desktop only, a few pixels max. */
function useMagnetic<T extends HTMLElement>(strength = 6) {
  const ref = useRef<T | null>(null);
  const frame = useRef(0);
  const canHover = useCanHover();
  const reduced = usePrefersReducedMotion();
  const enabled = canHover && !reduced;

  const onMove = useCallback(
    (event: React.PointerEvent<T>) => {
      if (!enabled) return;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${(x * strength).toFixed(2)}px, ${(y * strength).toFixed(2)}px, 0)`;
      });
    },
    [enabled, strength],
  );

  const onLeave = useCallback(() => {
    const node = ref.current;
    cancelAnimationFrame(frame.current);
    if (node) node.style.transform = "";
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return { ref, onPointerMove: onMove, onPointerLeave: onLeave };
}

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-[transform,color,border-color] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function Arrow() {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
    >
      &rarr;
    </span>
  );
}

type SolidButtonProps =
  | ({ as?: "a" } & React.ComponentPropsWithoutRef<"a">)
  | ({ as: "button" } & React.ComponentPropsWithoutRef<"button">);

export function SolidButton({
  children,
  className,
  as: As = "a",
  ...props
}: SolidButtonProps & { children: ReactNode }) {
  const magnetic = useMagnetic<HTMLElement>(6);
  const Tag = As as "a";
  return (
    <Tag
      {...(props as React.ComponentPropsWithoutRef<"a">)}
      ref={magnetic.ref as never}
      onPointerMove={magnetic.onPointerMove as never}
      onPointerLeave={magnetic.onPointerLeave}
      className={cn(base, "bg-foreground text-background", className)}
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-background transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-foreground">
        {children}
      </span>
      <span className="relative z-10 transition-colors duration-500 group-hover:text-foreground">
        <Arrow />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </a>
  );
}

export function OutlineButton({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { children: ReactNode }) {
  const magnetic = useMagnetic<HTMLButtonElement>(5);
  return (
    <button
      type="button"
      {...props}
      ref={magnetic.ref}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      className={cn(base, "border border-foreground/40 text-foreground hover:border-foreground", className)}
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-background">
        {children}
      </span>
      <span className="relative z-10 transition-colors duration-500 group-hover:text-background">
        <Arrow />
      </span>
    </button>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="eyebrow">{children}</span>
      <AnimatedDivider className="flex-1" />
    </div>
  );
}

/** Counts a numeric stat up when it scrolls into view. Preserves suffixes like "K+". */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const { ref, visible } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value.trim());
  const target = match ? parseFloat(match[1]!) : null;
  const suffix = match ? match[2]! : "";
  const decimals = match && match[1]!.includes(".") ? 1 : 0;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!visible || target === null || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, reduced, duration]);

  if (target === null) {
    return (
      <span ref={ref} data-visible={visible} className="fade-up inline-block">
        {value}
      </span>
    );
  }

  const shown = reduced || !visible ? (reduced ? target : 0) : current;
  return (
    <span ref={ref} className="inline-block tabular-nums">
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Slow vertical parallax offset for a media element, desktop + motion allowed only. */
export function useParallax<T extends HTMLElement>(intensity = 40) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      node.style.setProperty("--parallax", `${(-progress * intensity).toFixed(2)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, intensity]);

  return ref;
}

/** Cinematic scroll-down cue for the hero. */
export function ScrollCue({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)} aria-hidden>
      <span className="text-[0.625rem] uppercase tracking-[0.28em] text-foreground/60">Scroll</span>
      <span className="relative h-10 w-px overflow-hidden bg-foreground/20">
        <span className="scroll-cue absolute inset-x-0 top-0 h-4 bg-foreground/80" />
      </span>
    </div>
  );
}
