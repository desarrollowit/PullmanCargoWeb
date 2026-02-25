import Link from "next/link"
import { Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Footer() {
    return (
        <footer id="contacto" className="bg-secondary text-white">
            <div className="container mx-auto px-4 py-16">
                <ScrollReveal animation="slide-in-bottom" className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
                                <img
                                    src="/brand/logo_cargo.png"
                                    alt="Pullman Cargo"
                                    className="h-12 w-auto object-contain brightness-0 invert"
                                />
                            </Link>
                        </div>
                        <p className="text-white/80 leading-relaxed max-w-md">
                            Más de 75 años conectando personas y destinos con excelencia.
                            Tu socio confiable en servicios de logística y transporte de carga premium.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-white/80">
                                <Mail className="w-5 h-5 text-[#ffffff]" />
                                <span>contacto@pullmancargo.cl</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <MapPin className="w-5 h-5 text-[#ffffff]" />
                                <span>Cerro Sombrero 1775, Maipú - Santiago</span>
                            </div>
                        </div>
                        {/* Social Links */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex gap-3">
                                <Link href="#" className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white hover:text-secondary flex items-center justify-center transition-all duration-300 hover:scale-110">
                                    <Facebook className="w-5 h-5" />
                                </Link>
                                <Link href="#" className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white hover:text-secondary flex items-center justify-center transition-all duration-300 hover:scale-110">
                                    <Instagram className="w-5 h-5" />
                                </Link>
                                <Link href="#" className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white hover:text-secondary flex items-center justify-center transition-all duration-300 hover:scale-110">
                                    <Linkedin className="w-5 h-5" />
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 border-l border-white/20 pl-4">
                                <img src="/brand/logo-iso.svg" alt="ISO Logo" className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 brightness-0 invert" />
                                <img src="/brand/pacto-global.jpg" alt="Pacto Global" className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-[#ffffff]">Servicios</h3>
                        <ul className="space-y-3">
                            <li><Link href="#servicios" className="text-white/80 hover:text-[#ffffff] transition-colors">Transporte de Carga</Link></li>
                            <li><Link href="#servicios" className="text-white/80 hover:text-[#ffffff] transition-colors">Carga LTL</Link></li>
                            <li><Link href="#servicios" className="text-white/80 hover:text-[#ffffff] transition-colors">E-commerce</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-[#ffffff]">Empresa</h3>
                        <ul className="space-y-3">
                            <li><Link href="#nosotros" className="text-white/80 hover:text-[#ffffff] transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="#flota" className="text-white/80 hover:text-[#ffffff] transition-colors">Nuestra Flota</Link></li>
                            <li><Link href="#" className="text-white/80 hover:text-[#ffffff] transition-colors">Certificaciones</Link></li>
                            <li><Link href="#" className="text-white/80 hover:text-[#ffffff] transition-colors">Trabaja con Nosotros</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-[#ffffff]">Soporte</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-white/80 hover:text-[#ffffff] transition-colors">Centro de Ayuda</Link></li>
                            <li><Link href="#" className="text-white/80 hover:text-[#ffffff] transition-colors">Términos y Condiciones</Link></li>
                            <li><Link href="#" className="text-white/80 hover:text-[#ffffff] transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="#faq" className="text-white/80 hover:text-[#ffffff] transition-colors">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>
                </ScrollReveal>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-8">
                    <ScrollReveal animation="fade-in" delay={200} className="text-center">
                        <p className="text-sm text-white/50 font-medium tracking-wide">
                            © {new Date().getFullYear()} Pullman Cargo. Todos los derechos reservados. {" "}
                            <span className="mx-2 hidden sm:inline">|</span>
                            <br className="sm:hidden" />
                            Página Web desarrollada por{" "}
                            <a
                                href="https://wit.la"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white font-bold transition-all underline-offset-4 hover:underline"
                            >
                                WIT.la
                            </a>
                        </p>
                    </ScrollReveal>
                </div>
            </div>
        </footer>
    )
}
