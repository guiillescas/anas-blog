import { client } from "./sanity"
import {
  postsQuery,
  postBySlugQuery,
  categoriesQuery,
  postsByCategoryQuery,
} from "./sanity-queries"
import type { Post, Category } from "@/types/post"

export async function getPosts(): Promise<Post[]> {
  return client.fetch(postsQuery)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(postBySlugQuery, { slug })
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(categoriesQuery)
}

export async function getPostsByCategory(slug: string): Promise<Post[]> {
  return client.fetch(postsByCategoryQuery, { slug })
}

