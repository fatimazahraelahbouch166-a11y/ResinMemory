import { useMemo } from "react";

export function GlitterEffect({ count = 40 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 120,
        opacity: Math.random() * 0.6 + 0.3,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: "0 0 6px var(--gold), 0 0 12px var(--gold-soft)",
            animation: `glitter-float ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error custom var
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
