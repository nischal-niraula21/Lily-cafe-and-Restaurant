import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Lily Cafe & Restaurant" },
      { name: "description", content: "Reset your staff account password." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
      toast.success("Password updated");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not update password";
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
            <LockKeyhole className="size-5" />
            <p className="font-script text-2xl">Staff access</p>
          </div>
          <h1 className="text-3xl mt-1 mb-2">Reset password</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {done ? "Your password has been changed." : "Choose a new password for your admin account."}
          </p>

          {done ? (
            <Link
              to="/admin"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary/90 transition"
            >
              Go to admin login
            </Link>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <input
                required
                type="password"
                placeholder="New password"
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-ring"
              />
              <input
                required
                type="password"
                placeholder="Confirm new password"
                minLength={6}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-ring"
              />
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
              >
                {busy ? "…" : "Update password"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}