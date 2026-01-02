import { unstable_cache } from "next/cache"
import { client } from "./sanity"
import {
  postsQuery,
  postBySlugQuery,
  categoriesQuery,
  postsByCategoryQuery,
  aboutQuery,
  aboutSiteQuery,
  materialsQuery,
  materialsByYearQuery,
  materialsByYearMonthQuery,
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

async function fetchAbout() {
  return client.fetch(aboutQuery)
}

export async function getAbout() {
  return unstable_cache(
    async () => fetchAbout(),
    ["about"],
    {
      tags: ["about"],
      revalidate: 3600,
    }
  )()
}

async function fetchAboutSite() {
  return client.fetch(aboutSiteQuery)
}

export async function getAboutSite() {
  return unstable_cache(
    async () => fetchAboutSite(),
    ["aboutSite"],
    {
      tags: ["aboutSite"],
      revalidate: 3600,
    }
  )()
}

async function fetchMaterials() {
  return client.fetch(materialsQuery)
}

export async function getMaterials() {
  return unstable_cache(
    async () => fetchMaterials(),
    ["materials"],
    {
      tags: ["materials"],
      revalidate: 3600,
    }
  )()
}

async function fetchMaterialsByYear(year: number) {
  const startDate = `${year}-01-01`
  const endDate = `${year + 1}-01-01`
  return client.fetch(materialsByYearQuery, { startDate, endDate })
}

export async function getMaterialsByYear(year: number) {
  return unstable_cache(
    async () => fetchMaterialsByYear(year),
    [`materials-year-${year}`],
    {
      tags: ["materials"],
      revalidate: 3600,
    }
  )()
}

async function fetchMaterialsByYearMonth(year: number, month: number) {
  const startDate = `${year}-${String(month).padStart(2, "0")}-01`
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year
  const endDate = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`
  return client.fetch(materialsByYearMonthQuery, { startDate, endDate })
}

export async function getMaterialsByYearMonth(year: number, month: number) {
  return unstable_cache(
    async () => fetchMaterialsByYearMonth(year, month),
    [`materials-${year}-${month}`],
    {
      tags: ["materials"],
      revalidate: 3600,
    }
  )()
}

