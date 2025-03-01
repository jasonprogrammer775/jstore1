"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/supabase";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={product.image_url}
            alt={product.name}
            className="object-cover object-center group-hover:opacity-75"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            ${product.price}
          </p>
        </div>
      </Link>
      <button
        onClick={() => addItem(product)}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}
