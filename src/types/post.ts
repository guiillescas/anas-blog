export interface Post {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  mainImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  body: any
  publishedAt: string
  author?: {
    name: string
    image?: {
      asset: {
        url: string
      }
    }
  }
  categories?: Array<{
    _id: string
    title: string
    slug: string
  }>
  pdfAttachments?: Array<{
    asset: {
      url: string
      originalFilename: string
      size: number
    }
    title?: string
  }>
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

