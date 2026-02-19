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
            title: "Carga Consolidada (LTL)",
            description: "Optimiza costos compartiendo espacio en nuestros camiones. Ideal para envíos regulares.",
            icon: <Package className="h-8 w-8 text-current" />,
            delay: 200
        },
        {
            title: "Distribución Última Milla",
            description: "Entrega capilar en zonas urbanas con nuestra flota ligera y seguimiento en tiempo real.",
            icon: <Clock className="h-8 w-8 text-current" />,
            delay: 300
        },
        {
            title: "Almacenaje y Fullfilment",
            description: "Gestión de inventario y preparación de pedidos en nuestros centros de distribución.",
            icon: <Warehouse className="h-8 w-8 text-current" />,
            delay: 400
        },
        {
            title: "Logística Inversa",
            description: "Gestión eficiente de devoluciones y retornos de mercadería.",
            icon: <BarChart3 className="h-8 w-8 text-current" />,
            delay: 500
        },
        {
            title: "Seguros de Carga",
            description: "Protección total para tu mercadería con nuestras pólizas de cobertura amplia.",
            icon: <ShieldCheck className="h-8 w-8 text-current" />,
            delay: 600
        }
    ]

    return (
        <section id="servicios" className="w-full py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <ScrollReveal animation="fade-in" className="text-center mb-16 space-y-4">
                    <div className="inline-block bg-primary px-4 py-1 text-xs font-bold text-white uppercase tracking-widest mb-4">
                        Servicios B2B
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-secondary uppercase">
                        Soluciones para <span className="text-secondary">Empresas</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto mt-6" />
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ScrollReveal key={index} animation="slide-in-bottom" delay={service.delay} className="h-full">
                            <div className="group relative h-full bg-white p-8 shadow-lg hover:bg-primary transition-colors duration-500 overflow-hidden border-t-4 border-transparent hover:border-black">
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-6 inline-flex p-4 bg-gray-100 group-hover:bg-white/10 rounded-none transition-colors">
                                        <div className="text-primary group-hover:text-white transition-colors">
                                            {service.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-black uppercase text-black group-hover:text-white mb-4 transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-500 group-hover:text-blue-100 mb-6 flex-1 transition-colors leading-relaxed">
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
