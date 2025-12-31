export const metadata = {
  title: "Meus materiais - Blog da Ana",
  description: "Materiais e recursos disponíveis",
}

export default function MateriaisPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="font-gastela text-4xl font-bold tracking-tight text-neutral-900 mb-8">
          Meus materiais
        </h1>
        <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-900">
          <p className="text-neutral-900">
            Esta página está em construção. Em breve você encontrará materiais e recursos aqui.
          </p>
        </div>
      </div>
    </div>
  )
}

