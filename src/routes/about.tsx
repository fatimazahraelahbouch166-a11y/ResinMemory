// import { createFileRoute } from "@tanstack/react-router";
// import craft from "@/assets/about-craft.jpg";

// export const Route = createFileRoute("/about")({
//   component: About,
//   head: () => ({
//     meta: [
//       { title: "Our Story — ResinMemory" },
//       { name: "description", content: "The story behind ResinMemory: a small atelier preserving moments in resin and gold." },
//     ],
//   }),
// });

// const steps = [
//   { n: "01", title: "Listen", text: "Every keepsake begins with your story — a letter, a flower, a date, a child's curl." },
//   { n: "02", title: "Pour", text: "Resin is hand-mixed in small batches with 24k gold leaf and natural inclusions." },
//   { n: "03", title: "Cure", text: "Each piece rests for 72 hours in a temperature-controlled chamber." },
//   { n: "04", title: "Polish", text: "Hand-sanded across seven grits and finished with a glassy mirror polish." },
//   { n: "05", title: "Sign", text: "Signed, numbered and wrapped in champagne silk. Built to outlive us." },
// ];

// function About() {
//   return (
//     <div>
//       <section className="mx-auto max-w-5xl px-6 py-24 text-center animate-fade-up">
//         <p className="text-xs uppercase tracking-[0.4em] text-gold mb-6">Our Story</p>
//         <h1 className="font-display text-5xl md:text-7xl mb-8 leading-[1.05]">
//           A small atelier <em className="text-gold">preserving</em> what matters.
//         </h1>
//         <div className="gold-divider w-24 mx-auto my-10" />
//         <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
//           ResinMemory was founded in a sunlit Lisbon studio in 2019, when our founder cast her grandmother's wedding lace into a single block of clear resin. Friends asked. Strangers asked. The atelier was born.
//         </p>
//       </section>

//       <section className="mx-auto max-w-7xl px-6 py-20 grid gap-16 lg:grid-cols-2 items-center">
//         <div className="relative aspect-[4/5] overflow-hidden">
//           <img src={craft} alt="Hand pouring resin" loading="lazy" className="h-full w-full object-cover" />
//           <div className="absolute inset-0 ring-1 ring-gold/20" />
//         </div>
//         <div>
//           <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">The Process</p>
//           <h2 className="font-display text-4xl md:text-5xl mb-12">Five steps. Five days of patience.</h2>
//           <ol className="space-y-8">
//             {steps.map((s) => (
//               <li key={s.n} className="flex gap-6 group">
//                 <span className="font-display text-3xl text-gold/60 group-hover:text-gold transition-colors">{s.n}</span>
//                 <div>
//                   <h3 className="font-display text-xl mb-2">{s.title}</h3>
//                   <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
//                 </div>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </section>

//       <section className="bg-charcoal/40 border-y border-border py-24">
//         <div className="mx-auto max-w-3xl px-6 text-center">
//           <blockquote className="font-display text-2xl md:text-4xl leading-relaxed text-foreground/90">
//             "We don't sell objects. We sell the weight of a memory you can hold in one hand."
//           </blockquote>
//           <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">— Inês Carvalho, Founder</p>
//         </div>
//       </section>
//     </div>
//   );
// }
import { createFileRoute } from "@tanstack/react-router";
import craft from "@/assets/about-craft.jpg";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "Our Story — ResinMemory" },
      {
        name: "description",
        content:
          "The story behind ResinMemory: a small atelier preserving moments in resin and gold.",
      },
    ],
  }),
});

const steps = [
  {
    n: "01",
    title: "Listen",
    text: "Every keepsake begins with your story — a letter, a flower, a date, a child's curl.",
  },
  {
    n: "02",
    title: "Pour",
    text: "Resin is hand-mixed in small batches with 24k gold leaf and natural inclusions.",
  },
  {
    n: "03",
    title: "Cure",
    text: "Each piece rests for 72 hours in a temperature-controlled chamber.",
  },
  {
    n: "04",
    title: "Polish",
    text: "Hand-sanded across seven grits and finished with a glassy mirror polish.",
  },
  {
    n: "05",
    title: "Sign",
    text: "Signed, numbered and wrapped in champagne silk. Built to outlive us.",
  },
];

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useRevealOnScroll();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function GlitterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random(),
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const flicker = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.001 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${flicker * 0.6})`;
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  );
}

function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let rafId: number;
    const animate = () => {
      const dx = pos.current.x - smoothPos.current.x;
      const dy = pos.current.y - smoothPos.current.y;
      smoothPos.current.x += dx * 0.12;
      smoothPos.current.y += dy * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${smoothPos.current.x}px`;
        glowRef.current.style.top = `${smoothPos.current.y}px`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "opacity 0.3s",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(212,175,55,0.9)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 0 6px 2px rgba(212,175,55,0.6)",
        }}
      />
    </>
  );
}

