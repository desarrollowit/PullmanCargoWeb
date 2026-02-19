"use client"

import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function BusinessPortalCTA() {
    return (
        <section id="portal-empresas" className="w-full py-24 bg-gradient-to-br from-secondary via-accent to-black text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <ScrollReveal animation="fade-in" className="text-center max-w-4xl mx-auto">
                    {/* Heading */}
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
                        Portal de <span className="text-primary">Empresas</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                        Accede a tu cuenta corporativa para gestionar envíos, rastrear pedidos y administrar tu operación logística.
                    </p>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12 mt-12">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-2">Gestión Centralizada</h3>
                            <p className="text-gray-300 text-sm">Control total de tus envíos desde un solo lugar</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-2">Seguridad Garantizada</h3>
                            <p className="text-gray-300 text-sm">Protección de datos y transacciones seguras</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-2">Acceso 24/7</h3>
                            <p className="text-gray-300 text-sm">Disponible cuando lo necesites</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                        asChild
                        className="h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black text-lg uppercase tracking-widest rounded-2xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                    >
                        <a
                            href="https://empresas.pullmango.cl/login.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3"
                        >
                            Ingresar al Portal
                            <ExternalLink className="w-6 h-6" />
                        </a>
                    </Button>

                    <p className="text-gray-400 text-sm mt-6">
                        ¿No tienes cuenta? Contáctanos para crear tu acceso corporativo
                    </p>
                </ScrollReveal>
            </div>
        </section>
    )
}
