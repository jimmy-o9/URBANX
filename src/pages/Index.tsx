import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { ProductCard, Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import heroStreetwear from "@/assets/hero-streetwear.jpg";

const Index = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "URBANX — The Urban Streetwear";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Shop trending men's t-shirts, shirts and baggy jeans at URBANX. Streetwear made for India."
      );
    }

    const fetchFeaturedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(4);

      if (error) {
        console.log("Error fetching featured products:", error);
        setFeatured([]);
      } else {
        setFeatured((data as Product[]) || []);
      }

      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="container-editorial pt-12 md:pt-20">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="animate-fade-up md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              New drop — Volume 02
            </p>

            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-balance md:text-7xl">
              Streetwear
              <br />
              built for the <em className="italic text-accent">everyday</em>{" "}
              Indian.
            </h1>

            <p className="mt-6 max-w-md text-muted-foreground">
              Oversized tees, breezy shirts and the baggiest jeans. Carefully
              cut, honestly priced — straight from our studio in India.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop">
                <Button size="lg" className="rounded-sm">
                  Shop the collection
                </Button>
              </Link>

              <Link to="/shop?category=jeans">
                <Button size="lg" variant="outline" className="rounded-sm">
                  Trendy jeans
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-5">
            <div className="relative overflow-hidden">
              <img
                src={heroStreetwear}
                alt="Young Indian model wearing oversized t-shirt and baggy jeans — URBANX streetwear"
                width={896}
                height={1120}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 hidden bg-background p-4 shadow-sm md:block">
              <p className="font-serif text-2xl">"Wear loud. Live louder."</p>
              <p className="mt-1 text-xs text-muted-foreground">
                — URBANX studio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-editorial mt-24 md:mt-32">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Featured
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">
              This week's hot picks
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline md:block"
          >
            See all →
          </Link>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse bg-muted" />
            ))
          ) : featured.length > 0 ? (
            featured.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="col-span-full text-muted-foreground">
              No featured products available right now.
            </p>
          )}
        </div>
      </section>

      {/* Editorial strip */}
      <section className="mt-24 bg-secondary/40 py-20 md:mt-32">
        <div className="container-editorial grid gap-10 md:grid-cols-2 md:items-center">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80"
            alt="Denim being crafted"
            className="aspect-[5/4] w-full object-cover"
          />

          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              From the studio
            </p>

            <h3 className="mt-2 font-serif text-3xl text-balance md:text-4xl">
              Designed in India. Stitched by hand.
            </h3>

            <p className="mt-4 text-muted-foreground">
              Every URBANX piece is cut and stitched in small batches across
              Delhi and Bangalore — by makers we visit, know and pay fairly.
              Heavy denim, premium cotton, and zero corner-cutting.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-block text-sm underline underline-offset-4"
            >
              Explore the drop →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;