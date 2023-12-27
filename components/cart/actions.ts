'use server';

import getCurrentUser from '@/lib/auth/getCurrentUser';
import { TAGS } from '@/lib/constants';
import { db } from '@/lib/db';
import { addToCart, createCart, getCart } from '@/lib/shopify';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addItem({selectedVariantId, quantity} : {selectedVariantId?: string, quantity: number}) {
  const user = await getCurrentUser()
  if (!user) {
    return redirect("/sign-in")
  }
  let cartDB;
    cartDB = await db.cart.findUnique({
      where: {
        userId: user.id
      }
    });

    if (!cartDB) {
      const shopifyCart = await createCart();
      try {
        const response = await fetch(process.env.URL + '/api/cart', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ shopifyCartId: shopifyCart.id, userId: user.id }) 
        });
        cartDB = await response.json();
      } catch (e) {
        console.log(e);
      }
    }

  if (!selectedVariantId) {
    return 'Missing product variant ID';
  }

  try {
    await addToCart(cartDB.shopifyCartId, [{ merchandiseId: selectedVariantId, quantity: quantity }]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
  }
}
