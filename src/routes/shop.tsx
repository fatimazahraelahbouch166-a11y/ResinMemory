import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useCallback } from "react";
import { ProductCard, Product } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { ShoppingBag, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { CartItem } from "@/components/Navbar";
import { useCart } from "@/routes/__root";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop — ResinMemory" },
      { name: "description", content: "Browse handcrafted resin keepsakes, frames, jewelry and home pieces." },
    ],
  }),
});

const serif = "'Cormorant Garamond','Playfair Display',Georgia,serif";

function Shop() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<"new" | "low" | "high">("new");
  const [cartOpen, setCartOpen] = useState(false);

  const { cart, addToCart, removeFromCart, setQty, totalItems } = useCart();

  const cartItems: CartItem[] = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const product = products.find((p) => p.id === id);
          return product ? { product, qty } : null;
        })
        .filter(Boolean) as CartItem[],
    [cart]
  );

  const total = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
  }, [addToCart]);

  const handleRemove = useCallback((id: string) => {
    removeFromCart(id);
  }, [removeFromCart]);

  const handleQtyChange = useCallback((id: string, qty: number) => {
    setQty(id, qty);
  }, [setQty]);

  const handleCheckout = useCallback(() => {
    const payload = cartItems.map(({ product, qty }) => ({
      id: product.id, name: product.name, price: product.price, qty,
    }));
    try { sessionStorage.setItem("resinmemory_cart", JSON.stringify(payload)); } catch {}
    setCartOpen(false);
    navigate({ to: "/commande" });
  }, [cartItems, navigate]);

  const filtered = useMemo(() => {
    let list = category === "All" ? products : products.filter((p) => p.category === category);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort]);

  return (
    <>
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#fdf8f2 0%,#faf3ea 100%)" }}>
        {/* Hero header */}
        <header className="text-center px-6 pt-36 pb-12">
          <p className="text-[9px] uppercase tracking-[0.5em] mb-4" style={{ color: "#c9a84c", opacity: 0.8 }}>Shop</p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 300, color: "#3b2a1a", lineHeight: 1.1, letterSpacing: "0.01em" }}>
            The Collection
          </h1>
          <div className="mx-auto mt-5 mb-6" style={{ width: 48, height: 1, background: "rgba(201,168,76,0.5)" }} />
          <p className="max-w-lg mx-auto leading-relaxed" style={{ fontSize: "0.88rem", color: "#7a5c3a", fontWeight: 300 }}>
  Delivered within 4–7 days.
