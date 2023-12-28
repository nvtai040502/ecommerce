"use client"
import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn, createUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "../icons"
import { PageInfo } from "@/lib/shopify/types"

interface PaginationButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  pageInfo: PageInfo
  page: string
  pageCount: number
}

export function PaginationButton({
  pageInfo,
  page,
  pageCount,
  className,
  ...props
}: PaginationButtonProps) {
  
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()
  const searchParams = useSearchParams()

  const getNearestPages = (currentPage: number, count: number): number[] => {
    const nearestPages: number[] = [];
    const delta = Math.floor(count / 2);

    // Calculate the nearest pages to the current page
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 0 && i <= pageCount) {
        nearestPages.push(i);
      }
    }

    return nearestPages;
  };

  // Get the nearest three pages around the current page
  const nearestPages = getNearestPages(Number(page), 3);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <Button
        aria-label="Go to first page"
        variant="outline"
        size="icon"
        className="hidden h-8 w-8 lg:flex"
        onClick={() => {
          startTransition(() => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("page", "1")
            router.push(createUrl(pathname, newSearchParams));
          })
        }}
        disabled={!pageInfo.hasPreviousPage || isPending}
      >
        <Icons.chevronFirst className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to previous page"
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          startTransition(() => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("page", `${Number(page) - 1}`)
            router.push(createUrl(pathname, newSearchParams));
          })
        }}
        disabled={!pageInfo.hasPreviousPage || isPending}
      >
        <Icons.chevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>
      {nearestPages.map((pageNumber, i) => (
        <Button
          aria-label={`Page ${pageNumber}`}
          key={i}
          variant={Number(page) === pageNumber ? "default" : "outline"}
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            startTransition(() => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set("page", `${pageNumber}`)
              router.push(createUrl(pathname, newSearchParams));
            });
          }}
          disabled={isPending}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        aria-label="Go to next page"
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          startTransition(() => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("page", `${Number(page) + 1}`)
            router.push(createUrl(pathname, newSearchParams));
          })
        }}
        disabled={!pageInfo.hasNextPage || isPending}
      >
        <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to last page"
        variant="outline"
        size="icon"
        className="hidden h-8 w-8 lg:flex"
        onClick={() => {
          const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("page", `${pageCount}`)
            router.push(createUrl(pathname, newSearchParams));
        }}
        disabled={!pageInfo.hasNextPage || isPending}
      >
        <Icons.chevronLast className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  )
}