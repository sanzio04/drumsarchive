import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendContactInquiry } from "@/lib/contact.functions";
import { SolidButton } from "@/components/drums/ui";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-left text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";

export function ContactForm() {
  const send = useServerFn(sendContactInquiry);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || payload.message.length < 10) {
      setStatus("error");
      setError("Please add your name, a valid email, and a short brief.");
      return;
    }

    setStatus("sending");
    setError(null);
    try {
      const result = await send({ data: payload });
      if (result.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(result.error);
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-14 w-full max-w-xl text-left">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Name</span>
          <input name="name" type="text" required maxLength={100} placeholder="Your name" className={fieldClass} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Email</span>
          <input name="email" type="email" required maxLength={255} placeholder="you@studio.com" className={fieldClass} />
        </label>
      </div>
      <label className="mt-6 block">
        <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Project brief</span>
        <textarea
          name="message"
          required
          rows={4}
          maxLength={2000}
          placeholder="Tell us about the film, campaign, or world you want to build."
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div className="mt-10 flex flex-col items-center gap-4">
        <SolidButton as="button" type="submit" disabled={status === "sending"} className="px-10 py-5">
          {status === "sending" ? "Sending…" : "Send Inquiry"}
        </SolidButton>
        <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
          {status === "sent" && "Thank you — your inquiry is on its way to our inbox."}
          {status === "error" && error}
        </p>
      </div>
    </form>
  );
}
