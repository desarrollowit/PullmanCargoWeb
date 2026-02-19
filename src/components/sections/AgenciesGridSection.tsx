"use client"

import { useState, useMemo } from "react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Search, Navigation, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { agencies } from "@/data/agencies"
// Import ChileMap
import { ChileMap } from "@/components/ui/ChileMap"

export function AgenciesGridSection() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("all")

    // Get unique regions
    const regions = useMemo(() => {
        const uniqueRegions = new Set(agencies.map(a => a.region))
        return Array.from(uniqueRegions)
    }, [])

    // Pagination state
    const ITEMS_PER_PAGE = 6
    const [currentPage, setCurrentPage] = useState(1)

    // Filter agencies
    const filteredAgencies = useMemo(() => {
        return agencies.filter(agency => {
            const matchesSearch =
                agency.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agency.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (agency.commune && agency.commune.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesRegion = selectedRegion === "all" || agency.region === selectedRegion

            return matchesSearch && matchesRegion
        })
    }, [searchTerm, selectedRegion])

    // Paginated agencies
    const paginatedAgencies = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredAgencies.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [filteredAgencies, currentPage])

    const totalPages = Math.ceil(filteredAgencies.length / ITEMS_PER_PAGE)

    // Reset page when filters change
    useMemo(() => {
        setCurrentPage(1)
    }, [searchTerm, selectedRegion])

    return (
        <section className="w-full py-12 bg-white text-gray-900 relative">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <ScrollReveal animation="fade-in" className="text-center mb-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2">
                        Nuestras <span className="text-secondary">Sucursales</span>
                    </h2>
                    <p className="text-gray-500">
                        Selecciona una región en el mapa o utiliza el buscador para encontrar tu agencia más cercana.
                    </p>
                </ScrollReveal>

                <div className="grid lg:grid-cols-12 gap-8 relative items-start">
                    {/* Map Column (Left - 4 cols) - Sticky */}
                    <div className="lg:col-span-4 relative z-20 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-24 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <ChileMap
                                selectedRegion={selectedRegion}
                                onSelectRegion={setSelectedRegion}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Content Column (Right - 8 cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
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
                            <h3 className="text-xl font-bold uppercase text-secondary">
                                {selectedRegion === "all" ? "Todas las Sucursales" : `Sucursales en ${selectedRegion}`}
                            </h3>
                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-2xl">
                                {filteredAgencies.length} {filteredAgencies.length === 1 ? 'Disponible' : 'Disponibles'}
                            </span>
                        </div>

                        {/* Agencies Grid Cards */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {paginatedAgencies.length > 0 ? (
                                paginatedAgencies.map((agency, index) => (
                                    <ScrollReveal key={`${currentPage}-${index}`} animation="fade-in" delay={index * 50}>
                                        <Card className="h-full hover:shadow-md transition-all border-gray-200 hover:border-[#003fa2] group">
                                            <CardContent className="p-5 flex flex-col h-full">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="p-2 bg-blue-50 rounded-2xl group-hover:bg-secondary transition-colors">
                                                        <MapPin className="w-5 h-5 text-secondary group-hover:text-white transition-colors" />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                                        {agency.commune || agency.city}
                                                    </span>
                                                </div>

                                                <h4 className="font-bold text-gray-900 uppercase mb-1">{agency.city}</h4>
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-1 flex-1">{agency.address}</p>

                                                <div className="space-y-2 mb-4 text-xs text-gray-500">
                                                    <div className="flex items-center">
                                                        <Phone className="w-3 h-3 mr-2" /> {agency.phone}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="w-3 h-3 mr-2" /> {agency.hours}
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    className="w-full text-secondary border-secondary/20 hover:bg-secondary hover:text-white text-xs uppercase font-bold h-9 rounded-2xl"
                                                    asChild
                                                >
                                                    <a
                                                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${agency.address}, ${agency.city}, Chile`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Ver en Mapa <ExternalLink className="ml-2 w-3 h-3" />
                                                    </a>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </ScrollReveal>
                                ))
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
