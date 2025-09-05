import { API_ENDPOINTS, DEFAULT_TIMEZONE_OFFSET } from '../../constants'
import { TransitResponse, AppError } from '../../types'

const createAppError = (message: string, code: string = 'API_ERROR'): AppError => ({
	code,
	message,
	timestamp: new Date().toISOString()
})

const handleApiResponse = async (response: Response, errorMessage: string) => {
	if (!response.ok) {
		throw createAppError(`${errorMessage}: ${response.status}`, 'HTTP_ERROR')
	}

	const data = await response.json()
	
	if (!data.success) {
		throw createAppError('API returned unsuccessful response', 'API_ERROR')
	}

	return data
}

export const transitApi = {
	calculateTransits: async (
		year: number,
		month: number,
		latitude: string,
		longitude: string,
		planet: string,
		timezoneOffset: number = DEFAULT_TIMEZONE_OFFSET,
		stepMinutes: number = 60
	): Promise<TransitResponse> => {
		try {
			const requestData = {
				year,
				month,
				latitude: parseFloat(latitude),
				longitude: parseFloat(longitude),
				timezone_offset_hours: timezoneOffset,
				planet,
				step_minutes: stepMinutes
			}

			const response = await fetch(API_ENDPOINTS.TRANSIT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
				},
				body: JSON.stringify(requestData)
			})

			return await handleApiResponse(response, 'Failed to calculate planet transits')
		} catch (error) {
			console.error('Transit API Error:', error)
			if (error instanceof Error) {
				throw createAppError(error.message, 'TRANSIT_API_ERROR')
			}
			throw createAppError('Unknown error occurred', 'UNKNOWN_ERROR')
		}
	}
}
