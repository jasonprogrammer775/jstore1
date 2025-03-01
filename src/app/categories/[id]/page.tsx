import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

async function getCategory(id: string) {
  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !category) {
    console.error("Error fetching category:", error);
    return null;
  }

  return category;
}

async function getCategoryProducts(categoryId: string) {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products;
}

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const [category, products] = await Promise.all([
    getCategory(params.id),
    getCategoryProducts(params.id),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-lg text-gray-500">{category.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No products found in this category.
        </p>
      )}
    </div>
  );
}
