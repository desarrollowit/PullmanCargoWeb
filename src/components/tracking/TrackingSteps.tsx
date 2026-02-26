"use client"

import { CheckCircle2, Package, Truck, Warehouse, MapPin, Clock } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface Step {
    id: number
    title: string
    description: string
    date: string
    location: string
    icon: any
    status: "completed" | "active" | "pending"
}

interface TrackingStepsProps {
    steps: Step[]
}

export function TrackingSteps({ steps }: TrackingStepsProps) {
    return (
        <div className="relative">
            {steps.map((step, index) => {
                const isCompleted = step.status === "completed"
                const isActive = step.status === "active"
                const isPending = step.status === "pending"
                const isLast = index === steps.length - 1

                return (
                    <ScrollReveal
                        key={step.id}
                        animation="slide-in-right"
                        delay={index * 150}
                        className={`relative flex gap-6 ${isPending ? 'opacity-60 grayscale' : ''}`}
                    >
                        {/* Timeline Line Connection */}
                        {!isLast && (
                            <div className="absolute left-6 top-10 bottom-0 w-1 bg-gray-200 -z-10 translate-x-[-0.5px]"></div>
                        )}
                        {/* Icon Bubble */}
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-lg ${isActive
                            ? 'bg-[#003fa2] border-[#003fa2] text-white scale-110'
                            : isCompleted
                                ? 'bg-white border-[#003fa2] text-[#003fa2]'
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}>
                            <step.icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pt-1 pb-6 border-b border-gray-100 ${index === steps.length - 1 ? 'border-none' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-sm font-bold uppercase ${isActive ? 'text-[#003fa2]' : 'text-gray-900'}`}>
                                    {step.title}
                                </h4>
                                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                    {step.date.split(',')[0]}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2 leading-snug">
                                {step.description}
                            </p>

                            {(isActive || isCompleted) && (
                                <div className="flex flex-col gap-1 text-xs text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{step.date.split(',')[1] || step.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        <span>{step.location}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollReveal>
                )
            })}
        </div>
    )
}
