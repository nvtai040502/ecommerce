export type Post = {
  frontMatter: {
    [key: string]: any;
};
  slug: string;
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
}
export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem