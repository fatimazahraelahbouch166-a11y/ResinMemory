import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Menu, X, ShoppingBag } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/custom-orders", label: "Custom" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,8,6,0.97)"
          : "rgba(10,8,6,0.80)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: scrolled
          ? "1px solid rgba(201,168,76,0.30)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.40)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        <Logo />

        {/* ── Desktop links ── */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative transition-colors duration-200
                         after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0
                         after:bg-[#c9a84c] after:transition-all hover:after:w-full"
              style={{
                color: "#c9a84c",
                opacity: 0.72,
                fontSize: "0.6rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
              activeProps={{
                style: { color: "#e8c96a", opacity: 1 },
                className: "after:w-full",
              }}
              activeOptions={{ exact: l.to === "/" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#e8c96a";
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const isActive =
                  e.currentTarget.getAttribute("aria-current") === "page";
                (e.currentTarget as HTMLElement).style.color = isActive
                  ? "#e8c96a"
                  : "#c9a84c";
                (e.currentTarget as HTMLElement).style.opacity = isActive
                  ? "1"
                  : "0.72";
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* ── Right: cart + mobile toggle ── */}
        <div className="flex items-center gap-4">
          <button
            className="hidden md:flex items-center gap-2 transition-colors duration-200"
            style={{
              color: "#c9a84c",
              opacity: 0.72,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#e8c96a";
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#c9a84c";
              (e.currentTarget as HTMLElement).style.opacity = "0.72";
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              Cart (0)
            </span>
          </button>

          <button
            className="md:hidden"
            style={{ color: "#c9a84c", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          style={{
            background: "rgba(10,8,6,0.98)",
            backdropFilter: "blur(14px)",
            borderTop: "1px solid rgba(201,168,76,0.20)",
          }}
        >
          <nav className="flex flex-col px-6 py-6 gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.40em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  textDecoration: "none",
                  paddingBottom: "0.9rem",
                  borderBottom: "1px solid rgba(201,168,76,0.15)",
                }}
                activeProps={{
                  style: {
                    color: "#e8c96a",
                    borderBottomColor: "rgba(201,168,76,0.45)",
                  },
                }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}