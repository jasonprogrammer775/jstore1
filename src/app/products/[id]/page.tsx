"use client";

import { supabase } from "@/lib/supabase";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/supabase";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(*)")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        console.error("Error fetching product:", error);
        notFound();
        return;
      }

      setProduct(data);
      setIsLoading(false);
    }

    loadProduct();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8" />
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="h-24 bg-gray-200 rounded mb-8" />
          <div className="h-12 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={product.image_url}
            alt={product.name}
            className="object-cover object-center"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl text-gray-900">${product.price}</p>
          <div className="mt-8">
            <h2 className="sr-only">Product description</h2>
            <p className="text-lg text-gray-500">{product.description}</p>
          </div>

          <button
            type="button"
            onClick={() => addItem(product)}
            className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
