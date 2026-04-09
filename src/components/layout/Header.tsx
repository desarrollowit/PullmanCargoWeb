"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, Facebook, Instagram, Linkedin, Search, Zap, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle
} from "@/components/ui/sheet"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [placeholderText, setPlaceholderText] = React.useState("INGRESE ODT")
  const [trackingId, setTrackingId] = React.useState("")
  const [loadingTracking, setLoadingTracking] = React.useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()

  const isEmpresas = pathname === "/empresas"

  const handleTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;

    // Direct redirect to tracking page.
    // The tracking page now handles the new SvelteKit data format mapping.
    router.push(`/seguimiento?odt=${trackingId}`);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Hash cleanup logic: if we are at the top (Hero) and there is a hash, clear it
      if (window.scrollY < 100 && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    isEmpresas
      ? { href: "/", label: "Personas" }
      : { href: "/empresas", label: "Empresas" },
    { href: "#servicios", label: "Servicios" },
    { href: "#flota", label: "Flota" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ]

  const showTrackingButton = trackingId.length > 0;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${isScrolled ? "shadow-xl py-1" : "shadow-lg py-2"}`}>
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
                // Also clear hash when clicking logo
                window.history.replaceState(null, "", window.location.pathname);
              }
            }}
            className="flex items-center group transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/brand/logo_cargo.png"
              alt="Pullman Cargo"
              className="h-[32px] md:h-[36px] lg:h-[43px] w-auto object-contain"
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

          {/* Tracking Input (Desktop) */}
          <div className="hidden lg:flex h-full items-center mr-6 ml-12">
            <form
              onSubmit={handleTracking}
              className="relative flex items-center"
            >
              <div
                className="flex items-center gap-2 bg-muted border border-input rounded-2xl px-4 py-2 transition-all duration-300 hover:bg-muted/80 min-w-[180px]"
              >
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  name="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="INGRESE ODT"
                  autoComplete="off"
                  className="bg-transparent border-none outline-none w-28 text-foreground placeholder:text-muted-foreground/60 font-medium uppercase tracking-wider transition-all text-xs"
                />
                <button
                  type="submit"
                  disabled={loadingTracking}
                  className={`focus:outline-none flex items-center justify-center rounded-2xl transition-all duration-300 w-6 h-6 bg-white shadow-md hover:scale-110 ${showTrackingButton ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"} ${loadingTracking ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {loadingTracking ? (
                    <Loader2 className="w-3.5 h-3.5 text-secondary animate-spin pointer-events-none" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 text-secondary fill-secondary pointer-events-none" />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right side elements (CTA + WIT + Mobile Menu) */}
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            {/* CTA Button + WIT Logo (Desktop & Tablet) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-6">
              {!isEmpresas && (
                <Button
                  onClick={() => {
                    const element = document.querySelector('#cotizador');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      // Add hash if needed or just let it scroll
                      window.location.hash = 'cotizador';
                    }
                  }}
                  className="bg-primary hover:bg-secondary text-white font-bold rounded-2xl px-3 lg:px-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-[10px] lg:text-sm h-9 lg:h-11 cursor-pointer"
                >
                  Cotizar Ahora
                </Button>
              )}

              {/* Vertical Separator */}
              <div className="w-px h-8 lg:h-12 bg-gray-200" />

              {/* WIT Logo */}
              <a href="https://wit.la" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 border-none outline-none opacity-70 hover:opacity-100 transition-opacity duration-200">
                <img src="https://www.pullmanviajes.cl/logo-wit-dark.png" alt="A Global Partnership wit" className="h-7 lg:h-11 w-auto object-contain border-none p-0" />
              </a>
            </div>

            {/* Mobile Tracking Shortcut button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/seguimiento')}
              className="lg:hidden flex items-center gap-1.5 border-primary/20 text-secondary font-bold rounded-xl h-9 px-3 hover:bg-primary/5"
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] uppercase tracking-wider">Rastreo</span>
            </Button>

            {/* Mobile Nav Toggle */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted w-10 h-10">
                    <Menu className="h-7 w-7 text-secondary" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-white/20 bg-white/90 backdrop-blur-xl p-0 shadow-2xl">
                  <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#003fa2]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col h-full relative z-10">
                    {/* Menu Header */}
                    <div className="p-6 pt-12 flex flex-col items-center border-b border-gray-100/50">
                      <Link href="/" className="group transition-transform duration-300 hover:scale-105 mb-6">
                        <img
                          src="/brand/logo_cargo.png"
                          alt="Pullman Cargo"
                          className="h-12 w-auto object-contain"
                        />
                      </Link>

                      {/* Prominent Mobile Tracking */}
                      <form
                        onSubmit={handleTracking}
                        className="w-full relative"
                      >
                        <Input
                          type="text"
                          placeholder="RASTREA TU ODT AQUÍ"
                          value={trackingId}
                          onChange={(e) => setTrackingId(e.target.value)}
                          autoComplete="off"
                          className="w-full bg-white border-2 border-[#003fa2]/20 rounded-2xl h-12 pl-12 focus:border-[#003fa2] font-bold text-sm tracking-widest placeholder:text-gray-400 text-secondary"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#003fa2] pointer-events-none" />
                        <button
                          type="submit"
                          disabled={loadingTracking}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-secondary rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all ${loadingTracking ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          {loadingTracking ? (
                            <Loader2 className="w-4 h-4 text-white animate-spin pointer-events-none" />
                          ) : (
                            <Zap className="w-4 h-4 text-white fill-white pointer-events-none" />
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Menu Links */}
                    <nav className="flex-1 flex flex-col justify-center px-8 gap-4 py-4 overflow-y-auto">
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
                            className="group flex items-center justify-between text-xl font-bold text-gray-800 hover:text-[#003fa2] transition-all duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="relative">
                              {link.label}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003fa2] group-hover:w-full transition-all duration-300"></span>
                            </span>
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>

                    {/* Call to Actions */}
                    <div className="px-8 pb-4 space-y-3">
                      <SheetClose asChild>
                        <Button
                          onClick={() => document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' })}
                          className="w-full bg-primary hover:bg-secondary text-white font-bold h-12 text-lg shadow-lg hover:shadow-primary/20 rounded-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          Cotizar Ahora
                        </Button>
                      </SheetClose>
                      {/* WIT Logo in mobile menu */}
                      <div className="flex justify-center pt-2">
                        <a href="https://wit.la" target="_blank" rel="noopener noreferrer">
                          <img src="https://www.pullmanviajes.cl/logo-wit-dark.png" alt="A Global Partnership wit" className="h-8 w-auto object-contain opacity-70" />
                        </a>
                      </div>
                    </div>

                    {/* Menu Footer */}
                    <div className="p-8 bg-gray-50/50 border-t border-gray-100/50 space-y-4">
                      <div className="flex justify-center gap-6">
                        {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                          <Link key={i} href="#" className="p-2 rounded-2xl bg-white text-gray-500 hover:text-primary hover:bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            <Icon className="w-5 h-5" />
                          </Link>
                        ))}
                      </div>
                      <div className="text-center space-y-1 text-sm text-gray-500 font-bold">
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
      </div>
    </header>
  )
}
