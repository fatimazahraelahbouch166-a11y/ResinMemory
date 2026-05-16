import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-charcoal/50">
      <div className="gold-divider" />
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Handcrafted resin keepsakes that turn fleeting moments into eternal heirlooms.
            Each piece is poured, polished and finished by hand in our atelier.
          </p>
          <div className="mt-8 flex gap-4">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70 hover:text-gold hover:border-gold transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-gold mb-5">Explore</h4>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li><Link to="/shop" className="hover:text-gold">Shop</Link></li>
            <li><Link to="/custom-orders" className="hover:text-gold">Custom Orders</Link></li>
            <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-gold mb-5">Atelier Letter</h4>
          <p className="text-sm text-foreground/70 mb-4">
            New collections, behind-the-scenes, private previews.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border-b border-border px-1 py-2 text-sm focus:outline-none focus:border-gold transition"
            />
            <button className="text-xs uppercase tracking-[0.2em] text-gold hover:text-champagne transition">
              Join
            </button>
          </form>
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
