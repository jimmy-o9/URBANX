import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { ProductCard, Product } from "@/components/ProductCard";

const categories = [
  { value: "", label: "All" },
  { value: "t-shirts", label: "T-Shirts" },
  { value: "shirts", label: "Shirts" },
  { value: "jeans", label: "Baggy Jeans" },
];

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const category = params.get("category") || "";

  useEffect(() => {
    document.title = "Shop — URBANX";
    setLoading(true);

    let q = supabase.from("products").select("*").order("created_at", { ascending: false });

    if (category) q = q.eq("category", category);

    q.then(({ data, error }) => {
      if (error) {
        console.log("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    });
  }, [category]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <section className="container-editorial pt-12 md:pt-16">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          The drop
        </p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Shop the collection</h1>

        <div className="mt-8 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  if (c.value) setParams({ category: c.value });
                  else setParams({});
                }}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  category === c.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring md:w-64"
          />
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse bg-muted" />
              ))
            : filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            Please add the products!
          </p>
        )}
      </section>
    </Layout>
  );
};

export default Shop;