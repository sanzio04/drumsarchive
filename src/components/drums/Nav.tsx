import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LOGOS, NAV_LINKS, WHATSAPP_URL } from "./data";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 40);
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((link) => link.href.slice(1));
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        scrolled || open
          ? "border-b border-line bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-foreground/90"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" aria-label="DRUMS home" className="shrink-0">
          <img
            src={LOGOS.drums}
            alt="DRUMS"
            width={140}
            height={40}
            className="h-7 w-auto object-contain sm:h-8"
          />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "group relative text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300",
                active === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-foreground transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                  active === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative overflow-hidden bg-foreground px-5 py-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-background"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-background transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 border border-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-foreground">
              Start a Project
            </span>
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="animate-fade-in border-t border-line bg-background md:hidden"
        >
          <ul className="flex flex-col px-5 pb-6 pt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display block py-4 text-2xl"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="block bg-foreground px-6 py-4 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em] text-background"
              >
                Start a Project
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
