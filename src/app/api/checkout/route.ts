import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { Product } from "@/lib/supabase";

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutRequestBody {
  items: CartItem[];
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutRequestBody;
    const origin = headers().get("origin");

    if (!body.items?.length) {
      return NextResponse.json(
        { error: "Please provide a list of items" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: body.items.map((item: CartItem) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.image_url],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
