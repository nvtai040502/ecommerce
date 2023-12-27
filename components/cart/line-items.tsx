import Image from "next/image"
import { Slot } from "@radix-ui/react-slot"

import { cn, formatPrice } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { CartItem } from "@/lib/shopify/types"

interface CartLineItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CartItem[]
  isScrollable?: boolean
  isEditable?: boolean
  variant?: "default" | "minimal"
}

export function CartLineItems({
  items,
  isScrollable = true,
  isEditable = true,
  className,
  ...props
}: CartLineItemsProps) {
  const Comp = isScrollable ? ScrollArea : Slot

  return (
    <Comp className="h-full">
      <div
        className={cn(
          "flex w-full flex-col gap-5",
          isScrollable && "pr-6",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <div key={item.id} className="space-y-3">
            <div
              className={cn(
                "flex items-start justify-between gap-4 flex-col xs:flex-row",
              )}
            >
              <div className="flex items-center space-x-4">
                <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                  <Image
                    className="h-full w-full object-cover"
                    width={64}
                    height={64}
                    alt={
                      item.merchandise.product.featuredImage.altText ||
                      item.merchandise.product.title
                    }
                    src={item.merchandise.product.featuredImage.url}
                  />
                  
                </div>
                <div className="flex flex-col space-y-1 self-start">
                  <span className="line-clamp-1 text-sm font-medium">
                    {item.merchandise.product.title}
                  </span>
                  
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    {(item.cost.totalAmount.amount)} x {item.quantity} ={" "}
                    {(
                      (Number(item.cost.totalAmount.amount) * Number(item.quantity)).toFixed(2)
                    )}
                  </span>
                
                </div>
              </div>
              
            </div>
              <Separator />
          </div>
        ))}
      </div>
    </Comp>
  )
}