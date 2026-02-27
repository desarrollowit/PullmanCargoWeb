"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, Facebook, Instagram, Linkedin, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [placeholderText, setPlaceholderText] = React.useState("INGRESE ODT")
  const [trackingId, setTrackingId] = React.useState("")
  const router = useRouter()
  const pathname = usePathname()

  const isEmpresas = pathname === "/empresas"

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    isEmpresas
      ? { href: "/", label: "Personas" }
      : { href: "/empresas", label: "Empresas" },
    { href: "#servicios", label: "Servicios" },
    { href: "#flota", label: "Flota" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ]

  const showTrackingButton = placeholderText === "INGRESA ODT" || trackingId.length > 0;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${isScrolled ? "shadow-xl py-2" : "shadow-lg py-4"}`}>
      {/* Top Bar (Optional, can be added if needed, kept simple for now as per clean design) */}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={isEmpresas ? "/empresas" : "/"}
            onClick={(e) => {
              if ((isEmpresas && pathname === "/empresas") || (!isEmpresas && pathname === "/")) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center group transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/brand/logo_cargo.png"
              alt="Pullman Cargo"
              className="h-[36px] md:h-[43px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  // Handle smooth scroll for anchor links on the same page
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200 relative group text-sm"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Tracking Input */}
          <div className="hidden lg:flex h-full items-center mr-6 ml-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!trackingId) return;
                router.push(`/seguimiento?odt=${trackingId}`);
              }}
              className="relative flex items-center"
            >
              <div
                className="flex items-center gap-2 bg-muted border border-input rounded-2xl px-4 py-2 transition-all duration-300 hover:bg-muted/80"
                onMouseEnter={() => setPlaceholderText("INGRESE ODT")}
                onMouseLeave={() => setPlaceholderText("INGRESE ODT")}
              >
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  name="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder={placeholderText}
                  className="bg-transparent border-none outline-none w-24 focus:w-36 text-foreground placeholder:text-muted-foreground/60 font-medium uppercase tracking-wider transition-all text-xs"
                />
                <button
                  type="submit"
                  className={`focus:outline-none flex items-center justify-center rounded-2xl transition-all duration-300 ${showTrackingButton ? "w-6 h-6 bg-white shadow-md hover:scale-110" : "hidden"}`}
                >
                  {showTrackingButton && (
                    <Zap className="w-3.5 h-3.5 text-secondary fill-secondary" />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* CTA Button + WIT Logo */}
          <div className="hidden lg:flex items-center gap-6">
            {!isEmpresas && (
              <Button asChild className="bg-primary hover:bg-secondary text-white font-bold rounded-2xl px-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                <Link href="/#cotizador">
                  Cotizar Ahora
                </Link>
              </Button>
            )}

            {/* Vertical Separator */}
            <div className="w-px h-12 bg-gray-200" />

            {/* WIT Logo */}
            <a href="https://wit.la" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 border-none outline-none opacity-70 hover:opacity-100 transition-opacity duration-200">
              <img src="https://www.pullmanviajes.cl/logo-wit-dark.png" alt="A Global Partnership wit" className="h-14 w-auto object-contain border-none p-0" />
            </a>
          </div>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
                  <Menu className="h-8 w-8" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-white/20 bg-white/90 backdrop-blur-xl p-0 shadow-2xl">

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#003fa2]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col h-full relative z-10">
                  {/* Menu Header */}
                  <div className="p-6 pt-12 flex justify-center border-b border-gray-100/50">
                    <Link href="/" className="group transition-transform duration-300 hover:scale-105">
                      <img
                        src="/brand/logo_cargo.png"
                        alt="Pullman Cargo"
                        className="h-12 w-auto object-contain"
                      />
                    </Link>
                  </div>

                  {/* Menu Links */}
                  <nav className="flex-1 flex flex-col justify-center px-8 gap-6">
                    {navLinks.map((link, index) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          onClick={(e) => {
                            // Handle smooth scroll for anchor links on the same page
                            if (link.href.startsWith('#')) {
                              e.preventDefault();
                              const element = document.querySelector(link.href);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }
                          }}
                          className="group flex items-center justify-between text-2xl font-bold text-gray-800 hover:text-[#003fa2] transition-all duration-300"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003fa2] group-hover:w-full transition-all duration-300"></span>
                          </span>
                          {/* Arrow or Chevron could go here */}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Call to Actions */}
                  <div className="px-8 pb-4 space-y-3">
                    <SheetClose asChild>
                      <Button asChild className="w-full bg-primary hover:bg-secondary text-white font-bold h-12 text-lg shadow-lg hover:shadow-primary/20 rounded-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <Link href="#cotizador">Cotizar Ahora</Link>
                      </Button>
                    </SheetClose>
                    {/* WIT Logo in mobile menu */}
                    <div className="flex justify-center pt-2">
                      <a href="https://wit.la" target="_blank" rel="noopener noreferrer">
                        <img src="https://www.pullmanviajes.cl/logo-wit-dark.png" alt="A Global Partnership wit" className="h-10 w-auto object-contain opacity-70" />
                      </a>
                    </div>
                  </div>

                  {/* Menu Footer */}
                  <div className="p-8 bg-gray-50/50 border-t border-gray-100/50 space-y-6">
                    {/* Social Icons */}
                    <div className="flex justify-center gap-6">
                      {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                        <Link key={i} href="#" className="p-2 rounded-2xl bg-white text-gray-500 hover:text-primary hover:bg-white shadow-sm hover:shadow-md transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </Link>
                      ))}
                    </div>
                    {/* Contact Info */}
                    <div className="text-center space-y-1 text-sm text-gray-500">
                      <p>contacto@pullmancargo.cl</p>
                      <p>600 300 3000</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
