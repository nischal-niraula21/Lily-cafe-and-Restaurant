import { useEffect, useState } from "react";

export type CabinId = "C1" | "C2" | "C3" | "C4" | "C5";
export const CABIN_IDS: CabinId[] = ["C1", "C2", "C3", "C4", "C5"];

export type Bookings = Record<CabinId, boolean>;

const STORAGE_KEY = "lily-cabin-bookings";

const defaults: Bookings = { C1: false, C2: true, C3: false, C4: false, C5: true };

function read(): Bookings {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

function write(b: Bookings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(b));
  window.dispatchEvent(new CustomEvent("bookings-changed"));
}

export function useBookings(): [Bookings, (b: Bookings) => void] {
  const [bookings, setBookingsState] = useState<Bookings>(defaults);

  useEffect(() => {
    setBookingsState(read());
    const sync = () => setBookingsState(read());
    window.addEventListener("bookings-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bookings-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setBookings = (b: Bookings) => {
    setBookingsState(b);
    write(b);
  };

  return [bookings, setBookings];
}

export function resetBookings() {
  write({ C1: false, C2: false, C3: false, C4: false, C5: false });
}
