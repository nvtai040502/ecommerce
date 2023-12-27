import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const { 
      shopifyCartId, 
      userId
    } = await req.json()    
     const cart = await db.cart.create({
        data: {
          shopifyCartId,
          userId
        }
      });
    

    return NextResponse.json(cart)
  } catch(error) {
    console.log("[CART_POST]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}