export const metadata = {
  title: "Sobre o site - Blog da Ana",
  description: "Informações sobre este site",
}

export default function SobreOSitePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="font-gastela text-4xl font-bold tracking-tight text-neutral-900 mb-8">
          Sobre o site
        </h1>
        <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-900">
          <p className="text-neutral-900">
            Esta página está em construção. Em breve você encontrará informações sobre este site aqui.
          </p>
        </div>
      </div>
    </div>
  )
}

