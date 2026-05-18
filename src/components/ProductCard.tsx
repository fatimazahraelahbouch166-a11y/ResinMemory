import { useState, useEffect, useRef, useCallback } from "react";
import { Check, Heart, X, ShoppingBag, ArrowRight, Star } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
  material?: string;
  description?: string;
  dimensions?: string;
  leadTime?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  inCart: boolean;
}

function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  useEffect(() => {
    if (!product) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [product, onClose]);

  useEffect(() => { setAdded(false); }, [product?.id]);

  if (!product) return null;

  const handleAdd = () => { onAddToCart(product); setAdded(true); };

  const specs = [
    product.material   && ["Material",        product.material],
    product.dimensions && ["Dimensions",      product.dimensions],
    product.leadTime   && ["Production time", product.leadTime],
  ].filter(Boolean) as [string, string][];

  const stars = product.rating ?? 5;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(14,10,6,0.82)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-label={product.name}
    >
      <div
        className="relative flex flex-col md:flex-row w-full max-w-3xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg,#fdf8f2 0%,#faf3ea 100%)",
          border: "1px solid rgba(201,168,76,0.28)",
          borderRadius: "20px",
          boxShadow: "0 40px 120px rgba(139,90,43,0.28)",
          maxHeight: "90vh",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-9 w-9 grid place-items-center rounded-full transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(253,248,242,0.92)", border: "1px solid rgba(201,168,76,0.30)", backdropFilter: "blur(6px)", boxShadow: "0 2px 12px rgba(139,90,43,0.12)" }}
          aria-label="Close"
        >
          <X className="h-4 w-4" style={{ color: "#7a5c3a" }} />
        </button>

        <div
          className="relative shrink-0 w-full md:w-[44%] overflow-hidden"
          style={{ borderRadius: "20px 0 0 20px", aspectRatio: "3/4", background: "#f5ede0" }}
        >
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" style={{ filter: "brightness(1.03) saturate(1.08)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(250,243,234,0.6) 0%,transparent 45%)" }} />
          {product.tag && (
            <span className="absolute top-4 left-4 px-3 py-1 text-[8px] uppercase tracking-[0.3em]"
              style={{ background: "rgba(253,248,242,0.92)", border: "1px solid rgba(201,168,76,0.45)", color: "#b08840", borderRadius: "20px", backdropFilter: "blur(6px)" }}>
              {product.tag}
            </span>
          )}
          <button onClick={() => setWished((w) => !w)}
            className="absolute bottom-4 left-4 h-9 w-9 grid place-items-center rounded-full transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(253,248,242,0.90)", border: "1px solid rgba(201,168,76,0.30)", backdropFilter: "blur(6px)", boxShadow: "0 2px 12px rgba(139,90,43,0.10)" }}
            aria-label="Add to wishlist">
            <Heart className="h-4 w-4 transition-colors duration-200"
              style={{ color: wished ? "#c9a84c" : "#c8a97e", fill: wished ? "#c9a84c" : "none" }} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-7 md:p-8 overflow-y-auto flex-1" style={{ borderLeft: "1px solid rgba(201,168,76,0.13)" }}>
          <p className="text-[8px] uppercase tracking-[0.42em]" style={{ color: "#c9a84c", opacity: 0.85 }}>{product.category}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',Georgia,serif", fontSize: "1.75rem", fontWeight: 500, color: "#3b2a1a", lineHeight: 1.15 }}>
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3" style={{ fill: i < Math.round(stars) ? "#c9a84c" : "none", color: "#c9a84c" }} />
              ))}
            </div>
            {product.reviewCount && (
              <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: "#b09070" }}>{product.reviewCount} reviews</span>
            )}
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond','Playfair Display',Georgia,serif", fontSize: "1.55rem", fontWeight: 600, color: "#b08840" }}>
            {product.price}  dh
          </p>
          <div style={{ height: "1px", background: "rgba(201,168,76,0.22)" }} />
          {product.description && (
            <p className="leading-relaxed" style={{ fontSize: "0.83rem", color: "#7a5c3a", fontWeight: 300 }}>{product.description}</p>
          )}
          {specs.length > 0 && (
            <dl className="flex flex-col">
              {specs.map(([label, val]) => (
                <div key={label} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(201,168,76,0.10)" }}>
                  <dt className="text-[8px] uppercase tracking-[0.32em]" style={{ color: "#b09070" }}>{label}</dt>
                  <dd className="text-[11px]" style={{ color: "#3b2a1a", fontWeight: 400 }}>{val}</dd>
                </div>
              ))}
            </dl>
          )}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="px-3 py-1 text-[7px] uppercase tracking-[0.28em]"
                  style={{ border: "1px solid rgba(201,168,76,0.30)", color: "#b08840", borderRadius: "20px" }}>{t}</span>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-2 mt-auto pt-2">
            <button onClick={handleAdd}
              className="flex items-center justify-center gap-3 w-full py-3.5 transition-all duration-500"
              style={{
                background: added ? "linear-gradient(135deg,#8db08a,#6a9467)" : "linear-gradient(135deg,#c9a84c,#b08840)",
                border: "none", borderRadius: "12px", color: "#fdf8f2",
                fontSize: "0.62rem", letterSpacing: "0.38em", textTransform: "uppercase",
                fontFamily: "inherit", cursor: "pointer",
                boxShadow: added ? "0 4px 20px rgba(106,148,103,0.40)" : "0 4px 20px rgba(201,168,76,0.38)",
              }}>
              {added ? <><Check className="h-4 w-4" /> Added to cart</> : <><ShoppingBag className="h-4 w-4" /> Add to cart</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart?: (product: Product) => void;
  cartCount?: number;
}

