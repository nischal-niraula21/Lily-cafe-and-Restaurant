import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Lily Cafe & Restaurant" },
      {
        name: "description",
        content:
          "Flip through our flipbook menu — veg, chicken & mutton, drinks, mocktails, cocktails, ice creams, and house specials.",
      },
      { property: "og:title", content: "Menu — Lily Cafe & Restaurant" },
      { property: "og:description", content: "A beautiful flipbook menu of cafe favorites." },
    ],
  }),
  component: MenuPage,
});

type Item = { name: string; price: string; note?: string };
type PageContent = {
  title: string;
  subtitle?: string;
  items: Item[];
};

const pages: PageContent[] = [
  {
    title: "Pure Veg Starters",
    subtitle: "Crispy · fresh · soulful",
    items: [
      { name: "Veg Pakora", price: "180", note: "Mixed vegetable fritters" },
      { name: "Onion Rings", price: "200" },
      { name: "Chauchau Sadheko", price: "160", note: "Spicy noodle salad" },
      { name: "Aloo Sadheko", price: "150" },
      { name: "Aloo Tareko", price: "170" },
      { name: "Paneer Chilly (Dry/Gravy)", price: "320" },
      { name: "Paneer Tikka", price: "340" },
      { name: "Veg Spring Roll", price: "220" },
      { name: "French Fries", price: "180" },
      { name: "Chilly Mushroom", price: "280" },
    ],
  },
  {
    title: "Chicken Specials",
    subtitle: "Marinated · grilled · tender",
    items: [
      { name: "Chicken Chilly (Dry/Gravy)", price: "340" },
      { name: "Chicken Sadheko", price: "320" },
      { name: "Chicken Sekuwa", price: "380" },
      { name: "Chicken Fry", price: "360" },
      { name: "Chicken Sizzler", price: "520" },
      { name: "Butter Chicken", price: "480" },
      { name: "Chicken Tikka Masala", price: "460" },
      { name: "Chicken Curry", price: "380" },
      { name: "Chicken Lollipop", price: "420" },
      { name: "Tandoori Chicken (Half/Full)", price: "550 / 950" },
    ],
  },
  {
    title: "Mutton Delights",
    subtitle: "Slow cooked · rich · hearty",
    items: [
      { name: "Mutton Curry", price: "520" },
      { name: "Mutton Sadheko", price: "480" },
      { name: "Mutton Chilly", price: "540" },
      { name: "Mutton Sekuwa", price: "560" },
      { name: "Mutton Fry", price: "500" },
      { name: "Mutton Bhutuwa", price: "540" },
      { name: "Mutton Rogan Josh", price: "580" },
      { name: "Mutton Thali", price: "650", note: "Served with rice, dal, papad" },
    ],
  },
  {
    title: "Street Favorites",
    subtitle: "Momo · Chowmein · Thukpa",
    items: [
      { name: "Veg Momo (Steam/Fry/Jhol)", price: "140" },
      { name: "Chicken Momo (Steam/Fry/Jhol)", price: "180" },
      { name: "Buff Momo", price: "160" },
      { name: "C-Momo (Chilly Momo)", price: "220" },
      { name: "Veg Chowmein", price: "170" },
      { name: "Chicken Chowmein", price: "200" },
      { name: "Mixed Chowmein", price: "230" },
      { name: "Veg Thukpa", price: "190" },
      { name: "Chicken Thukpa", price: "220" },
      { name: "Wai Wai Sadheko", price: "120" },
    ],
  },
  {
    title: "Rice & Bread",
    subtitle: "From the tandoor & wok",
    items: [
      { name: "Steamed Rice", price: "120" },
      { name: "Jeera Rice", price: "180" },
      { name: "Veg Fried Rice", price: "220" },
      { name: "Chicken Fried Rice", price: "260" },
      { name: "Veg Biryani", price: "320" },
      { name: "Chicken Biryani", price: "380" },
      { name: "Plain Naan", price: "60" },
      { name: "Butter Naan", price: "80" },
      { name: "Garlic Naan", price: "100" },
      { name: "Tandoori Roti", price: "40" },
    ],
  },
  {
    title: "Soft Drinks & Hot Beverages",
    subtitle: "Coffee · tea · refreshments",
    items: [
      { name: "Coca-Cola / Sprite / Fanta", price: "80" },
      { name: "Mineral Water (1L)", price: "60" },
      { name: "Milk Tea", price: "50" },
      { name: "Black Tea / Lemon Tea", price: "40" },
      { name: "Masala Tea", price: "70" },
      { name: "Espresso", price: "120" },
      { name: "Cappuccino", price: "180" },
      { name: "Cafe Latte", price: "200" },
      { name: "Hot Chocolate", price: "220" },
      { name: "Fresh Lime Soda (Sweet/Salt)", price: "120" },
    ],
  },
  {
    title: "Mocktails",
    subtitle: "Fresh · fruity · zero proof",
    items: [
      { name: "Virgin Mojito", price: "220" },
      { name: "Strawberry Breeze", price: "260" },
      { name: "Mango Sunrise", price: "260" },
      { name: "Blueberry Mint Cooler", price: "280" },
      { name: "Pina Colada (Virgin)", price: "280" },
      { name: "Shirley Temple", price: "240" },
      { name: "Watermelon Cooler", price: "240" },
      { name: "Lily Special Punch", price: "300", note: "House signature" },
    ],
  },
  {
    title: "Cocktails",
    subtitle: "Hand-shaken · 21+",
    items: [
      { name: "Classic Mojito", price: "380" },
      { name: "Margarita (Classic/Strawberry)", price: "420" },
      { name: "Old Fashioned", price: "480" },
      { name: "Pina Colada", price: "440" },
      { name: "Whiskey Sour", price: "460" },
      { name: "Long Island Iced Tea", price: "520" },
      { name: "Cosmopolitan", price: "450" },
      { name: "Bloody Mary", price: "440" },
      { name: "Tequila Sunrise", price: "460" },
      { name: "Lily Signature Martini", price: "550" },
    ],
  },
  {
    title: "Ice Creams & Desserts",
    subtitle: "The perfect finale",
    items: [
      { name: "Vanilla Scoop", price: "120" },
      { name: "Chocolate Fudge", price: "160" },
      { name: "Strawberry Delight", price: "160" },
      { name: "Sundae Special", price: "280" },
      { name: "Brownie with Ice Cream", price: "320" },
      { name: "Kulfi Falooda", price: "240" },
      { name: "Gulab Jamun (2 pcs)", price: "140" },
      { name: "Cheesecake Slice", price: "280" },
      { name: "Tiramisu", price: "320" },
      { name: "Banana Split", price: "300" },
    ],
  },
];

