import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const response = await fetch('https://www.pullmango.cl/api/destinos-cotizador-atlas', {
            method: 'POST',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching destinations by origin:', error)
        return NextResponse.json(
            { error: 'Failed to fetch destinations by origin' },
            { status: 500 }
        )
    }
}
