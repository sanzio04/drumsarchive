import { useEffect, useRef } from "react";

export type VideoModalProps = {
  videoId: string | null;
  title: string;
  onClose: () => void;
};

export function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!videoId) return;
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
    };
  }, [videoId, onClose]);

  if (!videoId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-100 flex items-center justify-center bg-background/97 p-4 sm:p-8"
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
            className="border border-foreground/40 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
          >
            Close
          </button>
        </div>
        <div className="aspect-video w-full bg-muted">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
