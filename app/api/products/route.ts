import { db } from "@/lib/db";
import { getProducts } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      throw new Error("Query parameter is missing");
    }

    const {products} = await getProducts({query: query, first:100});
    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
