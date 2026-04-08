"use client"

import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function BusinessPortalCTA() {
    return (
        <section id="portal-empresas" className="w-full py-24 bg-background text-secondary relative overflow-hidden">

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <ScrollReveal animation="fade-in" className="text-center max-w-4xl mx-auto">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-primary uppercase mb-6">
                        Portal de <span className="text-secondary">Empresas</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-500 mb-8 leading-relaxed">
                        Accede a tu cuenta corporativa para gestionar envíos, rastrear pedidos y administrar tu operación logística.
                    </p>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12 mt-12">
                        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="font-bold text-lg mb-2 text-secondary">Gestión Centralizada</h3>
                            <p className="text-gray-500 text-sm">Control total de tus envíos desde un solo lugar</p>
                        </div>
                        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="font-bold text-lg mb-2 text-secondary">Seguridad Garantizada</h3>
                            <p className="text-gray-500 text-sm">Protección de datos y transacciones seguras</p>
                        </div>
                        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="font-bold text-lg mb-2 text-secondary">Acceso 24/7</h3>
                            <p className="text-gray-500 text-sm">Disponible cuando lo necesites</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                        asChild
                        className="h-16 px-12 bg-primary hover:bg-secondary text-white font-bold text-lg uppercase tracking-widest rounded-2xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                    >
                        <a
                            href="https://empresas.pullmancargo.cl/login.php"
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
