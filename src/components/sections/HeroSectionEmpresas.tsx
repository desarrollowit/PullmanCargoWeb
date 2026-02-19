"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function HeroSectionEmpresas() {
    return (
        <section id="inicio" className="relative w-full min-h-screen flex items-center overflow-hidden">
            {/* Background Pullman Bus Image - different one if optimal, or same for consistency */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200" // Warehouse/Logistics image
                    alt="Logística Empresarial"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/90 via-accent/60 to-transparent" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto pt-20">
                <div className="max-w-4xl space-y-8">
                    <ScrollReveal animation="slide-in-left" className="space-y-6">
                        <div className="inline-block bg-white px-6 py-2 text-sm font-bold text-secondary uppercase tracking-[0.2em] rounded-2xl">
                            <span>Soluciones Corporativas</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase leading-[0.95] tracking-[-0.04em]">
                            Logística <span className="text-primary">Integral</span> para Empresas
                        </h1>
                        <p className="max-w-xl text-gray-300 md:text-xl font-medium leading-relaxed border-l-4 border-white pl-6">
                            Optimiza tu cadena de suministro con nuestra flota dedicada y tecnología de seguimiento en tiempo real.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button asChild size="lg" className="h-14 px-10 bg-primary hover:bg-black text-white font-bold text-lg uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-xl hover:translate-x-1">
                                <Link href="#contacto-empresas">Contactar Ejecutivo</Link>
                            </Button>
                            <Button asChild size="lg" className="h-14 px-10 bg-transparent hover:bg-primary hover:text-white text-white border-2 border-primary font-bold text-lg uppercase tracking-wider rounded-2xl transition-all duration-300">
                                <Link href="#servicios">Servicios B2B</Link>
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
