import { getPosts } from "@/lib/sanity-utils"

export default async function Home() {
  const posts = await getPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <div className="min-h-screen">
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl font-semibold tracking-tight lg:text-6xl">
            Bem-vindo ao Blog da Ana
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Compartilhando histórias, reflexões e experiências do campo
            missionário
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/blog"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
            >
              Ver todos os posts
            </a>
          </div>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Posts Recentes
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <article
                  key={post._id}
                  className="flex flex-col items-start justify-between"
                >
                  {post.mainImage && (
                    <div className="w-full">
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt || post.title}
                        className="aspect-video w-full rounded-2xl bg-gray-100 object-cover"
                      />
                    </div>
                  )}
                  <div className="w-full">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={post.publishedAt}
                        className="text-gray-500"
                      >
                        {new Date(post.publishedAt).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </time>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6">
                        <a href={`/blog/${post.slug.current}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      {post.excerpt && (
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
