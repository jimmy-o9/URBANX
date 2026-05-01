import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  image_url?: string;
  category: string;
  slug?: string; // 👈 IMPORTANT
  created_at?: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const productImage = product.image || product.image_url || "";

  return (
    <Link to={`/product/${product.slug}`} className="group block animate-fade-up">
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={productImage}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/800x1000?text=No+Image";
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 font-serif text-lg leading-snug">
            {product.name}
          </h3>
        </div>
        <p className="font-serif text-lg">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
};