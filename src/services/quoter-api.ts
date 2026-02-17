// API Configuration - Using Next.js API Routes as Proxy
// This avoids CORS issues by making requests server-side
export const API_CONFIG = {
    BASE_URL: '', // Empty for relative URLs (same origin)
    ENDPOINTS: {
        GET_ORIGINS: '/api/quoter/origins',
        GET_DESTINATIONS: '/api/quoter/destinations',
        GET_DESTINATIONS_BY_ORIGIN: '/api/quoter/destinations-by-origin',
        CALCULATE_QUOTE: '/api/quoter/calculate',
    },
    HEADERS: {
        'accept': 'application/json',
        'content-type': 'application/json',
    },
}

// Types based on PullmanGo API
export interface Location {
    id: string // Format: "code&NAME" (e.g., "1310100101&SANTIAGO")
    name: string
    code?: string
}

export interface QuoteRequest {
    selected: string // Service type: "CGR" (Cargo), etc.
    origen: string // Format: "code&NAME"
    destino: string // Format: "code&NAME"
    pago: string // Payment method: "EFE" (Efectivo), etc.
    lugar: string // Delivery location: "DOM" (Domicilio), "SUC" (Sucursal)
    largo: string // Length in cm
    alto: string // Height in cm
    ancho: string // Width in cm
    peso: string // Weight in kg
    telefono: string // Phone number
    email: string // Email address
}

export interface QuoteResponse {
    cantidadItem: string
    codigo: string // "OK" on success
    estado: boolean // true on success
    mensaje: string // Success/error message
    precioTotal: number // Total price
    precioUnitario: number // Unit price
    valorNumerico: number // Numeric value (same as precioTotal)
    descripcionOrigen: string // Origin city name
    descripcionDestino: string // Destination city name
}

// API Service Class
class QuoterAPIService {
    private async fetchAPI<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...API_CONFIG.HEADERS,
                    ...options.headers,
                },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(
                    errorData.message || `API Error: ${response.status} ${response.statusText}`
                )
            }

            return await response.json()
        } catch (error) {
            console.error('API Request failed:', error)
            throw error
        }
    }

    /**
     * Endpoint 1: Get origin cities
     * GET /api/quoter/origins (proxies to /api/origenes-cotizador)
     * Response format: [{"codigo": "1310100101", "descripcion": "SANTIAGO"}, ...]
     */
    async getOrigins(): Promise<Location[]> {
        try {
            const data = await this.fetchAPI<any>(API_CONFIG.ENDPOINTS.GET_ORIGINS)

            // Transform API response to Location format
            // API returns: {codigo: string, descripcion: string}
            if (Array.isArray(data)) {
                return data.map((item: any) => ({
                    id: `${item.codigo}&${item.descripcion}`, // Format: "code&NAME"
                    name: item.descripcion || '',
                    code: item.codigo,
                }))
            }

            return data
        } catch (error) {
            console.error('Failed to fetch origins:', error)
            throw new Error('No se pudieron cargar las ciudades de origen')
        }
    }

    /**
     * Endpoint 2: Get all destination cities
     * GET /api/quoter/destinations (proxies to /api/destinos-cotizador)
     * Response format: [{"codigo": "0510900101", "descripcion": "VIÑA DEL MAR"}, ...]
     */
    async getDestinations(): Promise<Location[]> {
        try {
            const data = await this.fetchAPI<any>(API_CONFIG.ENDPOINTS.GET_DESTINATIONS)

            // Transform API response to Location format
            // API returns: {codigo: string, descripcion: string}
            if (Array.isArray(data)) {
                return data.map((item: any) => ({
                    id: `${item.codigo}&${item.descripcion}`, // Format: "code&NAME"
                    name: item.descripcion || '',
                    code: item.codigo,
                }))
            }

            return data
        } catch (error) {
            console.error('Failed to fetch destinations:', error)
            throw new Error('No se pudieron cargar las ciudades de destino')
        }
    }

    /**
     * Endpoint 3: Get destinations filtered by origin city
     * POST /api/quoter/destinations-by-origin (proxies to /api/destinos-cotizador-atlas)
     * Body: {"id_ciudad": "1310100101&SANTIAGO"}
     * Response format: [{"codigo": "0510900101", "descripcion": "VIÑA DEL MAR"}, ...]
     */
    async getDestinationsByOrigin(originId: string): Promise<Location[]> {
        try {
            const data = await this.fetchAPI<any>(
                API_CONFIG.ENDPOINTS.GET_DESTINATIONS_BY_ORIGIN,
                {
                    method: 'POST',
                    body: JSON.stringify({ id_ciudad: originId }),
                }
            )

            // Transform API response to Location format
            // API returns: {codigo: string, descripcion: string}
            if (Array.isArray(data)) {
                return data.map((item: any) => ({
                    id: `${item.codigo}&${item.descripcion}`, // Format: "code&NAME"
                    name: item.descripcion || '',
                    code: item.codigo,
                }))
            }

            return data
        } catch (error) {
            console.error('Failed to fetch destinations by origin:', error)
            throw new Error('No se pudieron cargar los destinos disponibles')
        }
    }

    /**
     * Endpoint 4: Calculate shipping quote
     * POST /api/quoter/calculate (proxies to /api/cotizar)
     * Body example:
     * {
     *   "selected": "CGR",
     *   "origen": "1310100101&SANTIAGO",
     *   "destino": "0510900101&VIÑA DEL MAR",
     *   "pago": "EFE",
     *   "lugar": "DOM",
     *   "largo": "100",
     *   "alto": "100",
     *   "ancho": "100",
     *   "peso": "10",
     *   "telefono": "950906625",
     *   "email": "dgonzalez@wit.la"
     * }
     */
    async calculateQuote(request: QuoteRequest): Promise<QuoteResponse> {
        try {
            const response = await this.fetchAPI<QuoteResponse>(
                API_CONFIG.ENDPOINTS.CALCULATE_QUOTE,
                {
                    method: 'POST',
                    body: JSON.stringify(request),
                }
            )

            return response
        } catch (error) {
            console.error('Failed to calculate quote:', error)
            throw new Error('No se pudo calcular la cotización. Intenta nuevamente.')
        }
    }
}

// Export singleton instance
export const quoterAPI = new QuoterAPIService()

// Helper function to parse location ID format "code&NAME"
export function parseLocationId(locationId: string): { code: string; name: string } {
    const [code, name] = locationId.split('&')
    return { code, name: name || '' }
}

// Helper function to format location for display
export function formatLocationForDisplay(location: Location): string {
    const { name } = parseLocationId(location.id)
    return name || location.name
}
