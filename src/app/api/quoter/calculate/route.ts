import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log('--- CALLING PULLMAN GO API ---')
        console.log('Payload:', JSON.stringify(body, null, 2))

        const response = await fetch('https://www.pullmango.cl/api/cotizar', {
            method: 'POST',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            console.error('Pullman Go API HTTP Error:', response.status)
            throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Pullman Go API Result:', data)
        console.log('--- END PULLMAN GO API ---')

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error calculating quote:', error)
        return NextResponse.json(
            { error: 'Failed to calculate quote' },
            { status: 500 }
        )
    }
}
