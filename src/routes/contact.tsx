import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Mail, MapPin, Clock, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — ResinMemory" },
      {
        name: "description",
        content: "Reach the ResinMemory atelier. We answer every message personally.",
      },
    ],
  }),
});

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Contact() {
  const [sent, setSent] = useState(false);
  const header = useReveal();
  const form = useReveal();
  const info0 = useReveal();
  const info1 = useReveal();
  const info2 = useReveal();

  const infoItems = [
    { Icon: Mail, label: "Email", value: "atelier@resinmemory.co", reveal: info0 },
    { Icon: MapPin, label: "Studio", value: "Rua do Ouro 42\n1100 Lisbon, Portugal", reveal: info1 },
    { Icon: Clock, label: "Hours", value: "Tue – Sat\n10:00 – 18:00", reveal: info2 },
  ];

  const fields = [
    { id: "name", label: "Your Name", type: "text", placeholder: "Name" },
    { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
    { id: "subject", label: "Subject", type: "text", placeholder: "What brings you to us?" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-28 lg:py-36">

      {/* Header */}
      <header
        ref={header.ref}
        className="text-center mb-24"
        style={{
          opacity: header.visible ? 1 : 0,
          transform: header.visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--gold)]" />
          <p className="text-[9px] uppercase tracking-[0.45em] text-gold">Get in Touch</p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--gold)]" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-light italic mb-6 leading-[1.05]">
          Write to the atelier
        </h1>
        <p className="max-w-sm mx-auto text-sm text-muted-foreground tracking-wide leading-relaxed">
          Every message is read and answered by hand within 48 hours.
        </p>
      </header>

      <div className="grid gap-16 lg:grid-cols-[1fr_2fr] items-start">

        {/* Info */}
        <aside className="space-y-0">
          {infoItems.map(({ Icon, label, value, reveal }, i) => (
            <div
              key={label}
              ref={reveal.ref}
              className="flex gap-5 py-8 border-b border-border group"
              style={{
                opacity: reveal.visible ? 1 : 0,
                transform: reveal.visible ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.7s ${i * 0.1 + 0.1}s, transform 0.7s ${i * 0.1 + 0.1}s`,
                borderTop: i === 0 ? "none" : undefined,
              }}
            >
              <div className="relative h-11 w-11 shrink-0 border border-gold/30 grid place-items-center text-gold overflow-hidden transition-all duration-500 group-hover:border-gold/60 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.25)]">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icon className="h-4 w-4 relative z-10" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.38em] text-gold mb-2.5">{label}</p>
                <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed tracking-wide">{value}</p>
              </div>
            </div>
          ))}
        </aside>

        {/* Form */}
        <div
          ref={form.ref}
          className="relative overflow-hidden border border-border bg-card p-12 lg:p-14"
          style={{
            opacity: form.visible ? 1 : 0,
            transform: form.visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s 0.2s cubic-bezier(.16,1,.3,1), transform 0.9s 0.2s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-radial-[circle] from-gold/6 to-transparent pointer-events-none" />

          {sent ? (
            <div className="py-16 text-center flex flex-col items-center gap-5">
              <div className="h-14 w-14 border border-gold/50 grid place-items-center text-gold">
                <Check className="h-5 w-5" />
              </div>
              <p className="text-[9px] uppercase tracking-[0.42em] text-gold">Message Sent</p>
              <h3 className="font-display text-4xl font-light">Thank you.</h3>
              <p className="text-sm text-muted-foreground tracking-wide">We'll write back within 48 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-9"
            >
              {fields.map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-[9px] uppercase tracking-[0.38em] text-gold mb-3.5">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    className="w-full bg-transparent border-b border-border pb-3.5 pt-1 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-gold/60 transition-colors duration-300 tracking-wide caret-gold"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-[9px] uppercase tracking-[0.38em] text-gold mb-3.5">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="Tell us about your vision…"
                  className="w-full bg-secondary/50 border border-border p-4 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none tracking-wide leading-relaxed caret-gold"
                />
              </div>

              <button
                type="submit"
                className="group relative overflow-hidden border border-gold text-gold text-[9px] uppercase tracking-[0.42em] px-10 py-5 transition-all duration-500 hover:text-primary-foreground hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
              >
                <span className="absolute inset-0 bg-gold translate-x-[-102%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]" />
                <span className="relative z-10">Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}