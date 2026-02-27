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
        const response = await fetch(`https://api.pullman.cl/pullmancargo-clientes/api/agencias?idRegion=${idRegion}`, {
            headers: {
                'accept': '*/*',
                'accept-language': 'es-419,es;q=0.9,en;q=0.8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
                // Adding other headers provided by the user for reliability
                'sec-ch-ua': '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
            },
        })

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
