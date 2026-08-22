import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LOGOS, NAV_LINKS, WHATSAPP_URL } from "./data";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-line bg-background" : "bg-transparent",
      )}
    >
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
              className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="bg-foreground px-5 py-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-muted-foreground"
          >
            Start a Project
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
          className="border-t border-line bg-background md:hidden"
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
