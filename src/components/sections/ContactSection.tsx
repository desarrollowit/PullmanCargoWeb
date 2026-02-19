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
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6">
                        Conversemos sobre tu <span className="text-secondary">Logística</span>
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Estamos listos para resolver tus dudas y optimizar tus envíos. Escríbenos o visítanos.
                    </p>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* LEFT: INFO & MAP */}
                    <ScrollReveal animation="slide-in-left" className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
                                <MapPin className="h-8 w-8 text-secondary mb-4" />
                                <h3 className="font-bold text-lg uppercase mb-2">Casa Matriz</h3>
                                <p className="text-gray-500 text-sm">San Borja 1234, Estación Central<br />Santiago, Chile</p>
                            </div>
                            <div className="bg-gray-50 p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
                                <Phone className="h-8 w-8 text-secondary mb-4" />
                                <h3 className="font-bold text-lg uppercase mb-2">Llámanos</h3>
                                <p className="text-gray-500 text-sm">600 300 3000<br />+56 2 2222 2222</p>
                            </div>
                            <div className="bg-gray-50 p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
                                <Mail className="h-8 w-8 text-secondary mb-4" />
                                <h3 className="font-bold text-lg uppercase mb-2">Escríbenos</h3>
                                <p className="text-gray-500 text-sm">contacto@pullmancargo.cl<br />ventas@pullmancargo.cl</p>
                            </div>
                            <div className="bg-gray-50 p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
                                <Clock className="h-8 w-8 text-secondary mb-4" />
                                <h3 className="font-bold text-lg uppercase mb-2">Horario</h3>
                                <p className="text-gray-500 text-sm">Lunes a Viernes: 08:30 - 18:30<br />Sábados: 09:00 - 14:00</p>
                            </div>
                        </div>

                        {/* Map Visual */}
                        <div className="w-full h-80 bg-gray-200 rounded-none relative overflow-hidden shadow-lg border border-gray-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1356073400243!2d-70.68658822425577!3d-33.44577849733568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c459954460f3%3A0x6b8c9d467776510d!2sSan%20Borja%201234%2C%20Estaci%C3%B3n%20Central%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1707835123456!5m2!1ses!2scl"
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
                        <div className="bg-white p-8 md:p-10 shadow-2xl border-t-4 border-secondary relaitve">
                            <h3 className="text-2xl font-black uppercase text-gray-900 mb-6">Formulario de Contacto</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Nombre Completo</label>
                                        <Input placeholder="Tu nombre" className="bg-gray-50 border-gray-200 focus:border-primary h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Teléfono</label>
                                        <Input placeholder="+56 9 ..." className="bg-gray-50 border-gray-200 focus:border-primary h-12" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Correo Electrónico</label>
                                    <Input placeholder="correo@ejemplo.com" className="bg-gray-50 border-gray-200 focus:border-primary h-12" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Mensaje</label>
                                    <Textarea placeholder="Cuéntanos en qué podemos ayudarte..." className="bg-gray-50 border-gray-200 focus:border-primary min-h-[150px]" />
                                </div>
                                <Button className="w-full h-14 bg-primary hover:bg-black text-white font-black uppercase tracking-widest text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl group">
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
