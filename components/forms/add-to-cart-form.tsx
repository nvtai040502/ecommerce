"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { cn } from "@/lib/utils"
import { updateCartItemSchema } from "@/lib/validations/cart"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { addItem } from "../cart/actions"
import { ProductVariant } from "@/lib/shopify/types"

interface AddToCartFormProps {
  variants: ProductVariant[];
  availableForSale: boolean;
  showQuality: boolean
}

type Inputs = z.infer<typeof updateCartItemSchema>

export function AddToCartForm({ variants, availableForSale, showQuality }: AddToCartFormProps) {
  
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  
  
  const id = React.useId()
  const router = useRouter()
  const [isAddingToCart, startAddingToCart] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
    },
  })

  function onSubmit(data: Inputs) {
    startAddingToCart(async () => {
      try {
        await addItem ({
          selectedVariantId:selectedVariantId,
          quantity: data.quantity
        })
        toast.success("Added to cart.")
      } catch (err) {

      }
    })
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex gap-4 w-full",
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {showQuality && (
          <div className="flex items-center">
            <Button
              id={`${id}-decrement`}
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-r-none"
              onClick={() =>
                form.setValue(
                  "quantity",
                  Math.max(1, form.getValues("quantity") - 1)
                )
              }
              disabled={isAddingToCart}
            >
              <Icons.minus className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Remove one item</span>
            </Button>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="sr-only">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      className="h-8 w-16 rounded-none border-x-0"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                        const parsedValue = parseInt(value, 10)
                        if (isNaN(parsedValue)) return
                        field.onChange(parsedValue)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              id={`${id}-increment`}
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-l-none"
              onClick={() =>
                form.setValue("quantity", form.getValues("quantity") + 1)
              }
              disabled={isAddingToCart}
            >
              <Icons.add className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Add one item</span>
            </Button>
          </div>
        )}
        <Button
          aria-label="Add to cart"
          type="submit"
          size="sm"
          className="w-full"
          disabled={isAddingToCart}
        >
          {isAddingToCart && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add to cart
        </Button>
      </form>
    </Form>
  )
}