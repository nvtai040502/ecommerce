import getCurrentUser from '@/lib/auth/getCurrentUser';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import { createCart, getCart } from '@/lib/shopify';
import { CartModal } from './modal';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { toast } from 'sonner';

export default async function Cart() {
    const user = await getCurrentUser();
    if (!user) {
      return redirect('/sign-in');
    }
    const cartDB = await db.cart.findUnique({
      where: {
        userId: user.id
      }
    });

    let shopifyCart;
    if (cartDB) {
      shopifyCart = await getCart(cartDB.shopifyCartId);
    }

    return (
      <>
        <CartModal cart={shopifyCart} />
      </>
    );
}