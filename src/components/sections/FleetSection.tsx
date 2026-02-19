"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function FleetSection() {
    const fleet = [
        {
            name: "Rampla Abierta",
            capacity: "28 Toneladas",
            desc: "Ideal para carga sobredimensionada, contenedores y materiales de construcción.",
            image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800"
        },
        {
            name: "Furgón Cerrado",
            capacity: "5 - 10 Toneladas",
            desc: "Transporte seguro para carga general, retail y paquetería valorada.",
            image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800" // Generic truck, swap if needed
        },
        {
            name: "Camión 3/4",
            capacity: "1.5 - 3.5 Toneladas",
            desc: "Perfecto para distribución urbana y última milla en zonas de difícil acceso.",
            image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=800"
        },
        {
            name: "Tractocamión",
            capacity: "Arrastre 45 Ton",
            desc: "Potencia para largas distancias y movimiento de contenedores high-cube.",
            image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800"
        },
        {
            name: "Sider (Cortina)",
            capacity: "26 Toneladas",
            desc: "Carga y descarga lateral ágil. Versatilidad para pallets y maquinaria.",
            image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800"
        },
        {
            name: "Van / City Car",
            capacity: "500 Kg - 1 Ton",
            desc: "Agilidad urbana para paquetería express y entregas de última milla.",
            image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?q=80&w=800"
        }
    ]


    return (
        <section id="flota" className="w-full py-24 bg-zinc-900 text-white overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#444 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <ScrollReveal animation="fade-in" className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6">
                        Nuestra <span className="text-secondary">Flota</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Tecnología y potencia en movimiento. Contamos con equipos de última generación para cada tipo de carga.
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="slide-in-bottom" delay={200}>
                    <Carousel className="w-full max-w-6xl mx-auto">
                        <CarouselContent className="-ml-4">
                            {fleet.map((item, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="group relative h-[450px] overflow-hidden bg-black border border-zinc-800 transition-all duration-500 hover:border-primary rounded-2xl">
                                        {/* Image */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 group-hover:opacity-40"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 width-full p-8 space-y-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="w-12 h-1 bg-[primary] mb-4" />
                                            <h3 className="text-2xl font-black uppercase text-white tracking-wide">
                                                {item.name}
                                            </h3>
                                            <p className="text-[primary] font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                Capacidad: {item.capacity}
                                            </p>
                                        </div>

                                        {/* Hover Content */}
                                        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <p className="text-gray-200 text-lg font-medium leading-relaxed border-l-2 border-[primary] pl-4">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="left-[-50px] bg-transparent border-zinc-700 text-white hover:bg-primary hover:border-primary" />
                            <CarouselNext className="right-[-50px] bg-transparent border-zinc-700 text-white hover:bg-primary hover:border-primary" />
                        </div>
                    </Carousel>
                </ScrollReveal>
            </div>
        </section>
    )
}
