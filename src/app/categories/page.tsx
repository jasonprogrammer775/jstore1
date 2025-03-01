import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

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

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
        Shop by Category
      </h1>

      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
        {categories.map((category) => (
          <Link href={`/categories/${category.id}`} key={category.id}>
            <div className="relative group">
              <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  className="h-full w-full object-cover object-center"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="mt-1 text-sm text-gray-500">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
