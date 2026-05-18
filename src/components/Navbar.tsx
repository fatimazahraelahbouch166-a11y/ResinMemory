import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Menu, X, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/components/ProductCard";
import { useCart } from "@/routes/__root";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" }, // ← zed hadi
] as const;

const serif = "'Cormorant Garamond','Playfair Display',Georgia,serif";

export interface CartItem {
  product: Product;
  qty: number;
}

export function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

const { cart, removeFromCart, setQty, totalItems } = useCart();

  const cartItems: CartItem[] = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      return product ? { product, qty } : null;
    })
    .filter(Boolean) as CartItem[];

  const total = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  const changeQty = (id: string, qty: number) => {
  if (qty <= 0) {
    removeFromCart(id);
  } else {
    setQty(id, qty);
  }
};

  const handleCheckout = () => {
    const payload = cartItems.map(({ product, qty }) => ({
      id: product.id, name: product.name, price: product.price, qty,
    }));
    try { sessionStorage.setItem("resinmemory_cart", JSON.stringify(payload)); } catch {}
    setCartOpen(false);
    navigate({ to: "/commande" });
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,8,6,0.97)" : "rgba(10,8,6,0.80)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.30)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.40)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          <Logo />

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.to} to={l.to}
                className="relative transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#c9a84c] after:transition-all hover:after:w-full"
                style={{ color: "#c9a84c", opacity: 0.72, fontSize: "0.6rem", letterSpacing: "0.32em", textTransform: "uppercase" }}
                activeProps={{ style: { color: "#e8c96a", opacity: 1 }, className: "after:w-full" }}
                activeOptions={{ exact: l.to === "/" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e8c96a"; (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                onMouseLeave={(e) => {
                  const isActive = e.currentTarget.getAttribute("aria-current") === "page";
                  (e.currentTarget as HTMLElement).style.color = isActive ? "#e8c96a" : "#c9a84c";
                  (e.currentTarget as HTMLElement).style.opacity = isActive ? "1" : "0.72";
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="hidden md:flex items-center gap-2 transition-colors duration-200 relative"
              style={{ color: "#c9a84c", opacity: 0.72, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e8c96a"; (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#c9a84c"; (e.currentTarget as HTMLElement).style.opacity = "0.72"; }}
            >
              <ShoppingBag className="h-4 w-4" />
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.32em", textTransform: "uppercase" }}>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 h-4 w-4 grid place-items-center rounded-full text-[9px] font-semibold"
                  style={{ background: "linear-gradient(135deg,#c9a84c,#b08840)", color: "#fdf8f2" }}>
                  {totalItems}
                </span>
              )}
            </button>

            <button className="md:hidden"
              style={{ color: "#c9a84c", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div style={{ background: "rgba(10,8,6,0.98)", backdropFilter: "blur(14px)", borderTop: "1px solid rgba(201,168,76,0.20)" }}>
            <nav className="flex flex-col px-6 py-6 gap-5">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                  style={{ fontSize: "0.65rem", letterSpacing: "0.40em", textTransform: "uppercase", color: "#c9a84c", textDecoration: "none", paddingBottom: "0.9rem", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
                  activeProps={{ style: { color: "#e8c96a", borderBottomColor: "rgba(201,168,76,0.45)" } }}
                  activeOptions={{ exact: l.to === "/" }}>
                  {l.label}
                </Link>
              ))}
              <button onClick={() => { setOpen(false); setCartOpen(true); }}
                style={{ fontSize: "0.65rem", letterSpacing: "0.40em", textTransform: "uppercase", color: "#c9a84c", background: "none", border: "none", cursor: "pointer", paddingBottom: "0.9rem", borderBottom: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", gap: "0.5rem", width: "100%", textAlign: "left" }}>
                <ShoppingBag className="h-4 w-4" />
                Cart
                {totalItems > 0 && (
                  <span className="h-4 w-4 grid place-items-center rounded-full text-[9px] font-semibold ml-1"
                    style={{ background: "linear-gradient(135deg,#c9a84c,#b08840)", color: "#fdf8f2" }}>
                    {totalItems}
                  </span>
                )}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* OVERLAY */}
      <div onClick={() => setCartOpen(false)}
        style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(14,10,6,0.65)", backdropFilter: "blur(6px)", opacity: cartOpen ? 1 : 0, pointerEvents: cartOpen ? "auto" : "none", transition: "opacity 0.5s ease" }} />

      {/* CART DRAWER */}
      <aside style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 160, display: "flex", flexDirection: "column", width: "min(420px, 92vw)", background: "linear-gradient(160deg,#fdf8f2 0%,#faf3ea 100%)", borderLeft: "1px solid rgba(201,168,76,0.22)", boxShadow: "-20px 0 80px rgba(139,90,43,0.15)", transform: cartOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.5s cubic-bezier(.16,1,.3,1)" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 1.75rem", borderBottom: "1px solid rgba(201,168,76,0.16)" }}>
          <div>
            <p style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.45em", color: "#c9a84c", opacity: 0.8, marginBottom: 4 }}>Your selection</p>
            <h2 style={{ fontFamily: serif, fontSize: "1.35rem", fontWeight: 400, color: "#3b2a1a", margin: 0 }}>Cart</h2>
          </div>
          <button onClick={() => setCartOpen(false)}
            style={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.30)", background: "rgba(253,248,242,0.8)", cursor: "pointer" }}
            aria-label="Close cart">
            <X style={{ width: 16, height: 16, color: "#7a5c3a" }} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {cartItems.length === 0 ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "4rem 0" }}>
              <ShoppingBag style={{ width: 40, height: 40, color: "rgba(201,168,76,0.35)" }} />
              <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.35em", color: "#b09070" }}>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(({ product, qty }) => (
              <div key={product.id} style={{ display: "flex", gap: "1rem", borderBottom: "1px solid rgba(201,168,76,0.10)", paddingBottom: "1.25rem" }}>
                <div style={{ flexShrink: 0, width: 72, height: 90, borderRadius: 10, border: "1px solid rgba(201,168,76,0.20)", background: "#f5ede0", overflow: "hidden" }}>
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <p style={{ fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.35em", color: "#c9a84c", opacity: 0.8 }}>{product.category}</p>
                  <p style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 500, color: "#3b2a1a", lineHeight: 1.2 }}>{product.name}</p>
                  <p style={{ fontFamily: serif, fontSize: "0.95rem", fontWeight: 600, color: "#b08840" }}>{(product.price * qty).toLocaleString()} DH</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", overflow: "hidden", border: "1px solid rgba(201,168,76,0.28)", borderRadius: 8 }}>
                      <button onClick={() => qty === 1 ? removeFromCart(product.id) : changeQty(product.id, qty - 1)}
                        style={{ width: 28, height: 28, display: "grid", placeItems: "center", background: "none", border: "none", cursor: "pointer", color: "#b08840", fontSize: "1rem" }}>−</button>
                      <span style={{ width: 24, textAlign: "center", fontSize: 11, color: "#3b2a1a" }}>{qty}</span>
                      <button onClick={() => changeQty(product.id, qty + 1)}
                        style={{ width: 28, height: 28, display: "grid", placeItems: "center", background: "none", border: "none", cursor: "pointer", color: "#b08840", fontSize: "1rem" }}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)}
                      style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.25em", color: "#b09070", background: "none", border: "none", cursor: "pointer" }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: "1.5rem 1.75rem", borderTop: "1px solid rgba(201,168,76,0.16)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.38em", color: "#b09070" }}>Estimated total</p>
              <p style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 600, color: "#b08840" }}>{total.toLocaleString()} DH</p>
            </div>
            <button onClick={handleCheckout}
              style={{ width: "100%", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "linear-gradient(135deg,#c9a84c,#b08840)", borderRadius: 12, border: "none", color: "#fdf8f2", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", fontFamily: "inherit", cursor: "pointer", boxShadow: "0 4px 20px rgba(201,168,76,0.38)" }}>
              <ShoppingBag style={{ width: 16, height: 16 }} />
              Place Order
            </button>
            <p style={{ textAlign: "center", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.25em", color: "#b09070" }}>
              Free shipping · Signed piece · Numbered
            </p>
          </div>
        )}
      </aside>
    </>
  );
}