</p>
        </header>

        {/* Filters bar */}
        <div className="mx-auto max-w-7xl px-6 pb-10">
          <div
            className="flex flex-wrap items-center justify-between gap-4 py-5 px-6 mb-10"
            style={{ background: "rgba(255,252,247,0.8)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: 14, backdropFilter: "blur(8px)" }}
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className="px-4 py-1.5 text-[8px] uppercase tracking-[0.28em] transition-all duration-300"
                  style={{
                    borderRadius: 20,
                    border: `1px solid ${category === c ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.22)"}`,
                    background: category === c ? "linear-gradient(135deg,#c9a84c,#b08840)" : "transparent",
                    color: category === c ? "#fdf8f2" : "#b08840",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5" style={{ color: "#c9a84c" }} />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="appearance-none pr-6 bg-transparent text-[8px] uppercase tracking-[0.28em] focus:outline-none cursor-pointer"
                  style={{ color: "#b08840", fontFamily: "inherit", border: "none" }}
                >
                  <option value="new">Newest</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-0 h-3 w-3 pointer-events-none" style={{ color: "#c9a84c" }} />
              </div>

              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:opacity-80"
                style={{ border: "1px solid rgba(201,168,76,0.35)", borderRadius: 10, background: "transparent", cursor: "pointer" }}
                aria-label="Open cart"
              >
                <ShoppingBag className="h-4 w-4" style={{ color: "#c9a84c" }} />
                {totalItems > 0 && (
                  <span className="text-[9px] font-semibold" style={{ color: "#b08840" }}>{totalItems}</span>
                )}
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "#b09070" }}>No pieces found</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onAddToCart={handleAddToCart} cartCount={cart[p.id] ?? 0} />
              ))}
            </div>
          )}

          <div className="text-center mt-20">
            <div className="mx-auto mb-6" style={{ width: 1, height: 48, background: "linear-gradient(to bottom,rgba(201,168,76,0.5),transparent)" }} />
            <p className="text-[8px] uppercase tracking-[0.45em]" style={{ color: "#c9a84c", opacity: 0.7 }}>
              Atelier · One-of-a-kind · Handmade
            </p>
          </div>
        </div>
      </div>

      {/* CART DRAWER */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 150,
          background: "rgba(14,10,6,0.65)",
          backdropFilter: "blur(6px)",
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? "auto" : "none",
          transition: "opacity 0.5s ease",
        }}
      />
      <aside
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 160,
          display: "flex", flexDirection: "column",
          width: "min(420px, 92vw)",
          background: "linear-gradient(160deg,#fdf8f2 0%,#faf3ea 100%)",
          borderLeft: "1px solid rgba(201,168,76,0.22)",
          boxShadow: "-20px 0 80px rgba(139,90,43,0.15)",
          transform: cartOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 1.75rem", borderBottom: "1px solid rgba(201,168,76,0.16)" }}>
          <div>
            <p style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.45em", color: "#c9a84c", opacity: 0.8, marginBottom: 4 }}>Your Selection</p>
            <h2 style={{ fontFamily: serif, fontSize: "1.35rem", fontWeight: 400, color: "#3b2a1a", margin: 0 }}>Cart</h2>
          </div>
          <button onClick={() => setCartOpen(false)} style={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.30)", background: "rgba(253,248,242,0.8)", cursor: "pointer" }} aria-label="Close cart">
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
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.03) saturate(1.06)" }} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <p style={{ fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.35em", color: "#c9a84c", opacity: 0.8 }}>{product.category}</p>
                  <p style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 500, color: "#3b2a1a", lineHeight: 1.2 }}>{product.name}</p>
                  <p style={{ fontFamily: serif, fontSize: "0.95rem", fontWeight: 600, color: "#b08840" }}>{(product.price * qty).toLocaleString()} DH</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", overflow: "hidden", border: "1px solid rgba(201,168,76,0.28)", borderRadius: 8 }}>
                      <button onClick={() => qty === 1 ? handleRemove(product.id) : handleQtyChange(product.id, qty - 1)} style={{ width: 28, height: 28, display: "grid", placeItems: "center", background: "none", border: "none", cursor: "pointer", color: "#b08840", fontSize: "1rem" }}>−</button>
                      <span style={{ width: 24, textAlign: "center", fontSize: 11, color: "#3b2a1a" }}>{qty}</span>
                      <button onClick={() => handleQtyChange(product.id, qty + 1)} style={{ width: 28, height: 28, display: "grid", placeItems: "center", background: "none", border: "none", cursor: "pointer", color: "#b08840", fontSize: "1rem" }}>+</button>
                    </div>
                    <button onClick={() => handleRemove(product.id)} style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.25em", color: "#b09070", background: "none", border: "none", cursor: "pointer" }}>Remove</button>
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
              <p style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.38em", color: "#b09070" }}>Estimated Total</p>
              <p style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 600, color: "#b08840" }}>{total.toLocaleString()} DH</p>
            </div>
            <button
              onClick={handleCheckout}
              style={{ width: "100%", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "linear-gradient(135deg,#c9a84c,#b08840)", borderRadius: 12, border: "none", color: "#fdf8f2", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", fontFamily: "inherit", cursor: "pointer", boxShadow: "0 4px 20px rgba(201,168,76,0.38)" }}
            >
              <ShoppingBag style={{ width: 16, height: 16 }} />
              Place Order
            </button>
            <p style={{ textAlign: "center", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.25em", color: "#b09070" }}>
              Free Shipping · Signed Piece · Numbered
            </p>
          </div>
        )}
      </aside>
    </>
  );
}