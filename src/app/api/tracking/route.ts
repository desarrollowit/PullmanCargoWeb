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

        const response = await fetch(`https://www.pullmango.cl/api/seguimiento?odt=${odt}`, {
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
