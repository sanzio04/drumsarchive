import { useEffect, useRef } from "react";

export type VideoModalProps = {
  videoId: string | null;
  title: string;
  onClose: () => void;
};

export function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!videoId) return;
    opener.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      opener.current?.focus?.();
    };
  }, [videoId, onClose]);

  if (!videoId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="modal-in fixed inset-0 z-100 flex items-center justify-center bg-black p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Close video"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />
      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="eyebrow">{title}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="group relative overflow-hidden border border-foreground/40 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-foreground"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
            />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-background">
              Close
            </span>
          </button>
        </div>
        <div className="aspect-video w-full bg-muted">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
