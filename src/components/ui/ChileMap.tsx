"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { mapRegions } from "@/data/chileMapData"

interface ChileMapProps {
    selectedRegion: string
    onSelectRegion: (region: string) => void
    className?: string
}

export function ChileMap({ selectedRegion, onSelectRegion, className }: ChileMapProps) {
    const gRef = useRef<SVGGElement>(null)
    const [viewBox, setViewBox] = useState("500 0 130 650")

    useEffect(() => {
        if (gRef.current) {
            try {
                const bbox = gRef.current.getBBox()
                const padding = 5
                setViewBox(`${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`)
            } catch {
                // getBBox may fail in SSR, keep default
            }
        }
    }, [])

    return (
        <div className={cn("w-full h-full bg-white rounded-xl overflow-hidden relative min-h-[400px]", className)}>
            <div className="absolute inset-0 w-full h-full flex justify-center">
                <svg
                    viewBox={viewBox}
                    preserveAspectRatio="xMidYMin meet"
                    className="h-full w-auto overflow-visible"
                >
                    <g ref={gRef}>
                        {mapRegions.map((region) => {
                            const isActive = selectedRegion === region.id

                            return (
                                <g
                                    key={region.id}
                                    onClick={() => onSelectRegion(region.id)}
                                    className="cursor-pointer group"
                                    role="button"
                                    aria-label={region.name}
                                >
                                    <path
                                        d={region.d}
                                        style={{
                                            fill: isActive ? "#003fa2" : "#e5e7eb",
                                            stroke: "#ffffff",
                                            strokeWidth: "0.4",
                                            transition: "fill 0.2s ease",
                                        }}
                                        onMouseEnter={e => {
                                            if (!isActive) (e.currentTarget as SVGPathElement).style.fill = "#93c5fd"
                                        }}
                                        onMouseLeave={e => {
                                            if (!isActive) (e.currentTarget as SVGPathElement).style.fill = "#e5e7eb"
                                        }}
                                    />
                                </g>
                            )
                        })}
                    </g>
                </svg>
            </div>
        </div>
    )
}
