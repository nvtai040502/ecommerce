"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "./icons"
import { cn, isMacOs } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Product } from "@/lib/shopify/types"

export function Search() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState<Product[]>([])
  const [isPending, startTransition] = React.useTransition()

  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)

  React.useEffect(() => {
    async function fetchData() {
      if (debouncedQuery.length <= 0) {
      setData([]);
      return;
    }
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/products', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ query: debouncedQuery }) 
        });
        const products = await response.json()
        setData(products)
      } catch (err) {
        console.error(err);
        setData([]); // Handle the error state by resetting data
      }
    }
    startTransition(fetchData)
    return () => setData([])
  }, [debouncedQuery]);
  

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleClick = ({item}:{item: Product}) => {
    setOpen(false)
    router.push(`/product/${item.handle}`)
  }

  React.useEffect(() => {
    if (!open) {
      setQuery("")
    }
  }, [open])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search products...</span>
        <span className="sr-only">Search products</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
          <abbr
            title={isMacOs() ? "Command" : "Control"}
            className="no-underline"
          >
            {isMacOs() ? "⌘" : "Ctrl"}
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog  open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {(data.length === 0) && (
            <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No products found.
          </CommandEmpty>
          )} 
          
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data.map((item, i) => {
              return (
                <Button 
                  variant="outline"
                  className="w-full rounded-none justify-normal border-none"
                  key={i}
                  onClick={()=>handleClick({item})}
                >
                  <Icons.circle
                    className="mr-2.5 h-3 w-3 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.title}</span>

                </Button>
              )
            })
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}