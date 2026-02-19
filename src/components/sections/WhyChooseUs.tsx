import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ShieldCheck, Zap, History, Headset } from "lucide-react"

export function WhyChooseUs() {
    const benefits = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-white" />,
            title: "Seguridad Garantizada",
            description: "Protocolos de seguridad de nivel bancario para el manejo de tu carga.",
            delay: 0
        },
        {
            icon: <Zap className="w-8 h-8 text-white" />,
            title: "Rapidez y Eficiencia",
            description: "Rutas optimizadas para asegurar la entrega en el menor tiempo posible.",
            delay: 100
        },
        {
            icon: <History className="w-8 h-8 text-white" />,
            title: "Trayectoria de Confianza",
            description: "Más de 75 años liderando el transporte terrestre en Chile.",
            delay: 200
        },
        {
            icon: <Headset className="w-8 h-8 text-white" />,
            title: "Soporte Especializado",
            description: "Atención personalizada para resolver todas tus dudas logísticas.",
            delay: 300
        }
    ]

    return (
        <section id="nosotros" className="w-full py-20 bg-secondary text-white overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <ScrollReveal animation="slide-in-left" className="lg:w-1/3 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight text-white">
                            ¿Por qué elegir <br />
                            <span>Pullman Cargo</span>?
                        </h2>
                        <p className="text-white/80 text-lg">
                            No solo transportamos carga; movemos el motor de tu negocio con
                            excelencia, seguridad y el respaldo de la flota más moderna de Chile.
                        </p>
                    </ScrollReveal>

                    <div className="lg:w-2/3 grid sm:grid-cols-2 gap-4">
                        {benefits.map((benefit, index) => (
                            <ScrollReveal
                                key={index}
                                animation="slide-in-right"
                                delay={benefit.delay}
                                className="flex gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                            >
                                <div className="flex-shrink-0">
                                    {benefit.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                                    <p className="text-sm text-white/70 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
