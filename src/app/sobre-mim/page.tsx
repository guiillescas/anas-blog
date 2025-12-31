import { getAbout } from "@/lib/sanity-utils"
import { PortableText } from "@portabletext/react"

export const metadata = {
  title: "Sobre mim - Blog da Ana",
  description: "Conheça mais sobre Ana Flávia",
}

export default async function SobreMimPage() {
  const about = await getAbout()

  if (!about) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <h1 className="font-gastela text-4xl font-bold tracking-tight text-neutral-900 mb-8">
            Sobre mim
          </h1>
          <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-900">
            <p className="text-neutral-900">
              Esta página está em construção. Em breve você encontrará informações sobre mim aqui.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <header className="mb-12">
          <h1 className="font-gastela text-4xl font-bold tracking-tight text-neutral-900 mb-8">
            {about.title || "Sobre mim"}
          </h1>

          {about.mainImage?.asset?.url && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={about.mainImage.asset.url}
                alt={about.mainImage.alt || about.title || "Ana Flávia"}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-headings:font-sans prose-p:text-neutral-900 prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 prose-code:text-primary-700 prose-li:text-neutral-900 prose-ul:text-neutral-900 prose-ol:text-neutral-900 prose-blockquote:text-neutral-900 [&_p]:text-neutral-900 [&_li]:text-neutral-900 [&_ul]:text-neutral-900 [&_ol]:text-neutral-900 [&_blockquote]:text-neutral-900 [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans [&_h4]:font-sans [&_h5]:font-sans [&_h6]:font-sans">
          {about.content && <PortableText value={about.content} />}
        </div>

        {about.sections && about.sections.length > 0 && (
          <div className="mt-16 space-y-16">
            {about.sections.map((section: any, index: number) => (
              <section key={index} className="space-y-6">
                <h2 className="font-gastela text-3xl font-semibold text-neutral-900">
                  {section.title}
                </h2>

                {section.image?.asset?.url && (
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src={section.image.asset.url}
                      alt={section.image.alt || section.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {section.content && (
                  <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-headings:font-sans prose-p:text-neutral-900 prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 prose-code:text-primary-700 prose-li:text-neutral-900 prose-ul:text-neutral-900 prose-ol:text-neutral-900 prose-blockquote:text-neutral-900 [&_p]:text-neutral-900 [&_li]:text-neutral-900 [&_ul]:text-neutral-900 [&_ol]:text-neutral-900 [&_blockquote]:text-neutral-900 [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans [&_h4]:font-sans [&_h5]:font-sans [&_h6]:font-sans">
                    <PortableText value={section.content} />
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

