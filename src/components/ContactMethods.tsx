import ContactCard from "./ContactCard"

interface ContactInfo {
  email: string
  instagram: string
}

interface ContactMethodsProps {
  contactInfo: ContactInfo
  title?: string
  description?: string
  className?: string
}

export default function ContactMethods({
  contactInfo,
  title = "Outras Formas de Contato",
  description = "Prefere outro canal? Entre em contato através das opções abaixo",
  className = "",
}: ContactMethodsProps) {
  return (
    <section className={`py-16 bg-neutral-50 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="font-gastela text-3xl font-semibold text-neutral-900 mb-4">
            {title}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {/* Email */}
          <ContactCard
            title="E-mail"
            description="Envie uma mensagem"
            link={`mailto:${contactInfo.email}`}
            linkText={contactInfo.email}
            icon={
              <svg
                className="w-6 h-6 text-primary-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
            iconBg="bg-primary-100 group-hover:bg-primary-200"
            external
          />

          {/* Instagram */}
          <ContactCard
            title="Instagram"
            description="Me siga no Instagram"
            link={`https://instagram.com/${contactInfo.instagram.replace("@", "")}`}
            linkText={contactInfo.instagram}
            icon={
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            }
            iconBg="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 group-hover:opacity-90"
            external
          />

          {/* Blog */}
          <ContactCard
            title="Blog"
            description="Leia meus artigos"
            link="/blog"
            linkText="Ver todos os posts"
            icon={
              <svg
                className="w-6 h-6 text-secondary-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            }
            iconBg="bg-secondary-100 group-hover:bg-secondary-200"
          />
        </div>
      </div>
    </section>
  )
}

