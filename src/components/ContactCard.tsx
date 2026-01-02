import Link from "next/link"

interface ContactCardProps {
  title: string
  description: string
  link: string
  linkText: string
  icon: React.ReactNode
  iconBg?: string
  external?: boolean
}

export default function ContactCard({
  title,
  description,
  link,
  linkText,
  icon,
  iconBg = "bg-primary-100",
  external = false,
}: ContactCardProps) {
  const cardContent = (
    <div className="group rounded-2xl bg-white p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg.includes("gradient") ? iconBg : `${iconBg} group-hover:opacity-90`} flex items-center justify-center transition-all`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-600">{description}</p>
        </div>
      </div>
      <div className="text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors">
        {linkText} →
      </div>
    </div>
  )

  if (external) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    )
  }

  return (
    <Link href={link} className="block">
      {cardContent}
    </Link>
  )
}

