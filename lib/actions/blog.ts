import path from "path";
import { AUTHORS_DIRECTORY, POSTS_DIRECTORY } from "../constants";
import fs from "fs"
import matter from "gray-matter";

export async function getAllPosts () {
  const postsDirectory = path.join(process.cwd(), POSTS_DIRECTORY);
  const files = fs.readdirSync(postsDirectory);
  const posts = files.map((fileName) => {
    const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, fileName), 'utf-8')
    const { data: frontMatter, content } = matter(markdownWithMeta)
    return {frontMatter, slug: fileName.split('.')[0], content}
  })
  return posts
}

export async function getAllAuthors () {
  const authorsDirectory = path.join(process.cwd(), AUTHORS_DIRECTORY);
  const files = fs.readdirSync(authorsDirectory);
  const authors = files.map((fileName) => {
    const markdownWithMeta = fs.readFileSync(path.join(authorsDirectory, fileName), 'utf-8')
    const { data: frontMatter} = matter(markdownWithMeta)
    return {frontMatter, name: fileName.split('.')[0]}
  })
  return authors
}