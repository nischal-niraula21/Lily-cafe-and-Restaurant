import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type CabinId = "C1" | "C2" | "C3" | "C4" | "C5";
export const CABIN_IDS: CabinId[] = ["C1", "C2", "C3", "C4", "C5"];
export type Bookings = Record<CabinId, boolean>;

const empty: Bookings = { C1: false, C2: false, C3: false, C4: false, C5: false };

export function useBookings() {
  const [bookings, setBookings] = useState<Bookings>(empty);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase.from("cabin_bookings").select("cabin_id, is_booked");
    if (!error && data) {
      const map = { ...empty };
      for (const row of data) {
        if (CABIN_IDS.includes(row.cabin_id as CabinId)) {
          map[row.cabin_id as CabinId] = row.is_booked;
        }
      }
      setBookings(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    // Realtime subscription so all viewers see updates immediately
    const channel = supabase
      .channel("cabin_bookings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cabin_bookings" },
        () => refresh()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [refresh]);

  return { bookings, loading, refresh };
}

export async function setCabinBooked(id: CabinId, isBooked: boolean) {
  const { error } = await supabase
    .from("cabin_bookings")
    .update({ is_booked: isBooked, updated_at: new Date().toISOString() })
    .eq("cabin_id", id);
  if (error) throw error;
}

export async function freeAllCabins() {
  for (const id of CABIN_IDS) {
    await setCabinBooked(id, false);
  }
}
