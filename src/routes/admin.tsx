import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useBookings, setCabinBooked, freeAllCabins, CABIN_IDS, type CabinId } from "@/lib/bookings";
import { useAuth } from "@/lib/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { RotateCcw, CheckCircle2, XCircle, LogOut, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import cabinC1 from "@/assets/cabin-c1.webp";
import cabinC2 from "@/assets/cabin-c2.webp";
import cabinC3 from "@/assets/cabin-c3.webp";
import cabinC4 from "@/assets/cabin-c4.webp";
import cabinC5 from "@/assets/cabin-c5.webp";

const cabinImages: Record<CabinId, string> = {
  C1: cabinC1, C2: cabinC2, C3: cabinC3, C4: cabinC4, C5: cabinC5,
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Lily Cafe & Restaurant" },
      { name: "description", content: "Staff login to manage cabin bookings." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-6 pt-40 pb-20 text-center text-muted-foreground">
          Loading…
        </div>
      </Layout>
    );
  }

  if (!user) return <LoginCard />;
  if (!isAdmin) return <NotAdminCard email={user.email ?? ""} />;

  return <AdminDashboard />;
}

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
  const [busy, setBusy] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset link sent. Check your email.");
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. If this email already existed, use your original password or reset it.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout>
      <section className="max-w-md mx-auto px-6 pt-32 pb-20">
        <div className="rounded-3xl bg-card border border-border p-8 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 text-accent">
            <Lock className="size-5" />
            <p className="font-script text-2xl">Staff only</p>
          </div>
          <h1 className="text-3xl mt-1 mb-2">Admin login</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "reset" ? "Enter your email to reset your password." : "Sign in to manage cabin bookings."}
          </p>
          <form onSubmit={handle} className="space-y-4">
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-ring"
            />
            {mode !== "reset" && (
              <input
                required
                type="password"
                placeholder="Password (min 6 characters)"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-ring"
              />
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
            >
              {busy ? "…" : mode === "reset" ? "Send reset link" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <div className="mt-4 grid gap-2 text-center">
            {mode === "signin" && (
              <button
                onClick={() => setMode("reset")}
                className="inline-flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
              >
                <Mail className="size-3" /> Forgot password?
              </button>
            )}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-xs text-muted-foreground hover:text-foreground transition"
            >
              {mode === "signin"
                ? "First time? Create an account"
                : "Have an account? Sign in"}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function NotAdminCard({ email }: { email: string }) {
  return (
    <Layout>
      <section className="max-w-md mx-auto px-6 pt-32 pb-20 text-center">
        <div className="rounded-3xl bg-card border border-border p-8">
          <Lock className="size-8 mx-auto text-accent mb-3" />
          <h1 className="text-2xl mb-2">Not authorized</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Signed in as <span className="text-foreground">{email}</span>, but this account is not an admin.
            Ask the owner to grant the admin role from the Cloud dashboard.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted transition"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </section>
    </Layout>
  );
}

function AdminDashboard() {
  const { bookings, loading } = useBookings();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);

  const toggle = async (id: CabinId) => {
    setBusy(true);
    try {
      await setCabinBooked(id, !bookings[id]);
    } catch {
      toast.error("Update failed");
    } finally {
      setBusy(false);
    }
  };

  const refresh = async () => {
    setBusy(true);
    try {
      await freeAllCabins();
      toast.success("All cabins are now available");
    } catch {
      toast.error("Could not refresh");
    } finally {
      setBusy(false);
    }
  };

  const bookedCount = CABIN_IDS.filter((id) => bookings[id]).length;

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="font-script text-3xl text-accent">Admin</p>
            <h1 className="text-4xl md:text-5xl">Manage cabin bookings</h1>
            <p className="mt-3 text-muted-foreground">
              {loading ? "Loading…" : `${bookedCount} of ${CABIN_IDS.length} cabins currently booked.`}
              {user?.email && <span className="ml-2 text-xs">· {user.email}</span>}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={refresh}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
            >
              <RotateCcw className="size-4" /> Refresh (free all)
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted transition"
            >
              <LogOut className="size-4" /> Sign out
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
                <div className="p-4">
                  <button
                    onClick={() => toggle(id)}
                    disabled={busy}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition disabled:opacity-50 ${
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
      </section>
    </Layout>
  );
}
