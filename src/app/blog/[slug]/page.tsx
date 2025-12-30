import { getPostBySlug, getPosts } from "@/lib/sanity-utils"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <header className="mb-12">
          {post.mainImage?.asset?.url && (
            <img
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              className="mb-8 aspect-video w-full rounded-2xl bg-gray-100 object-cover"
            />
          )}

          <div className="mb-6 flex items-center gap-x-4 text-sm">
            <time dateTime={post.publishedAt} className="text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>

          {post.excerpt && (
            <p className="mt-6 text-xl leading-8 text-gray-600">
              {post.excerpt}
            </p>
          )}

          {post.author && (
            <div className="mt-8 flex items-center gap-x-4 border-t pt-8">
              {post.author.image?.asset?.url && (
                <img
                  src={post.author.image.asset.url}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full bg-gray-100"
                />
              )}
              <div>
                <p className="font-semibold">{post.author.name}</p>
              </div>
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>

        {post.pdfAttachments && post.pdfAttachments.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-semibold">Arquivos para Download</h2>
            <ul className="mt-6 space-y-4">
              {post.pdfAttachments
                .filter((attachment) => attachment.asset?.url)
                .map((attachment, index) => (
                  <li key={index}>
                    <a
                      href={attachment.asset.url}
                      download
                      className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50"
                    >
                      <svg
                        className="h-8 w-8 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="flex-1">
                        <p className="font-medium">
                          {attachment.title || attachment.asset.originalFilename}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(attachment.asset.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="mt-12 border-t pt-8">
          <a
            href="/blog"
            className="text-sm font-semibold text-gray-900 hover:text-gray-600"
          >
            ← Voltar para o blog
          </a>
        </div>
      </div>
    </article>
  )
}

