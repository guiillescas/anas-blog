import { getPosts } from "@/lib/sanity-utils"
import Link from "next/link"
import ContactMethods from "@/components/ContactMethods"
import ContactHero from "@/components/ContactHero"

const contactInfo = {
  name: "Ana Flávia",
  phone: "5541999376365",
  photo: "/me.jpg",
  description: "Missionária compartilhando histórias e experiências",
  email: "ana.flaviapires999@gmail.com",
  instagram: "@ana.flaviapires",
}

function getWhatsAppLink(phone: string, message?: string) {
  const cleaned = phone.replace(/\D/g, "")
  const defaultMessage = encodeURIComponent(
    "Olá! Vi seu blog e gostaria de entrar em contato."
  )
  const text = message ? encodeURIComponent(message) : defaultMessage
  return `https://wa.me/55${cleaned}?text=${text}`
}

export default async function Home() {
  const posts = await getPosts()
  const recentPosts = posts.slice(0, 3)
  const whatsappLink = getWhatsAppLink(contactInfo.phone)

  return (
    <div className="min-h-screen bg-white">
      <section className="px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-gastela text-5xl font-semibold tracking-tight lg:text-6xl text-neutral-900">
            Bem-vindo ao Blog da Ana
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-700">
            Compartilhando histórias, reflexões e experiências do campo
            missionário
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/blog"
              className="rounded-full bg-primary-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-800 hover:shadow-xl hover:scale-105"
            >
              Ver todos os posts
            </a>
          </div>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="px-6 py-16 bg-neutral-50">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
              Posts Recentes
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="flex flex-col items-start justify-between group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-neutral-200 hover:border-primary-700 cursor-pointer"
                >
                  {post.mainImage && (
                    <div className="w-full overflow-hidden rounded-xl">
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt || post.title}
                        className="aspect-video w-full bg-neutral-100 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="w-full flex flex-col flex-1">
                    <div className="mt-6 flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={post.publishedAt}
                        className="text-neutral-600"
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
        </section>
      )}

      <ContactHero
        contactInfo={contactInfo}
        whatsappLink={whatsappLink}
        badgeText="Conecte-se"
        title="Vamos Conversar?"
        subtitle="Adoraria conhecer você melhor! Entre em contato através do WhatsApp ou outras redes."
        description="Estou sempre aberta para compartilhar experiências, responder dúvidas ou simplesmente trocar uma ideia."
      />

      <ContactMethods
        contactInfo={contactInfo}
        title="Entre em Contato"
        description="Siga-me nas redes sociais ou entre em contato através dos canais abaixo"
      />
    </div>
  )
}
