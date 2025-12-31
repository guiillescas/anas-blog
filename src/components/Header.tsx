"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import StaggeredMenu from "./StaggeredMenu"
import Image from "next/image"

const menuItems = [
  { label: "Início", href: "/" },
  { label: "Sobre mim", href: "/sobre-mim" },
  { label: "Sobre o site", href: "/sobre-o-site" },
  { label: "Meus materiais", href: "/materiais" },
  { label: "Faça parte", href: "/faca-parte" },
  { label: "Contato", href: "/contato" },
  { label: "Portal", href: "/portal" },
]

function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const staggeredMenuItems = menuItems.map((item) => ({
    label: item.label.toUpperCase(),
    ariaLabel: item.label,
    link: item.href,
  }))

  return (
    <>
      <header
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-md border-b border-neutral-200/50"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/logos/letter.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </Link>

            <div className="flex items-center gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary-700"
                        : "text-neutral-800 hover:text-primary-700"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </header>

      <div className="lg:hidden fixed inset-0 z-50">
        <StaggeredMenu
          position="right"
          colors={["#faf5f2", "#f3eae1", "#e7d2c1"]}
          items={staggeredMenuItems}
          displaySocials={false}
          displayItemNumbering={false}
          logoUrl="/logos/full-logo-name-and-letter-red-horizontal.png"
          menuButtonColor="#673c33"
          openMenuButtonColor="#673c33"
          accentColor="#ca1b20"
          isFixed={true}
          changeMenuColorOnOpen={false}
          closeOnClickAway={true}
          menuLabel="Menu"
          closeLabel="Fechar"
        />
      </div>

      <div className="h-0 lg:h-20" />
    </>
  )
}

export default Header

