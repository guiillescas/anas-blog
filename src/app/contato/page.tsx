export const metadata = {
  title: "Contato - Blog da Ana",
  description: "Entre em contato comigo através do WhatsApp",
}

function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, "")
  // Remove o código do país (55) se presente
  const withoutCountry = cleaned.startsWith("55") ? cleaned.slice(2) : cleaned
  // Formata como +55 DD NNNNN-NNNN
  const match = withoutCountry.match(/^(\d{2})(\d{5})(\d{4})$/)
  if (match) {
    return `+55 ${match[1]} ${match[2]}-${match[3]}`
  }
  return phone
}

function getWhatsAppLink(phone: string, message?: string) {
  const cleaned = phone.replace(/\D/g, "")
  const defaultMessage = encodeURIComponent(
    "Olá! Vi seu blog e gostaria de entrar em contato."
  )
  const text = message ? encodeURIComponent(message) : defaultMessage
  return `https://wa.me/55${cleaned}?text=${text}`
}

export default function ContatoPage() {
  const contactInfo = {
    name: "Ana Flávia",
    phone: "5541999376365",
    photo: "/me.jpg",
    description: "Missionária compartilhando histórias e experiências",
    email: "ana.flaviapires999@gmail.com",
    instagram: "@ana.flaviapires",
  }

  const whatsappLink = getWhatsAppLink(contactInfo.phone)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-neutral-50 py-24 lg:py-32">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 mb-8">
                <svg
                  className="w-5 h-5 text-primary-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm font-medium text-primary-700">
                  Conecte-se comigo
                </span>
              </div>
              
              <h1 className="font-gastela text-5xl font-semibold tracking-tight mb-6 text-neutral-900 lg:text-6xl">
                Entre em Contato
              </h1>
              
              <p className="text-xl text-neutral-700 leading-relaxed mb-4">
                Adoraria conversar com você! Sinta-se à vontade para me enviar uma
                mensagem através do WhatsApp.
              </p>
              
              <p className="text-neutral-600">
                Estou sempre aberta para compartilhar experiências, responder dúvidas
                ou simplesmente trocar uma ideia.
              </p>
            </div>

            {/* WhatsApp Card */}
            <div className="flex justify-center lg:justify-end">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full max-w-md"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-neutral-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative p-8">
                    <div className="flex flex-col items-center text-center space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary-100 group-hover:ring-primary-200 transition-all duration-300 shadow-lg">
                          {contactInfo.photo ? (
                            <img
                              src={contactInfo.photo}
                              alt={contactInfo.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                              <span className="text-4xl font-semibold text-white">
                                {contactInfo.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-neutral-900">
                          {contactInfo.name}
                        </h2>
                        <p className="text-sm text-neutral-600 mb-1">
                          {contactInfo.description}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-neutral-700">
                          <svg
                            className="w-5 h-5 text-neutral-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="font-medium">
                            {formatPhoneNumber(contactInfo.phone)}
                          </span>
                        </div>
                      </div>

                      <div className="w-full pt-4">
                        <div className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 text-white shadow-lg transition-all duration-300 group-hover:from-primary-700 group-hover:to-primary-800 group-hover:shadow-xl">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          <span className="text-lg font-semibold">
                            Falar comigo
                          </span>
                          <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Methods */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-gastela text-3xl font-semibold text-neutral-900 mb-4">
              Outras Formas de Contato
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Prefere outro canal? Entre em contato através das opções abaixo
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {/* Email */}
            <div className="group rounded-2xl bg-white p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
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
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">E-mail</h3>
                  <p className="text-sm text-neutral-600">Envie uma mensagem</p>
                </div>
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors"
              >
                {contactInfo.email} →
              </a>
            </div>

            {/* Instagram */}
            <div className="group rounded-2xl bg-white p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center group-hover:opacity-90 transition-opacity">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Instagram</h3>
                  <p className="text-sm text-neutral-600">Me siga no Instagram</p>
                </div>
              </div>
              <a
                href={`https://instagram.com/${contactInfo.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors"
              >
                {contactInfo.instagram} →
              </a>
            </div>

            {/* Blog */}
            <div className="group rounded-2xl bg-white p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center group-hover:bg-secondary-200 transition-colors">
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
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Blog</h3>
                  <p className="text-sm text-neutral-600">Leia meus artigos</p>
                </div>
              </div>
              <a
                href="/blog"
                className="text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors"
              >
                Ver todos os posts →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

