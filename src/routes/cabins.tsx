import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useMemo, useState } from "react";
import cabinImg from "@/assets/cabin.webp";
import cabinC1 from "@/assets/cabin-c1.webp";
import cabinC2 from "@/assets/cabin-c2.webp";
import cabinC3 from "@/assets/cabin-c3.webp";
import cabinC4 from "@/assets/cabin-c4.webp";
import cabinC5 from "@/assets/cabin-c5.webp";
import { Check, Users } from "lucide-react";
import { useBookings, setCabinBooked, type CabinId } from "@/lib/bookings";
import { toast } from "sonner";

const cabinImages: Record<"C1" | "C2" | "C3" | "C4" | "C5", string> = {
  C1: cabinC1,
  C2: cabinC2,
  C3: cabinC3,
  C4: cabinC4,
  C5: cabinC5,
};

export const Route = createFileRoute("/cabins")({
  head: () => ({
    meta: [
      { title: "Book a Cabin — Lily Cafe & Restaurant" },
      {
        name: "description",
        content:
          "Reserve one of five private cabins at Lily Cafe. Intimate, cozy dining for couples, friends and family.",
      },
      { property: "og:title", content: "Book a Private Cabin — Lily Cafe" },
      { property: "og:description", content: "Five cozy cabins. Reserve yours." },
    ],
  }),
  component: CabinsPage,
});

function CabinsPage() {
  const { bookings } = useBookings();
  const [selected, setSelected] = useState<CabinId | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "" });
  const [confirmed, setConfirmed] = useState<null | {
    name: string;
    cabin: CabinId;
    date: string;
    time: string;
  }>(null);

  const cabins = useMemo(
    () =>
      (["C1", "C2", "C3", "C4", "C5"] as CabinId[]).map((id, i) => ({
        id,
        seats: 2 + (i % 3),
        vibe: ["Window view", "Quiet corner", "Garden side", "Lantern lit", "Couples nook"][i],
      })),
    []
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (bookings[selected]) return;
    try {
      await setCabinBooked(selected, true);
      setConfirmed({ name: form.name, cabin: selected, date: form.date, time: form.time });
      setForm({ name: "", phone: "", date: "", time: "" });
      setSelected(null);
    } catch (err) {
      toast.error("Could not complete booking. Please try again.");
      console.error(err);
    }
  };

  return (
    <Layout>
      {/* Hero strip */}
      <section className="relative h-[50vh] -mt-20 flex items-end overflow-hidden">
        <img
          src={cabinImg}
          alt="Private cabin"
          width={1280}
          height={896}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12">
          <p className="font-script text-4xl text-accent">Private cabins</p>
          <h1 className="text-5xl md:text-6xl text-white drop-shadow">Reserve your cozy corner</h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cabins.map((c, i) => {
            const booked = bookings[c.id];
            const isSel = selected === c.id;
            return (
              <div
                key={c.id}
                className={`relative rounded-3xl overflow-hidden border transition-all fade-up ${
                  booked
                    ? "bg-muted border-border opacity-80"
                    : isSel
                    ? "bg-card border-accent shadow-[var(--shadow-warm)] -translate-y-1 ring-2 ring-accent"
                    : "bg-card border-border hover:-translate-y-1 shadow-[var(--shadow-soft)]"
                }`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cabinImages[c.id]}
                    alt={`Cabin ${c.id} — ${c.vibe}`}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      booked ? "grayscale" : "hover:scale-105"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <span
                    className={`absolute top-3 right-3 text-[10px] uppercase tracking-widest rounded-full px-3 py-1 backdrop-blur ${
                      booked
                        ? "bg-destructive/80 text-destructive-foreground"
                        : "bg-accent/90 text-accent-foreground"
                    }`}
                  >
                    {booked ? "Booked" : "Available"}
                  </span>
                  <div className="absolute bottom-3 left-4">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-white/80">Cabin</div>
                    <div className="font-display text-4xl text-white drop-shadow">{c.id}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-foreground/80">{c.vibe}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="size-4" /> Seats up to {c.seats}
                  </div>
                  <button
                    disabled={booked}
                    onClick={() => setSelected((prev) => (prev === c.id ? null : c.id))}
                    className={`mt-6 w-full rounded-full py-3 text-sm font-medium transition ${
                      booked
                        ? "bg-muted-foreground/20 cursor-not-allowed"
                        : isSel
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {booked ? "Unavailable" : isSel ? "Selected ✓" : "Book Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking form */}
        <div id="form" className="mt-16 rounded-3xl bg-card border border-border p-8 md:p-12 shadow-[var(--shadow-soft)]">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="font-script text-3xl text-accent">Reservation</p>
              <h2 className="text-3xl mt-1">Tell us about your visit</h2>
              <p className="mt-4 text-muted-foreground">
                Pick a cabin above, then fill in your details. We'll confirm by phone.
              </p>
              {confirmed && (
                <div className="mt-6 rounded-xl bg-sage/20 border border-sage/40 p-4 text-sm">
                  <div className="flex items-center gap-2 font-medium text-primary">
                    <Check className="size-4" /> Booked!
                  </div>
                  Thank you, {confirmed.name}. Cabin {confirmed.cabin} is held
                  for {confirmed.date} at {confirmed.time}.
                </div>
              )}
            </div>
            <form onSubmit={submit} className="space-y-4">
              <Field label="Your Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="Jane Doe"
                />
              </Field>
              <Field label="Phone Number">
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input"
                  placeholder="+977 98-0000-0000"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Date">
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="input"
                  />
                </Field>
                <Field label="Time">
                  <input
                    required
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="input"
                  />
                </Field>
              </div>
              <Field label="Cabin">
                <div className="input flex items-center justify-between">
                  <span>{selected ?? "Select a cabin above"}</span>
                  {selected && (
                    <button type="button" onClick={() => setSelected(null)} className="text-xs underline">
                      change
                    </button>
                  )}
                </div>
              </Field>
              <button
                type="submit"
                disabled={!selected}
                className="w-full rounded-full bg-primary text-primary-foreground py-3 font-medium hover:bg-primary/90 transition shadow-[var(--shadow-soft)] disabled:opacity-50"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 9999px;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.75rem 1.25rem;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input:focus {
          border-color: var(--ring);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 25%, transparent);
        }
      `}</style>
    </Layout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground ml-4">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
