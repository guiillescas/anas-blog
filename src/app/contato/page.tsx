import ContactMethods from "@/components/ContactMethods"
import ContactHero from "@/components/ContactHero"

export const metadata = {
  title: "Contato - Blog da Ana",
  description: "Entre em contato comigo através do WhatsApp",
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
    <div className="bg-white">
      <ContactHero
        contactInfo={contactInfo}
        whatsappLink={whatsappLink}
      />

      {/* Additional Contact Methods */}
      <ContactMethods contactInfo={contactInfo} />
    </div>
  )
}

