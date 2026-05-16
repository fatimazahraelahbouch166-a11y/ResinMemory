import { Link } from "@tanstack/react-router";
import logo from "@/assets/lofooo.png"
export function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
const logoSize = size === "lg" ? "h-28 md:h-36" : "h-16 md:h-20";
  const textSize = size === "lg" ? "text-4xl md:text-5xl" : "text-xl";
 
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <img
        src={logo}
        alt="ResinMemory Logo"
        className={`${logoSize} w-auto object-contain`}
      />
      <span
        style={{
          fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
          color: "#c9a84c",
          letterSpacing: "0.08em",
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1,
        }}
        className={textSize}
      >
        ResinMemory
      </span>
    </Link>
  );
}