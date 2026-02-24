"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Search, Info } from "lucide-react"

import { useRouter } from "next/navigation"

export function TrackingSection() {
    const router = useRouter()

    return (
        <section id="tracking" className="relative w-full py-32 overflow-hidden">
            {/* ... (backgrounds remain same) ... */}
            <div className="absolute inset-0 bg-fixed bg-cover bg-center z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200')" }} />
            <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-0" />
            <div className="absolute inset-0 bg-black/40 z-0" />

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <ScrollReveal animation="slide-in-left" className="space-y-8">
                        {/* ... (left content remains same) ... */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-background text-secondary text-sm font-bold uppercase tracking-wider shadow-sm">
                            <span className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-primary" /> Tracking en Tiempo Real
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white uppercase leading-[0.9]">
                            Control <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Total</span>
                        </h2>
                        <p className="max-w-[500px] text-white/90 text-xl font-medium leading-relaxed border-l-4 border-white pl-6">
                            Monitorea la ubicación exacta de tu carga 24/7. Tecnología GPS integrada en toda nuestra flota.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="slide-in-right">
                        <div className="bg-background p-8 md:p-10 shadow-2xl relative overflow-hidden group rounded-3xl">
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-semibold text-secondary uppercase mb-2">Rastrea tu envío</h3>
                                    <p className="text-gray-500 font-medium">
                                        Ingresa tu número de orden o guía de despacho.
                                    </p>
                                </div>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        // @ts-ignore
                                        const id = e.target.trackingId.value
                                        if (id) router.push(`/seguimiento?odt=${id}`)
                                    }}
                                    className="space-y-4"
                                >
                                    <div className="relative">
                                        <Input
                                            name="trackingId"
                                            className="h-14 bg-muted text-secondary border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-lg font-bold placeholder:font-normal transition-all"
                                            placeholder="Ingrese su ODT"
                                            type="text"
                                        />
                                    </div>
                                    <Button className="w-full h-14 bg-primary hover:bg-black text-white font-bold text-lg uppercase tracking-widest transition-all duration-300 rounded-2xl shadow-xl hover:shadow-2xl">
                                        <Search className="w-5 h-5 mr-3" /> Buscar Ahora
                                    </Button>
                                </form>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide text-center">
                                    * Sistema conectado a API de Pullman Cargo
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
