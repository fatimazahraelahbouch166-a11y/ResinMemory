import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import hro from "@/assets/hro.png";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/routes/__root";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [-
      { title: "ResinMemory — Handcrafted Luxury Resin Keepsakes" },
      {
        name: "description",
        content:
          "Eternal moments cast in resin and gold. Discover the ResinMemory atelier collection.",
      },
    ],
  }),
});

const serif = "'Cormorant Garamond','Playfair Display',Georgia,serif";

// const testimonials = [
//   { name: "Amélie R.", text: "A legacy in a box. The detail and weight evoke fine jewellery.", role: "Paris", rating: 5 },
//   { name: "Jordan T.", text: "I cried when I opened it. They captured my grandmother's lace in resin perfectly.", role: "New York", rating: 5 },
//   { name: "Sofia M.", text: "The gold flakes catch the light all day long. People stop to ask where it's from.", role: "Milan", rating: 5 },
// ];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] uppercase tracking-[0.5em] mb-4" style={{ color: "#c9a84c", opacity: 0.85 }}>
      {children}
    </p>
  );
}

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto ${className}`} style={{ width: 48, height: 1, background: "rgba(201,168,76,0.5)" }} />
  );
}

function Home() {
  const featured = products.slice(0, 4);
  const gallery = products.slice(0, 8);
  const { cart, addToCart } = useCart();

  return (
    <div style={{ background: "linear-gradient(180deg,#fdf8f2 0%,#faf3ea 100%)" }}>

      {/* ══════ HERO ══════ */}
      <section
        className="relative min-h-[96vh] flex flex-col items-center justify-center overflow-hidden"
        style={{ marginTop: "-80px", paddingTop: "80px" }}
      >
        <div className="absolute inset-0">
          <img src={hro} alt="" className="h-full w-full object-cover"
            style={{ opacity: 0.55, filter: "brightness(0.92) saturate(0.8) sepia(0.18)" }}
            width={1600} height={1200} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(253,248,242,0.10) 0%, rgba(253,248,242,0.18) 40%, rgba(253,248,242,0.96) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(250,243,234,0.45) 100%)" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.4)" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c", opacity: 0.6 }} />
            <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.4)" }} />
          </div>

          <h1 style={{ fontFamily: serif, fontSize: "clamp(3.2rem,9vw,7.5rem)", fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.01em", color: "#2a1f12" }}>
            Resin<span style={{ color: "#b08840", fontStyle: "italic" }}>Memory</span>
          </h1>

          <p className="mt-3 mb-10 mx-auto max-w-xl leading-relaxed"
            style={{ fontSize: "0.92rem", color: "#6b4f30", fontWeight: 300 }}>
            Fleeting moments suspended in resin and gold. Each piece is poured,
            polished and signed by hand — a heirloom crafted to last through generations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/shop"
              className="group inline-flex items-center gap-3 transition-all duration-500 hover:opacity-90"
              style={{ padding: "1rem 2.5rem", background: "linear-gradient(135deg,#c9a84c,#b08840)", color: "#fdf8f2", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", borderRadius: 0, boxShadow: "0 4px 24px rgba(201,168,76,0.32)", textDecoration: "none" }}>
              Discover the Collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: "pulse 2.5s ease-in-out infinite" }}>
          <p className="text-[7px] uppercase tracking-[0.45em]" style={{ color: "#b09070" }}>Scroll</p>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom,rgba(201,168,76,0.6),transparent)" }} />
        </div>
      </section>

      {/* ══════ MARQUEE BAND ══════ */}
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.16)", borderBottom: "1px solid rgba(201,168,76,0.16)", background: "rgba(255,252,247,0.7)", backdropFilter: "blur(8px)", overflow: "hidden", whiteSpace: "nowrap", padding: "1.1rem 0" }}>
        <div style={{ display: "inline-flex", animation: "marquee 30s linear infinite" }}>
          {["Resin & Gold", "Handcrafted", "One-of-a-kind", "Worldwide Shipping", "Custom Orders", "Forever Heritage",
            "Resin & Gold", "Handcrafted", "One-of-a-kind", "Worldwide Shipping", "Custom Orders", "Forever Heritage"].map((label, i) => (
            <span key={i} className="inline-flex items-center">
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "#b09060", padding: "0 2.5rem" }}>{label}</span>
              <span style={{ color: "#c9a84c", opacity: 0.45, fontSize: "0.5rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      {/* ══════ FEATURED PRODUCTS ══════ */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <Label>Featured Pieces</Label>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#2a1f12", lineHeight: 1.15 }}>
              The <em style={{ color: "#b08840", fontStyle: "italic" }}>Atelier</em> Collection
            </h2>
          </div>
          <Link to="/shop"
            className="group inline-flex items-center gap-2 transition-all duration-300 hover:opacity-70"
            style={{ fontSize: "0.6rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#c9a84c", textDecoration: "none" }}>
            View All <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onAddToCart={addToCart}
              cartCount={cart[p.id] ?? 0}
            />
          ))}
        </div>
      </section>

      {/* ══════ CRAFT STORY ══════ */}
      <section className="py-28" style={{ background: "rgba(255,252,247,0.6)", borderTop: "1px solid rgba(201,168,76,0.13)", borderBottom: "1px solid rgba(201,168,76,0.13)" }}>
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Label>Our Craft</Label>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 300, color: "#2a1f12", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Poured by hand,{" "}<em style={{ color: "#b08840" }}>polished with love</em>
            </h2>
            <GoldDivider className="mb-8" />
            <p style={{ fontSize: "0.88rem", color: "#6b4f30", lineHeight: 1.95, fontWeight: 300, maxWidth: 480 }}>
              In our Provence atelier, every piece begins in a handmade mould.
              Resin is poured layer by layer, encasing flowers, lace, or cherished
              mementos. Seventy-two hours of curing, then a micron-level polish —
              until the clarity of crystal is achieved.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[{ stat: "72h", label: "Minimum curing" }, { stat: "100%", label: "Handmade" }, { stat: "∞", label: "Durability" }].map(({ stat, label }) => (
                <div key={label}>
                  <p style={{ fontFamily: serif, fontSize: "2rem", fontWeight: 300, color: "#b08840", lineHeight: 1 }}>{stat}</p>
                  <p style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#b09070", marginTop: "0.4rem" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[480px]">
            {gallery.slice(0, 3).map((p, i) => (
              <div key={p.id} className="absolute overflow-hidden"
                style={{ borderRadius: 14, border: "1px solid rgba(201,168,76,0.22)", boxShadow: "0 8px 32px rgba(139,90,43,0.12)", ...[{ width: "55%", height: "62%", top: 0, left: 0, zIndex: 3 }, { width: "48%", height: "50%", top: "18%", right: 0, zIndex: 2 }, { width: "38%", height: "36%", bottom: 0, left: "28%", zIndex: 1 }][i] }}>
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" style={{ filter: "brightness(1.03) saturate(1.05)" }} />
              </div>
            ))}
            {/* <div className="absolute z-10 px-5 py-3" */}
              {/* style={{ bottom: "2rem", right: "1rem", background: "linear-gradient(135deg,#c9a84c,#b08840)", borderRadius: 12, boxShadow: "0 4px 20px rgba(201,168,76,0.35)" }}> */}
              {/* <p style={{ fontFamily: serif, fontSize: "1.3rem", fontWeight: 400, color: "#fdf8f2", lineHeight: 1 }}>+2 400</p> */}
              {/* <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(253,248,242,0.8)", marginTop: 4 }}>Pieces created</p> */}
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* ══════ GALLERY ══════ */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <Label>Client Gallery</Label>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#2a1f12" }}>
              In their <em style={{ color: "#b08840" }}>hands</em>
            </h2>
            <GoldDivider className="mt-5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((p, i) => (
              <div key={i}
                className={`relative overflow-hidden group ${i % 3 === 0 ? "row-span-2 aspect-[1/2]" : "aspect-square"}`}
                style={{ borderRadius: 12, border: "1px solid rgba(201,168,76,0.18)" }}>
                <img src={p.image} alt="" loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
                  style={{ filter: "brightness(1.02) saturate(1.05)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: "linear-gradient(to top,rgba(139,90,43,0.35) 0%,transparent 60%)" }} />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <p style={{ fontFamily: serif, fontSize: "0.85rem", fontWeight: 400, color: "#fdf8f2" }}>{p.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      {/* <section className="py-28" style={{ background: "rgba(255,252,247,0.6)", borderTop: "1px solid rgba(201,168,76,0.13)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Label>Testimonials</Label>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, color: "#2a1f12" }}>
              <em style={{ color: "#b08840" }}>Written from the heart.</em> Worn with love.
            </h2>
            <GoldDivider className="mt-5" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure key={i} className="group flex flex-col transition-all duration-500 hover:-translate-y-1"
                style={{ padding: "2.5rem 2rem", background: "linear-gradient(160deg,#fdf8f2 0%,#faf3ea 100%)", border: "1px solid rgba(201,168,76,0.20)", borderRadius: 16, boxShadow: "0 2px 8px rgba(139,90,43,0.06),0 8px 32px rgba(139,90,43,0.06)", transition: "all 0.5s cubic-bezier(.16,1,.3,1)" }}>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3 w-3" style={{ fill: "#c9a84c", color: "#c9a84c" }} />
                  ))}
                </div>
                <p style={{ fontFamily: serif, fontSize: "3rem", lineHeight: 0.8, color: "#c9a84c", opacity: 0.35, marginBottom: "0.5rem" }}>"</p>
                <blockquote className="flex-1" style={{ fontFamily: serif, fontSize: "1.1rem", fontStyle: "italic", fontWeight: 300, lineHeight: 1.75, color: "#4a3520", marginBottom: "1.5rem" }}>
                  {t.text}
                </blockquote>
                <div style={{ width: 28, height: 1, background: "rgba(201,168,76,0.45)", marginBottom: "1rem" }} />
                <figcaption>
                  <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "#b08840", letterSpacing: "0.04em" }}>{t.name}</p>
                  <p style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#b09070", marginTop: "0.25rem" }}>{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══════ INSTAGRAM ══════ */}
      {/* ══════ INSTAGRAM ══════ */}
<section className="py-24" style={{ borderTop: "1px solid rgba(201,168,76,0.13)" }}>
  <div className="mx-auto max-w-7xl px-6 text-center">
    <svg
      className="mx-auto mb-6"
      style={{ width: 28, height: 28, color: "#c9a84c", opacity: 0.7, display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
    <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, color: "#2a1f12", marginBottom: "0.6rem" }}>
      @rezin__memory
    </h2>
    <p style={{ fontSize: "0.82rem", color: "#7a5c3a", fontWeight: 300, marginBottom: "2rem" }}>
      Follow the pour. Behind every heirloom.
    </p>
    <a href="https://www.instagram.com/resin___memory" 
      className="inline-flex items-center gap-2 transition-all duration-300 hover:opacity-70"
      style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a84c", textDecoration: "none", borderBottom: "1px solid rgba(201,168,76,0.35)", paddingBottom: "0.25rem" }}>
      Visit Instagram
    </a>
  </div>
</section>

    </div>
  );
}