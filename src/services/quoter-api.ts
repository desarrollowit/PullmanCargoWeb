// API Configuration - PullmanGo Integration
export const API_CONFIG = {
    BASE_URL: 'https://www.pullmango.cl',
    ENDPOINTS: {
        GET_ORIGINS: '/api/origenes-cotizador',
        GET_DESTINATIONS: '/api/destinos-cotizador',
        GET_DESTINATIONS_BY_ORIGIN: '/api/destinos-cotizador-atlas',
        CALCULATE_QUOTE: '/api/cotizar',
    },
    HEADERS: {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json;charset=UTF-8',
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
    // TODO: Update with actual response structure from API
    price?: number
    estimatedDays?: string
    serviceType?: string
    currency?: string
    [key: string]: any // Allow for additional fields from API
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
     * GET /api/origenes-cotizador
     */
    async getOrigins(): Promise<Location[]> {
        try {
            const data = await this.fetchAPI<any>(API_CONFIG.ENDPOINTS.GET_ORIGINS)

            // Transform API response to Location format
            // Assuming response is an array of objects with id and name
            if (Array.isArray(data)) {
                return data.map((item: any) => ({
                    id: item.id || item.value || `${item.code}&${item.name}`,
                    name: item.name || item.label || '',
                    code: item.code,
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
     * GET /api/destinos-cotizador
     */
    async getDestinations(): Promise<Location[]> {
        try {
            const data = await this.fetchAPI<any>(API_CONFIG.ENDPOINTS.GET_DESTINATIONS)

            // Transform API response to Location format
            if (Array.isArray(data)) {
                return data.map((item: any) => ({
                    id: item.id || item.value || `${item.code}&${item.name}`,
                    name: item.name || item.label || '',
                    code: item.code,
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
     * POST /api/destinos-cotizador-atlas
     * Body: {"id_ciudad": "1310100101&SANTIAGO"}
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
            if (Array.isArray(data)) {
                return data.map((item: any) => ({
                    id: item.id || item.value || `${item.code}&${item.name}`,
                    name: item.name || item.label || '',
                    code: item.code,
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
     * POST /api/cotizar
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
