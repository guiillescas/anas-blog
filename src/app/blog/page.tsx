import { getPosts } from "@/lib/sanity-utils"

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
          <p className="mt-4 text-lg text-gray-600">
            Compartilhando histórias e reflexões da missão
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="flex flex-col items-start justify-between"
            >
              <div className="w-full">
                {post.mainImage?.asset?.url && (
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || post.title}
                    className="aspect-video w-full rounded-2xl bg-gray-100 object-cover"
                  />
                )}
              </div>
              <div className="w-full">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.publishedAt} className="text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  {post.categories && post.categories[0] && (
                    <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                      {post.categories[0].title}
                    </span>
                  )}
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
                {post.author && (
                  <div className="relative mt-8 flex items-center gap-x-4">
                    {post.author.image?.asset?.url && (
                      <img
                        src={post.author.image.asset.url}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full bg-gray-100"
                      />
                    )}
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        {post.author.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

