// import { useState, useEffect, useRef } from "react";
// import { Plus, Check, Heart } from "lucide-react";

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   category: string;
//   image: string;
//   tag?: string;
// }

// function useReveal(threshold = 0.12) {
//   const ref = useRef<HTMLElement>(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           obs.disconnect();
//         }
//       },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return { ref, visible };
// }

// export function ProductCard({
//   product,
//   index = 0,
// }: {
//   product: Product;
//   index?: number;
// }) {
//   const [added, setAdded] = useState(false);
//   const [wished, setWished] = useState(false);
//   const { ref, visible } = useReveal();

//   function handleAdd(e: React.MouseEvent) {
//     e.preventDefault();
//     setAdded(true);
//     setTimeout(() => setAdded(false), 1800);
//   }

//   function handleWish(e: React.MouseEvent) {
//     e.preventDefault();
//     setWished((w) => !w);
//   }

//   return (
//     <article
//       ref={ref as React.RefObject<HTMLElement>}
//       className="group relative flex flex-col"
//       style={{
//         /* Warm ivory card background — the core of the redesign */
//         background: "linear-gradient(160deg, #fdf8f2 0%, #faf3ea 100%)",
//         borderRadius: "18px",
//         border: "1px solid rgba(201, 168, 76, 0.22)",
//         boxShadow:
//           "0 2px 8px rgba(139, 90, 43, 0.06), 0 8px 32px rgba(139, 90, 43, 0.08), 0 1px 2px rgba(201,168,76,0.12)",
//         overflow: "hidden",
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
//         transition: `opacity 0.9s ${index * 0.1}s cubic-bezier(.16,1,.3,1), transform 0.9s ${index * 0.1}s cubic-bezier(.16,1,.3,1)`,
//         willChange: "transform, opacity",
//       }}
//     >
//       {/* ── Hover gold border glow ── */}
//       <div
//         className="absolute inset-0 rounded-[18px] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//         style={{
//           boxShadow: "0 0 0 1.5px rgba(201,168,76,0.45), 0 12px 48px rgba(201,168,76,0.10)",
//         }}
//       />

//       {/* ── Image container ── */}
//       <div
//         className="relative overflow-hidden"
//         style={{
//           borderRadius: "16px 16px 0 0",
//           aspectRatio: "3 / 4",
//           background: "#f5ede0",
//         }}
//       >
//         <img
//           src={product.image}
//           alt={product.name}
//           loading="lazy"
//           className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
//           style={{
//             /* Brightened & warm-toned — no dark filter */
//             filter: "brightness(1.03) saturate(1.08)",
//           }}
//         />

//         {/* Delicate warm gradient overlay on hover */}
//         <div
//           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
//           style={{
//             background:
//               "linear-gradient(to top, rgba(250,243,234,0.55) 0%, transparent 55%)",
//           }}
//         />

//         {/* Gold shimmer sweep */}
//         <div
//           className="absolute inset-0 z-10 pointer-events-none translate-x-[-120%] group-hover:translate-x-[180%] transition-transform duration-[1000ms] ease-[cubic-bezier(.16,1,.3,1)]"
//           style={{
//             background:
//               "linear-gradient(105deg, transparent 30%, rgba(201,168,76,0.12) 50%, transparent 70%)",
//             width: "60%",
//           }}
//         />

//         {/* Tag badge */}
//         {product.tag && (
//           <span
//             className="absolute top-4 left-4 px-3 py-1 text-[8px] uppercase tracking-[0.3em] font-medium"
//             style={{
//               background: "rgba(253,248,242,0.92)",
//               border: "1px solid rgba(201,168,76,0.45)",
//               color: "#b08840",
//               borderRadius: "20px",
//               backdropFilter: "blur(6px)",
//               letterSpacing: "0.28em",
//             }}
//           >
//             {product.tag}
//           </span>
//         )}

//         {/* Wishlist heart */}
//         <button
//           onClick={handleWish}
//           className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 hover:scale-110 active:scale-95"
//           style={{
//             background: "rgba(253,248,242,0.90)",
//             border: "1px solid rgba(201,168,76,0.30)",
//             backdropFilter: "blur(6px)",
//             boxShadow: "0 2px 12px rgba(139,90,43,0.10)",
//           }}
//           aria-label="Add to wishlist"
//         >
//           <Heart
//             className="h-4 w-4 transition-colors duration-200"
//             style={{
//               color: wished ? "#c9a84c" : "#c8a97e",
//               fill: wished ? "#c9a84c" : "none",
//             }}
//           />
//         </button>

