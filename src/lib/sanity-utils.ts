import { unstable_cache } from "next/cache"
import { client } from "./sanity"
import {
  postsQuery,
  postBySlugQuery,
  categoriesQuery,
  postsByCategoryQuery,
} from "./sanity-queries"
import type { Post, Category } from "@/types/post"

async function fetchPosts() {
  return client.fetch(postsQuery)
}

async function fetchPostBySlug(slug: string) {
  return client.fetch(postBySlugQuery, { slug })
}

async function fetchCategories() {
  return client.fetch(categoriesQuery)
}

async function fetchPostsByCategory(slug: string) {
  return client.fetch(postsByCategoryQuery, { slug })
}

export async function getPosts(): Promise<Post[]> {
  return unstable_cache(
    async () => fetchPosts(),
    ["posts"],
    {
      tags: ["posts"],
      revalidate: 3600,
    }
  )()
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return unstable_cache(
    async () => fetchPostBySlug(slug),
    [`post-${slug}`],
    {
      tags: ["posts"],
      revalidate: 3600,
    }
  )()
}

export async function getCategories(): Promise<Category[]> {
  return unstable_cache(
    async () => fetchCategories(),
    ["categories"],
    {
      tags: ["categories"],
      revalidate: 3600,
    }
  )()
}

export async function getPostsByCategory(slug: string): Promise<Post[]> {
  return unstable_cache(
    async () => fetchPostsByCategory(slug),
    [`posts-category-${slug}`],
    {
      tags: ["posts"],
      revalidate: 3600,
    }
  )()
}

