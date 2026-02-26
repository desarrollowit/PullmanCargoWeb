"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { TrackingSteps } from "@/components/tracking/TrackingSteps"
import { CheckCircle2, Package, Truck, Warehouse, ArrowLeft, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense, useState, useEffect } from "react"

function TrackingContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const odt = searchParams.get("odt")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [steps, setSteps] = useState<any[]>([])
    const [odtInfo, setOdtInfo] = useState<any>(null)

    useEffect(() => {
        if (odt) {
            fetchTracking(odt)
        }
    }, [odt])

    const fetchTracking = async (odtNumber: string) => {
        setLoading(true)
        setError(null)
        setOdtInfo(null)
        try {
            const response = await fetch(`/api/tracking?odt=${odtNumber}`)
            if (!response.ok) throw new Error("No se pudo obtener la información de seguimiento")
            const data = await response.json()

            if (Array.isArray(data) && data.length > 0) {
                // Determine most recent info (usually last from API)
                setOdtInfo(data[data.length - 1])

                // Reverse data to show most recent at the top
                const reversedData = [...data].reverse()

                // Map API data to UI steps
                const mappedSteps = reversedData.map((item: any, index: number) => ({
                    id: index,
                    title: item.estadoWeb || "Estado Desconocido",
                    description: `Agencia: ${item.agencia || 'No disponible'}`,
                    date: item.fecha ? new Date(item.fecha.replace(/\[UTC\]$/, '')).toLocaleString('es-CL', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : 'Sin fecha',
                    location: `${item.origen} → ${item.destino}`,
                    icon: item.paso === 4 ? CheckCircle2 : item.paso === 1 ? Package : item.paso === 2 ? Warehouse : Truck,
                    status: index === 0 ? "active" : "completed"
                }))
                setSteps(mappedSteps)
            } else {
                setError("No se encontraron registros para esta ODT")
            }
        } catch (err: any) {
            console.error("Tracking Error:", err)
            setError(err.message || "Error al conectar con el servidor")
        } finally {
            setLoading(false)
        }
    }

    if (!odt) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
                <Search className="w-16 h-16 text-gray-200" />
                <h2 className="text-2xl font-bold text-gray-900">No se ha especificado un número de seguimiento</h2>
                <Button onClick={() => router.push("/")} className="bg-[#003fa2] hover:bg-black text-white rounded-2xl">
                    Volver al Inicio
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header Card */}
            <div className="bg-white shadow-xl rounded-3xl overflow-hidden mb-8 border border-gray-100">
                <div className="bg-secondary p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-black uppercase tracking-tight">
                            Seguimiento de Envío
                        </h1>
                        <p className="text-white/70 font-medium mt-1">
                            ODT #{odt}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-white/10 text-white backdrop-blur-sm border border-white/20`}>
                            {loading ? "Actualizando..." : steps.length > 0 ? steps[0].title : "Consultando"}
                        </span>
                    </div>
                </div>

                <div className="p-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12 text-gray-400 gap-4 min-h-[300px]">
                            <Loader2 className="w-12 h-12 animate-spin text-primary" />
                            <p className="font-bold uppercase tracking-widest text-xs">Consultando Pullman Go...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center gap-4 min-h-[300px]">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-2">
                                <Search className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 uppercase">Información no disponible</h3>
                            <p className="text-gray-500 max-w-xs mx-auto text-sm">{error}</p>
                            <Button variant="outline" onClick={() => router.push("/")} className="mt-4 border-gray-200 rounded-2xl hover:bg-gray-50">
                                Intentar con otro número
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {/* Summary Details */}
                            {odtInfo && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Origen</p>
                                        <p className="text-sm font-bold text-secondary uppercase leading-tight">{odtInfo.origen}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Destino</p>
                                        <p className="text-sm font-bold text-secondary uppercase leading-tight">{odtInfo.destino}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Piezas</p>
                                        <p className="text-sm font-bold text-secondary">{odtInfo.piezas}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tipo</p>
                                        <p className="text-sm font-bold text-secondary uppercase">{odtInfo.tipoEntrega === 'OFI' ? 'Sucursal' : 'Domicilio'}</p>
                                    </div>
                                </div>
                            )}

                            {/* Steps */}
                            <div className="px-2">
                                <TrackingSteps steps={steps} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 p-6 flex justify-between items-center sm:px-8 border-t border-gray-100">
                    <Button variant="ghost" onClick={() => router.push("/")} className="text-gray-500 hover:text-secondary rounded-2xl">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
                    </Button>
                    <Button onClick={() => router.push("/")} className="bg-secondary hover:bg-black text-white font-bold uppercase tracking-wider text-xs px-8 h-12 rounded-2xl transition-all shadow-lg hover:shadow-xl">
                        Nueva Consulta
                    </Button>
                </div>
            </div>

            {/* Info Hint */}
            <div className="flex items-center gap-3 p-6 bg-[#003fa2]/5 rounded-3xl border border-[#003fa2]/10">
                <Package className="w-5 h-5 text-[#003fa2]" />
                <p className="text-xs text-[#003fa2]/70 font-medium leading-relaxed">
                    Si tienes dudas sobre el estado de tu envío o no visualizas información reciente, puedes contactarnos al <strong>600 320 3200</strong>.
                </p>
            </div>
        </div>
    )
}

export default function TrackingPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-32 px-4">
            <Suspense>
                <TrackingContent />
            </Suspense>
        </div>
    )
}