export function ProductCard({ product, index = 0, onAddToCart, cartCount = 0 }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { ref, visible } = useReveal();

  const handleAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }, [product, onAddToCart]);

  const handleWish = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished((w) => !w);
  }, []);

  const handleModalAdd = useCallback((p: Product) => {
    onAddToCart?.(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }, [onAddToCart]);

  return (
    <>
      <article
        ref={ref as React.RefObject<HTMLElement>}
        className="group relative flex flex-col cursor-pointer"
        onClick={() => setModalOpen(true)}
        style={{
          background: "linear-gradient(160deg,#fdf8f2 0%,#faf3ea 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(201,168,76,0.18)",
          boxShadow: "0 2px 8px rgba(139,90,43,0.05), 0 12px 40px rgba(139,90,43,0.08)",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
          transition: `opacity 0.9s ${index * 0.1}s cubic-bezier(.16,1,.3,1), transform 0.9s ${index * 0.1}s cubic-bezier(.16,1,.3,1)`,
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ borderRadius: "20px", boxShadow: "inset 0 0 0 1.5px rgba(201,168,76,0.5), 0 16px 56px rgba(201,168,76,0.12)" }} />

        <div className="relative overflow-hidden" style={{ borderRadius: "20px 20px 0 0", aspectRatio: "3/4", background: "#f5ede0" }}>
          <img src={product.image} alt={product.name} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
            style={{ filter: "brightness(1.04) saturate(1.06)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(42,20,8,0.28) 0%, transparent 50%)" }} />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(42,20,8,0.18) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 z-10 pointer-events-none -translate-x-full group-hover:translate-x-[250%] transition-transform duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ background: "linear-gradient(105deg, transparent 30%, rgba(201,168,76,0.15) 50%, transparent 70%)", width: "55%" }} />

          {product.tag && (
            <span className="absolute top-3.5 left-3.5 px-3 py-1 text-[7px] uppercase tracking-[0.32em] font-medium"
              style={{ background: "rgba(253,248,242,0.94)", border: "1px solid rgba(201,168,76,0.5)", color: "#b08840", borderRadius: "20px", backdropFilter: "blur(8px)", boxShadow: "0 2px 8px rgba(139,90,43,0.12)" }}>
              {product.tag}
            </span>
          )}

          <button onClick={handleWish}
            className="absolute top-3.5 right-3.5 h-9 w-9 grid place-items-center rounded-full opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-400 hover:scale-110 active:scale-95"
            style={{ background: "rgba(253,248,242,0.92)", border: "1px solid rgba(201,168,76,0.30)", backdropFilter: "blur(8px)", boxShadow: "0 2px 12px rgba(139,90,43,0.14)" }}
            aria-label="Add to wishlist">
            <Heart className="h-3.5 w-3.5 transition-all duration-300"
              style={{ color: wished ? "#c9a84c" : "#c8a97e", fill: wished ? "#c9a84c" : "none", transform: wished ? "scale(1.15)" : "scale(1)" }} />
          </button>

          <button onClick={handleAdd}
            className="absolute bottom-3.5 right-3.5 h-11 w-11 rounded-full grid place-items-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 scale-90 group-hover:scale-100 transition-all duration-500 hover:scale-110 active:scale-95"
            style={{
              background: added ? "linear-gradient(135deg,#8db08a,#6a9467)" : "linear-gradient(135deg,#c9a84c,#b08840)",
              boxShadow: added ? "0 4px 20px rgba(106,148,103,0.5)" : "0 4px 20px rgba(201,168,76,0.5)",
              border: "none", color: "#fdf8f2", transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
            }}
            aria-label="Add to cart">
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          </button>

          {cartCount > 0 && (
            <span className="absolute bottom-3.5 left-3.5 h-5 min-w-5 px-1.5 grid place-items-center text-[8px] font-semibold rounded-full"
              style={{ background: "linear-gradient(135deg,#c9a84c,#b08840)", color: "#fdf8f2", boxShadow: "0 2px 8px rgba(201,168,76,0.45)" }}>
              {cartCount}
            </span>
          )}
        </div>

        <div className="flex flex-col px-5 pt-4 pb-5" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
          <p className="text-[7.5px] uppercase tracking-[0.42em] font-medium mb-2" style={{ color: "#c9a84c", opacity: 0.8 }}>
            {product.category}
          </p>
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="leading-snug flex-1"
              style={{ fontFamily: "'Cormorant Garamond','Playfair Display',Georgia,serif", fontSize: "1.18rem", fontWeight: 500, color: "#3b2a1a", letterSpacing: "0.01em" }}>
              {product.name}
            </h3>
            <div className="relative shrink-0 mt-0.5">
              <p style={{ fontFamily: "'Cormorant Garamond','Playfair Display',Georgia,serif", fontSize: "1.15rem", fontWeight: 600, color: "#b08840", whiteSpace: "nowrap" }}>
                {product.price} dh 
              </p>
              <span className="absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"
                style={{ background: "rgba(201,168,76,0.45)" }} />
            </div>
          </div>
          <div className="mb-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
            style={{ height: "1px", background: "linear-gradient(to right, rgba(201,168,76,0.35), transparent)" }} />
          <div className="flex items-center justify-between">
            <p className="text-[7.5px] uppercase tracking-[0.32em] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500"
              style={{ color: "#b08840" }}>
              View piece
            </p>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500"
              style={{ color: "#c9a84c" }} />
          </div>
        </div>
      </article>

      {modalOpen && (
        <ProductModal
          product={product}
          onClose={() => setModalOpen(false)}
          onAddToCart={handleModalAdd}
          inCart={cartCount > 0}
        />
      )}
    </>
  );
}