import { db } from "@/lib/db";
import { getCollectionProducts, getProducts } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { collection } = await req.json();
    if (!collection) {
      throw new Error("Collection parameter is missing");
    }

    const {products} = await getCollectionProducts({collection: collection, first:100});
    return NextResponse.json(products);
  } catch (error) {
    console.error("[COLLECTION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
