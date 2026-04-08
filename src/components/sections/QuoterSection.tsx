"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Search, MapPin, Package, Scale, ArrowRight, Loader2, CheckCircle2, ChevronRight, Mail, Phone, Calculator, Printer, AlertCircle } from "lucide-react"
import { quoterAPI, type Location, type QuoteRequest, type QuoteResponse } from "@/services/quoter-api"

interface SearchableSelectProps {
    options: Location[]
    value: string
    onChange: (value: string) => void
    placeholder: string
    disabled?: boolean
}

function SearchableSelect({ options, value, onChange, placeholder, disabled }: SearchableSelectProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")

    // Find the selected option's name to display
    const selectedOption = options.find(o => o.id === value)
    const displayValue = open ? search : (selectedOption ? selectedOption.name : "")

    const filteredOptions = options.filter(o => o.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="relative w-full">
            <div 
                className={`relative flex items-center w-full h-12 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-2xl ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'}`}
            >
                <input
                    type="text"
                    className="w-full h-full bg-transparent outline-none font-semibold text-gray-900 placeholder:text-gray-500"
                    placeholder={placeholder}
                    value={displayValue}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        if (!open) setOpen(true)
                        if (value && e.target.value !== selectedOption?.name) {
                            onChange("") // clear selection if they start typing
                        }
                    }}
                    onFocus={() => {
                        setSearch("")
                        setOpen(true)
                    }}
                    onBlur={() => {
                        // Close after a small delay to allow click on option
                        setTimeout(() => setOpen(false), 200)
                    }}
                    disabled={disabled}
                />
                <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-90' : ''}`} />
            </div>

            {open && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option.id}
                                className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 font-medium ${option.id === value ? 'bg-primary/5 text-primary' : 'text-gray-700'}`}
                                onClick={() => {
                                    onChange(option.id)
                                    setSearch(option.name)
                                    setOpen(false)
                                }}
                            >
                                {option.name}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 font-medium">
                            No se encontraron ciudades
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

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
        nombre: "",
        largo: "",
        ancho: "",
        alto: "",
        peso: "",
        telefono: "",
        email: "",
        valorDeclarado: "0",
    })
    const [formaPago, setFormaPago] = useState("EFE") // "EFE" (Origen) or "T-D" (Destino)

    // State for quote result
    const [result, setResult] = useState<QuoteResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("personas")
    const [serviceType, setServiceType] = useState("CGR") // "CGR", "ENC", "EXP"

    // Load origins on mount
    useEffect(() => {
        loadOrigins()
    }, [])

    // Load destinations when origin changes
    useEffect(() => {
        if (selectedOrigin) {
            // Reset destination when origin changes
            setSelectedDestination("")
            // Do NOT clear destinations yet, loadDestinationsByOrigin will handle it
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
            // Try specific origin-based destinations first (PullmanGo standard)
            const data = await quoterAPI.getDestinationsByOrigin(originId)

            if (data && data.length > 0) {
                setDestinations(data)
            } else {
                // If no specific destinations returned, fetch all destinations
                const allDestinations = await quoterAPI.getDestinations()
                setDestinations(allDestinations)
            }
        } catch (err) {
            console.error("Error loading destinations:", err)
            // Fallback to all destinations on any error
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

        // Personal data is no longer mandatory for calculation

        try {
            setLoading(true)

            const quoteRequest: QuoteRequest = {
                selected: serviceType, // Dynamic service type
                origen: selectedOrigin,
                destino: selectedDestination,
                pago: formaPago, // EFE, PED or CTA
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

            // Scroll to result on mobile
            setTimeout(() => {
                const resultElement = document.getElementById('quote-result');
                if (resultElement) {
                    resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);

            // Trigger Email Notification only if email is provided
            if (formData.email) {
                try {
                    await fetch('/api/notifications/quote', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            formData: {
                                ...formData,
                                origen: origins.find(o => o.id === selectedOrigin)?.name,
                                destino: destinations.find(d => d.id === selectedDestination)?.name,
                                servicio: serviceType === "CGR" ? "Carga" : serviceType === "ENC" ? "Encomienda" : "Express",
                                formaPago: formaPago === "EFE" ? "Pago en Origen" : formaPago === "PED" ? "Pago en Destino" : "Cuenta Corriente",
                                lugarEntrega: lugarEntrega === "domicilio" ? "Domicilio" : "Sucursal",
                            },
                            result: response
                        })
                    })
                } catch (emailErr) {
                    console.error("Failed to trigger email notification:", emailErr)
                }
            }
        } catch (err: any) {
            console.error("Error calculating quote:", err)
            setError(err.message || "No se pudo calcular la cotización")
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear result when form changes to force re-calculation and prevent stale/blank prints
        if (result) setResult(null)
    }

    // Clear result when key selections change
    useEffect(() => {
        if (result) setResult(null)
    }, [selectedOrigin, selectedDestination, lugarEntrega, formaPago, serviceType])

    return (
        <section id="cotizador" className="w-full py-24 bg-background border-t border-gray-100">
            <div className="container px-4 md:px-6 mx-auto">
                <ScrollReveal animation="fade-in" className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter uppercase mb-6">
                        <span className="text-primary">Cotiza tu</span> Envío
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Obtén una cotización instantánea para tu envío.
                    </p>
                </ScrollReveal>

                <div className="w-full">


                    {/* PERSONAS TAB - CALCULATOR */}

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <ScrollReveal animation="slide-in-left" className="h-full">
                            <div className="bg-white border-2 border-gray-100 p-8 shadow-2xl relative rounded-3xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold uppercase text-secondary mb-2">Calculadora Express</h3>
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
                                            <SearchableSelect 
                                                options={origins}
                                                value={selectedOrigin}
                                                onChange={setSelectedOrigin}
                                                placeholder={loadingLocations ? "Cargando..." : "Buscar origen..."}
                                                disabled={loadingLocations}
                                            />
                                        </div>

                                        {/* Destination */}
                                        <div className="space-y-2">
                                            <Label htmlFor="destination" className="text-sm font-bold uppercase text-gray-500">Destino</Label>
                                            <SearchableSelect 
                                                options={destinations}
                                                value={selectedDestination}
                                                onChange={setSelectedDestination}
                                                placeholder={loadingLocations ? "Cargando..." : "Buscar destino..."}
                                                disabled={!selectedOrigin || loadingLocations}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Delivery Location */}
                                        <div className="space-y-2 text-left">
                                            <Label className="text-sm font-bold uppercase text-gray-500">Lugar de Entrega</Label>
                                            <div className="flex flex-wrap gap-3 min-h-[3rem] py-2 items-center bg-gray-50 px-4 rounded-2xl border border-gray-200">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="lugarEntrega"
                                                        value="domicilio"
                                                        checked={lugarEntrega === "domicilio"}
                                                        onChange={(e) => setLugarEntrega(e.target.value)}
                                                        className="w-4 h-4 text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-xs sm:text-sm font-medium">Domicilio</span>
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
                                                    <span className="text-xs sm:text-sm font-medium">Oficina</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Payment Method Selector */}
                                        <div className="space-y-2 text-left">
                                            <Label className="text-sm font-bold uppercase text-gray-500">Forma de Pago</Label>
                                            <div className="flex flex-wrap gap-3 min-h-[3rem] py-2 items-center bg-gray-50 px-4 rounded-2xl border border-gray-200">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="formaPago"
                                                        value="EFE"
                                                        checked={formaPago === "EFE"}
                                                        onChange={(e) => setFormaPago(e.target.value)}
                                                        className="w-4 h-4 text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-xs sm:text-sm font-medium">Origen</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="formaPago"
                                                        value="PED"
                                                        checked={formaPago === "PED"}
                                                        onChange={(e) => setFormaPago(e.target.value)}
                                                        className="w-4 h-4 text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-xs sm:text-sm font-medium">Destino</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dimensions */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold uppercase text-gray-500">Dimensiones (cm)</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-2xl focus:border-primary font-semibold"
                                                    value={formData.peso}
                                                    onChange={(e) => handleInputChange("peso", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Declared Value */}
                                        <div className="space-y-2">
                                            <Label htmlFor="valorDeclarado" className="text-sm font-bold uppercase text-gray-500">Valor Declarado ($)</Label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-3 text-gray-400 font-bold">$</span>
                                                <Input
                                                    id="valorDeclarado"
                                                    placeholder="0"
                                                    type="number"
                                                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-2xl focus:border-primary font-semibold"
                                                    value={formData.valorDeclarado}
                                                    onChange={(e) => handleInputChange("valorDeclarado", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre" className="text-sm font-bold uppercase text-gray-500">Nombre Completo (Opcional)</Label>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="nombre"
                                                placeholder="Tu nombre completo"
                                                className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-2xl focus:border-primary font-semibold"
                                                value={formData.nombre}
                                                onChange={(e) => handleInputChange("nombre", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-sm font-bold uppercase text-gray-500">Teléfono</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="phone"
                                                    placeholder="912345678"
                                                    type="tel"
                                                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-2xl focus:border-primary font-semibold"
                                                    value={formData.telefono}
                                                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-bold uppercase text-gray-500">Email (Opcional)</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="email"
                                                    placeholder="tu@email.com"
                                                    type="email"
                                                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-2xl focus:border-primary font-semibold"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-14 bg-primary hover:bg-secondary text-white font-bold uppercase tracking-widest text-lg rounded-2xl transition-all shadow-xl hover:shadow-2xl mt-4"
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
                                <div id="quote-result" className="bg-white p-8 relative overflow-hidden animate-in fade-in zoom-in duration-500 rounded-3xl shadow-xl border border-gray-100 scroll-mt-32">
                                    <div className="relative z-10 text-center space-y-6">
                                        <div className="flex flex-col items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                                            <p className="text-gray-400 uppercase tracking-widest font-bold text-sm">Cotización Generada</p>
                                        </div>

                                        {result.estado && result.precioTotal > 0 ? (
                                            <div className="space-y-6">
                                                {/* Ruta */}
                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Ruta</h4>
                                                    <div className="text-xl font-bold uppercase text-secondary">
                                                        <p>{result.descripcionOrigen}</p>
                                                        <p>{result.descripcionDestino}</p>
                                                    </div>
                                                </div>

                                                {/* Paquete */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Paquete</h4>
                                                        <div className="text-sm space-y-1 text-gray-600 font-medium">
                                                            <p>Dim: {formData.largo}x{formData.ancho}x{formData.alto} cm</p>
                                                            <p>Peso: {formData.peso} kg</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Detalles</h4>
                                                        <div className="text-sm space-y-1 text-gray-600 font-medium">
                                                            <p className="capitalize">{lugarEntrega}</p>
                                                            <p className="text-[10px] uppercase">{formaPago === "EFE" ? "Pago Origen" : "Pago Destino"}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Contacto */}
                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Contacto</h4>
                                                    <div className="text-sm space-y-1 text-gray-600 font-medium">
                                                        <p>{formData.nombre}</p>
                                                        <p>{formData.telefono}</p>
                                                        <p>{formData.email}</p>
                                                    </div>
                                                </div>

                                                {/* Total */}
                                                <div className="pt-4 border-t border-gray-100">
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Total</h4>
                                                    <p className="text-4xl font-black text-secondary">
                                                        <span className="text-2xl opacity-50 mr-1">$</span>
                                                        {result.precioTotal.toLocaleString("es-CL")}
                                                    </p>
                                                </div>

                                                <div className="pt-4 no-print text-center">
                                                    <Button
                                                        variant="default"
                                                        className="w-full h-14 bg-primary text-white hover:bg-secondary font-bold uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
                                                        onClick={() => window.print()}
                                                    >
                                                        <Printer className="w-6 h-6" />
                                                        Imprimir Cotización
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold border border-red-100">
                                                {result.mensaje || "Esta combinación de datos no tiene una tarifa asociada para el tipo de servicio seleccionado."}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <h3 className="text-2xl md:text-3xl font-semibold uppercase text-secondary mb-4">
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
                </div>
            </div>

            {/* Printable Quote Section - HIDDEN BY DEFAULT, VISIBLE ONLY ON PRINT */}
            {result && (
                <div id="printable-quote" className="hidden print:block space-y-8 p-12 bg-white text-secondary font-sans leading-relaxed">
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
                                <p>{result.descripcionOrigen}</p>
                                <p>{result.descripcionDestino}</p>
                            </div>
                        </section>

                        {/* Paquete */}
                        <section className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#003fa2] mb-3">Paquete</h3>
                                <div className="text-base font-bold text-secondary space-y-1">
                                    <p>Dimensiones: {formData.largo}x{formData.ancho}x{formData.alto} cm</p>
                                    <p>Peso: {formData.peso} kg</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#003fa2] mb-3">Servicio</h3>
                                <div className="text-base font-bold text-secondary space-y-1">
                                    <p>Entrega: {lugarEntrega === "domicilio" ? "Domicilio" : "Sucursal"}</p>
                                    <p>Pago: {formaPago === "EFE" ? "En Origen" : "En Destino"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Contacto */}
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#003fa2] mb-3">Contacto</h3>
                            <div className="text-base font-bold text-secondary space-y-1">
                                <p>Nombre: {formData.nombre}</p>
                                <p>Teléfono: {formData.telefono}</p>
                                <p>Email: {formData.email}</p>
                            </div>
                        </section>

                        {/* Total */}
                        <section className="pt-8 border-t border-gray-100">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#003fa2] mb-3">Total</h3>
                            <p className="text-5xl font-black text-secondary">
                                <span className="text-2xl opacity-50 mr-1">$</span>
                                {result.precioTotal.toLocaleString("es-CL")}
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
            )}
        </section>
    )
}
