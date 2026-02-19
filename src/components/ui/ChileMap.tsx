"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { mapRegions } from "@/data/chileMapData"

interface ChileMapProps {
    selectedRegion: string
    onSelectRegion: (region: string) => void
    className?: string
}

// Label anchor points (x,y) are approximate centroids of each region
// lx,ly = label text position; ax,ay = arrow start on region edge
const regionLabels: Record<string, { ax: number; ay: number; lx: number; ly: number }> = {
    "Arica y Parinacota": { ax: 567, ay: 12, lx: 610, ly: 10 },
    "Tarapacá": { ax: 567, ay: 35, lx: 610, ly: 33 },
    "Antofagasta": { ax: 570, ay: 85, lx: 610, ly: 83 },
    "Atacama": { ax: 562, ay: 155, lx: 610, ly: 153 },
    "Coquimbo": { ax: 553, ay: 210, lx: 610, ly: 208 },
    "Valparaíso": { ax: 538, ay: 247, lx: 610, ly: 245 },
    "Metropolitana": { ax: 543, ay: 265, lx: 610, ly: 263 },
    "O'Higgins": { ax: 544, ay: 285, lx: 610, ly: 283 },
    "Maule": { ax: 540, ay: 310, lx: 610, ly: 308 },
    "Ñuble": { ax: 537, ay: 335, lx: 610, ly: 333 },
    "Biobío": { ax: 535, ay: 355, lx: 610, ly: 353 },
    "Araucanía": { ax: 528, ay: 385, lx: 610, ly: 383 },
    "Los Ríos": { ax: 523, ay: 410, lx: 610, ly: 408 },
    "Los Lagos": { ax: 518, ay: 440, lx: 610, ly: 438 },
    "Aysén": { ax: 522, ay: 495, lx: 610, ly: 493 },
    "Magallanes": { ax: 518, ay: 565, lx: 610, ly: 563 },
}

export function ChileMap({ selectedRegion, onSelectRegion, className }: ChileMapProps) {
    const gRef = useRef<SVGGElement>(null)
    const [viewBox, setViewBox] = useState("490 0 160 645")

    useEffect(() => {
        if (gRef.current) {
            try {
                const bbox = gRef.current.getBBox()
                const padding = 8
                // Extra right padding for labels
                setViewBox(`${bbox.x - padding} ${bbox.y - padding} ${bbox.width + 130} ${bbox.height + padding * 2}`)
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
                            const label = regionLabels[region.id]

                            return (
                                <g
                                    key={region.id}
                                    onClick={() => onSelectRegion(region.id)}
                                    className="cursor-pointer group"
                                    role="button"
                                    aria-label={region.name}
                                >
                                    {/* Region shape */}
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

                                    {/* Label with pointer line */}
                                    {label && (
                                        <g style={{ opacity: isActive ? 1 : 0.55, transition: "opacity 0.2s ease" }}>
                                            {/* Pointer line */}
                                            <line
                                                x1={label.ax}
                                                y1={label.ay}
                                                x2={label.lx - 2}
                                                y2={label.ly}
                                                stroke={isActive ? "#003fa2" : "#9ca3af"}
                                                strokeWidth="0.5"
                                                strokeDasharray="none"
                                            />
                                            {/* Dot at region */}
                                            <circle
                                                cx={label.ax}
                                                cy={label.ay}
                                                r="1.2"
                                                fill={isActive ? "#003fa2" : "#9ca3af"}
                                            />
                                            {/* Label text */}
                                            <text
                                                x={label.lx + 1}
                                                y={label.ly}
                                                dominantBaseline="middle"
                                                style={{
                                                    fontSize: "5px",
                                                    fontWeight: isActive ? "700" : "500",
                                                    fill: isActive ? "#003fa2" : "#6b7280",
                                                    fontFamily: "Inter, system-ui, sans-serif",
                                                    letterSpacing: "0.02em",
                                                    textTransform: "uppercase",
                                                    transition: "fill 0.2s ease",
                                                    userSelect: "none",
                                                }}
                                            >
                                                {region.name}
                                            </text>
                                        </g>
                                    )}
                                </g>
                            )
                        })}
                    </g>
                </svg>
            </div>
        </div>
    )
}
