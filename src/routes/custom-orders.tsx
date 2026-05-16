import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/custom-orders")({
  component: CustomOrders,
  head: () => ({
    meta: [
      { title: "Custom Orders — ResinMemory" },
      { name: "description", content: "Commission a one-of-a-kind resin keepsake. Tell us your story." },
    ],
  }),
});

const includes = [
  "Private 30-minute consultation with the atelier",
  "Hand-selected gold leaf, dried florals or personal inclusions",
  "Numbered edition certificate, signed by Inês",
  "Champagne silk wrapping & wooden display box",
];

function CustomOrders() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 py-24 text-center animate-fade-up">
        <Sparkles className="mx-auto h-8 w-8 text-gold mb-6" />
        <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">Bespoke</p>
        <h1 className="font-display text-5xl md:text-7xl mb-8 leading-[1.05]">
          Your memory, <em className="text-gold">cast</em> in resin.
        </h1>
        <p className="max-w-2xl mx-auto text-foreground/80 text-lg leading-relaxed">
          A locket of hair. The lace from a wedding. A pressed flower from a first date. Send us what matters and we'll preserve it forever.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">What's Included</p>
            <h2 className="font-display text-3xl mb-8">Every commission includes</h2>
            <ul className="space-y-4">
              {includes.map((t, i) => (
                <li key={i} className="flex gap-4 text-sm text-foreground/80 leading-relaxed">
                  <span className="font-display text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 border border-gold/30 bg-card">
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">Investment</p>
            <p className="font-display text-4xl mb-2">From $280</p>
            <p className="text-sm text-muted-foreground">Final price quoted after consultation. 4–6 weeks lead time.</p>
          </div>
        </aside>

        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="p-10 border border-border bg-card space-y-6"
        >
          {submitted ? (
            <div className="py-20 text-center">
              <Sparkles className="mx-auto h-10 w-10 text-gold mb-6" />
              <h3 className="font-display text-3xl mb-3">Request received.</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Inês will write to you personally within 48 hours to begin your commission.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-display text-2xl mb-2">Begin your commission</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Your name" id="cname" />
                <Field label="Email" id="cemail" type="email" />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <SelectField label="Type of piece" id="ctype" options={["Heart Keepsake", "Photo Frame", "Pendant", "Custom Sculpture"]} />
                <SelectField label="Budget" id="cbudget" options={["$280 – $500", "$500 – $1,000", "$1,000 – $2,500", "$2,500+"]} />
              </div>
              <div>
                <label htmlFor="cstory" className="block text-xs uppercase tracking-[0.25em] text-gold mb-3">
                  Tell us the story
                </label>
                <textarea
                  id="cstory"
                  rows={6}
                  required
                  placeholder="The moment, the inclusion, the recipient..."
                  className="w-full bg-transparent border border-border p-4 focus:outline-none focus:border-gold transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gold text-primary-foreground text-sm uppercase tracking-[0.25em] hover:shadow-glow transition-all"
              >
                Request Consultation
              </button>
            </>
          )}
        </form>
      </section>
    </div>
  );
}

function Field({ label, id, type = "text" }: { label: string; id: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.25em] text-gold mb-3">{label}</label>
      <input id={id} type={type} required className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-gold transition" />
    </div>
  );
}

function SelectField({ label, id, options }: { label: string; id: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.25em] text-gold mb-3">{label}</label>
      <select id={id} className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-gold transition">
        {options.map((o) => <option key={o} className="bg-card">{o}</option>)}
      </select>
    </div>
  );
}
