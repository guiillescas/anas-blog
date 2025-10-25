import { groq } from "next-sanity"

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    publishedAt,
    "mainImage": mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    "author": author->{
      name,
      "image": image.asset->url
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    publishedAt,
    "mainImage": mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    body,
    "author": author->{
      name,
      "image": image.asset->url,
      bio
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    "pdfAttachments": pdfAttachments[]{
      title,
      "file": file.asset->{
        url,
        originalFilename,
        size
      }
    }
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const postsByCategoryQuery = groq`
  *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    publishedAt,
    "mainImage": mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    "author": author->{
      name,
      "image": image.asset->url
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    }
  }
`

