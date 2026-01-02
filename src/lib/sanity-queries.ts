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

export const aboutQuery = groq`
  *[_type == "about"][0] {
    _id,
    _updatedAt,
    title,
    "mainImage": mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    content,
    "sections": sections[]{
      title,
      content,
      "image": image{
        asset->{
          _id,
          url
        },
        alt
      }
    }
  }
`

export const aboutSiteQuery = groq`
  *[_type == "aboutSite"][0] {
    _id,
    _updatedAt,
    title,
    "mainImage": mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    content,
    "sections": sections[]{
      title,
      content,
      "image": image{
        asset->{
          _id,
          url
        },
        alt
      }
    }
  }
`

export const materialsQuery = groq`
  *[_type == "material"] | order(date desc) {
    _id,
    _createdAt,
    title,
    date,
    description,
    "coverImage": coverImage{
      asset->{
        _id,
        url
      },
      alt
    },
    "pdf": pdf{
      "asset": asset->{
        _id,
        url,
        originalFilename,
        size
      },
      title
    }
  }
`

export const materialsByYearQuery = groq`
  *[_type == "material" && date >= $startDate && date < $endDate] | order(date desc) {
    _id,
    _createdAt,
    title,
    date,
    description,
    "coverImage": coverImage{
      asset->{
        _id,
        url
      },
      alt
    },
    "pdf": pdf{
      "asset": asset->{
        _id,
        url,
        originalFilename,
        size
      },
      title
    }
  }
`

export const materialsByYearMonthQuery = groq`
  *[_type == "material" && date >= $startDate && date < $endDate] | order(date desc) {
    _id,
    _createdAt,
    title,
    date,
    description,
    "coverImage": coverImage{
      asset->{
        _id,
        url
      },
      alt
    },
    "pdf": pdf{
      "asset": asset->{
        _id,
        url,
        originalFilename,
        size
      },
      title
    }
  }
`

