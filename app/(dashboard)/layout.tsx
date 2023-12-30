import Cart from "@/components/cart";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/layout/nav/main-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { dashboardConfig } from "@/config/dashboard";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg">
      <SiteHeader />
      <div className="container flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  )
}

