import { API_ENDPOINTS, DEFAULT_TIMEZONE_OFFSET } from '../../constants'
import { HoroscopeResponse, AspectsResponse, MoonPhaseResponse, TimeData, AppError } from '../../types'

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

export const horoscopeApi = {
	calculateHoroscope: async (
		date: Date,
		time: TimeData,
		latitude: string,
		longitude: string,
		timezoneOffset: number = DEFAULT_TIMEZONE_OFFSET
	): Promise<HoroscopeResponse> => {
		try {
			const requestData = {
				date: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
				time: [time.hours, time.minutes, time.seconds],
				latitude: parseFloat(latitude),
				longitude: parseFloat(longitude),
				timezone_offset_hours: timezoneOffset
			}

			const response = await fetch(API_ENDPOINTS.POSITION, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
				},
				body: JSON.stringify(requestData)
			})

			return await handleApiResponse(response, 'Failed to calculate horoscope')
		} catch (error) {
			console.error('Horoscope API Error:', error)
			if (error instanceof Error) {
				throw createAppError(error.message, 'HOROSCOPE_API_ERROR')
			}
			throw createAppError('Unknown error occurred', 'UNKNOWN_ERROR')
		}
	},

	calculateAspects: async (
		date: Date,
		time: TimeData,
		latitude: string,
		longitude: string,
		timezoneOffset: number = DEFAULT_TIMEZONE_OFFSET
	): Promise<AspectsResponse> => {
		try {
			const requestData = {
				date: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
				time: [time.hours, time.minutes, time.seconds],
				latitude: parseFloat(latitude),
				longitude: parseFloat(longitude),
				timezone_offset_hours: timezoneOffset
			}

			const response = await fetch(API_ENDPOINTS.ASPECTS, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
				},
				body: JSON.stringify(requestData)
			})

			return await handleApiResponse(response, 'Failed to calculate aspects')
		} catch (error) {
			console.error('Aspects API Error:', error)
			if (error instanceof Error) {
				throw createAppError(error.message, 'ASPECTS_API_ERROR')
			}
			throw createAppError('Unknown error occurred', 'UNKNOWN_ERROR')
		}
	},

	calculateMoonPhase: async (
		date: Date,
		time: TimeData,
		latitude: string,
		longitude: string,
		timezoneOffset: number = DEFAULT_TIMEZONE_OFFSET
	): Promise<MoonPhaseResponse> => {
		try {
			const requestData = {
				date: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
				time: [time.hours, time.minutes, time.seconds],
				latitude: parseFloat(latitude),
				longitude: parseFloat(longitude),
				timezone_offset_hours: timezoneOffset
			}

			const response = await fetch(API_ENDPOINTS.PHASE, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
				},
				body: JSON.stringify(requestData)
			})

			return await handleApiResponse(response, 'Failed to calculate moon phase')
		} catch (error) {
			console.error('Moon Phase API Error:', error)
			if (error instanceof Error) {
				throw createAppError(error.message, 'MOON_PHASE_API_ERROR')
			}
			throw createAppError('Unknown error occurred', 'UNKNOWN_ERROR')
		}
	}
}
