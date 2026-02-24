"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

import { agencies } from "@/data/agencies"

export function AgenciesSection() {
    // Agencies data imported from @/data/agencies

    return (
        <section id="agencias" className="w-full py-24 bg-background text-gray-900 overflow-hidden relative">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <ScrollReveal animation="fade-in" className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter uppercase mb-6 text-secondary">
                        Nuestras <span className="text-secondary">Agencias</span>
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Estamos presentes de Arica a Punta Arenas. Encuentra tu sucursal más cercana.
                    </p>
                </ScrollReveal>

                {/* Map Visual (Stylized Placeholder) */}
                <ScrollReveal animation="zoom-in" className="mb-16">
                    <div className="w-full h-[400px] bg-secondary rounded-3xl relative overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200')] bg-cover bg-center bg-no-repeat bg-blend-multiply opacity-90 hover:opacity-100 transition-opacity duration-700 group">
                        <div className="bg-black/40 absolute inset-0 transition-opacity hover:bg-black/30" />
                        <div className="relative z-10 text-center text-white p-8 border-4 border-white/20 backdrop-blur-sm rounded-none">
                            <h3 className="text-2xl font-semibold uppercase mb-4 text-white">Cobertura Nacional</h3>
                            <p className="text-xl font-medium mb-8">Más de 50 puntos de entrega en todo Chile</p>
                            <Button className="bg-primary hover:bg-black text-white font-bold uppercase h-12 px-8 rounded-2xl shadow-lg transition-all">
                                Ver Mapa Completo <Navigation className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Agencies Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agencies.map((agency, index) => (
                        <ScrollReveal key={index} animation="slide-in-bottom" delay={index * 100}>
                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-secondary transition-colors duration-300">
                                            <MapPin className="w-6 h-6 text-secondary group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-2xl uppercase tracking-wide">
                                            {agency.region}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold uppercase text-secondary mb-2 group-hover:text-primary transition-colors">{agency.city}</h3>
                                    <p className="text-gray-500 text-sm mb-4 font-medium">{agency.address}</p>

                                    <div className="space-y-2 border-t border-gray-100 pt-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                            {agency.phone}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                            {agency.hours}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
