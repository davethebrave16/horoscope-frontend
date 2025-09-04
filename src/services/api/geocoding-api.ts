import { GEOCODING_CONFIG } from '../../constants'
import { GeocodingResult, AppError } from '../../types'

const createAppError = (message: string, code: string = 'GEOCODING_ERROR'): AppError => ({
	code,
	message,
	timestamp: new Date().toISOString()
})

export const geocodingApi = {
	searchCity: async (cityName: string): Promise<GeocodingResult> => {
		try {
			const response = await fetch(
				`${GEOCODING_CONFIG.BASE_URL}/search?format=json&q=${encodeURIComponent(cityName)}&limit=1&addressdetails=1`,
				{
					headers: {
						'User-Agent': GEOCODING_CONFIG.USER_AGENT
					}
				}
			)

			if (!response.ok) {
				throw createAppError(`HTTP error! status: ${response.status}`, 'HTTP_ERROR')
			}

			const data = await response.json()
			
			if (!data || data.length === 0) {
				throw createAppError('City not found', 'CITY_NOT_FOUND')
			}

			const result = data[0]
			return {
				latitude: parseFloat(result.lat),
				longitude: parseFloat(result.lon),
				displayName: result.display_name,
				city: result.address?.city || result.address?.town || result.address?.village || cityName,
				country: result.address?.country || ''
			}
		} catch (error) {
			console.error('Geocoding API Error:', error)
			if (error instanceof Error) {
				throw createAppError(error.message, 'GEOCODING_API_ERROR')
			}
			throw createAppError('Unknown error occurred', 'UNKNOWN_ERROR')
		}
	}
}
