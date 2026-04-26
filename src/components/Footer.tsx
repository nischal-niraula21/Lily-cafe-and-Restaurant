import { Link } from "@tanstack/react-router";
import logo from "@/assets/lily-logo.jpg";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Lily" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <div className="font-script text-3xl">Lily</div>
              <div className="text-xs tracking-[0.25em] uppercase opacity-80">
                Cafe & Restaurant
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80 max-w-xs">
            A cozy place for food & privacy. Where every meal feels like home.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest opacity-70 mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/menu" className="hover:underline">Menu</Link></li>
            <li><Link to="/cabins" className="hover:underline">Book a Cabin</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest opacity-70 mb-4">Visit</h4>
          <p className="text-sm opacity-90">Chandragadhi, Lekhnath Chowk, Jhapa</p>
          <p className="text-sm opacity-90">Open daily · 9 AM – 11 PM</p>
          <p className="text-sm opacity-90 mt-2">+977 9825983379</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Lily Cafe & Restaurant. Crafted with ❤️ from Nischal.
      </div>
    </footer>
  );
}
