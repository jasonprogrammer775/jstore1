import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

async function getFeaturedProducts() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .limit(4);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products;
}

async function getCategories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return categories;
}

export default async function Home() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gray-900 opacity-50" />
        <div className="relative bg-gray-900 h-[600px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Welcome to JStore
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                Discover our curated collection of premium products. Shop the
                latest trends and must-have items.
              </p>
              <div className="mt-10">
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Featured Categories
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {categories.map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id}>
              <div className="relative group">
                <div className="relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75">
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    className="h-full w-full object-cover object-center"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="mt-1 text-sm text-gray-500">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Featured Products
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
