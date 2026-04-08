import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const baseUrl = process.env.NEXT_PUBLIC_PULLMAN_API_URL || 'https://www.pullmancargo.cl'
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)

        const response = await fetch(`${baseUrl}/api/cotizar`, {
            method: 'POST',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body),
            signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error calculating quote:', error)
        return NextResponse.json(
            { error: 'Failed to calculate quote' },
            { status: 500 }
        )
    }
}
