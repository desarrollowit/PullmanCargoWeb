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
  const [placeholderText, setPlaceholderText] = React.useState("TRACKING")
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-white py-4"}`}>
      {/* Top Bar (Optional, can be added if needed, kept simple for now as per clean design) */}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
              src="/brand/LOGO2 CARGO.png"
              alt="Pullman Cargo"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
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
                className="text-gray-600 hover:text-[#003fa2] font-medium transition-colors duration-200 relative group text-sm uppercase tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003fa2] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Tracking Input */}
          <div className="hidden lg:flex h-full items-center mr-6 ml-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!trackingId) return; // Use state
                router.push(`/seguimiento?odt=${trackingId}`);
              }}
              className="relative h-full flex items-center"
            >
              {/* Full height container with skew */}
              <div
                className="relative h-full flex items-center bg-[#003fa2] transform -skew-x-12 px-6 transition-all duration-300 hover:bg-[#002d75]"
                onMouseEnter={() => setPlaceholderText("INGRESA ODT")}
                onMouseLeave={() => setPlaceholderText("TRACKING")}
              >
                <div className="skew-x-12 flex items-center gap-2">
                  <input
                    type="text"
                    name="trackingId"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder={placeholderText}
                    className="bg-transparent border-none outline-none w-40 focus:w-56 text-white placeholder:text-white/70 font-bold uppercase tracking-wider transition-all text-sm"
                  />
                  <button
                    type="submit"
                    className={`focus:outline-none flex items-center justify-center rounded-full transition-all duration-300 ${showTrackingButton ? "w-7 h-7 bg-white shadow-md hover:shadow-lg hover:scale-110" : ""}`}
                  >
                    {showTrackingButton ? (
                      <Zap className="w-4 h-4 text-[#003fa2] fill-[#003fa2] animate-in fade-in zoom-in duration-200" />
                    ) : (
                      <Search className="w-4 h-4 text-white/90 animate-in fade-in zoom-in duration-200" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* CTA Button + WIT Logo */}
          <div className="hidden lg:flex items-center gap-6">
            {!isEmpresas && (
              <Button asChild className="bg-[#003fa2] hover:bg-[#002d75] text-white font-bold rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                <Link href="/#cotizador">
                  Cotizar Ahora
                </Link>
              </Button>
            )}
            {/* WIT Logo */}
            <a href="https://wit.la" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-200">
              <img src="/brand/wit-logo.svg" alt="A Global Partnership wit" className="h-10 w-auto object-contain" />
            </a>
          </div>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#003fa2] hover:bg-blue-50/50">
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
                        src="/brand/LOGO2 CARGO.png"
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
                      <Button asChild className="w-full bg-[#003fa2] hover:bg-[#002d75] text-white font-bold h-12 text-lg shadow-lg hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
                        <Link href="#cotizador">Cotizar Ahora</Link>
                      </Button>
                    </SheetClose>
                    {/* WIT Logo in mobile menu */}
                    <div className="flex justify-center pt-2">
                      <a href="https://wit.la" target="_blank" rel="noopener noreferrer">
                        <img src="/brand/wit-logo.svg" alt="A Global Partnership wit" className="h-10 w-auto object-contain opacity-70" />
                      </a>
                    </div>
                  </div>

                  {/* Menu Footer */}
                  <div className="p-8 bg-gray-50/50 border-t border-gray-100/50 space-y-6">
                    {/* Social Icons */}
                    <div className="flex justify-center gap-6">
                      {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                        <Link key={i} href="#" className="p-2 rounded-full bg-white text-gray-500 hover:text-[#003fa2] hover:bg-white shadow-sm hover:shadow-md transition-all duration-300">
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
