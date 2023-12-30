import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { getAllAuthors, getAllPosts } from "@/lib/actions/blog";
import { notFound } from "next/navigation";
import { authorSchema, frontMatterSchema } from "@/lib/validations/blog";

interface BlogPostPageProps {
  params: {
    slug: string
  }
}


const BlogPostPage = async ({params}: BlogPostPageProps) => {

  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return notFound()
  }

  const frontMatter = frontMatterSchema.parse(post.frontMatter);
  let author = undefined;
  if (frontMatter.author) {
    const authors = await getAllAuthors();
    author = authors.find((author) => author.name === frontMatter.author);
    if (author) {
      author = authorSchema.parse(author.frontMatter);
    }

  }

  return ( 
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {frontMatter.date && (
          <time
            dateTime={frontMatter.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {frontMatter.date}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {frontMatter.title}
        </h1>
        {author ? (
          <div className="flex items-center space-x-4 pt-4">
            <Link
              href={`https://twitter.com/${author.twitter}`}
              className="flex items-center space-x-2 text-sm"
            >
              <Image
                src={author.avatar}
                alt={author.name}
                width={40}
                height={40}
                className="rounded-full bg-white"
              />
              <div className="flex-1 text-left leading-tight">
                <p className="font-medium">{author.name}</p>
                <p className="text-[12px] text-muted-foreground">
                  @{author.twitter}
                </p>
              </div>
            </Link>
          </div>
        ) : null}
      </div>
      
      <Image
        src={frontMatter.thumbnailUrl}
        alt={frontMatter.title}
        width={720}
        height={405}
        className="my-8 rounded-md border bg-muted transition-colors"
        priority
      />
      
      <article className="prose dark:prose-invert">
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </article>
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
    
   );
}
 
export default BlogPostPage;