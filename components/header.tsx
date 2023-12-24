import { siteConfig } from "@/config/site";
import { getGitHubStars } from "@/lib/getGithubStars";
import Link from "next/link";
import { Icons } from "./icons";

const Header = async () => {
  const githubStars = await getGitHubStars()
  return ( 
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            An e-commerce website
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web ecommerce use Shopify and everything new in Nextjs.
          </p>
          {githubStars && (
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
                <Icons.gitHub />
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
                <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                  {githubStars} stars on GitHub
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
   );
}
 
export default Header;