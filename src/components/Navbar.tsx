import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/lily-logo.jpg";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/cabins", label: "Cabins" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[var(--shadow-soft)] py-2"
          : "bg-gradient-to-b from-black/40 to-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Lily Cafe & Restaurant"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/60 group-hover:ring-accent transition"
          />
          <div className="leading-tight">
            <div className={`font-script text-2xl drop-shadow ${scrolled ? "text-primary" : "text-white"}`}>Lily</div>
            <div className={`text-[10px] tracking-[0.25em] uppercase ${scrolled ? "text-muted-foreground" : "text-white/85"}`}>
              Cafe & Restaurant
            </div>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm uppercase tracking-widest font-medium drop-shadow-sm transition relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current hover:after:w-full after:transition-all ${
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-accent"
                }`}
                activeProps={{ className: "after:w-full" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/cabins"
          className="hidden md:inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:bg-primary/90 transition shadow-[var(--shadow-soft)]"
        >
          Book Cabin
        </Link>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
          <ul className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block text-base uppercase tracking-widest text-foreground/80 hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
