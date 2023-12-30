import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "About",
      href: "/about",
      disabled: true
    },
    {
      title: "Blog",
      href: "/blog",
      disabled: false
    }
  ],
}