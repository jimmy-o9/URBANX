import { Link } from "react-router-dom";
import { ShoppingBag, User as UserIcon, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=t-shirts", label: "T-Shirts" },
  { to: "/shop?category=shirts", label: "Shirts" },
  { to: "/shop?category=jeans", label: "Jeans" },
];

export const Navbar = () => {
  const { count } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const ADMIN_EMAIL = "om07674@gmail.com";
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-2xl font-semibold tracking-tight">
            URBAN<span className="text-accent">X</span>
          </span>
          <span className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
            The Urban Streetwear
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((n) => {
            let isActive = false;

            if (n.to === "/") {
              isActive = location.pathname === "/";
            } else if (n.to === "/shop") {
              isActive = location.pathname === "/shop" && !location.search;
            } else {
              isActive =
                location.pathname === "/shop" &&
                location.search === "?" + n.to.split("?")[1];
            }

            return (
              <Link
                key={n.to + n.label}
                to={n.to}
                className={`text-sm tracking-wide transition-colors ${isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-accent"
                  }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div ref={dropdownRef} className="relative hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAccountOpen(!accountOpen)}
              >
                <UserIcon className="h-5 w-5" />
              </Button>

              {accountOpen && (
                <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
                  <div className="border-b px-4 py-3">
                    <p className="text-sm font-semibold">My Account</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setAccountOpen(false)}
                    className="block px-4 py-3 text-sm hover:bg-muted"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setAccountOpen(false)}
                    className="block px-4 py-3 text-sm hover:bg-muted"
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/change-password"
                    onClick={() => setAccountOpen(false)}
                    className="block px-4 py-3 text-sm hover:bg-muted"
                  >
                    Change Password
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-muted"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      signOut();
                      setAccountOpen(false);
                    }}
                    className="block w-full border-t px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center md:flex">
              <Link
                to="/register"
                className="hidden rounded-md px-3 py-1 text-sm tracking-wide text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground md:block"
              >
                Sign Up
              </Link>
            </div>
          )}

          <Link to="/cart" aria-label="Cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag />
            </Button>

            {count > 0 && (
              <span className="pointer-events-none absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                {count}
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-editorial flex flex-col py-4">
            {navItems.map((n) => (
              <Link
                key={n.to + n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground"
              >
                {n.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">
                  My Profile
                </Link>
                <Link to="/orders" onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">
                  My Orders
                </Link>
                <Link to="/change-password" onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">
                  Change Password
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="py-2 text-left text-sm text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground"
              >
                Sign Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};