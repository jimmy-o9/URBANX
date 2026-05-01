import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();

  const footerLinkClass = (path: string, search = "") => {
    const isActive =
      location.pathname === path && (search ? location.search === search : true);

    return `transition-colors ${
      isActive
        ? "text-foreground font-medium"
        : "text-muted-foreground hover:text-accent"
    }`;
  };

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-editorial grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-serif text-2xl">
            URBAN<span className="text-accent">X</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Refined streetwear for the modern generation.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/shop?category=t-shirts"
                className={footerLinkClass("/shop", "?category=t-shirts")}
              >
                T-Shirts
              </Link>
            </li>

            <li>
              <Link
                to="/shop?category=shirts"
                className={footerLinkClass("/shop", "?category=shirts")}
              >
                Shirts
              </Link>
            </li>

            <li>
              <Link
                to="/shop?category=jeans"
                className={footerLinkClass("/shop", "?category=jeans")}
              >
                Jeans
              </Link>
            </li>

            <li>
              <Link to="/shop" className={footerLinkClass("/shop")}>
                Gift Cards
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="" className={footerLinkClass("/about")}>
                About Us
              </Link>
            </li>

            <li>
              <Link to="" className={footerLinkClass("/journal")}>
                Journal
              </Link>
            </li>

            <li>
              <Link to="" className={footerLinkClass("/stores")}>
                Stores
              </Link>
            </li>

            <li>
              <Link to="" className={footerLinkClass("/contact")}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium">Newsletter</h4>
          <p className="text-sm text-muted-foreground">
            Drops, restocks & early access. No spam.
          </p>

          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            <button className="rounded-sm bg-primary px-4 text-sm text-primary-foreground hover:opacity-90">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-editorial flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} URBANX. All rights reserved.</span>
          <span>Made in India · Shipped pan-India.</span>
        </div>
      </div>
    </footer>
  );
};