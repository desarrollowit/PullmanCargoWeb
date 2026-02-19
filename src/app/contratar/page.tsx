"use client"

import { Suspense } from "react"
import ContratarForm from "./ContratarForm"

export default function ContratarPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003fa2]"></div>
            </div>
        }>
            <ContratarForm />
        </Suspense>
    )
}
