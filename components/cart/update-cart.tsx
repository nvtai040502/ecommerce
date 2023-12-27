"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartItem } from "@/lib/shopify/types"
import { deleteCartItem, updateItemQuantity } from "./actions"
import { Icons } from "../icons"

interface UpdateCartProps {
  cartItem: CartItem
}

export function UpdateCart({ cartItem }: UpdateCartProps) {
  const id = React.useId()
  const [isPending, startTransition] = React.useTransition()


  return (
    <div className="flex items-center justify-end space-x-2 xs:w-auto xs:justify-normal">
      <div className="flex items-center">
        <Button
          id={`${id}-decrement`}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          onClick={() => {
            startTransition(async () => {
              try {
                await updateItemQuantity({lineId: cartItem.id, variantId: cartItem.merchandise.id, quantity: cartItem.quantity - 1})
              } catch (err) {

              }
            })
          }}
          disabled={isPending}
        >
          <Icons.minus className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>
        <Input
          id={`${id}-quantity`}
          type="number"
          min="1"
          className="h-8 w-14 rounded-none border-x-0"
          value={cartItem.quantity}
          onChange={(e) => {
            startTransition(async () => {
              try {
                await updateItemQuantity({lineId: cartItem.id, variantId: cartItem.merchandise.id, quantity: cartItem.quantity - 1})
              } catch (err) {

              }
            })
          }}
          disabled={isPending}
        />
        <Button
          id={`${id}-increment`}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          onClick={() => {
            startTransition(async () => {
              try {
                await updateItemQuantity({lineId: cartItem.id, variantId: cartItem.merchandise.id, quantity: cartItem.quantity + 1})
              } catch (err) {

              }
            })
          }}
          disabled={isPending}
        >
          <Icons.add className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>
      <Button
        id={`${id}-delete`}
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          startTransition(async () => {
            try {
              await deleteCartItem({
                lineId: cartItem.id
              })
            } catch (err) {

            }
          })
        }}
        disabled={isPending}
      >
        <Icons.trash className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  )
}