function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
      if (imgRef.current) {
        const rect = imgRef.current
          .closest(".img-parallax")
          ?.getBoundingClientRect();
        if (rect) {
          const offset = (window.innerHeight / 2 - rect.top) * 0.12;
          imgRef.current.style.transform = `scale(1.08) translateY(${-offset}px)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        background: "#080808",
        color: "#e8e0cc",
        minHeight: "100vh",
        fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
        cursor: "none",
        overflowX: "hidden",
      }}
    >
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap"
        rel="stylesheet"
      />

      <GlitterCanvas />
      <CursorGlow />

      {/* ── HERO SECTION ── */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Cinematic vignette bg */}
        <div
          ref={heroRef}
          style={{
            position: "absolute",
            inset: "-20%",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 70%), radial-gradient(ellipse 100% 100% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 60%)",
            zIndex: 0,
          }}
        />
        {/* Horizontal lines decoration */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 2rem",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#d4af37",
              marginBottom: "2rem",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.4s ease 0.3s",
            }}
          >
            Our Story
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "0.01em",
              margin: "0 0 2rem",
              color: "#ece4d0",
            }}
          >
            A small atelier{" "}
            <em
              style={{
                color: "#d4af37",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              preserving
            </em>
            <br />
            what matters.
          </h1>

          {/* Gold divider */}
          <div
            style={{
              width: "60px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, #d4af37, transparent)",
              margin: "0 auto 2.5rem",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.4s ease 0.6s",
            }}
          />

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "rgba(236,228,208,0.7)",
              maxWidth: "640px",
              margin: "0 auto",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.4s ease 0.9s",
            }}
          >
            ResinMemory was founded in a sunlit Lisbon studio in 2019, when our
            founder cast her grandmother's wedding lace into a single block of
            clear resin. Friends asked. Strangers asked. The atelier was born.
          </p>
        </div>
      </section>

      {/* ── PROCESS SECTION ── */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "8rem 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
      >
        {/* Image column */}
        <RevealSection>
          <div
            className="img-parallax"
            style={{
              position: "relative",
              aspectRatio: "4/5",
              overflow: "hidden",
              background: "#111",
            }}
          >
            <img
              ref={imgRef}
              src={craft}
              alt="Hand pouring resin"
              loading="lazy"
              style={{
                width: "100%",
                height: "108%",
                objectFit: "cover",
                display: "block",
                transform: "scale(1.08) translateY(0)",
                transition: "transform 0.1s linear",
                filter: "brightness(0.88) contrast(1.05)",
              }}
            />
            {/* Overlay frame */}
            <div
              style={{
                position: "absolute",
                inset: "16px",
                border: "1px solid rgba(212,175,55,0.25)",
                pointerEvents: "none",
              }}
            />
            {/* Corner accents */}
            {[
              { top: 8, left: 8 },
              { top: 8, right: 8 },
              { bottom: 8, left: 8 },
              { bottom: 8, right: 8 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 20,
                  height: 20,
                  borderTop: i < 2 ? "1px solid #d4af37" : "none",
                  borderBottom: i >= 2 ? "1px solid #d4af37" : "none",
                  borderLeft: i % 2 === 0 ? "1px solid #d4af37" : "none",
                  borderRight: i % 2 === 1 ? "1px solid #d4af37" : "none",
                  ...pos,
                  pointerEvents: "none",
                }}
              />
            ))}
            {/* Shine overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, transparent 50%, rgba(212,175,55,0.03) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </RevealSection>

        {/* Steps column */}
        <div>
          <RevealSection delay={100}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color: "#d4af37",
                marginBottom: "1.2rem",
              }}
            >
              The Process
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                marginBottom: "4rem",
                color: "#ece4d0",
              }}
            >
              Five steps.
              <br />
              Five days of patience.
            </h2>
          </RevealSection>

          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {steps.map((s, i) => (
              <RevealSection key={s.n} delay={200 + i * 100}>
                <li
                  style={{
                    display: "flex",
                    gap: "2rem",
                    marginBottom: "2.5rem",
                    cursor: "pointer",
                    padding: "1.2rem 1.5rem",
                    background:
                      activeStep === i
                        ? "rgba(212,175,55,0.05)"
                        : "transparent",
                    border: `1px solid ${activeStep === i ? "rgba(212,175,55,0.2)" : "transparent"}`,
                    transition:
                      "background 0.4s ease, border-color 0.4s ease, transform 0.3s ease",
                    transform:
                      activeStep === i ? "translateX(8px)" : "translateX(0)",
                  }}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      color:
                        activeStep === i
                          ? "#d4af37"
                          : "rgba(212,175,55,0.35)",
                      lineHeight: 1,
                      transition: "color 0.4s ease",
                      minWidth: "3rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.3rem",
                        fontWeight: 400,
                        marginBottom: "0.5rem",
                        color: activeStep === i ? "#d4af37" : "#ece4d0",
                        transition: "color 0.4s ease",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                        fontWeight: 300,
                        color: "rgba(236,228,208,0.6)",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {s.text}
                    </p>
                  </div>
                </li>
              </RevealSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ── QUOTE SECTION ── */}
      <RevealSection>
        <section
          style={{
            position: "relative",
            padding: "8rem 2rem",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Top border */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)",
            }}
          />
          {/* Bottom border */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)",
            }}
          />
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "300px",
              background:
                "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "780px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Decorative quote mark */}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "8rem",
                lineHeight: 0.5,
                color: "rgba(212,175,55,0.15)",
                marginBottom: "2rem",
                fontWeight: 300,
                userSelect: "none",
              }}
            >
              "
            </div>

            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "rgba(236,228,208,0.92)",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              We don't sell objects. We sell the weight of a memory you can
              hold in one hand.
            </blockquote>

            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#d4af37",
                margin: "2.5rem auto",
              }}
            />

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "#d4af37",
                margin: 0,
                fontWeight: 300,
              }}
            >
              — Inês Carvalho, Founder
            </p>
          </div>
        </section>
      </RevealSection>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          section[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
        * { box-sizing: border-box; }
        ::selection { background: rgba(212,175,55,0.25); color: #ece4d0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}