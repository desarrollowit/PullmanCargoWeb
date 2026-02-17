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
    Truck
} from "lucide-react"
import Link from "next/link"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ContratarPage() {
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
        pickupDate: "",
        paymentMethod: "",
        notes: "",
        acceptTerms: false,
    })

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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
        <div className="min-h-screen bg-gray-50 py-12">
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
                            <Card className="sticky top-4">
                                <CardHeader className="bg-gray-900 text-white">
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="w-5 h-5" />
                                        Resumen de Cotización
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
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
                                        <p className="text-xs text-gray-500">IVA Incluido</p>
                                    </div>

                                    <Link href="/#cotizador">
                                        <Button variant="outline" className="w-full" size="sm">
                                            <Edit className="w-4 h-4 mr-2" />
                                            Editar Cotización
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    </div>

                    {/* Hiring Form - Main Content */}
                    <div className="lg:col-span-2">
                        <ScrollReveal animation="slide-in-right">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-black uppercase">
                                        Detalles del Servicio
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* Pickup Address */}
                                        <div>
                                            <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                                                <Truck className="w-5 h-5 text-[#003fa2]" />
                                                Dirección de Retiro
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <Label htmlFor="pickupAddress">Calle</Label>
                                                    <Input
                                                        id="pickupAddress"
                                                        placeholder="Av. Libertador Bernardo O'Higgins"
                                                        value={formData.pickupAddress}
                                                        onChange={(e) => handleInputChange("pickupAddress", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="pickupNumber">Número</Label>
                                                    <Input
                                                        id="pickupNumber"
                                                        placeholder="1234"
                                                        value={formData.pickupNumber}
                                                        onChange={(e) => handleInputChange("pickupNumber", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="pickupCommune">Comuna</Label>
                                                    <Input
                                                        id="pickupCommune"
                                                        placeholder="Santiago Centro"
                                                        value={formData.pickupCommune}
                                                        onChange={(e) => handleInputChange("pickupCommune", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <Label htmlFor="pickupDetails">Detalles Adicionales (Opcional)</Label>
                                                    <Textarea
                                                        id="pickupDetails"
                                                        placeholder="Depto 101, Torre A, timbre 5"
                                                        value={formData.pickupDetails}
                                                        onChange={(e) => handleInputChange("pickupDetails", e.target.value)}
                                                        rows={2}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Delivery Address */}
                                        <div>
                                            <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-[#003fa2]" />
                                                Dirección de Entrega
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <Label htmlFor="deliveryAddress">Calle</Label>
                                                    <Input
                                                        id="deliveryAddress"
                                                        placeholder="Av. Marina"
                                                        value={formData.deliveryAddress}
                                                        onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="deliveryNumber">Número</Label>
                                                    <Input
                                                        id="deliveryNumber"
                                                        placeholder="5678"
                                                        value={formData.deliveryNumber}
                                                        onChange={(e) => handleInputChange("deliveryNumber", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="deliveryCommune">Comuna</Label>
                                                    <Input
                                                        id="deliveryCommune"
                                                        placeholder="Viña del Mar"
                                                        value={formData.deliveryCommune}
                                                        onChange={(e) => handleInputChange("deliveryCommune", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <Label htmlFor="deliveryDetails">Detalles Adicionales (Opcional)</Label>
                                                    <Textarea
                                                        id="deliveryDetails"
                                                        placeholder="Casa 15, portón azul"
                                                        value={formData.deliveryDetails}
                                                        onChange={(e) => handleInputChange("deliveryDetails", e.target.value)}
                                                        rows={2}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pickup Date & Payment */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="pickupDate" className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    Fecha Preferida de Retiro
                                                </Label>
                                                <Input
                                                    id="pickupDate"
                                                    type="date"
                                                    value={formData.pickupDate}
                                                    onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="paymentMethod" className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4" />
                                                    Método de Pago
                                                </Label>
                                                <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)} required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona método" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="efectivo">Efectivo</SelectItem>
                                                        <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                                                        <SelectItem value="tarjeta">Tarjeta de Crédito/Débito</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Additional Notes */}
                                        <div>
                                            <Label htmlFor="notes">Notas Adicionales (Opcional)</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Instrucciones especiales, horarios preferidos, etc."
                                                value={formData.notes}
                                                onChange={(e) => handleInputChange("notes", e.target.value)}
                                                rows={3}
                                            />
                                        </div>

                                        {/* Terms */}
                                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded">
                                            <input
                                                type="checkbox"
                                                id="acceptTerms"
                                                checked={formData.acceptTerms}
                                                onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                                                required
                                                className="mt-1"
                                            />
                                            <Label htmlFor="acceptTerms" className="text-sm cursor-pointer">
                                                Acepto los <a href="#" className="text-[#003fa2] underline">términos y condiciones</a> del servicio y autorizo a Pullman Cargo a procesar mis datos personales.
                                            </Label>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full h-14 bg-[#003fa2] hover:bg-black text-white font-black uppercase text-lg"
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
        </div>
    )
}
