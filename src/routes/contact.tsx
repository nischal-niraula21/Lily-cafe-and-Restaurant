import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { MapPin, Phone, Clock, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lily Cafe & Restaurant" },
      {
        name: "description",
        content:
          "Find us, call us, or send a message. Lily Cafe is open daily 9 AM – 11 PM.",
      },
      { property: "og:title", content: "Contact Lily Cafe" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <p className="font-script text-4xl text-accent">Say hello</p>
          <h1 className="text-5xl md:text-6xl mt-2">Come find us</h1>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Location", value: "Lekhnath Chowk, Chandragadhi, Jhapa" },
              { icon: Phone, label: "Phone", value: "+977 9825983379" },
              { icon: Clock, label: "Open Daily", value: "9:00 AM – 11:00 PM" },
            ].map((i) => (
              <div key={i.label} className="flex gap-4 items-start p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-soft)]">
                <div className="rounded-full bg-accent/20 p-3 text-accent-foreground">
                  <i.icon className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{i.label}</div>
                  <div className="text-lg font-medium">{i.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setForm({ name: "", email: "", message: "" });
            }}
            className="rounded-3xl bg-card border border-border p-8 shadow-[var(--shadow-soft)] space-y-4"
          >
            <h2 className="text-2xl">Send us a message</h2>
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-full border border-border bg-background px-5 py-3 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
            <input
              required
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-full border border-border bg-background px-5 py-3 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
            <textarea
              required
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-3xl border border-border bg-background px-5 py-3 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 font-medium hover:bg-primary/90 transition shadow-[var(--shadow-soft)]"
            >
              <Send className="size-4" /> Send
            </button>
            {sent && (
              <div className="text-sm text-primary">
                Thanks — we'll get back to you soon.
              </div>
            )}
          </form>
        </div>

        <div className="mt-14">
          <h2 className="text-3xl text-center">Find us on the map</h2>
          <p className="text-center text-muted-foreground mt-2">
            Lekhnath Chowk, Chandragadhi, Jhapa, Nepal
          </p>
          <div className="mt-6 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
            <iframe
              title="Map of Lily Cafe & Restaurant, Lekhnath Chowk, Chandragadhi, Jhapa, Nepal"
              src="https://www.openstreetmap.org/export/embed.html?bbox=88.0456%2C26.5591%2C88.0856%2C26.5792&layer=mapnik&marker=26.5691%2C88.0656"
              className="w-full h-[380px] md:h-[440px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Lekhnath%20Chowk%2C%20Chandragadhi%2C%20Jhapa%2C%20Nepal"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:bg-secondary transition"
            >
              <MapPin className="size-4 text-primary" /> Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