// Pair pages into spreads: each spread has page-front (right) + next page-back (left)
// We'll render N absolute "sheets", each with front + back of facing pages.
// Simpler approach: render a stack of pages and flip sequentially.

function MenuPage() {
  const [current, setCurrent] = useState(0);
  const totalPages = pages.length + 1; // cover + pages
  const maxIndex = totalPages - 1;

  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <p className="font-script text-4xl text-accent">Our Menu</p>
          <h1 className="text-5xl md:text-6xl mt-2">Flip through our kitchen</h1>
          <p className="mt-4 text-muted-foreground">
            Click the left side of the book to go back, the right side to go forward — or use the arrows.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={prev}
            disabled={current === 0}
            className="hidden sm:inline-flex rounded-full bg-card shadow-[var(--shadow-soft)] border border-border p-3 hover:bg-accent hover:text-accent-foreground transition disabled:opacity-30 disabled:hover:bg-card disabled:hover:text-foreground"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div
            className="flipbook relative w-full max-w-3xl h-[78vh] min-h-[520px] md:h-auto md:min-h-0 md:aspect-[4/3]"
          >
            {/* Stacked pages */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const flipped = i < current;
              const zIndex = totalPages - i;
              return (
                <div
                  key={i}
                  className={`flipbook-page select-none ${flipped ? "flipped" : ""}`}
                  style={{ zIndex: flipped ? i : zIndex }}
                >
                  <PageFace index={i} side="front" />
                  <PageFace index={i} side="back" />
                </div>
              );
            })}
            {/* Click zones for page turn */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous page"
              className="absolute inset-y-0 left-0 w-1/2 z-[100] cursor-w-resize bg-transparent"
            />
            <button
              type="button"
              onClick={next}
              aria-label="Next page"
              className="absolute inset-y-0 right-0 w-1/2 z-[100] cursor-e-resize bg-transparent"
            />
            {/* Spine shadow overlay */}
            <div className="flipbook-spine absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 z-[101] pointer-events-none" />
          </div>

          <button
            onClick={next}
            disabled={current === maxIndex}
            className="rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] p-3 hover:bg-primary/90 transition disabled:opacity-30"
            aria-label="Next page"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Page {current} / {maxIndex}
        </div>
      </section>
    </Layout>
  );
}

function PageFace({ index, side }: { index: number; side: "front" | "back" }) {
  // index 0 = cover
  // index 1..N = menu pages[index-1]
  // side "front" visible before flip, "back" visible after flip
  // For a simple book, we show the page content on "front"
  // and a subtle backside on "back".
  if (index === 0) {
    return (
      <div className={`page-${side} flex flex-col items-center justify-center text-center`}>
        {side === "front" ? (
          <>
            <div className="absolute inset-6 rounded-lg border-2 border-accent/40" />
            <p className="font-script text-6xl md:text-7xl text-accent">Lily</p>
            <div className="mt-2 text-sm tracking-[0.3em] uppercase text-muted-foreground">
              Cafe & Restaurant
            </div>
            <div className="mt-10 text-2xl md:text-3xl font-display">The Menu</div>
            <p className="mt-6 max-w-sm text-muted-foreground italic">
              "A cozy place for food & privacy"
            </p>
            <div className="mt-10 text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Click page or arrow →
            </div>
          </>
        ) : (
          <div className="text-muted-foreground/40 font-script text-5xl">Lily</div>
        )}
      </div>
    );
  }

  const page = pages[index - 1];
  if (!page) return <div className={`page-${side}`} />;

  if (side === "back") {
    return (
      <div className="page-back flex items-center justify-center">
        <div className="text-muted-foreground/30 font-script text-4xl">Lily</div>
      </div>
    );
  }

  return (
    <div className="page-front flex flex-col">
      <div className="border-b border-accent/30 pb-3">
        <p className="font-script text-3xl text-accent">{page.title}</p>
        {page.subtitle && (
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mt-1">
            {page.subtitle}
          </p>
        )}
      </div>
      <ul className="mt-5 space-y-3 overflow-auto">
        {page.items.map((it) => (
          <li key={it.name} className="flex items-baseline gap-3">
            <span className="font-medium text-foreground">{it.name}</span>
            <span className="flex-1 border-b border-dotted border-muted-foreground/40 translate-y-[-4px]" />
            <span className="text-primary font-semibold">Rs {it.price}</span>
            {it.note && (
              <span className="sr-only">{it.note}</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4 text-right text-xs text-muted-foreground font-script text-xl">
        — page {index} —
      </div>
    </div>
  );
}
