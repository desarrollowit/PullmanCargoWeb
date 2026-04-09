"use client"

import { useSearchParams, useRouter } from "next/navigation"
import {
    CheckCircle2, Package, Truck, Clock, MapPin,
    ArrowLeft, Search, Loader2, Building2, ChevronDown, ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense, useState, useEffect } from "react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""

// The 4 fixed steps — last label changes based on delivery type
function getFixedSteps(tipoEntrega: string) {
    const lastLabel = tipoEntrega === 'OFI' ? "Entregado en agencia" : "Entregado"
    return [
        { key: "venta",      label: "Venta realizada",  icon: Package },
        { key: "preparando", label: "Preparando envío", icon: Building2 },
        { key: "reparto",    label: "En reparto",        icon: Truck },
        { key: "entregado",  label: lastLabel,           icon: CheckCircle2 },
    ]
}

// Map estadoWeb string → fixed step index (0-3)
function mapEstadoToStep(estado: string): number {
    const e = (estado || "").toLowerCase()
    if (e.includes("entregada") || e.includes("entregado")) return 3
    if (e.includes("reparto"))                               return 2
    if (
        e.includes("preparando") || e.includes("recib") ||
        e.includes("viajando")   || e.includes("procesando") ||
        e.includes("espera")
    ) return 1
    return 0
}

// Format a date string from the API (may have [UTC] suffix)
function formatDate(dateStr: string | undefined, opts?: Intl.DateTimeFormatOptions): string {
    if (!dateStr) return ""
    return new Date(dateStr.replace(/\[UTC\]$/, "")).toLocaleString("es-CL", opts || {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    })
}

// Derive dates for the 4 fixed steps from a resolved history array (newest-first)
function deriveStepDates(history: any[], fechaEmision?: string): (string | undefined)[] {
    // history[0] = most recent event; iterate oldest-first to pick earliest date per step
    const reversed = [...history].reverse()

    const dates: (string | undefined)[] = [undefined, undefined, undefined, undefined]

    // Step 0: use fechaEmision from the oldest event
    dates[0] = reversed[0]?.fechaEmision || fechaEmision

    for (const item of reversed) {
        const step = mapEstadoToStep(item.estadoWeb || "")
        // Assign the earliest (oldest) date for each step that shows up
        if (!dates[step]) dates[step] = item.fecha
        else dates[step] = item.fecha // overwrite to keep oldest (we're going oldest→newest, so last write wins → newest; reversed→ first write is oldest, keep it)
    }

    // Re-run properly: oldest-first wins (first occurrence = oldest date)
    const dates2: (string | undefined)[] = [undefined, undefined, undefined, undefined]
    dates2[0] = reversed[0]?.fechaEmision || fechaEmision
    for (const item of reversed) {
        const step = mapEstadoToStep(item.estadoWeb || "")
        if (step >= 1 && !dates2[step]) dates2[step] = item.fecha
    }
    return dates2
}

