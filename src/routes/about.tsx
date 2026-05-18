import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — ResinMemory" },
      { name: "description", content: "Three girls who turned memories into eternal art." },
    ],
  }),
});

const serif = "'Cormorant Garamond','Playfair Display',Georgia,serif";

function About() {
  const gallery = products.slice(0, 8);

  return (
    <div style={{ background: "linear-gradient(180deg,#fdf8f2 0%,#faf3ea 100%)", minHeight: "100vh" }}>

      {/* ══════ HERO ══════ */}
      <header className="text-center px-6 pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 70%)" }} />
        <p className="text-[9px] uppercase tracking-[0.5em] mb-4" style={{ color: "#c9a84c", opacity: 0.85 }}>
          Our Story
        </p>
        <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem,7vw,5rem)", fontWeight: 300, color: "#2a1f12", lineHeight: 1.1 }}>
          Three girls,<br />
          <em style={{ color: "#b08840", fontStyle: "italic" }}>one passion</em>
        </h1>
        <div className="mx-auto mt-6 mb-8" style={{ width: 48, height: 1, background: "rgba(201,168,76,0.5)" }} />
        <p className="max-w-xl mx-auto leading-relaxed" style={{ fontSize: "0.92rem", color: "#6b4f30", fontWeight: 300 }}>
          ResinMemory was born from a simple desire — to keep what truly matters. A flower, a moment, a love. Forever.
        </p>
      </header>

      {/* ══════ QUOTE ══════ */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="relative px-10 py-14 text-center"
          style={{ background: "rgba(255,252,247,0.85)", border: "1px solid rgba(201,168,76,0.20)", borderRadius: 20, boxShadow: "0 8px 48px rgba(139,90,43,0.08)" }}>
          <p style={{ fontFamily: serif, fontSize: "3.5rem", lineHeight: 0.8, color: "#c9a84c", opacity: 0.25, marginBottom: "0.5rem" }}>"</p>
          <p style={{ fontFamily: serif, fontSize: "clamp(1.1rem,2.5vw,1.4rem)", fontStyle: "italic", fontWeight: 300, color: "#4a3520", lineHeight: 1.9 }}>
            We wanted to give people the ability to keep their most beautiful memories — a wedding flower, baby's first shoes, a concert ticket. Not in a drawer, but displayed, sublime, eternal.
          </p>
          <div className="mx-auto mt-8" style={{ width: 36, height: 1, background: "rgba(201,168,76,0.45)" }} />
          <p className="mt-4 text-[9px] uppercase tracking-[0.4em]" style={{ color: "#b09070" }}>— The Founders, 2022</p>
        </div>
      </section>

      {/* ══════ VALUES ══════ */}
      <section className="py-20" style={{ background: "rgba(255,252,247,0.6)", borderTop: "1px solid rgba(201,168,76,0.13)", borderBottom: "1px solid rgba(201,168,76,0.13)" }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <p className="text-[9px] uppercase tracking-[0.5em] mb-4" style={{ color: "#c9a84c", opacity: 0.85 }}>What We Believe</p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#2a1f12" }}>
              Our <em style={{ color: "#b08840" }}>values</em>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Handmade", text: "Every piece is poured, sanded and signed by hand. No machines, no shortcuts." },
              { title: "Your Story", text: "You bring the memory, we give it an eternal form. Every order is one of a kind." },
              { title: "Forever", text: "Resin doesn't yellow or degrade. Your memory stays intact for generations to come." },
            ].map((v, i) => (
              <div key={i} style={{ padding: "2rem", background: "linear-gradient(160deg,#fdf8f2,#faf3ea)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: 16 }}>
                <div style={{ width: 36, height: 1, background: "rgba(201,168,76,0.5)", marginBottom: "1.25rem" }} />
                <h3 style={{ fontFamily: serif, fontSize: "1.3rem", fontWeight: 400, color: "#2a1f12", marginBottom: "0.75rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#6b4f30", lineHeight: 1.85, fontWeight: 300 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* ══════ GALLERY STRIP ══════ */}
<section className="py-20 overflow-hidden">
  <div className="text-center mb-12">
    <p className="text-[9px] uppercase tracking-[0.5em] mb-4" style={{ color: "#c9a84c", opacity: 0.85 }}>
      Handcrafted Gallery
    </p>
    <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#2a1f12" }}>
      Made by our <em style={{ color: "#b08840" }}>hands</em>
    </h2>
    <div className="mx-auto mt-5" style={{ width: 48, height: 1, background: "rgba(201,168,76,0.5)" }} />
  </div>

  {/* Strip */}
  <div style={{ overflow: "hidden", width: "100%" }}>
    <div style={{
      display: "flex",
      gap: "6px",
      animation: "galleryScroll 30s linear infinite",
      width: "max-content",
    }}>
      {[...gallery, ...gallery].map((p, i) => (
        <div
          key={i}
          style={{
            flexShrink: 0,
            width: 220,
            height: 280,
            overflow: "hidden",
            borderRadius: 4,
          }}
        >
          <img
            src={p.image}
            alt={p.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(1.02) saturate(1.05)",
              transition: "transform 0.8s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      ))}
    </div>
  </div>

  <style>{`
    @keyframes galleryScroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
  `}</style>
</section>

      {/* ══════ CTA ══════ */}
      <section className="py-24 text-center px-6">
        <p className="text-[9px] uppercase tracking-[0.5em] mb-4" style={{ color: "#c9a84c", opacity: 0.85 }}>Ready to begin?</p>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 300, color: "#2a1f12", marginBottom: "2rem" }}>
          Give <em style={{ color: "#b08840" }}>eternity</em> to your memory
        </h2>
        <Link to="/shop"
          className="group inline-flex items-center gap-3 transition-all duration-500 hover:opacity-90"
          style={{ padding: "1rem 2.5rem", background: "linear-gradient(135deg,#c9a84c,#b08840)", color: "#fdf8f2", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", borderRadius: 0, boxShadow: "0 4px 24px rgba(201,168,76,0.32)", textDecoration: "none" }}>
          View the Collection
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

    </div>
  );
}