import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  const socials = [
    {
      href: "https://www.instagram.com/rezin_memory",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
   {
 href: "https://www.facebook.com/profile.php?id=61575503465390",
  svg: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
},
  ];

  return (
    <footer className="relative border-t border-border bg-charcoal/50">
      <div className="gold-divider" />
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Handcrafted resin keepsakes that turn fleeting moments into eternal heirlooms.
            Each piece is poured, polished and finished by hand in our atelier.
          </p>
          <div className="mt-8 flex gap-4">
            {socials.map(({ href, svg }, i) => (
  <a
    key={i}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70 hover:text-gold hover:border-gold transition-all"
  >
    {svg}
  </a>
))}
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-gold mb-5">Explore</h4>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li><Link to="/shop" className="hover:text-gold">Shop</Link></li>
            <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-gold mb-5">Atelier Letter</h4>
          <p className="text-sm text-foreground/70">
            New collections, behind-the-scenes, private previews.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between text-xs text-muted-foreground gap-2">
          <span>© {new Date().getFullYear()} ResinMemory. All rights reserved.</span>
          <span>Handmade with patience — and a little bit of gold.</span>
        </div>
      </div>
    </footer>
  );
}