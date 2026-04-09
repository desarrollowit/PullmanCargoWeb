"use client"

import { useState, useMemo, useEffect } from "react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Search, Navigation, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { agencies as staticAgencies, type Agency } from "@/data/agencies"
import { ChileMap } from "@/components/ui/ChileMap"
import { quoterAPI, type DynamicAgency } from "@/services/quoter-api"
import { regionMapping } from "@/data/region-mapping"

export function AgenciesGridSection() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("all")
    const [dynamicAgencies, setDynamicAgencies] = useState<DynamicAgency[]>([])
    const [loading, setLoading] = useState(false)

    // Get unique regions from static data
    const regions = useMemo(() => {
        const uniqueRegions = new Set(staticAgencies.map(a => a.region))
        return Array.from(uniqueRegions)
    }, [])

    // Fetch dynamic agencies when region changes
    useEffect(() => {
        if (selectedRegion !== "all") {
            const regionId = regionMapping[selectedRegion]
            if (regionId) {
                loadDynamicAgencies(regionId)
            } else {
                setDynamicAgencies([])
            }
        } else {
            setDynamicAgencies([])
        }
    }, [selectedRegion])

    const loadDynamicAgencies = async (regionId: string) => {
        try {
            setLoading(true)
            const data = await quoterAPI.getAgenciesByRegion(regionId)
            setDynamicAgencies(data)
        } catch (error) {
            console.error("Error loading dynamic agencies:", error)
            setDynamicAgencies([])
        } finally {
            setLoading(false)
        }
    }

    // Pagination state
    const ITEMS_PER_PAGE = 6
    const [currentPage, setCurrentPage] = useState(1)

    // Filter agencies - handles both static and dynamic data
    const filteredAgencies = useMemo(() => {
        // Use dynamic agencies if available and a region is selected
        if (selectedRegion !== "all" && dynamicAgencies.length > 0) {
            return dynamicAgencies.filter(agency => {
                const searchLower = searchTerm.toLowerCase()
                return (
                    agency.nombreAgencia.toLowerCase().includes(searchLower) ||
                    agency.direccion.toLowerCase().includes(searchLower) ||
                    agency.comuna.toLowerCase().includes(searchLower)
                )
            })
        }

        // Fallback to static agencies
        return staticAgencies.filter(agency => {
            const matchesSearch =
                agency.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agency.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (agency.commune && agency.commune.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesRegion = selectedRegion === "all" || agency.region === selectedRegion

            return matchesSearch && matchesRegion
        })
    }, [searchTerm, selectedRegion, dynamicAgencies])

    // Paginated agencies
    const paginatedAgencies = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredAgencies.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [filteredAgencies, currentPage])

    const totalPages = Math.ceil(filteredAgencies.length / ITEMS_PER_PAGE)

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, selectedRegion])

    return (
        <section className="w-full py-12 bg-white text-secondary relative">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <ScrollReveal animation="fade-in" className="text-center mb-10 max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter uppercase mb-2">
                        Nuestras <span className="text-primary">Sucursales</span>
                    </h2>
                    <p className="text-gray-500">
                        Selecciona una región en el mapa o utiliza el buscador para encontrar tu agencia más cercana.
                    </p>
                </ScrollReveal>

                <div className="grid lg:grid-cols-12 gap-8 relative items-start">
                    {/* Map Column */}
                    <div className="lg:col-span-4 relative z-20 order-first mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <ChileMap
                                selectedRegion={selectedRegion}
                                onSelectRegion={setSelectedRegion}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-8 flex flex-col gap-6 order-last">
                        {/* Filters Bar */}
                        <Card className="border-none shadow-sm bg-gray-50">
                            <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Buscar sucursal por ciudad, dirección..."
                                        className="pl-9 bg-white border-gray-200"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="w-full md:w-[250px]">
                                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                                        <SelectTrigger className="bg-white border-gray-200">
                                            <SelectValue placeholder="Región" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas las Regiones</SelectItem>
                                            {regions.map(region => (
                                                <SelectItem key={region} value={region}>{region}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {selectedRegion !== "all" && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedRegion("all")}
                                        className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        Limpiar Filtro
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        {/* Region Title */}
                        <div className="flex items-center justify-between border-b pb-2">
                            <h3 className="text-xl font-bold uppercase text-secondary flex items-center gap-3">
                                {selectedRegion === "all" ? "Todas las Sucursales" : `Sucursales en ${selectedRegion}`}
                                {loading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                            </h3>
                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-2xl">
                                {filteredAgencies.length} {filteredAgencies.length === 1 ? 'Disponible' : 'Disponibles'}
                            </span>
                        </div>

                        {/* Agencies Grid Cards */}
                        <div className="grid md:grid-cols-2 gap-4 min-h-[400px]">
                            {loading ? (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                                    <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary opacity-20" />
                                    <p className="font-medium animate-pulse">Cargando sucursales actualizadas...</p>
                                </div>
                            ) : paginatedAgencies.length > 0 ? (
                                paginatedAgencies.map((agency, index) => {
                                    // Handle both DynamicAgency and static Agency types
                                    const isDynamic = 'nombreAgencia' in agency
                                    const title = isDynamic ? (agency as DynamicAgency).nombreAgencia : (agency as Agency).city
                                    const address = isDynamic ? (agency as DynamicAgency).direccion : (agency as Agency).address
                                    const phone = isDynamic ? (agency as DynamicAgency).telefono : (agency as Agency).phone
                                    const hours = isDynamic ? (agency as DynamicAgency).horario : (agency as Agency).hours
                                    const commune = isDynamic ? (agency as DynamicAgency).comuna : ((agency as Agency).commune || (agency as Agency).city)
                                    const lat = isDynamic ? (agency as DynamicAgency).latitud : null
                                    const lng = isDynamic ? (agency as DynamicAgency).longitud : null
                                    
                                    const regionName = isDynamic ? selectedRegion : (agency as Agency).region
                                    
                                    const safeString = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : ""
                                    const cleanAddress = safeString(address)
                                    const cleanCommune = safeString(commune)
                                    const cleanRegion = safeString(regionName)
                                    
                                    const mapLink = (lat && lng && lat !== '0' && lng !== '0' && !lat.startsWith('0.') && !lng.startsWith('0.')) 
                                        ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
                                        : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${cleanAddress}, ${cleanCommune}, Region ${cleanRegion}, Chile`)}`

                                    return (
                                        <ScrollReveal key={`${selectedRegion}-${currentPage}-${index}`} animation="fade-in" delay={index * 50}>
                                            <Card className="h-full hover:shadow-md transition-all border-gray-200 hover:border-primary group">
                                                <CardContent className="p-5 flex flex-col h-full">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="p-2 bg-slate-50 rounded-2xl group-hover:bg-primary transition-colors">
                                                            <MapPin className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                                        </div>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded max-w-[150px] truncate">
                                                            {commune}
                                                        </span>
                                                    </div>

                                                    <h4 className="font-bold text-secondary group-hover:text-primary transition-colors uppercase mb-1 line-clamp-1">{title}</h4>
                                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{address}</p>

                                                    <div className="space-y-2 mb-4 text-xs text-gray-500">
                                                        <div className="flex items-center">
                                                            <Phone className="w-3 h-3 mr-2 text-primary/60" /> {phone || 'N/A'}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="w-3 h-3 mr-2 text-primary/60" /> {hours || 'Consultar en sucursal'}
                                                        </div>
                                                    </div>

                                                    <Button
                                                        variant="outline"
                                                        className="w-full text-primary border-primary/20 hover:bg-primary hover:text-white text-xs uppercase font-bold h-9 rounded-2xl"
                                                        asChild
                                                    >
                                                        <a
                                                            href={mapLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Ver en Mapa <ExternalLink className="ml-2 w-3 h-3" />
                                                        </a>
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </ScrollReveal>
                                    )
                                })
                            ) : (
                                <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <MapPin className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>No hay sucursales en esta zona o con estos criterios.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flexjustify-center items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="h-8 w-8 p-0"
                                >
                                    &lt;
                                </Button>
                                <span className="text-sm text-gray-600 font-medium">
                                    Página {currentPage} de {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="h-8 w-8 p-0"
                                >
                                    &gt;
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
