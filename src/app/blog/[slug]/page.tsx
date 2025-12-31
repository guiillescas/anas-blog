import { getPostBySlug, getPosts } from "@/lib/sanity-utils"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"

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
    <article className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <header className="mb-12">
          {post.mainImage?.asset?.url && (
            <img
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              className="mb-8 aspect-video w-full rounded-2xl bg-neutral-100 object-cover shadow-lg"
            />
          )}

          <div className="mb-6 flex items-center gap-x-4 text-sm">
            <time dateTime={post.publishedAt} className="text-neutral-600">
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
                    className="rounded-full bg-accent-100 px-3 py-1.5 font-medium text-accent-900"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1 className="font-gastela text-4xl font-bold tracking-tight text-neutral-900">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-xl leading-8 text-neutral-900">
              {post.excerpt}
            </p>
          )}

          {post.author && (
            <div className="mt-8 flex items-center gap-x-4 border-t border-neutral-200 pt-8">
              {post.author.image?.asset?.url && (
                <img
                  src={post.author.image.asset.url}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full bg-neutral-100 ring-2 ring-neutral-200"
                />
              )}
              <div>
                <p className="font-semibold text-neutral-900">
                  {post.author.name}
                </p>
              </div>
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-headings:font-sans prose-p:text-neutral-900 prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 prose-code:text-primary-700 prose-li:text-neutral-900 prose-ul:text-neutral-900 prose-ol:text-neutral-900 [&_p]:text-neutral-900 [&_li]:text-neutral-900 [&_ul]:text-neutral-900 [&_ol]:text-neutral-900 [&_blockquote]:text-neutral-900 [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans [&_h4]:font-sans [&_h5]:font-sans [&_h6]:font-sans">
          <PortableText value={post.body} />
        </div>

        {post.pdfAttachments && post.pdfAttachments.length > 0 && (
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Arquivos para Download
            </h2>
            <ul className="mt-6 space-y-4">
              {post.pdfAttachments
                .filter((attachment) => attachment.asset?.url)
                .map((attachment, index) => (
                  <li key={index}>
                    <a
                      href={attachment.asset.url}
                      download
                      className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition-all hover:border-primary-700 hover:bg-primary-50 hover:shadow-md"
                    >
                      <svg
                        className="h-8 w-8 text-primary-700"
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
                        <p className="font-medium text-neutral-900">
                          {attachment.title || attachment.asset.originalFilename}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {(attachment.asset.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <svg
                        className="h-5 w-5 text-neutral-400"
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

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <a
            href="/blog"
            className="text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
          >
            ← Voltar para o blog
          </a>
        </div>
      </div>
    </article>
  )
}

