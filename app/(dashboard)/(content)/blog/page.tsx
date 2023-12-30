import fs from 'fs';
import path from 'path';
import matter from "gray-matter"
import Link from 'next/link';
import Image from 'next/image';
import { Shell } from '@/components/shells/shell';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { PostCard } from '@/components/cards/post';
import { POSTS_DIRECTORY } from '@/lib/constants';
import { getAllPosts } from '@/lib/actions/blog';
const BlogPage = async () => {
  const posts = await getAllPosts()

  return ( 
    <Shell className="md:pb-10">
      <PageHeader>
        <PageHeaderHeading>Blog</PageHeaderHeading>
        <PageHeaderDescription>
          Explore the latest news and updates from the community
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} i={i} />
        ))}
      </section>
    </Shell>
    
  );
};

export default BlogPage;