// ─────────────────────────────────────────────────────────
function TrackingContent() {
    const searchParams = useSearchParams()
    const router       = useRouter()
    const odt          = searchParams.get("odt")

    const [loading, setLoading]           = useState(false)
    const [error, setError]               = useState<string | null>(null)
    const [history, setHistory]           = useState<any[]>([])
    const [odtInfo, setOdtInfo]           = useState<any>(null)
    const [currentStep, setCurrentStep]   = useState(-1)
    const [stepDates, setStepDates]       = useState<(string | undefined)[]>([])
    const [historyOpen, setHistoryOpen]   = useState(false)

    useEffect(() => { if (odt) fetchTracking(odt) }, [odt])

    const fetchTracking = async (odtNumber: string) => {
        setLoading(true); setError(null); setOdtInfo(null); setHistory([])
        try {
            const response = await fetch(`/api/tracking?odt=${odtNumber}`)
            if (!response.ok) throw new Error("No se pudo obtener la información de seguimiento")
            const responseData = await response.json()

            const resolveData = (data: any[], item: any) => {
                if (typeof item !== "object" || item === null) return item
                const resolved: any = {}
                for (const key in item) {
                    const value = item[key]
                    if (typeof value === "number" && value >= 0 && value < data.length) {
                        resolved[key] = data[value]
                    } else {
                        resolved[key] = value
                    }
                }
                return resolved
            }

            let parsed = false
            if (responseData.nodes) {
                const dataNode = responseData.nodes.find(
                    (n: any) => n.type === "data" && Array.isArray(n.data)
                )
                if (dataNode) {
                    const data     = dataNode.data
                    const stepIndices = data.find(
                        (item: any) => Array.isArray(item) && item.length > 0 && typeof item[0] === "number"
                    )
                    if (stepIndices) {
                        const rawSteps = stepIndices.map((idx: number) => resolveData(data, data[idx]))
                        const latest   = rawSteps[0]

                        const info = {
                            origen:      latest.origen      || "N/A",
                            destino:     latest.destino     || latest.agencia || "N/A",
                            piezas:      latest.piezas      || "1",
                            tipoEntrega: latest.tipoEntrega || "OFI",
                            estadoWeb:   latest.estadoWeb   || "",
                            numeroODT:   latest.numeroODT   || odtNumber,
                            fechaEmision: latest.fechaEmision,
                        }
                        setOdtInfo(info)
                        setCurrentStep(mapEstadoToStep(latest.estadoWeb || ""))
                        setHistory(rawSteps)
                        setStepDates(deriveStepDates(rawSteps, latest.fechaEmision))
                        parsed = true
                    }
                }
            }
            if (!parsed) setError("No se encontraron registros para esta ODT.")
        } catch (err: any) {
            setError(err.message || "Error al conectar con el servidor")
        } finally {
            setLoading(false)
        }
    }

    const [localOdt, setLocalOdt] = useState("")

    if (!odt) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 px-4">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center shadow-inner">
                    <Search className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-secondary tracking-tight">Rastrea tu envío</h2>
                    <p className="text-gray-500 text-sm">Ingresa el número de orden de transporte (ODT)</p>
                </div>
                <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (localOdt.trim()) router.push(`/seguimiento?odt=${localOdt.trim()}`)
                    }}
                    className="w-full max-w-sm relative mt-2"
                >
                    <input
                        type="text"
                        value={localOdt}
                        onChange={(e) => setLocalOdt(e.target.value)}
                        placeholder="INGRESE ODT"
                        className="w-full bg-white border-2 border-primary/20 rounded-2xl h-14 pl-6 pr-14 focus:border-primary font-bold text-base tracking-widest placeholder:text-gray-400 text-secondary outline-none uppercase shadow-sm transition-all"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        disabled={!localOdt.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>
                <Button onClick={() => router.push("/")} variant="ghost" className="text-gray-400 hover:text-primary mt-4 rounded-xl text-xs font-bold uppercase tracking-widest">
                    Volver al Inicio
                </Button>
            </div>
        )
    }

    const fixedSteps = getFixedSteps(odtInfo?.tipoEntrega || "OFI")

    return (
        <div className="max-w-2xl mx-auto">

            {/* ── Back button ── */}
            <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Rastrear otro pedido
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-1">Seguimiento de Carga</h1>
            <p className="text-gray-500 text-sm mb-6">Consulta el estado de tu envío en tiempo real</p>

            {/* ── Main card ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">

                {/* ODT Header */}
                <div className="bg-primary px-6 py-4 flex items-center justify-between">
                    <span className="text-white text-xs font-bold uppercase tracking-widest opacity-80">N° de seguimiento</span>
                    <span className="text-white font-black text-lg tracking-widest">{odt}</span>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-xs font-bold uppercase tracking-widest">Consultando...</p>
                    </div>

                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-8">
                        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                            <Search className="w-7 h-7 text-red-400" />
                        </div>
                        <h3 className="font-bold text-gray-900">ODT No Encontrada</h3>
                        <p className="text-gray-500 text-sm">{error}</p>
                    </div>

                ) : odtInfo && (
                    <div className="p-6 space-y-8">

                        {/* ── Estado badge ── */}
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 font-bold px-4 py-2 rounded-full text-sm border border-green-100">
                                <CheckCircle2 className="w-4 h-4" />
                                {odtInfo.estadoWeb}
                            </span>
                        </div>

                        {/* ── 4-step progress bar with dates ── */}
                        <div className="relative">
                            {/* background connecting line */}
                            <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-100 z-0" />
                            {/* progress line */}
                            <div
                                className="absolute top-5 left-[10%] h-0.5 bg-primary z-0 transition-all duration-700"
                                style={{ width: `${currentStep < 0 ? 0 : (currentStep / 3) * 80}%` }}
                            />

                            <div className="relative z-10 grid grid-cols-4 gap-1">
                                {fixedSteps.map((step, i) => {
                                    const done    = i < currentStep
                                    const active  = i === currentStep
                                    const pending = i > currentStep
                                    const dateStr = stepDates[i]
                                    const stepDate = dateStr
                                        ? new Date(dateStr.replace(/\[UTC\]$/, "")).toLocaleString("es-CL", {
                                            day: "2-digit", month: "short",
                                            hour: "2-digit", minute: "2-digit"
                                        })
                                        : null

                                    return (
                                        <div key={step.key} className="flex flex-col items-center gap-1.5">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                                active  ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/30"
                                                : done  ? "bg-primary border-primary text-white"
                                                : "bg-white border-gray-200 text-gray-400"
                                            }`}>
                                                <step.icon className="w-4 h-4" />
                                            </div>
                                            <span className={`text-[10px] font-bold text-center leading-tight uppercase ${
                                                active || done ? "text-primary" : "text-gray-400"
                                            }`}>
                                                {step.label}
                                            </span>
                                            {/* date under each step */}
                                            {stepDate && (active || done) ? (
                                                <span className="text-[9px] text-gray-400 text-center leading-tight whitespace-nowrap">
                                                    {stepDate}
                                                </span>
                                            ) : (
                                                <span className="text-[9px] text-transparent select-none">-</span>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* ── Origen / Destino ── */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Origen</p>
                                <p className="font-bold text-secondary text-sm uppercase">{odtInfo.origen}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Destino</p>
                                <p className="font-bold text-secondary text-sm uppercase">{odtInfo.destino}</p>
                            </div>
                        </div>

                        {/* ── Collapsible History ── */}
                        {history.length > 0 && (
                            <div>
                                <button
                                    onClick={() => setHistoryOpen(!historyOpen)}
                                    className="w-full flex items-center justify-between text-xs font-black uppercase text-gray-500 tracking-widest py-2 border-b border-gray-100 hover:text-primary transition-colors"
                                >
                                    <span>Historial de eventos ({history.length})</span>
                                    {historyOpen
                                        ? <ChevronUp className="w-4 h-4" />
                                        : <ChevronDown className="w-4 h-4" />
                                    }
                                </button>

                                {historyOpen && (
                                    <div className="mt-4 space-y-0">
                                        {history.map((item, index) => {
                                            const isFirst = index === 0
                                            const isLast  = index === history.length - 1
                                            const fecha   = formatDate(item.fecha)
                                            return (
                                                <div key={index} className="flex gap-4 relative">
                                                    {/* vertical line */}
                                                    {!isLast && (
                                                        <div className="absolute left-[9px] top-5 bottom-0 w-0.5 bg-gray-100" />
                                                    )}
                                                    {/* dot */}
                                                    <div className="mt-1 relative z-10 flex-shrink-0 w-5 h-5">
                                                        <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${
                                                            isFirst ? "border-primary bg-primary" : "border-gray-300 bg-white"
                                                        }`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${isFirst ? "bg-white" : "bg-gray-300"}`} />
                                                        </div>
                                                    </div>
                                                    {/* text */}
                                                    <div className="flex-1 pb-5">
                                                        <p className={`text-sm font-bold ${isFirst ? "text-primary" : "text-gray-800"}`}>
                                                            {item.estadoWeb || "Estado desconocido"}
                                                        </p>
                                                        {item.agencia && (
                                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                                <MapPin className="w-3 h-3 flex-shrink-0" />{item.agencia}
                                                            </p>
                                                        )}
                                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                            <Clock className="w-3 h-3 flex-shrink-0" />{fecha}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ── Footer hint ── */}
            <p className="text-center text-xs text-gray-400 pb-8">
                ¿Tienes dudas? Llámanos al <strong className="text-gray-600">600 300 3000</strong>
            </p>
        </div>
    )
}

export default function TrackingPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
            <Suspense>
                <TrackingContent />
            </Suspense>
        </div>
    )
}
