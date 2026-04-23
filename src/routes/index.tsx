import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero-cafe.jpg";
import foodImg from "@/assets/food.jpg";
import { BookOpen, Coffee, Leaf, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lily Cafe & Restaurant — A cozy place for food & privacy" },
      {
        name: "description",
        content:
          "Welcome to Lily Cafe & Restaurant. Private cabins, warm ambience, and a beautiful flipbook menu of veg, non-veg, drinks and house specials.",
      },
      { property: "og:title", content: "Lily Cafe & Restaurant" },
      { property: "og:description", content: "A cozy place for food & privacy." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative -mt-20 min-h-[92vh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Lily Cafe interior"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4))]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-cream fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs tracking-[0.3em] uppercase">
            <Sparkles className="size-3" /> Est. Warm Hospitality
          </div>
          <h1 className="mt-6 text-6xl md:text-8xl font-display text-balance text-white drop-shadow-lg">
            <span className="font-script text-[1.2em] text-accent block leading-none">Lily</span>
            Cafe & Restaurant
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            A cozy place for food & privacy — intimate cabins, heartfelt flavors,
            and an atmosphere that lingers.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-3 font-medium hover:scale-105 transition shadow-[var(--shadow-warm)]"
            >
              <BookOpen className="size-4" /> View Menu
            </Link>
            <Link
              to="/cabins"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 text-white px-7 py-3 font-medium hover:bg-white hover:text-primary transition"
            >
              Book Cabin
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-[0.3em] uppercase">
          Scroll ↓
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Coffee, title: "Crafted with Love", text: "Every dish made fresh from trusted, local ingredients." },
            { icon: Leaf, title: "Private Cabins", text: "Five intimate cabins for quiet, undisturbed dining." },
            { icon: Sparkles, title: "Cozy Ambience", text: "Soft lighting, warm wood, plants — your little escape." },
          ].map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl bg-card p-8 shadow-[var(--shadow-soft)] border border-border hover:-translate-y-1 transition fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <f.icon className="size-8 text-accent" />
              <h3 className="mt-4 text-2xl">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story strip */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-script text-4xl text-accent">Our taste</p>
          <h2 className="text-4xl md:text-5xl mt-2">Where every bite tells a story</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            From crispy pakoras to rich mutton curries, from street-style momos
            to sunset cocktails — our kitchen brings together flavors that feel
            both familiar and thrilling. Pull up a chair. Stay a while.
          </p>
          <Link
            to="/menu"
            className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all"
          >
            Explore the menu →
          </Link>
        </div>
        <div className="relative">
          <img
            src={foodImg}
            alt="Plated cafe food"
            width={1280}
            height={896}
            loading="lazy"
            className="rounded-3xl shadow-[var(--shadow-warm)] object-cover aspect-[4/3]"
          />
          <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl px-6 py-4 shadow-[var(--shadow-soft)] border border-border hidden md:block">
            <div className="font-script text-3xl text-accent">5★</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Guest favorite
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
