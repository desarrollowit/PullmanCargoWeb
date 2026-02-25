"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { mapRegions } from "@/data/chileMapData"

interface ChileMapProps {
    selectedRegion: string
    onSelectRegion: (region: string) => void
    className?: string
}

// Label positions: ax,ay = dot on region; lx,ly = label text
const regionLabels: Record<string, { ax: number; ay: number; lx: number; ly: number }> = {
    "Arica y Parinacota": { ax: 566, ay: 13, lx: 612, ly: 10 },
    "Tarapacá": { ax: 570, ay: 40, lx: 612, ly: 33 },
    "Antofagasta": { ax: 577, ay: 91, lx: 612, ly: 83 },
    "Atacama": { ax: 563, ay: 152, lx: 612, ly: 153 },
    "Coquimbo": { ax: 550, ay: 205, lx: 612, ly: 208 },
    "Valparaíso": { ax: 541, ay: 230, lx: 612, ly: 245 },
    "Metropolitana": { ax: 551, ay: 254, lx: 612, ly: 263 },
    "O'Higgins": { ax: 546, ay: 268, lx: 612, ly: 283 },
    "Maule": { ax: 539, ay: 288, lx: 612, ly: 308 },
    "Ñuble": { ax: 533, ay: 363, lx: 612, ly: 375 },
    "Biobío": { ax: 528, ay: 316, lx: 612, ly: 325 },
    "Araucanía": { ax: 530, ay: 341, lx: 612, ly: 345 },
    "Los Ríos": { ax: 523, ay: 367, lx: 612, ly: 400 },
    "Los Lagos": { ax: 504, ay: 404, lx: 612, ly: 435 },
    "Aysén": { ax: 520, ay: 473, lx: 612, ly: 485 },
    "Magallanes": { ax: 514, ay: 611, lx: 612, ly: 600 },
}

// Fixed reliable viewBox that covers all paths + label area
// Paths are around x:495-585, y:0-645; labels extend to x:660
const VIEW_BOX = "490 -5 185 660"

export function ChileMap({ selectedRegion, onSelectRegion, className }: ChileMapProps) {
    return (
        <div className={cn("w-full flex justify-center", className)}>
            <svg
                viewBox={VIEW_BOX}
                preserveAspectRatio="xMidYMin meet"
                style={{ maxHeight: "85vh", width: "100%", height: "auto", display: "block" }}
            >
                {/* First pass: All region shapes */}
                {mapRegions.map((region) => {
                    const isActive = selectedRegion === region.id
                    return (
                        <path
                            key={`path-${region.id}`}
                            d={region.d}
                            onClick={() => onSelectRegion(region.id)}
                            className="cursor-pointer"
                            style={{
                                fill: isActive ? "#ff5500" : "#e5e7eb",
                                stroke: "#ffffff",
                                strokeWidth: "0.5",
                                transition: "fill 0.2s ease",
                            }}
                            onMouseEnter={e => {
                                if (!isActive) (e.currentTarget as SVGPathElement).style.fill = "#ffeedd"
                            }}
                            onMouseLeave={e => {
                                if (!isActive) (e.currentTarget as SVGPathElement).style.fill = "#e5e7eb"
                            }}
                        />
                    )
                })}

                {/* Second pass: All labels (lines, dots, text) on top of shapes */}
                {mapRegions.map((region) => {
                    const isActive = selectedRegion === region.id
                    const label = regionLabels[region.id]

                    if (!label) return null

                    return (
                        <g
                            key={`label-${region.id}`}
                            onClick={() => onSelectRegion(region.id)}
                            className="cursor-pointer"
                            style={{ opacity: isActive ? 1 : 0.8, transition: "opacity 0.2s ease" }}
                        >
                            <line
                                x1={label.ax}
                                y1={label.ay}
                                x2={label.lx - 3}
                                y2={label.ly}
                                stroke="#003fa2"
                                strokeWidth="0.6"
                            />
                            <circle
                                cx={label.ax}
                                cy={label.ay}
                                r="1.5"
                                fill="#003fa2"
                            />
                            <text
                                x={label.lx + 1}
                                y={label.ly}
                                dominantBaseline="middle"
                                style={{
                                    fontSize: "9px",
                                    fontWeight: isActive ? "700" : "500",
                                    fill: "#003fa2",
                                    fontFamily: "Inter, system-ui, sans-serif",
                                    letterSpacing: "0.02em",
                                    textTransform: "uppercase",
                                    userSelect: "none",
                                }}
                            >
                                {region.name}
                            </text>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
