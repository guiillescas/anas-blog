import { getPosts } from "@/lib/sanity-utils"
import Link from "next/link"

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-gastela text-4xl font-semibold tracking-tight text-neutral-900">
            Blog
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            Compartilhando histórias e reflexões da missão
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="flex flex-col items-start justify-between group bg-neutral-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-full overflow-hidden rounded-xl">
                {post.mainImage?.asset?.url && (
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || post.title}
                    className="aspect-video w-full bg-neutral-100 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="w-full flex flex-col flex-1">
                <div className="mt-6 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.publishedAt} className="text-neutral-600">
                    {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  {post.categories && post.categories[0] && (
                    <span className="relative z-10 rounded-full bg-accent-100 px-3 py-1.5 font-medium text-accent-900">
                      {post.categories[0].title}
                    </span>
                  )}
                </div>
                <div className="relative flex-1">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-neutral-900">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <div className="mt-8 h-10 flex items-center">
                  {post.author && (
                    <div className="flex items-center gap-x-4">
                      {post.author.image?.asset?.url && (
                        <img
                          src={post.author.image.asset.url}
                          alt={post.author.name}
                          className="h-10 w-10 rounded-full bg-neutral-100 ring-2 ring-neutral-200"
                        />
                      )}
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-neutral-900">
                          {post.author.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

