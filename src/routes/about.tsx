import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import foodImg from "@/assets/food.jpg";
import heroImg from "@/assets/hero-cafe.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Lily Cafe & Restaurant" },
      {
        name: "description",
        content:
          "Our story: a cozy neighborhood cafe with private cabins, warm service, and food made from the heart.",
      },
      { property: "og:title", content: "About Lily Cafe & Restaurant" },
      { property: "og:description", content: "A cozy neighborhood cafe." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="font-script text-4xl text-accent">Our story</p>
        <h1 className="text-5xl md:text-6xl mt-2 text-balance">
          Food, friendship, and a little bit of magic
        </h1>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Lily began as a quiet dream — a place where friends could linger, couples
          could hide away, and strangers could leave as regulars. We believe great
          food is generous, and the best evenings are the ones you don't want to end.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <img src={heroImg} width={1920} height={1280} loading="lazy" alt="Interior" className="rounded-3xl shadow-[var(--shadow-soft)] object-cover aspect-[4/3]" />
        <img src={foodImg} width={1280} height={896} loading="lazy" alt="Food" className="rounded-3xl shadow-[var(--shadow-warm)] object-cover aspect-[4/3]" />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          { h: "Cozy environment", p: "Warm wood, lantern light, plants — an ambience you can feel." },
          { h: "Private cabins", p: "Five intimate cabins for conversations that deserve quiet." },
          { h: "Quality food", p: "Fresh ingredients, honest recipes, and a lot of care in every plate." },
        ].map((v) => (
          <div key={v.h} className="rounded-3xl p-8 bg-card border border-border shadow-[var(--shadow-soft)]">
            <h3 className="font-script text-3xl text-accent">{v.h}</h3>
            <p className="mt-3 text-muted-foreground">{v.p}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