//         {/* Add to cart — bottom right, slides up on hover */}
//         <button
//           onClick={handleAdd}
//           className="absolute bottom-4 right-4 h-11 w-11 rounded-full grid place-items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 scale-90 group-hover:scale-100 transition-all duration-500 hover:scale-110 active:scale-95"
//           style={{
//             background: added
//               ? "linear-gradient(135deg, #8db08a, #6a9467)"
//               : "linear-gradient(135deg, #c9a84c, #b08840)",
//             boxShadow: added
//               ? "0 4px 20px rgba(106,148,103,0.45)"
//               : "0 4px 20px rgba(201,168,76,0.45)",
//             border: "none",
//             color: "#fdf8f2",
//             transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
//           }}
//           aria-label="Add to cart"
//         >
//           {added ? (
//             <Check className="h-4 w-4" />
//           ) : (
//             <Plus className="h-4 w-4" />
//           )}
//         </button>
//       </div>

//       {/* ── Info section ── */}
//       <div
//         className="flex flex-col gap-3 px-5 py-5"
//         style={{
//           borderTop: "1px solid rgba(201,168,76,0.13)",
//         }}
//       >
//         {/* Category */}
//         <p
//           className="text-[8px] uppercase tracking-[0.38em] font-medium"
//           style={{ color: "#c9a84c", opacity: 0.85 }}
//         >
//           {product.category}
//         </p>

//         {/* Name & Price row */}
//         <div className="flex items-end justify-between gap-3">
//           <h3
//             className="leading-tight flex-1"
//             style={{
//               fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
//               fontSize: "1.2rem",
//               fontWeight: 500,
//               color: "#3b2a1a",
//               letterSpacing: "0.01em",
//             }}
//           >
//             {product.name}
//           </h3>

//           <div className="relative shrink-0 pb-0.5">
//             <p
//               style={{
//                 fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
//                 fontSize: "1.2rem",
//                 fontWeight: 600,
//                 color: "#b08840",
//                 letterSpacing: "0.01em",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               ${product.price}
//             </p>
//             {/* Animated underline */}
//             <span
//               className="absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"
//               style={{ background: "rgba(201,168,76,0.50)" }}
//             />
//           </div>
//         </div>

//         {/* CTA text — fades in on hover */}
//         <p
//           className="text-[8px] uppercase tracking-[0.28em] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400"
//           style={{ color: "#c9a84c" }}
//         >
//           View piece →
//         </p>
//       </div>
//     </article>
//   );
// }
import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Check, Heart, X, ShoppingBag, ArrowRight, Star } from "lucide-react";

/* ─────────────────────────── TYPES ─────────────────────────── */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
  /* Optional extended fields shown in the modal */
  material?: string;
  description?: string;
  dimensions?: string;
  leadTime?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
}

/* ─────────────────────────── HOOK ──────────────────────────── */

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ──────────────────────── PRODUCT MODAL ────────────────────── */

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  inCart: boolean;
}

