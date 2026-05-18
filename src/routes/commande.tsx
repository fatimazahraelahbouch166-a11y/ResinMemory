import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { ArrowLeft, MessageCircle, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/commande")({
  component: Commande,
  head: () => ({
    meta: [
      { title: "Mon Panier — ResinMemory" },
      { name: "description", content: "Finalisez votre commande via WhatsApp." },
    ],
  }),
});

const serif = "'Cormorant Garamond','Playfair Display',Georgia,serif";
const WHATSAPP_NUMBER = "212776553436"; // ← remplacez par votre numéro

/* ─── Types ─────────────────────────────────────── */
interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  image: string;
}

/* ─── Read cart from sessionStorage ─────────────── */
function readCart(): CartItem[] {
  try {
    return JSON.parse(sessionStorage.getItem("resinmemory_cart") || "[]");
  } catch {
    return [];
  }
}

/* ─── Build WhatsApp message ─────────────────────── */
function buildWhatsAppUrl(items: CartItem[], total: number): string {
  const lines: string[] = [];
  lines.push("🌿 *Nouvelle commande ResinMemory*");
  lines.push("");
  lines.push("*🛍️ Articles*");
  items.forEach((item) => {
    lines.push(`• ${item.name} × ${item.qty} — ${(item.price * item.qty).toLocaleString()} MAD`);
  });
  lines.push("");
  lines.push(`*Total : ${total.toLocaleString()} MAD*`);
  lines.push("");
  lines.push("_Merci de confirmer la disponibilité et les délais._");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/* ─── Item row ───────────────────────────────────── */
function ItemRow({
  item,
  onQty,
  onRemove,
}: {
  item: CartItem;
  onQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      className="flex gap-4 items-center py-5"
      style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}
    >
      {/* Image */}
      <div
        className="shrink-0 overflow-hidden"
        style={{
          width: 76,
          height: 88,
          borderRadius: 12,
          border: "1px solid rgba(201,168,76,0.22)",
          background: "#f5ede0",
        }}
      >
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center">
            <ShoppingBag className="h-6 w-6" style={{ color: "rgba(201,168,76,0.35)" }} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {item.category && (
          <p className="text-[7px] uppercase tracking-[0.35em] mb-1" style={{ color: "#c9a84c" }}>
            {item.category}
          </p>
        )}
        <p
          style={{
            fontFamily: serif,
            fontSize: "1.05rem",
            fontWeight: 500,
            color: "#3b2a1a",
            lineHeight: 1.25,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </p>
        <p style={{ fontSize: "0.78rem", color: "#9a7a55", marginTop: 2 }}>
          {item.price.toLocaleString()} MAD / pièce
        </p>

        {/* Qty controls */}
        <div className="flex items-center gap-3 mt-3">
          <div
            className="flex items-center overflow-hidden"
            style={{ border: "1px solid rgba(201,168,76,0.30)", borderRadius: 8 }}
          >
            <button
              onClick={() => (item.qty === 1 ? onRemove(item.id) : onQty(item.id, item.qty - 1))}
              className="w-8 h-8 grid place-items-center transition-colors hover:bg-amber-50"
              style={{ color: "#b08840" }}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span
              className="w-8 text-center"
              style={{ fontSize: "0.85rem", color: "#3b2a1a", fontWeight: 600 }}
            >
              {item.qty}
            </span>
            <button
              onClick={() => onQty(item.id, item.qty + 1)}
              className="w-8 h-8 grid place-items-center transition-colors hover:bg-amber-50"
              style={{ color: "#b08840" }}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="w-8 h-8 grid place-items-center rounded-full transition-all hover:bg-red-50"
            style={{ border: "1px solid rgba(201,168,76,0.20)" }}
            aria-label="Supprimer"
          >
            <Trash2 className="h-3.5 w-3.5" style={{ color: "#c07060" }} />
          </button>
        </div>
      </div>

      {/* Line total */}
      <p
        style={{
          fontFamily: serif,
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#b08840",
          whiteSpace: "nowrap",
          minWidth: 80,
          textAlign: "right",
        }}
      >
        {(item.price * item.qty).toLocaleString()} MAD
      </p>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────── */
function Commande() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(readCart);

  const handleQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  const summaryLabel =
    items.length === 0
      ? "Panier vide"
      : items.length === 1
      ? `${items[0].name} × ${items[0].qty}`
      : `${items[0].name} +${items.length - 1}`;

  function handleWhatsApp() {
    window.open(buildWhatsAppUrl(items, total), "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg,#fdf8f2 0%,#faf3ea 100%)" }}
    >
      {/* Top nav */}
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-2">
        <button
          onClick={() => navigate({ to: "/shop" })}
          className="flex items-center gap-2 transition-opacity hover:opacity-60"
          style={{
            color: "#9a7a55",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour à la boutique
        </button>
      </div>

      {/* Page title */}
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-10">
        <div className="flex items-center gap-3 mb-1">
          <h1
            style={{
              fontFamily: serif,
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              fontWeight: 400,
              color: "#3b2a1a",
            }}
          >
            Mon Panier
          </h1>
          <ShoppingBag className="h-6 w-6 mb-1" style={{ color: "#c9a84c" }} />
        </div>
        <p style={{ fontSize: "0.78rem", color: "#9a7a55", letterSpacing: "0.05em" }}>
          {totalQty} article{totalQty !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Main two-column layout */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <ShoppingBag className="h-12 w-12" style={{ color: "rgba(201,168,76,0.3)" }} />
            <p className="text-[9px] uppercase tracking-[0.45em]" style={{ color: "#b09070" }}>
              Votre panier est vide
            </p>
            <button
              onClick={() => navigate({ to: "/shop" })}
              className="mt-2 px-6 py-2.5 text-[8px] uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
              style={{
                border: "1px solid rgba(201,168,76,0.4)",
                borderRadius: 8,
                color: "#b08840",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Découvrir la collection
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

            {/* ── Left: item list ── */}
            <div
              className="rounded-2xl px-7"
              style={{
                background: "rgba(255,252,247,0.9)",
                border: "1px solid rgba(201,168,76,0.16)",
                boxShadow: "0 2px 24px rgba(139,90,43,0.05)",
              }}
            >
              {items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  onQty={handleQty}
                  onRemove={handleRemove}
                />
              ))}

              <div className="py-5 flex flex-wrap gap-6">
                {["Pièce signée & numérotée", "Livraison gratuite", "2–3 semaines de fabrication"].map((t) => (
                  <p key={t} className="text-[7.5px] uppercase tracking-[0.28em]" style={{ color: "#c4a96b" }}>
                    · {t}
                  </p>
                ))}
              </div>
            </div>

            {/* ── Right: summary card ── */}
            <div
              className="rounded-2xl p-7 flex flex-col gap-5 lg:sticky lg:top-8"
              style={{
                background: "rgba(255,252,247,0.95)",
                border: "1px solid rgba(201,168,76,0.20)",
                boxShadow: "0 4px 32px rgba(139,90,43,0.08)",
              }}
            >
              <p className="text-[8px] uppercase tracking-[0.4em]" style={{ color: "#c9a84c" }}>
                Récapitulatif
              </p>

              {/* Summary line */}
              <div className="flex flex-col gap-0">
                <div
                  className="flex items-baseline justify-between py-3"
                  style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}
                >
                  <p style={{ fontSize: "0.82rem", color: "#7a5c3a", fontWeight: 300 }}>
                    {summaryLabel}
                  </p>
                  <p style={{ fontSize: "0.88rem", color: "#3b2a1a", fontWeight: 500 }}>
                    {total.toLocaleString()} MAD
                  </p>
                </div>

                <div
                  className="flex items-baseline justify-between py-3"
                  style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}
                >
                  <p style={{ fontSize: "0.82rem", color: "#7a5c3a", fontWeight: 300 }}>Livraison</p>
                  <p style={{ fontSize: "0.82rem", color: "#7a9a70" }}>Gratuite</p>
                </div>

                <div className="flex items-baseline justify-between pt-4">
                  <p style={{ fontSize: "0.9rem", color: "#3b2a1a", fontWeight: 500 }}>Total</p>
                  <p style={{ fontFamily: serif, fontSize: "1.6rem", fontWeight: 600, color: "#b08840" }}>
                    {total.toLocaleString()} MAD
                  </p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-4 flex items-center justify-center gap-2.5 transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg,#25D366,#1ebe5d)",
                  borderRadius: 12,
                  border: "none",
                  color: "#fff",
                  fontSize: "0.68rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  boxShadow: "0 5px 24px rgba(37,211,102,0.35)",
                  fontWeight: 600,
                }}
              >
                <MessageCircle className="h-4 w-4" />
                Commander via WhatsApp
              </button>

              <p
                className="text-center text-[7.5px] uppercase tracking-[0.22em]"
                style={{ color: "#b09070" }}
              >
                Cliquez pour envoyer votre commande directement sur WhatsApp 📲
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}