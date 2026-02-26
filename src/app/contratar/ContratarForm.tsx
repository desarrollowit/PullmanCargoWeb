"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import {
    Package,
    MapPin,
    Calendar,
    CreditCard,
    CheckCircle2,
    ArrowRight,
    Edit,
    Truck,
    Printer
} from "lucide-react"
import Link from "next/link"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { agencies } from "@/data/agencies"

export default function ContratarForm() {
    const searchParams = useSearchParams()

    // Get quote data from URL params
    const quoteData = {
        origin: searchParams.get("origen") || "",
        destination: searchParams.get("destino") || "",
        price: searchParams.get("precio") || "",
        dimensions: {
            largo: searchParams.get("largo") || "",
            ancho: searchParams.get("ancho") || "",
            alto: searchParams.get("alto") || "",
        },
        weight: searchParams.get("peso") || "",
        phone: searchParams.get("telefono") || "",
        email: searchParams.get("email") || "",
        lugar: searchParams.get("lugar") || "DOM", // DOM (Domicilio) or SUC (Sucursal)
    }

    const [formData, setFormData] = useState({
        pickupAddress: "",
        pickupNumber: "",
        pickupCommune: "",
        pickupDetails: "",
        deliveryAddress: "",
        deliveryNumber: "",
        deliveryCommune: "",
        deliveryDetails: "",
        selectedAgency: "", // For SUC delivery
        pickupDate: "",
        paymentMethod: "",
        notes: "",
        acceptTerms: false,
    })

    // Filter agencies by destination city (approximate match)
    const availableAgencies = agencies.filter(agency =>
        agency.city.toLowerCase().includes(quoteData.destination.toLowerCase()) ||
        quoteData.destination.toLowerCase().includes(agency.city.toLowerCase())
    )

    // If no specific match, show all (or handle as needed)
    const displayedAgencies = availableAgencies.length > 0 ? availableAgencies : agencies



    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Integrate with API or send email
        console.log("Service hiring data:", { ...quoteData, ...formData })
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full">
                    <CardContent className="pt-12 pb-12 text-center">
                        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-black uppercase mb-4">¡Solicitud Enviada!</h1>
                        <p className="text-gray-600 mb-6">
                            Hemos recibido tu solicitud de servicio. Nos pondremos en contacto contigo pronto para confirmar los detalles.
                        </p>
                        <div className="bg-gray-100 p-4 rounded mb-6">
                            <p className="text-sm text-gray-500 mb-2">Número de Referencia</p>
                            <p className="text-2xl font-bold text-[#003fa2]">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                        </div>
                        <Link href="/">
                            <Button className="bg-[#003fa2] hover:bg-black text-white font-bold uppercase">
                                Volver al Inicio
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <ScrollReveal animation="fade-in">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
                            Contratar <span className="text-[#003fa2]">Servicio</span>
                        </h1>
                        <p className="text-gray-500 text-lg">
                            Completa los detalles para finalizar tu contratación
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Quote Summary - Sidebar */}
                    <div className="lg:col-span-1">
                        <ScrollReveal animation="slide-in-left">
                            <Card className="sticky top-4 rounded-3xl shadow-xl border-gray-100 overflow-hidden">
                                <CardHeader className="bg-secondary text-white border-none py-6">
                                    <CardTitle className="flex items-center gap-2 uppercase tracking-wider text-sm font-bold">
                                        <Package className="w-5 h-5 text-primary" />
                                        Resumen de Cotización
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-6">
                                    {/* Route */}
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-2">Ruta</p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="w-4 h-4 text-[#003fa2]" />
                                            <span className="font-semibold">{quoteData.origin}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm mt-1">
                                            <ArrowRight className="w-4 h-4 text-gray-400" />
                                            <span className="font-semibold">{quoteData.destination}</span>
                                        </div>
                                    </div>

                                    {/* Package Details */}
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-2">Paquete</p>
                                        <div className="text-sm space-y-1">
                                            <p><span className="text-gray-500">Dimensiones:</span> {quoteData.dimensions.largo}x{quoteData.dimensions.ancho}x{quoteData.dimensions.alto} cm</p>
                                            <p><span className="text-gray-500">Peso:</span> {quoteData.weight} kg</p>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-2">Contacto</p>
                                        <div className="text-sm space-y-1">
                                            <p>{quoteData.phone}</p>
                                            <p>{quoteData.email}</p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="border-t pt-4">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-2">Total</p>
                                        <p className="text-3xl font-black text-[#003fa2]">
                                            ${parseInt(quoteData.price).toLocaleString("es-CL")}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <Link href="/#cotizador" className="block w-full">
                                            <Button variant="outline" className="w-full" size="sm">
                                                <Edit className="w-4 h-4 mr-2" />
                                                Editar Cotización
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            className="w-full border-[#003fa2] text-[#003fa2] hover:bg-[#003fa2]/5 font-bold uppercase transition-all flex items-center justify-center gap-2"
                                            size="sm"
                                            onClick={() => window.print()}
                                        >
                                            <Printer className="w-4 h-4" />
                                            Descargar PDF / Imprimir
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    </div>

                    {/* Hiring Form - Main Content */}
                    <div className="lg:col-span-2">
                        <ScrollReveal animation="slide-in-right">
                            <Card className="rounded-3xl shadow-2xl border-gray-100 overflow-hidden">
                                <CardHeader className="border-b border-gray-50 pb-6">
                                    <CardTitle className="text-2xl font-black uppercase text-secondary">
                                        Detalles del Servicio
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-8">
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* Simplified Contact Confirmation */}
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2 text-secondary">
                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                                Confirmación de Contacto
                                            </h3>
                                            <p className="text-gray-600 mb-6 italic">
                                                Para agilizar tu servicio, un ejecutivo de Pullman Cargo te contactará a la brevedad para coordinar los detalles de retiro y entrega.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Teléfono de Contacto</Label>
                                                    <Input
                                                        id="phone"
                                                        value={quoteData.phone}
                                                        disabled
                                                        className="h-12 bg-white border-gray-200 rounded-2xl"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Correo Electrónico</Label>
                                                    <Input
                                                        id="email"
                                                        value={quoteData.email}
                                                        disabled
                                                        className="h-12 bg-white border-gray-200 rounded-2xl"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Additional Notes */}
                                        <div>
                                            <Label htmlFor="notes" className="font-bold uppercase text-gray-400 text-xs">Instrucciones Adicionales (Opcional)</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Por favor, indícanos si tienes alguna preferencia de horario o detalle especial..."
                                                value={formData.notes}
                                                onChange={(e) => handleInputChange("notes", e.target.value)}
                                                rows={4}
                                                className="bg-gray-50 border-gray-200 rounded-2xl mt-2"
                                            />
                                        </div>

                                        {/* Terms */}
                                        <div className="flex items-start gap-3 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                            <input
                                                type="checkbox"
                                                id="acceptTerms"
                                                checked={formData.acceptTerms}
                                                onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                                                required
                                                className="mt-1 w-5 h-5"
                                            />
                                            <Label htmlFor="acceptTerms" className="text-sm cursor-pointer leading-relaxed">
                                                Confirmo que los datos de contacto son correctos y acepto los <a href="#" className="text-primary font-bold underline">términos y condiciones</a> del servicio.
                                            </Label>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full h-14 bg-primary hover:bg-secondary text-white font-black uppercase text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                                            disabled={!formData.acceptTerms}
                                        >
                                            Confirmar Contratación
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
            {/* Printable Quote Section - HIDDEN BY DEFAULT, VISIBLE ONLY ON PRINT */}
            <div id="printable-quote" className="hidden print-block space-y-8 p-12 bg-white text-secondary font-sans leading-relaxed">
                <div className="flex justify-between items-start border-b-2 border-[#003fa2] pb-6 mb-8">
                    <div>
                        <img src="/brand/logo_cargo.png" alt="Pullman Cargo" className="h-10 w-auto brightness-0" />
                        <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">Comprobante de Cotización Online</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400">FECHA: {new Date().toLocaleDateString('es-CL')}</p>
                        <p className="text-xs font-bold text-gray-400">VALIDEZ: 7 DÍAS</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Ruta */}
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#003fa2] mb-3">Ruta</h3>
                        <div className="text-2xl font-black uppercase text-secondary">
                            <p>{quoteData.origin}</p>
                            <p>{quoteData.destination}</p>
                        </div>
                    </section>

                    {/* Paquete */}
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#003fa2] mb-3">Paquete</h3>
                        <div className="text-base font-bold text-secondary space-y-1">
                            <p>Dimensiones: {quoteData.dimensions.largo}x{quoteData.dimensions.ancho}x{quoteData.dimensions.alto} cm</p>
                            <p>Peso: {quoteData.weight} kg</p>
                            <p>Lugar entrega: {quoteData.lugar === "DOM" ? "Domicilio" : "Sucursal"}</p>
                        </div>
                    </section>

                    {/* Contacto */}
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#003fa2] mb-3">Contacto</h3>
                        <div className="text-base font-bold text-secondary space-y-1">
                            <p>Teléfono: {quoteData.phone}</p>
                            <p>Email: {quoteData.email}</p>
                        </div>
                    </section>

                    {/* Total */}
                    <section className="pt-8 border-t border-gray-100">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#003fa2] mb-3">Total</h3>
                        <p className="text-5xl font-black text-secondary">
                            <span className="text-2xl opacity-50 mr-1">$</span>
                            {parseInt(quoteData.price).toLocaleString("es-CL")}
                        </p>
                    </section>
                </div>

                <div className="pt-12 mt-12 border-t border-gray-100 text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Cotización referencial sujeta a verificación de pesos y medidas en oficina.
                    </p>
                    <p className="text-[10px] text-[#003fa2] font-bold mt-1">WWW.PULLMANCARGO.CL</p>
                </div>
            </div>
        </div>
    )
}