function ProductModal({ product, onClose, onAddToCart, inCart }: ProductModalProps) {
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  /* Close on Escape */
  useEffect(() => {
    if (!product) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  /* Reset added state when product changes */
  useEffect(() => { setAdded(false); }, [product?.id]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
  };

  const specs = [
    product.material   && ["Matière",             product.material],
    product.dimensions && ["Dimensions",           product.dimensions],
    product.leadTime   && ["Délai de fabrication", product.leadTime],
  ].filter(Boolean) as [string, string][];

  const stars = product.rating ?? 5;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(14,10,6,0.82)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      {/* Modal panel */}
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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-9 w-9 grid place-items-center rounded-full transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(253,248,242,0.92)",
            border: "1px solid rgba(201,168,76,0.30)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 2px 12px rgba(139,90,43,0.12)",
          }}
          aria-label="Fermer"
        >
          <X className="h-4 w-4" style={{ color: "#7a5c3a" }} />
        </button>

        {/* Left — image */}
        <div
          className="relative shrink-0 w-full md:w-[44%] overflow-hidden"
          style={{
            borderRadius: "20px 0 0 20px",
            aspectRatio: "3/4",
            background: "#f5ede0",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            style={{ filter: "brightness(1.03) saturate(1.08)" }}
          />

          {/* Gradient fade at bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(250,243,234,0.6) 0%, transparent 45%)",
            }}
          />

          {/* Tag badge */}
          {product.tag && (
            <span
              className="absolute top-4 left-4 px-3 py-1 text-[8px] uppercase tracking-[0.3em]"
              style={{
                background: "rgba(253,248,242,0.92)",
                border: "1px solid rgba(201,168,76,0.45)",
                color: "#b08840",
                borderRadius: "20px",
                backdropFilter: "blur(6px)",
              }}
            >
              {product.tag}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={() => setWished((w) => !w)}
            className="absolute bottom-4 left-4 h-9 w-9 grid place-items-center rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(253,248,242,0.90)",
              border: "1px solid rgba(201,168,76,0.30)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 2px 12px rgba(139,90,43,0.10)",
            }}
            aria-label="Ajouter aux favoris"
          >
            <Heart
              className="h-4 w-4 transition-colors duration-200"
              style={{ color: wished ? "#c9a84c" : "#c8a97e", fill: wished ? "#c9a84c" : "none" }}
            />
          </button>
        </div>

        {/* Right — info */}
        <div
          className="flex flex-col gap-4 p-7 md:p-8 overflow-y-auto flex-1"
          style={{ borderLeft: "1px solid rgba(201,168,76,0.13)" }}
        >
          {/* Category */}
          <p
            className="text-[8px] uppercase tracking-[0.42em]"
            style={{ color: "#c9a84c", opacity: 0.85 }}
          >
            {product.category}
          </p>

          {/* Name */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond','Playfair Display',Georgia,serif",
              fontSize: "1.75rem",
              fontWeight: 500,
              color: "#3b2a1a",
              lineHeight: 1.15,
              letterSpacing: "0.01em",
            }}
          >
            {product.name}
          </h2>

          {/* Stars */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3"
                  style={{
                    fill: i < Math.round(stars) ? "#c9a84c" : "none",
                    color: "#c9a84c",
                  }}
                />
              ))}
            </div>
            {product.reviewCount && (
              <span
                className="text-[9px] uppercase tracking-[0.25em]"
                style={{ color: "#b09070" }}
              >
                {product.reviewCount} avis
              </span>
            )}
          </div>

          {/* Price */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond','Playfair Display',Georgia,serif",
              fontSize: "1.55rem",
              fontWeight: 600,
              color: "#b08840",
            }}
          >
            ${product.price}
          </p>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(201,168,76,0.22)" }} />

          {/* Description */}
          {product.description && (
            <p
              className="leading-relaxed"
              style={{ fontSize: "0.83rem", color: "#7a5c3a", fontWeight: 300 }}
            >
              {product.description}
            </p>
          )}

          {/* Specs table */}
          {specs.length > 0 && (
            <dl className="flex flex-col">
              {specs.map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: "1px solid rgba(201,168,76,0.10)" }}
                >
                  <dt
                    className="text-[8px] uppercase tracking-[0.32em]"
                    style={{ color: "#b09070" }}
                  >
                    {label}
                  </dt>
                  <dd
                    className="text-[11px]"
                    style={{ color: "#3b2a1a", fontWeight: 400 }}
                  >
                    {val}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {/* Tag pills */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-[7px] uppercase tracking-[0.28em]"
                  style={{
                    border: "1px solid rgba(201,168,76,0.30)",
                    color: "#b08840",
                    borderRadius: "20px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col gap-2 mt-auto pt-2">
            <button
              onClick={handleAdd}
              className="flex items-center justify-center gap-3 w-full py-3.5 transition-all duration-500"
              style={{
                background: added
                  ? "linear-gradient(135deg,#8db08a,#6a9467)"
                  : "linear-gradient(135deg,#c9a84c,#b08840)",
                border: "none",
                borderRadius: "12px",
                color: "#fdf8f2",
                fontSize: "0.62rem",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                fontFamily: "inherit",
                cursor: "pointer",
                boxShadow: added
                  ? "0 4px 20px rgba(106,148,103,0.40)"
                  : "0 4px 20px rgba(201,168,76,0.38)",
              }}
            >
              {added ? (
                <><Check className="h-4 w-4" /> Ajouté au panier</>
              ) : (
                <><ShoppingBag className="h-4 w-4" /> Ajouter au panier</>
              )}
            </button>

            <button
              className="flex items-center justify-center gap-2 w-full py-3 transition-all duration-300 hover:opacity-80"
              style={{
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.30)",
                borderRadius: "12px",
                color: "#b08840",
                fontSize: "0.62rem",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Commander sur mesure <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────── PRODUCT CARD ─────────────────────── */

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart?: (product: Product) => void;
  cartCount?: number;
}

export function ProductCard({
  product,
  index = 0,
  onAddToCart,
  cartCount = 0,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { ref, visible } = useReveal();

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onAddToCart?.(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    },
    [product, onAddToCart]
  );

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
      {/* ── Card ── */}
      <article
        ref={ref as React.RefObject<HTMLElement>}
        className="group relative flex flex-col cursor-pointer"
        onClick={() => setModalOpen(true)}
        style={{
          background: "linear-gradient(160deg,#fdf8f2 0%,#faf3ea 100%)",
          borderRadius: "18px",
          border: "1px solid rgba(201,168,76,0.22)",
          boxShadow:
            "0 2px 8px rgba(139,90,43,0.06),0 8px 32px rgba(139,90,43,0.08),0 1px 2px rgba(201,168,76,0.12)",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
          transition: `opacity 0.9s ${index * 0.1}s cubic-bezier(.16,1,.3,1),transform 0.9s ${index * 0.1}s cubic-bezier(.16,1,.3,1)`,
        }}
      >
        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-[18px] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: "0 0 0 1.5px rgba(201,168,76,0.45),0 12px 48px rgba(201,168,76,0.10)",
          }}
        />

        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: "16px 16px 0 0", aspectRatio: "3/4", background: "#f5ede0" }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
            style={{ filter: "brightness(1.03) saturate(1.08)" }}
          />

          {/* Warm overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: "linear-gradient(to top,rgba(250,243,234,0.55) 0%,transparent 55%)",
            }}
          />

          {/* Gold shimmer sweep */}
          <div
            className="absolute inset-0 z-10 pointer-events-none translate-x-[-120%] group-hover:translate-x-[180%] transition-transform duration-[1000ms] ease-[cubic-bezier(.16,1,.3,1)]"
            style={{
              background:
                "linear-gradient(105deg,transparent 30%,rgba(201,168,76,0.12) 50%,transparent 70%)",
              width: "60%",
            }}
          />

          {/* Tag badge */}
          {product.tag && (
            <span
              className="absolute top-4 left-4 px-3 py-1 text-[8px] uppercase tracking-[0.3em] font-medium"
              style={{
                background: "rgba(253,248,242,0.92)",
                border: "1px solid rgba(201,168,76,0.45)",
                color: "#b08840",
                borderRadius: "20px",
                backdropFilter: "blur(6px)",
              }}
            >
              {product.tag}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWish}
            className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 hover:scale-110 active:scale-95"
            style={{
              background: "rgba(253,248,242,0.90)",
              border: "1px solid rgba(201,168,76,0.30)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 2px 12px rgba(139,90,43,0.10)",
            }}
            aria-label="Ajouter aux favoris"
          >
            <Heart
              className="h-4 w-4 transition-colors duration-200"
              style={{ color: wished ? "#c9a84c" : "#c8a97e", fill: wished ? "#c9a84c" : "none" }}
            />
          </button>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className="absolute bottom-4 right-4 h-11 w-11 rounded-full grid place-items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 scale-90 group-hover:scale-100 transition-all duration-500 hover:scale-110 active:scale-95"
            style={{
              background: added
                ? "linear-gradient(135deg,#8db08a,#6a9467)"
                : "linear-gradient(135deg,#c9a84c,#b08840)",
              boxShadow: added
                ? "0 4px 20px rgba(106,148,103,0.45)"
                : "0 4px 20px rgba(201,168,76,0.45)",
              border: "none",
              color: "#fdf8f2",
              transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
            }}
            aria-label="Ajouter au panier"
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>

          {/* Cart count badge */}
          {cartCount > 0 && (
            <span
              className="absolute bottom-4 left-4 h-5 min-w-5 px-1.5 grid place-items-center text-[8px] font-semibold rounded-full"
              style={{
                background: "linear-gradient(135deg,#c9a84c,#b08840)",
                color: "#fdf8f2",
                boxShadow: "0 2px 8px rgba(201,168,76,0.45)",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>

        {/* Info section */}
        <div
          className="flex flex-col gap-3 px-5 py-5"
          style={{ borderTop: "1px solid rgba(201,168,76,0.13)" }}
        >
          <p
            className="text-[8px] uppercase tracking-[0.38em] font-medium"
            style={{ color: "#c9a84c", opacity: 0.85 }}
          >
            {product.category}
          </p>

          <div className="flex items-end justify-between gap-3">
            <h3
              className="leading-tight flex-1"
              style={{
                fontFamily: "'Cormorant Garamond','Playfair Display',Georgia,serif",
                fontSize: "1.2rem",
                fontWeight: 500,
                color: "#3b2a1a",
              }}
            >
              {product.name}
            </h3>

            <div className="relative shrink-0 pb-0.5">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond','Playfair Display',Georgia,serif",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#b08840",
                  whiteSpace: "nowrap",
                }}
              >
                ${product.price}
              </p>
              <span
                className="absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"
                style={{ background: "rgba(201,168,76,0.50)" }}
              />
            </div>
          </div>

          <p
            className="text-[8px] uppercase tracking-[0.28em] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400"
            style={{ color: "#c9a84c" }}
          >
            Voir la pièce →
          </p>
        </div>
      </article>

      {/* ── Modal ── */}
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

/* ──────────────── USAGE EXAMPLE (optional demo) ────────────── */
/*
  // In your parent page, track cart state and pass callbacks:

  const [cart, setCart] = useState<Record<string, number>>({});

  function handleAddToCart(product: Product) {
    setCart(prev => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }));
  }

  // Then in JSX:
  <ProductCard
    product={product}
    index={i}
    onAddToCart={handleAddToCart}
    cartCount={cart[product.id] ?? 0}
  />
*/