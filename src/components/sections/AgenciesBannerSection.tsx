"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function AgenciesBannerSection() {
    return (
        <section id="agencias" className="w-full py-24 bg-[#003fa2] text-white relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
                    alt="Mapa de fondo"
                    className="w-full h-full object-cover grayscale"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#003fa2] to-transparent z-0" />

            <div className="container px-4 md:px-6 mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <ScrollReveal animation="slide-in-left" className="md:w-1/2 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                        <MapPin className="w-4 h-4 text-white" />
                        <span className="text-sm font-bold tracking-wide uppercase">Cobertura Nacional</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
                        Estamos donde <br /> tú nos necesitas
                    </h2>
                    <p className="text-blue-100 text-lg max-w-lg leading-relaxed">
                        Contamos con una extensa red de sucursales de Arica a Punta Arenas. Revisa nuestras ubicaciones y encuentra la más cercana.
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="slide-in-right" delay={200} className="md:w-1/2 flex justify-center md:justify-end">
                    <Button asChild className="h-16 px-8 bg-primary text-white hover:bg-black font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl hover:translate-x-1 border-none">
                        <Link href="/sucursales">
                            Ver Todas las Sucursales <ArrowRight className="ml-3 w-6 h-6" />
                        </Link>
                    </Button>
                </ScrollReveal>
            </div>
        </section>
    )
}
