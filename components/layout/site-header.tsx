import { dashboardConfig } from "@/config/dashboard"
import { Button, buttonVariants } from "@/components/ui/button"

import { MainNav } from "./nav/main-nav"
import Cart from "../cart"
import Link from "next/link"
import { cn } from "@/lib/utils"
import UserButton from "../user/user-button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={dashboardConfig.mainNav} />
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Cart />

            <UserButton />

          </nav>
        </div>
      </div>
    </header>
  )
}