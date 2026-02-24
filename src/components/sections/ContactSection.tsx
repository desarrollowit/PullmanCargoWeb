"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function ContactSection() {
    return (
        <section id="contacto" className="w-full py-24 bg-background relative overflow-hidden">


            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <ScrollReveal animation="fade-in" className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-primary uppercase mb-6">
                        Conversemos <span className="text-foreground">sobre tu Logística</span>
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Estamos listos para resolver tus dudas y optimizar tus envíos. Escríbenos o visítanos.
                    </p>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* LEFT: INFO & MAP */}
                    <ScrollReveal animation="slide-in-left" className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 hover:shadow-lg transition-shadow rounded-2xl">
                                <MapPin className="h-8 w-8 text-secondary mb-4" />
                                <h3 className="font-bold text-lg uppercase mb-2">Casa Matriz</h3>
                                <p className="text-gray-500 text-sm">Cerro Sombrero 1775, Maipú<br />Santiago, Chile</p>
                            </div>
                            <div className="bg-gray-50 p-6 hover:shadow-lg transition-shadow rounded-2xl">
                                <Phone className="h-8 w-8 text-secondary mb-4" />
                                <h3 className="font-bold text-lg uppercase mb-2">Llámanos</h3>
                                <p className="text-gray-500 text-sm">600 300 3000<br />+56 2 2222 2222</p>
                            </div>
                            <div className="bg-gray-50 p-6 hover:shadow-lg transition-shadow rounded-2xl">
                                <Mail className="h-8 w-8 text-secondary mb-4" />
                                <h3 className="font-bold text-lg uppercase mb-2">Escríbenos</h3>
                                <p className="text-gray-500 text-sm">contacto@pullmancargo.cl</p>
                            </div>
                            <div className="bg-gray-50 p-6 hover:shadow-lg transition-shadow rounded-2xl">
                                <Clock className="h-8 w-8 text-secondary mb-4" />
                                <h3 className="font-bold text-lg uppercase mb-2">Horario</h3>
                                <p className="text-gray-500 text-sm">Lunes a Viernes: 08:30 - 18:30<br />Sábados: 09:00 - 14:00</p>
                            </div>
                        </div>

                        {/* Map Visual */}
                        <div className="w-full h-80 bg-gray-200 rounded-3xl relative overflow-hidden shadow-lg border border-gray-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.456!2d-70.75895!3d-33.48835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c356f98104bd%3A0xe675929668d249fc!2sCerro%20Sombrero%201775%2C%20Maip%C3%BA%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1707835123456!5m2!1ses!2scl"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </ScrollReveal>

                    {/* RIGHT: FORM */}
                    <ScrollReveal animation="slide-in-right" delay={200}>
                        <div className="bg-white p-8 md:p-10 shadow-2xl border-t-4 border-primary rounded-3xl overflow-hidden relative">
                            <h3 className="text-xl font-semibold uppercase text-primary mb-6">Formulario de Contacto</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Nombre Completo</label>
                                        <Input placeholder="Tu nombre" className="rounded-2xl bg-gray-50 border-gray-200 focus:border-primary h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Teléfono</label>
                                        <Input placeholder="+56 9 ..." className="rounded-2xl bg-gray-50 border-gray-200 focus:border-primary h-12" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Correo Electrónico</label>
                                    <Input placeholder="correo@ejemplo.com" className="rounded-2xl bg-gray-50 border-gray-200 focus:border-primary h-12" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Mensaje</label>
                                    <Textarea placeholder="Cuéntanos en qué podemos ayudarte..." className="rounded-2xl bg-gray-50 border-gray-200 focus:border-primary min-h-[150px]" />
                                </div>
                                <Button className="w-full h-14 bg-primary hover:bg-secondary text-white font-bold uppercase tracking-widest text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl group">
                                    Enviar Mensaje <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
