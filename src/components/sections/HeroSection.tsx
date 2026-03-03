"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Truck } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function HeroSection() {
    return (
        <section id="inicio" className="relative w-full h-[70vh] flex items-center overflow-hidden mt-20">
            {/* Background Pullman Bus Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/flota/hero-v2.png"
                    alt="Flota Pullman Cargo"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#58351e]/80 via-[#58351e]/50 to-transparent" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto pt-8">
                <div className="max-w-4xl space-y-8">
                    <ScrollReveal animation="slide-in-left" className="space-y-6">
                        <div className="inline-block bg-secondary px-6 py-2 text-sm font-bold text-white uppercase tracking-[0.2em] rounded-2xl">
                            <span>Logística & Transporte</span>
                        </div>
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white uppercase leading-[0.95] tracking-[-0.04em]">
                            Tu Carga <span className="text-primary">Segura</span> y a Tiempo
                        </h1>
                        <p className="max-w-xl text-gray-200 text-sm md:text-sm font-medium leading-relaxed border-l-4 border-primary pl-6">
                            Expertos en transporte terrestre y soluciones logísticas integrales.
                            Conectamos Chile con la flota más moderna del país.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button asChild size="lg" className="h-14 px-10 bg-primary hover:bg-white hover:text-primary text-white font-bold text-lg uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-xl hover:translate-x-1">
                                <Link href="#cotizador">Cotizar Ahora</Link>
                            </Button>
                            <Button asChild size="lg" className="h-14 px-10 bg-primary hover:bg-secondary text-white border-2 border-primary font-bold text-lg uppercase tracking-wider rounded-2xl transition-all duration-300">
                                <Link href="#servicios">Nuestros Servicios</Link>
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                <div className="w-8 h-12 border-2 border-white/30 rounded-2xl flex justify-center p-2">
                    <div className="w-1 h-3 bg-secondary rounded-2xl" />
                </div>
            </div>
        </section>
    )
}
