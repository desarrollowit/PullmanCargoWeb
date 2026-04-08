import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const odt = searchParams.get('odt')

    if (!odt) {
        return NextResponse.json({ error: 'Falta el parámetro ODT' }, { status: 400 })
    }

    try {
        console.log('--- CALLING PULLMAN GO TRACKING API ---')
        console.log('ODT:', odt)

        const baseUrl = process.env.NEXT_PUBLIC_PULLMAN_API_URL || 'https://www.pullmancargo.cl'
        // Using the new SvelteKit data endpoint provided by the user
        const response = await fetch(`${baseUrl}/seguimiento/${odt}/__data.json?x-sveltekit-invalidated=01`, {
            method: 'GET',
            headers: {
                'accept': 'application/json, text/plain, */*',
            }
        })

        if (!response.ok) {
            console.error('Tracking API HTTP Error:', response.status)
            return NextResponse.json({ error: 'Error al consultar el seguimiento' }, { status: response.status })
        }

        const data = await response.json()
        console.log('Tracking Result (count):', Array.isArray(data) ? data.length : 'not an array')

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error in tracking proxy:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
