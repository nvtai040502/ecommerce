import { Icons } from '../icons';
import { Button } from '../ui/button';

export default async function Cart() {
  return (
    <Button variant="ghost">
      <Icons.cart className='h-5 w-5' />
    </Button>
  )
}