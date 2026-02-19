"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { MapPin, Scale, Phone, Mail, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { quoterAPI, type Location, type QuoteRequest, type QuoteResponse } from "@/services/quoter-api"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function QuoterSection() {
    // State for locations
    const [origins, setOrigins] = useState<Location[]>([])
    const [destinations, setDestinations] = useState<Location[]>([])
    const [loadingLocations, setLoadingLocations] = useState(false)

    // State for form
    const [selectedOrigin, setSelectedOrigin] = useState("")
    const [selectedDestination, setSelectedDestination] = useState("")
    const [lugarEntrega, setLugarEntrega] = useState("oficina") // "domicilio" or "oficina" - default to oficina for better coverage
    const [formData, setFormData] = useState({
        largo: "",
        ancho: "",
        alto: "",
        peso: "",
        telefono: "",
        email: "",
    })

    // State for quote result
    const [result, setResult] = useState<QuoteResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("personas")

    // Load origins on mount
    useEffect(() => {
        loadOrigins()
    }, [])

    // Load destinations when origin changes
    useEffect(() => {
        if (selectedOrigin) {
            // Reset destination when origin changes
            setSelectedDestination("")
            setDestinations([])
            loadDestinationsByOrigin(selectedOrigin)
        } else {
            // Clear destinations if no origin selected
            setDestinations([])
        }
    }, [selectedOrigin])

    const loadOrigins = async () => {
        try {
            setLoadingLocations(true)
            const data = await quoterAPI.getOrigins()
            setOrigins(data)
        } catch (err) {
            console.error("Error loading origins:", err)
            setError("No se pudieron cargar las ciudades de origen")
        } finally {
            setLoadingLocations(false)
        }
    }

    const loadDestinationsByOrigin = async (originId: string) => {
        try {
            setLoadingLocations(true)
            const data = await quoterAPI.getDestinationsByOrigin(originId)
            setDestinations(data)
        } catch (err) {
            console.error("Error loading destinations:", err)
            // Fallback to all destinations
            try {
                const allDestinations = await quoterAPI.getDestinations()
                setDestinations(allDestinations)
            } catch {
                setError("No se pudieron cargar las ciudades de destino")
            }
        } finally {
            setLoadingLocations(false)
        }
    }

    const handleQuote = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setResult(null)

        // Validation
        if (!selectedOrigin || !selectedDestination) {
            setError("Por favor selecciona origen y destino")
            return
        }

        if (!formData.peso || !formData.largo || !formData.ancho || !formData.alto) {
            setError("Por favor completa todas las dimensiones y peso")
            return
        }

        if (!formData.telefono || !formData.email) {
            setError("Por favor ingresa tu teléfono y email")
            return
        }

        try {
            setLoading(true)

            const quoteRequest: QuoteRequest = {
                selected: "CGR", // Cargo service
                origen: selectedOrigin,
                destino: selectedDestination,
                pago: "EFE", // Efectivo - only valid value
                lugar: lugarEntrega === "domicilio" ? "DOM" : "SUC", // Domicilio o Sucursal
                largo: formData.largo,
                ancho: formData.ancho,
                alto: formData.alto,
                peso: formData.peso,
                telefono: formData.telefono,
                email: formData.email,
            }

            const response = await quoterAPI.calculateQuote(quoteRequest)
            setResult(response)
        } catch (err: any) {
            console.error("Error calculating quote:", err)
            setError(err.message || "No se pudo calcular la cotización")
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <section id="cotizador" className="w-full py-24 bg-background border-t border-gray-100">
            <div className="container px-4 md:px-6 mx-auto">
                <ScrollReveal animation="fade-in" className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6">
                        Cotiza tu <span className="text-primary">Envío</span>
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Obtén una cotización instantánea para tu envío.
                    </p>
                </ScrollReveal>

                <Tabs defaultValue="personas" className="w-full" onValueChange={setActiveTab}>
                    <div className="flex justify-center mb-12">
                        <TabsList className="grid w-full max-w-md grid-cols-2 h-14 bg-gray-100 p-1 rounded-2xl">
                            <TabsTrigger
                                value="personas"
                                className="rounded-2xl text-base font-bold uppercase data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                            >
                                Personas
                            </TabsTrigger>
                            <TabsTrigger
                                value="emprendedores"
                                className="rounded-2xl text-base font-bold uppercase data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                            >
                                Emprendedores
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* PERSONAS TAB - CALCULATOR */}
                    <TabsContent value="personas">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <ScrollReveal animation="slide-in-left" className="h-full">
                                <div className="bg-white border-2 border-gray-100 p-8 shadow-2xl relative">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black uppercase text-gray-900 mb-2">Calculadora Express</h3>
                                        <p className="text-sm text-gray-400 font-medium">Cotización inmediata para paquetería.</p>
                                    </div>

                                    {error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-800">{error}</p>
                                        </div>
                                    )}

                                    <form onSubmit={handleQuote} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Origin */}
                                            <div className="space-y-2">
                                                <Label htmlFor="origin" className="text-sm font-bold uppercase text-gray-500">Origen</Label>
                                                <Select value={selectedOrigin} onValueChange={setSelectedOrigin} disabled={loadingLocations}>
                                                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200 rounded-none focus:border-primary font-semibold">
                                                        <SelectValue placeholder={loadingLocations ? "Cargando..." : "Selecciona origen"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {origins.map((location) => (
                                                            <SelectItem key={location.id} value={location.id}>
                                                                {location.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Destination */}
                                            <div className="space-y-2">
                                                <Label htmlFor="destination" className="text-sm font-bold uppercase text-gray-500">Destino</Label>
                                                <Select value={selectedDestination} onValueChange={setSelectedDestination} disabled={!selectedOrigin || loadingLocations}>
                                                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200 rounded-none focus:border-primary font-semibold">
                                                        <SelectValue placeholder={loadingLocations ? "Cargando..." : "Selecciona destino"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {destinations.map((location) => (
                                                            <SelectItem key={location.id} value={location.id}>
                                                                {location.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Delivery Location */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold uppercase text-gray-500">Lugar de Entrega</Label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="lugarEntrega"
                                                        value="domicilio"
                                                        checked={lugarEntrega === "domicilio"}
                                                        onChange={(e) => setLugarEntrega(e.target.value)}
                                                        className="w-4 h-4 text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-sm font-medium">Entrega en domicilio</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="lugarEntrega"
                                                        value="oficina"
                                                        checked={lugarEntrega === "oficina"}
                                                        onChange={(e) => setLugarEntrega(e.target.value)}
                                                        className="w-4 h-4 text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-sm font-medium">Entrega en oficina</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Dimensions */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold uppercase text-gray-500">Dimensiones (cm)</Label>
                                            <div className="grid grid-cols-3 gap-2">
                                                <Input
                                                    placeholder="Largo"
                                                    type="number"
                                                    className="h-12 bg-gray-50"
                                                    value={formData.largo}
                                                    onChange={(e) => handleInputChange("largo", e.target.value)}
                                                    required
                                                />
                                                <Input
                                                    placeholder="Ancho"
                                                    type="number"
                                                    className="h-12 bg-gray-50"
                                                    value={formData.ancho}
                                                    onChange={(e) => handleInputChange("ancho", e.target.value)}
                                                    required
                                                />
                                                <Input
                                                    placeholder="Alto"
                                                    type="number"
                                                    className="h-12 bg-gray-50"
                                                    value={formData.alto}
                                                    onChange={(e) => handleInputChange("alto", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Weight */}
                                        <div className="space-y-2">
                                            <Label htmlFor="weight" className="text-sm font-bold uppercase text-gray-500">Peso (Kg)</Label>
                                            <div className="relative">
                                                <Scale className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="weight"
                                                    placeholder="0.0"
                                                    type="number"
                                                    step="0.1"
                                                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-none focus:border-primary font-semibold"
                                                    value={formData.peso}
                                                    onChange={(e) => handleInputChange("peso", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-sm font-bold uppercase text-gray-500">Teléfono</Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        id="phone"
                                                        placeholder="912345678"
                                                        type="tel"
                                                        className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-none focus:border-primary font-semibold"
                                                        value={formData.telefono}
                                                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-sm font-bold uppercase text-gray-500">Email</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        id="email"
                                                        placeholder="tu@email.com"
                                                        type="email"
                                                        className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-none focus:border-primary font-semibold"
                                                        value={formData.email}
                                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-14 bg-primary hover:bg-black text-white font-black uppercase tracking-widest text-lg rounded-2xl transition-all shadow-xl hover:shadow-2xl mt-4"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                    Calculando...
                                                </>
                                            ) : (
                                                "Cotizar Ahora"
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal animation="slide-in-right" delay={200} className="h-full flex flex-col justify-center space-y-8 py-8">
                                {result ? (
                                    <div className="bg-gray-900 p-8 relative overflow-hidden animate-in fade-in zoom-in duration-500">
                                        <div className="relative z-10 text-center space-y-4">
                                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                            <p className="text-gray-400 uppercase tracking-widest font-bold text-sm">Cotización Generada</p>
                                            <div className="space-y-2">
                                                {result.estado && result.precioTotal && (
                                                    <>
                                                        <h3 className="text-6xl font-black text-white">${result.precioTotal.toLocaleString("es-CL")}</h3>
                                                        <p className="text-blue-400 font-medium">IVA Incluido</p>
                                                        <p className="text-gray-300 text-sm mt-2">{result.descripcionOrigen} → {result.descripcionDestino}</p>
                                                    </>
                                                )}
                                                {!result.estado && (
                                                    <p className="text-red-400 text-sm">{result.mensaje}</p>
                                                )}
                                            </div>
                                            <div className="pt-6 border-t border-gray-800">
                                                <Button
                                                    className="w-full bg-white text-black hover:bg-primary hover:text-white font-bold uppercase rounded-2xl"
                                                    onClick={() => {
                                                        const params = new URLSearchParams({
                                                            origen: result.descripcionOrigen,
                                                            destino: result.descripcionDestino,
                                                            precio: result.precioTotal.toString(),
                                                            largo: formData.largo,
                                                            ancho: formData.ancho,
                                                            alto: formData.alto,
                                                            peso: formData.peso,
                                                            telefono: formData.telefono,
                                                            email: formData.email,
                                                            lugar: lugarEntrega,
                                                        })
                                                        window.location.href = `/contratar?${params.toString()}`
                                                    }}
                                                >
                                                    Contratar Servicio
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <h3 className="text-3xl md:text-4xl font-black uppercase text-gray-900 mb-4">
                                            ¿Por qué cotizar con <br /> <span className="text-primary">Pullman Cargo?</span>
                                        </h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-gray-900">Tarifas Competitivas</p>
                                                    <p className="text-sm text-gray-500">Los mejores precios del mercado</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-gray-900">Cobertura Nacional</p>
                                                    <p className="text-sm text-gray-500">Llegamos a todo Chile</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-gray-900">Seguimiento en Tiempo Real</p>
                                                    <p className="text-sm text-gray-500">Rastrea tu envío en todo momento</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </ScrollReveal>
                        </div>
                    </TabsContent>

                    {/* EMPRENDEDORES TAB - Same calculator */}
                    <TabsContent value="emprendedores">
                        <div className="text-center py-12">
                            <p className="text-gray-500">Utiliza la misma calculadora en la pestaña "Personas" para obtener tu cotización.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
