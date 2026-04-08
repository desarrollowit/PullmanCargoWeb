import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const idRegion = searchParams.get('idRegion')

    if (!idRegion) {
        return NextResponse.json(
            { error: 'idRegion is required' },
            { status: 400 }
        )
    }

    try {
        const baseUrl = process.env.NEXT_PUBLIC_PULLMAN_API_URL || 'https://www.pullmancargo.cl'
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)

        const response = await fetch(`${baseUrl}/api/agencias?idRegion=${idRegion}`, {
            headers: {
                'accept': '*/*',
                'accept-language': 'es-419,es;q=0.9,en;q=0.8',
            },
            signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error(`Error fetching agencies for region ${idRegion}:`, error)
        return NextResponse.json(
            { error: 'Failed to fetch agencies' },
            { status: 500 }
        )
    }
}
