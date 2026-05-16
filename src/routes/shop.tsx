import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useCallback } from "react";
import { ProductCard, Product } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { ShoppingBag, X, SlidersHorizontal, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop — ResinMemory" },
      {
        name: "description",
        content: "Browse handcrafted resin keepsakes, frames, jewelry and home pieces.",
      },
    ],
  }),
});

const serif = "'Cormorant Garamond','Playfair Display',Georgia,serif";

/* ─────────────────── CART DRAWER ─────────────────── */

interface CartItem {
  product: Product;
  qty: number;
}

function CartDrawer({
  cart,
  open,
  onClose,
  onRemove,
  onQtyChange,
}: {
  cart: CartItem[];
  open: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
}) {
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const navigate = useNavigate();

  function handleCheckout() {
    onClose();
    navigate({ to: "/commande" });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[150] transition-opacity duration-500"
        style={{
          background: "rgba(14,10,6,0.65)",
          backdropFilter: "blur(6px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
        }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-[160] flex flex-col"
        style={{
          width: "min(420px, 92vw)",
          background: "linear-gradient(160deg,#fdf8f2 0%,#faf3ea 100%)",
          borderLeft: "1px solid rgba(201,168,76,0.22)",
          boxShadow: "-20px 0 80px rgba(139,90,43,0.15)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-6"
          style={{ borderBottom: "1px solid rgba(201,168,76,0.16)" }}
        >
          <div>
            <p className="text-[8px] uppercase tracking-[0.45em]" style={{ color: "#c9a84c", opacity: 0.8 }}>
              Votre sélection
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "1.35rem", fontWeight: 400, color: "#3b2a1a" }}>
              Panier
            </h2>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-full transition-all hover:scale-110"
            style={{ border: "1px solid rgba(201,168,76,0.30)", background: "rgba(253,248,242,0.8)" }}
            aria-label="Fermer le panier"
          >
            <X className="h-4 w-4" style={{ color: "#7a5c3a" }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-5 flex flex-col gap-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-4 py-16">
              <ShoppingBag className="h-10 w-10" style={{ color: "rgba(201,168,76,0.35)" }} />
              <p className="text-[10px] uppercase tracking-[0.35em]" style={{ color: "#b09070" }}>
                Votre panier est vide
              </p>
            </div>
          ) : (
            cart.map(({ product, qty }) => (
              <div
                key={product.id}
                className="flex gap-4"
                style={{ borderBottom: "1px solid rgba(201,168,76,0.10)", paddingBottom: "1.25rem" }}
              >
                <div
                  className="shrink-0 overflow-hidden"
                  style={{ width: 72, height: 90, borderRadius: 10, border: "1px solid rgba(201,168,76,0.20)", background: "#f5ede0" }}
                >
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" style={{ filter: "brightness(1.03) saturate(1.06)" }} />
                </div>

                <div className="flex flex-col flex-1 gap-1.5">
                  <p className="text-[7px] uppercase tracking-[0.35em]" style={{ color: "#c9a84c", opacity: 0.8 }}>
                    {product.category}
                  </p>
                  <p style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 500, color: "#3b2a1a", lineHeight: 1.2 }}>
                    {product.name}
                  </p>
                  <p style={{ fontFamily: serif, fontSize: "0.95rem", fontWeight: 600, color: "#b08840" }}>
                    ${(product.price * qty).toLocaleString()}
                  </p>

                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.28)", borderRadius: 8 }}>
                      <button
                        onClick={() => qty === 1 ? onRemove(product.id) : onQtyChange(product.id, qty - 1)}
                        className="w-7 h-7 grid place-items-center text-sm transition-colors hover:bg-amber-50"
                        style={{ color: "#b08840" }}
                      >−</button>
                      <span className="w-6 text-center text-[11px]" style={{ color: "#3b2a1a" }}>{qty}</span>
                      <button
                        onClick={() => onQtyChange(product.id, qty + 1)}
                        className="w-7 h-7 grid place-items-center text-sm transition-colors hover:bg-amber-50"
                        style={{ color: "#b08840" }}
                      >+</button>
                    </div>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="text-[8px] uppercase tracking-[0.25em] transition-opacity hover:opacity-60"
                      style={{ color: "#b09070" }}
                    >Retirer</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-7 py-6 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(201,168,76,0.16)" }}>
            <div className="flex items-center justify-between">
              <p className="text-[8px] uppercase tracking-[0.38em]" style={{ color: "#b09070" }}>Total estimé</p>
              <p style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 600, color: "#b08840" }}>
                ${total.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 flex items-center justify-center gap-3 transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg,#c9a84c,#b08840)",
                borderRadius: 12,
                border: "none",
                color: "#fdf8f2",
                fontSize: "0.6rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontFamily: "inherit",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(201,168,76,0.38)",
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              Passer la commande
            </button>

            <p className="text-center text-[8px] uppercase tracking-[0.25em]" style={{ color: "#b09070" }}>
              Livraison gratuite · Pièce signée · Numérotée
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

/* ─────────────────── SHOP PAGE ─────────────────── */

function Shop() {
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<"new" | "low" | "high">("new");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

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

  const cartTotal = Object.values(cart).reduce((s, n) => s + n, 0);

  const handleAddToCart = useCallback((product: Product) => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const handleQtyChange = useCallback((id: string, qty: number) => {
    setCart((prev) => ({ ...prev, [id]: qty }));
  }, []);

  const filtered = useMemo(() => {
    let list = category === "All" ? products : products.filter((p) => p.category === category);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort]);

  return (
    <>
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(180deg,#fdf8f2 0%,#faf3ea 100%)" }}
      >
        {/* Hero header */}
        <header className="text-center px-6 pt-36 pb-12">
          <p className="text-[9px] uppercase tracking-[0.5em] mb-4" style={{ color: "#c9a84c", opacity: 0.8 }}>
            Boutique
          </p>
          <h1
            style={{
              fontFamily: serif,
              fontSize: "clamp(2.5rem,6vw,4.5rem)",
              fontWeight: 300,
              color: "#3b2a1a",
              lineHeight: 1.1,
              letterSpacing: "0.01em",
            }}
          >
            La Collection
          </h1>
          <div className="mx-auto mt-5 mb-6" style={{ width: 48, height: 1, background: "rgba(201,168,76,0.5)" }} />
          <p className="max-w-lg mx-auto leading-relaxed" style={{ fontSize: "0.88rem", color: "#7a5c3a", fontWeight: 300 }}>
            Chaque pièce est signée et numérotée. Prévoir 2–3 semaines pour le coulage de votre souvenir.
          </p>
        </header>

        {/* Filters bar */}
        <div className="mx-auto max-w-7xl px-6 pb-10">
          <div
            className="flex flex-wrap items-center justify-between gap-4 py-5 px-6 mb-10"
            style={{
              background: "rgba(255,252,247,0.8)",
              border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: 14,
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex flex-wrap gap-2">
              {(["All", ...categories] as string[]).map((c) => (
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
                  <option value="new">Nouveautés</option>
                  <option value="low">Prix croissant</option>
                  <option value="high">Prix décroissant</option>
                </select>
                <ChevronDown className="absolute right-0 h-3 w-3 pointer-events-none" style={{ color: "#c9a84c" }} />
              </div>

              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:opacity-80"
                style={{
                  border: "1px solid rgba(201,168,76,0.35)",
                  borderRadius: 10,
                  background: "transparent",
                  cursor: "pointer",
                }}
                aria-label="Ouvrir le panier"
              >
                <ShoppingBag className="h-4 w-4" style={{ color: "#c9a84c" }} />
                {cartTotal > 0 && (
                  <span className="text-[9px] font-semibold" style={{ color: "#b08840" }}>
                    {cartTotal}
                  </span>
                )}
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "#b09070" }}>
                Aucune pièce trouvée
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  onAddToCart={handleAddToCart}
                  cartCount={cart[p.id] ?? 0}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-20">
            <div className="mx-auto mb-6" style={{ width: 1, height: 48, background: "linear-gradient(to bottom,rgba(201,168,76,0.5),transparent)" }} />
            <p className="text-[8px] uppercase tracking-[0.45em]" style={{ color: "#c9a84c", opacity: 0.7 }}>
              Atelier · Pièces uniques · Fait main
            </p>
          </div>
        </div>
      </div>

      <CartDrawer
        cart={cartItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemove}
        onQtyChange={handleQtyChange}
      />
    </>
  );
}