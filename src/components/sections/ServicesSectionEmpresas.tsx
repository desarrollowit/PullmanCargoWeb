"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Truck, Package, Clock, ShieldCheck, Warehouse, BarChart3 } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function ServicesSectionEmpresas() {
    const services = [
        {
            title: "Carga Masiva (FTL)",
            description: "Transporte exclusivo para grandes volúmenes. Camiones completos dedicados a tu operación.",
            icon: <Truck className="h-8 w-8 text-current" />,
            delay: 100
        },
        {
            title: "Distribución Última Milla",
            description: "Entrega capilar en zonas urbanas con nuestra flota ligera y seguimiento en tiempo real.",
            icon: <Clock className="h-8 w-8 text-current" />,
            delay: 200
        },
        {
            title: "Seguros de Carga",
            description: "Protección total para tu mercadería con nuestras pólizas de cobertura amplia.",
            icon: <ShieldCheck className="h-8 w-8 text-current" />,
            delay: 300
        }
    ]

    return (
        <section id="servicios" className="w-full pt-12 pb-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <ScrollReveal animation="fade-in" className="text-center mb-16 space-y-4">
                    <div className="inline-block bg-primary px-4 py-1 text-xs font-bold text-white uppercase tracking-widest mb-4">
                        Servicios B2B
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary uppercase">
                        Soluciones para <span className="text-primary">Empresas</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto mt-6" />
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ScrollReveal key={index} animation="slide-in-bottom" delay={service.delay} className="h-full">
                            <div className="group relative h-full bg-white p-8 shadow-lg hover:bg-primary transition-colors duration-500 overflow-hidden border-t-4 border-transparent hover:border-secondary rounded-3xl">
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-6 inline-flex p-4 bg-gray-100 group-hover:bg-white/10 rounded-2xl transition-colors">
                                        <div className="text-primary group-hover:text-white transition-colors">
                                            {service.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold uppercase text-secondary group-hover:text-white mb-4 transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-500 group-hover:text-white/90 mb-6 flex-1 transition-colors leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
