import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await fetch('https://www.pullmango.cl/api/origenes-cotizador', {
            headers: {
                'accept': 'application/json, text/plain, */*',
            },
        })

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching origins:', error)
        return NextResponse.json(
            { error: 'Failed to fetch origins' },
            { status: 500 }
        )
    }
}
