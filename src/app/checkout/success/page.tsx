"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
          Thank you for your order!
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Your payment was successful and your order is being processed.
        </p>
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
