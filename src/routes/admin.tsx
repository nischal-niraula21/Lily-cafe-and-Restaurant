import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useBookings, CABIN_IDS, resetBookings, type CabinId } from "@/lib/bookings";
import { RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import cabinC1 from "@/assets/cabin-c1.jpg";
import cabinC2 from "@/assets/cabin-c2.jpg";
import cabinC3 from "@/assets/cabin-c3.jpg";
import cabinC4 from "@/assets/cabin-c4.jpg";
import cabinC5 from "@/assets/cabin-c5.jpg";

const cabinImages: Record<CabinId, string> = {
  C1: cabinC1, C2: cabinC2, C3: cabinC3, C4: cabinC4, C5: cabinC5,
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Lily Cafe & Restaurant" },
      { name: "description", content: "Manage cabin bookings." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [bookings, setBookings] = useBookings();

  const toggle = (id: CabinId) => setBookings({ ...bookings, [id]: !bookings[id] });
  const markAll = (val: boolean) =>
    setBookings(CABIN_IDS.reduce((acc, id) => ({ ...acc, [id]: val }), {} as Record<CabinId, boolean>));

  const bookedCount = CABIN_IDS.filter((id) => bookings[id]).length;

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="font-script text-3xl text-accent">Admin</p>
            <h1 className="text-4xl md:text-5xl">Manage cabin bookings</h1>
            <p className="mt-3 text-muted-foreground">
              {bookedCount} of {CABIN_IDS.length} cabins currently booked.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => resetBookings()}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition"
            >
              <RotateCcw className="size-4" /> Refresh (free all)
            </button>
            <button
              onClick={() => markAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition"
            >
              Mark all booked
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CABIN_IDS.map((id) => {
            const booked = bookings[id];
            return (
              <div
                key={id}
                className="rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-soft)]"
              >
                <div className="relative h-36">
                  <img
                    src={cabinImages[id]}
                    alt={`Cabin ${id}`}
                    className={`h-full w-full object-cover ${booked ? "grayscale" : ""}`}
                  />
                  <span
                    className={`absolute top-3 right-3 text-[10px] uppercase tracking-widest rounded-full px-3 py-1 ${
                      booked
                        ? "bg-destructive/80 text-destructive-foreground"
                        : "bg-accent/90 text-accent-foreground"
                    }`}
                  >
                    {booked ? "Booked" : "Available"}
                  </span>
                  <div className="absolute bottom-2 left-3 font-display text-3xl text-white drop-shadow">
                    {id}
                  </div>
                </div>
                <div className="p-4 flex gap-2">
                  <button
                    onClick={() => toggle(id)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition ${
                      booked
                        ? "bg-muted hover:bg-muted/80"
                        : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    }`}
                  >
                    {booked ? (
                      <><CheckCircle2 className="size-4" /> Mark Available</>
                    ) : (
                      <><XCircle className="size-4" /> Mark Booked</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Note: bookings are stored in your browser (localStorage). Use "Refresh" to clear all bookings at the start of a new day.
        </p>
      </section>
    </Layout>
  );
}
